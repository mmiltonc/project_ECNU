import { COUNTRIES, FormDataType, PlanType } from "@/app/types/formData";
import { UUIDTypes, v4 as uuidv4 } from "uuid";
import plansData from "@/app/data/plans.json";
import {
  ApiError,
  CheckoutPaymentIntent,
  Client,
  Environment,
  LogLevel,
  OrdersController,
  ItemCategory,
  PhoneType,
} from "@paypal/paypal-server-sdk";
import { NextResponse } from "next/server";
import { PHONE_CODES } from "@/app/types/formData";
import { db } from "@/app/lib/firebaseAdmin";

interface OrderResponse {
  body: string;
  statusCode: number;
}

const dateConfig = { timeZone: "America/Argentina/Buenos_Aires" }

const oAuthClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
const oAuthClientSecret = process.env.PAYPAL_CLIENT_SECRET || "";

const client = new Client({
  clientCredentialsAuthCredentials: { oAuthClientId, oAuthClientSecret },
  timeout: 0,
  environment: Environment.Sandbox,
  logging: {
    logLevel: LogLevel.Info,
    logRequest: { logBody: true },
    logResponse: { logHeaders: true },
  },
});

const ordersController = new OrdersController(client);

const createOrder = async (formData: FormDataType, planInfo: PlanType, userId: UUIDTypes) => {
  const { name, price, sku } = planInfo;

  const currencyCode = "USD";
  const description = name;
  const quantity = "1";
  const value = String(price.usd);
  const givenName = formData.nombre?.split(" ").at(0);
  const surname = formData.nombre?.split(" ").at(1) || "";
  const countryCode = PHONE_CODES[formData.pais as keyof typeof PHONE_CODES];
  const nationalNumber = formData.celular;

  const order = {
    body: {
      intent: CheckoutPaymentIntent.Capture,
      payer: {
        emailAddress: formData.emailLocalPart + "@gmail.com",
        name: { givenName, surname },
        phone: {
          phoneType: PhoneType.Mobile,
          phoneNumber: { nationalNumber, countryCode },
        },
      },
      purchaseUnits: [
        {
          customId: userId.toString(),
          amount: {
            currencyCode,
            value,
            breakdown: {
              itemTotal: {
                currencyCode,
                value,
              },
            },
          },
          items: [
            {
              name,
              description,
              quantity,
              unitAmount: { currencyCode, value },
              category: ItemCategory.DigitalGoods,
              sku,
            },
          ],
        },
      ],
    },
    prefer: "return=representation",
  };

  try {
    const result = (await ordersController.createOrder(order)) as OrderResponse;
    const body = result?.body;
    const httpStatusCode = result?.statusCode;

    if (httpStatusCode !== 201) throw new Error(`Error creating order (HTTP code ${httpStatusCode})`);

    const id = JSON.parse(body)?.id;

    if (!id) throw new Error("Error creating order (no ID found)");

    return { id, httpStatusCode };
  } catch (error) {
    if (error instanceof ApiError) throw new Error(error.message);
  }
};

export async function POST(request: Request) {
  const formData = (await request.json()) as FormDataType;

  try {
    /* TODO: Validate with JOI */
    if (!formData.celular) throw new Error("Phone number is required.");
    if (!formData.ciudad) throw new Error("City is required.");
    if (!formData.emailLocalPart) throw new Error("Email is required.");
    if (!formData.nombre) throw new Error("Name is required.");
    if (!formData.objetivos) throw new Error("Goals are required.");
    if (!formData.pais) throw new Error("Country is required.");
    if (!formData.plan) throw new Error("Plan is required.");

    if (formData.pais === "ARG") throw new Error("Payment method not allowed in Argentina.");

    const planInfo = plansData.plans.find(
      (plan: any) => plan.sku === formData.plan
    ) as PlanType;

    if (!planInfo) throw new Error("Plan not found.");

    const orderDate = new Date().toLocaleString("es-AR", dateConfig);
    const userId = uuidv4();
    const country = COUNTRIES.find(({code}) => code === formData.pais)?.name;

    /* TODO: Mandar todo esto a una función */
    const user = {
      id: userId,
      city: formData.ciudad,
      country,
      countryCode: formData.pais,
      email: formData.emailLocalPart + "@gmail.com",
      gatewayId: "paypal",
      goals: formData.objetivos,
      name: formData.nombre,
      paymentCurrency: "USD",
      orderDate,
      // paymentDate: ,
      // paymentExpirationDays:,
      // paymentId:,
      paymentStatus: "STARTED",
      paymentValue: planInfo.price.usd,
      phone: formData.celular,
      plan: planInfo.name,
      planSKU: planInfo.sku,
    };

    const document = db.collection("users").doc(userId);

    try {
      /* Be aware of race conditions */
      console.log("-------------- Creating user at db")
      document.set(user);
    } catch (error) {
      /* Here we can send an email with the user data */
      console.error("Error creating user document: ", error);
    }

    const result = await createOrder(formData, planInfo, userId);

    const paymentDate = new Date()

    const paymentExpirationDate = new Date(paymentDate)
    paymentExpirationDate.setDate(paymentDate.getDate() + planInfo.duration)

    if (!result)
      throw new Error(
        "Error creating order (no result found from createOrder)"
      );

      try {
        console.log("-------------- Updating user at db")
        document.update({
          paymentStatus: 'CREATED',
          paymentDate: paymentDate.toLocaleString("es-AR", dateConfig),
          paymentExpirationDate: paymentExpirationDate.toLocaleString("es-AR", dateConfig),
          paymentId: result.id,
        });
      } catch (error) {
        console.error("Error updating user document: ", error);
      }

    /* TODO: Remember to update payment status on paypal webhooks */

    console.log("result: ", result);
    return NextResponse.json({ id: result.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
