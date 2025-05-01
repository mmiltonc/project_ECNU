import plansData from "@/app/data/plans.json";
import { FormDataType } from "@/app/types/formData";
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

interface OrderResponse {
  body: string;
  statusCode: number;
}

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

const createOrder = async (formData: FormDataType) => {
  console.log("formData: ", formData);
  const planInfo = plansData.plans.find(
    (plan: any) => plan.sku === formData.plan
  );

  if (!planInfo) throw new Error("Plan not found.");
  if (formData.pais === "ARG")
    throw new Error("Payment method not allowed in Argentina.");

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
    const result = (await ordersController.ordersCreate(order)) as OrderResponse;
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

    const result = await createOrder(formData);
    if (!result) throw new Error("Error creating order (no result found from createOrder)");
    console.log("result: ", result);
    return NextResponse.json({ id: result.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
