import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextResponse } from "next/server";
import plansData from "@/app/data/plans.json";
import { FormDataType, PHONE_CODES } from "@/app/types/formData";

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

if (!accessToken) throw new Error("MERCADO_PAGO_ACCESS_TOKEN is not defined.");

const mercadopago = new MercadoPagoConfig({ accessToken });

export async function POST(request: Request) {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    const { formData } = await request.json() as { formData: FormDataType };

    /* TODO: Validate with JOI */
    if (!formData.celular) throw new Error("Phone number is required.");
    if (!formData.ciudad) throw new Error("City is required.");
    if (!formData.emailLocalPart) throw new Error("Email is required.");
    if (!formData.nombre) throw new Error("Name is required.");
    if (!formData.objetivos) throw new Error("Goals are required.");
    if (!formData.pais) throw new Error("Country is required.");
    if (!formData.plan) throw new Error("Plan is required.");

    const metadata = {
      celular: formData.celular,
      ciudad: formData.ciudad,
      codigoArea: PHONE_CODES[formData.pais],
      email: formData.emailLocalPart + "@gmail.com",
      nombre: formData.nombre,
      objetivos: formData.objetivos,
      pais: formData.pais,
      plan: formData.plan,
    };

    console.log("metadata: ", metadata);

    const planInfo = plansData.plans.find((plan: any) => plan.sku === formData.plan);

    if (!planInfo) throw new Error("Plan not found.");
    if (formData.pais !== "ARG") throw new Error("Payment method not allowed outside Argentina.");

    const { name, price, sku } = planInfo;

    if (!BASE_URL) throw new Error("NEXT_PUBLIC_BASE_URL is not defined.");

    const id = sku;
    const quantity = 1;
    const title = name;
    const unit_price = price.ars

    const failure = `${BASE_URL}/?modal=3#clasesyretos`;
    const pending = `${BASE_URL}/?modal=2#clasesyretos`;
    const success = `${BASE_URL}/?modal=1#clasesyretos`;

    const body = {
      items: [{ id, unit_price, quantity, title }],
      metadata,
      back_urls: { failure , pending, success },
      auto_return: "approved",
      binary_mode: true,
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
    };

    const preference = await new Preference(mercadopago).create({ body });

    // Devolvemos el init point (url de pago) para que el usuario pueda pagar
    return NextResponse.json({ url: preference.init_point });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

