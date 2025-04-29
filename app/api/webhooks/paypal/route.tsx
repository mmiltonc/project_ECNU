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
  name: string;
  plan: string;
}

const sendPaymentSuccessfulEmail = async (payer: PayerInterface) => {
  await resend.emails.send({
    from: `E.C.N.U. <onboarding@resend.dev>`,
    to: payer.email,
    subject: `¡Bienvenido ${payer.name} a tu ${payer.plan}!`,
    react: PaymentSuccessfulTemplate(payer),
  });
};

const sendPaymentPendingEmail = async (payer: PayerInterface) => {
  await resend.emails.send({
    from: "E.C.N.U. <onboarding@resend.dev>",
    to: payer.email,
    subject: "Pago pendiente de aprobación",
    react: PaymentSuccessfulTemplate(payer),
  });
};

const sendPaymentRejectedEmail = async (payer: PayerInterface) => {
  await resend.emails.send({
    from: "E.C.N.U. <onboarding@resend.dev>",
    to: payer.email,
    subject: "Pago rechazado",
    react: PaymentSuccessfulTemplate(payer),
  });
};
const sendPaymentCanceledEmail = async (payer: PayerInterface) => {};

const sendPaymentInProcessEmail = async (payer: PayerInterface) => {};

const handlePaymentWebhook = async (paymentId: string) => {
  if (!paymentId) throw new Error("Invalid request.");

  const url = `https://api.mercadopago.com/v1/payments/${paymentId}`;
  const headers = {
    Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
  };

  const response = await fetch(url, { headers });

  // const response = {
  //   json: async () => ({
  //     payer: { first_name: "Facundo", email: "facundopereztomasek@gmail.com" },
  //     status: "approved",
  //   }),
  // };

  const jsonResponse = await response.json();

  const {
    payer,
    status,
    metadata: { datos },
    description,
  } = jsonResponse;

  const payerData = {
    name: datos.nombre || payer.first_name,
    email: datos.email || payer.email,
    plan: description,
  };

  if (status === APPROVED) await sendPaymentSuccessfulEmail(payerData);
  if (status === REJECTED) await sendPaymentRejectedEmail(payerData);
  if (status === CANCELLED) await sendPaymentCanceledEmail(payerData);
  if (status === PENDING) await sendPaymentPendingEmail(payerData);
  if (status === IN_PROCESS) await sendPaymentInProcessEmail(payerData);
};

export async function POST(request: Request) {
  try {
    console.log("Paypal webhook request");
    console.log(request);
    // const body: MercadopagoWebhookInterface = await request.json();

    // if (body.type == "payment") await handlePaymentWebhook(body.data?.id);

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