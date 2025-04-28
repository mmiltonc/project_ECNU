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

const oAuthClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
const oAuthClientSecret = process.env.PAYPAL_CLIENT_SECRET || "";

console.log("clientId: ", oAuthClientId);
console.log("clientSecret: ", oAuthClientSecret);

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

const createOrder = async (cart) => {
  console.log("cart: ", cart);
  const collect = {
    body: {
      intent: CheckoutPaymentIntent.Capture,
      purchaseUnits: [
        {
          amount: {
            currency_code: "USD",
            value: "100.00",
          },
          items: [
            {
              name: "Plan Plus - Gym Virtual",
              description: "Plan Plus - Gym Virtual",
              quantity: "1",
              unit_amount: {
                currency_code: "USD",
                value: "100.00",
              },
              category: ItemCategory.DigitalGoods,
              sku: "plan-plus-gym-virtual",
            },
          ],
        },
      ],
    },
    prefer: "return=representation",
  };

  try {
    const { body, ...httpResponse } = await ordersController.createOrder(
      collect
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
  const body = await request.json();

  try {
    const { result, ...httpResponse } = await ordersController.createOrder(
      collect
    );
    return NextResponse.json({ id: result.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
