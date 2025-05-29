import { UUIDTypes, v4 as uuidv4 } from "uuid";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextResponse } from "next/server";
import plansData from "@/app/data/plans.json";
import {
  COUNTRIES,
  FormDataType,
  PHONE_CODES,
  PlanType,
} from "@/app/types/formData";
import {
  PreferenceRequest,
  PreferenceResponse,
} from "mercadopago/dist/clients/preference/commonTypes";
import { db } from "@/app/lib/firebaseAdmin";
import CreateUserErrorTemplate from "@/app/emails/create_user_error_template";
import { Resend } from "resend";
const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

if (!accessToken) throw new Error("MERCADO_PAGO_ACCESS_TOKEN is not defined.");

const mercadopago = new MercadoPagoConfig({ accessToken });
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!BASE_URL) throw new Error("NEXT_PUBLIC_BASE_URL is not defined.");

const dateConfig = { timeZone: "America/Argentina/Buenos_Aires" };

const createPreference = async (
  formData: FormDataType,
  planInfo: PlanType,
  userId: UUIDTypes
) => {
  const { name, price, sku } = planInfo;

  const metadata = {
    celular: formData.celular,
    ciudad: formData.ciudad,
    codigoArea: PHONE_CODES[formData.pais as keyof typeof PHONE_CODES],
    email: formData.emailLocalPart + "@gmail.com",
    nombre: formData.nombre,
    objetivos: formData.objetivos,
    pais: formData.pais,
    plan: formData.plan,
  };

  const id = sku;
  const quantity = 1;
  const title = name;
  const description = name;
  const unit_price = price.ars;

  const failure = `${BASE_URL}/?modal=purchaseFailed`;
  const pending = `${BASE_URL}/?modal=purchasePending`;
  const success = `${BASE_URL}/?modal=purchaseSuccess`;

  const body = {
    items: [{ id, unit_price, quantity, title, description }],
    metadata,
    back_urls: { failure, pending, success },
    auto_return: "approved",
    binary_mode: true,
    payment_methods: {
      payment_methods: {
        excluded_payment_types: [
          { id: "ticket" }, // Excluye pagos en efectivo
          { id: "debit_card" }, // Excluye tarjetas de débito
        ],
        installments: 3, // Permite hasta 3 cuotas
        default_installments: 3, // Establece 3 cuotas como la opción por defecto
        excluded_payment_methods: [
          { id: "debit_card" }, // Excluye tarjetas de débito
          { id: "atm" }, // Excluye pagos por cajero
        ],
      },
    },
    external_reference: userId,
  } as PreferenceRequest;

  try {
    const preference = (await new Preference(mercadopago).create({
      body,
    })) as PreferenceResponse;
    console.log("Preference created successfully:", preference);
    return preference;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export async function POST(request: Request) {
  try {
    const formData = (await request.json()) as FormDataType;

    /* TODO: Validate with JOI */
    if (!formData.celular) throw new Error("Phone number is required.");
    if (!formData.ciudad) throw new Error("City is required.");
    if (!formData.emailLocalPart) throw new Error("Email is required.");
    if (!formData.nombre) throw new Error("Name is required.");
    if (!formData.objetivos) throw new Error("Goals are required.");
    if (!formData.pais) throw new Error("Country is required.");
    if (!formData.plan) throw new Error("Plan is required.");

    if (formData.pais !== "ARG")
      throw new Error("Payment method not allowed outside Argentina.");

    const planInfo = plansData.plans.find(
      (plan: any) => plan.sku === formData.plan
    );

    if (!planInfo) throw new Error("Plan not found.");

    const orderDate = new Date().toLocaleString("es-AR", dateConfig);
    const userId = uuidv4();
    const country = COUNTRIES.find(({ code }) => code === formData.pais)
      ?.name as string;

    /* TODO: Mandar todo esto a una función */
    const user = {
      id: userId,
      city: formData.ciudad,
      country,
      countryCode: formData.pais,
      email: formData.emailLocalPart + "@gmail.com",
      gatewayId: "mercadopago",
      goals: formData.objetivos,
      name: formData.nombre,
      paymentCurrency: "ARS",
      orderDate,
      // paymentDate: ,
      // paymentExpirationDays:,
      // paymentId:,
      paymentStatus: "STARTED",
      paymentValue: Number(planInfo.price.usd),
      phone: formData.celular,
      plan: planInfo.name,
      planSKU: planInfo.sku,
    };

    const document = db.collection("users").doc(userId);

    try {
      console.log("-------------- Creating user at db");
      await document.set(user);
    } catch (error) {
      const apiKey = process.env.RESEND_API_KEY;
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: `E.C.N.U. <noreply@ecnuteam.com>`,
        to: "facundopereztomasek@gmail.com",
        subject: `No se pudo guardar el nuevo alumno ${user.name}`,
        react: CreateUserErrorTemplate(user),
      });
      /* Here we can send an email with the user data */
      console.error("Error creating user document: ", error);
    }

    const preference = (await createPreference(
      formData,
      planInfo,
      userId
    )) as PreferenceResponse;

    const paymentDate = new Date();

    const paymentExpirationDate = new Date(paymentDate);
    paymentExpirationDate.setDate(paymentDate.getDate() + planInfo.duration);

    if (!preference)
      throw new Error(
        "Error creating preference (no result found from createPreference)"
      );

    try {
      console.log("-------------- Updating user at db");
      document.update({
        paymentStatus: "CREATED",
        paymentDate: paymentDate.toLocaleString("es-AR", dateConfig),
        paymentExpirationDate: paymentExpirationDate.toLocaleString(
          "es-AR",
          dateConfig
        ),
        orderId: preference.id,
      });
    } catch (error) {
      console.error("Error updating user document: ", error);
    }

    // Devolvemos el init point (url de pago) para que el usuario pueda pagar
    return NextResponse.json({ url: preference.init_point });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
