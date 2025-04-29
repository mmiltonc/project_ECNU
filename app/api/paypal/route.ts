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
} from "@paypal/paypal-server-sdk";
import { NextResponse } from "next/server";
import { PHONE_CODES } from "@/app/types/formData";

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
  const countryCode = PHONE_CODES[formData.pais];
  const nationalNumber = formData.celular;

  const order = {
    body: {
      intent: CheckoutPaymentIntent.Capture,
      payer: {
        emailAddress: formData.emailLocalPart + "@gmail.com",
        name: { givenName, surname },
        phone: { phoneType: "MOBILE", phoneNumber: { nationalNumber, countryCode } },
      },
      purchaseUnits: [
        {
          amount: {
            currencyCode,
            value,
            breakdown: {
              itemTotal: {
                currencyCode,
                value
              }
            }
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
    const { body, ...httpResponse } = await ordersController.ordersCreate(
      order
    );
    // Get more response info...
    // const { statusCode, headers } = httpResponse;
    return {
      jsonResponse: JSON.parse(body),
      httpStatusCode: httpResponse.statusCode,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      // const { statusCode, headers } = error;
      throw new Error(error.message);
    }
  }
};

export async function POST(request: Request) {
  const formData = await request.json();

  try {
    console.log("--------PAGO DE PAYPAL");
    console.log("formData: ", formData);
    const result = await createOrder(formData);
    console.log("result: ", result);
    return NextResponse.json({ id: result?.jsonResponse.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
