import { PaymentSuccessfulTemplate } from "@/app/emails/payment_successful_template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const APPROVED = "approved";
const REJECTED = "rejected";
const CANCELLED = "cancelled";
const PENDING = "pending";
const IN_PROCESS = "in_process";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) throw new Error("RESEND_API_KEY is not defined.");

const resend = new Resend(apiKey);

interface MercadopagoWebhookInterface {
  type: string;
  data: {
    id: string;
  };
}

interface PayerInterface {
  email: string;
  first_name: string;
}

const sendPaymentSuccessfulEmail = async (payer: PayerInterface) => {
  await resend.emails.send({
    from: `E.C.N.U. <onboarding@resend.dev>`,
    to: payer.email,
    subject: "Consulta Web - Clases Calistenia",
    react: PaymentSuccessfulTemplate({ name: payer.first_name }),
  });
};

const sendPaymentRejectedEmail = async (payer: PayerInterface) => {};
const sendPaymentCanceledEmail = async (payer: PayerInterface) => {};
const sendPaymentPendingEmail = async (payer: PayerInterface) => {};
const sendPaymentInProcessEmail = async (payer: PayerInterface) => {};

const handlePaymentWebhook = async (paymentId: string) => {
  if (!paymentId) throw new Error("Invalid request.");

  const url = `https://api.mercadopago.com/v1/payments/${paymentId}`;
  const headers = {
    Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
  };

  // const response = await fetch(url, { headers });

  const response = {
    json: async () => ({
      payer: { first_name: "Facundo", email: "facundopereztomasek@gmail.com" },
      status: "approved",
    }),
  };

  const { payer, status } = await response.json();

  if (status === APPROVED) await sendPaymentSuccessfulEmail(payer);
  if (status === REJECTED) await sendPaymentRejectedEmail(payer);
  if (status === CANCELLED) await sendPaymentCanceledEmail(payer);
  if (status === PENDING) await sendPaymentPendingEmail(payer);
  if (status === IN_PROCESS) await sendPaymentInProcessEmail(payer);
};

export async function POST(request: Request) {
  try {
    const body: MercadopagoWebhookInterface = await request.json();

    if (body.type == "payment") await handlePaymentWebhook(body.data?.id);

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "Unknown server error" },
        { status: 500 }
      );
    }
  }
}
