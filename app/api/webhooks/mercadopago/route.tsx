import plansData from "@/app/data/plans.json";
import { PaymentSuccessfulTemplate } from "@/app/emails/payment_successful_template";
import { db } from "@/app/lib/firebaseAdmin";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getStatus, PaymentStatus } from "../helpers";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) throw new Error("RESEND_API_KEY is not defined.");

const resend = new Resend(apiKey);

const dateConfig = { timeZone: "America/Argentina/Buenos_Aires" };

interface FirestoreUser {
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  goals: string;
  orderDate: string;
  paymentDate: string;
  paymentExpirationDate: string;
  paymentId: string;
  paymentStatus: string;
  paymentCurrency: string;
  paymentValue: number;
  gatewayId: string;
  plan: string;
  planSKU: string;
}

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

const handlePaymentWebhook = async (paymentId: string) => {
  if (!paymentId) throw new Error("Invalid request.");

  const url = `https://api.mercadopago.com/v1/payments/${paymentId}`;
  const headers = {
    Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
  };

  const response = await fetch(url, { headers });

  const jsonResponse = await response.json();

  const {
    payer,
    metadata,
    description,
    order,
    external_reference: userId,
  } = jsonResponse;

  const status = getStatus(jsonResponse.status, "mercadopago");

  const document = db.collection("users").doc(userId);
  const documentRef = await document.get();
  const user = documentRef.data() as FirestoreUser | undefined;

  const payerData = {
    name: user?.name || metadata.name || payer.first_name,
    email: user?.email || metadata.email || payer.email,
    plan: description,
  };

  if (status === PaymentStatus.APPROVED)
    await sendPaymentSuccessfulEmail(payerData);
  if (status === PaymentStatus.REJECTED)
    await sendPaymentRejectedEmail(payerData);
  if (status === PaymentStatus.PENDING)
    await sendPaymentPendingEmail(payerData);

  try {
    const planInfo = plansData.plans.find(
      (plan: any) => plan.sku === metadata.plan
    );

    if (!planInfo) throw new Error("Plan not found.");

    const paymentDate = new Date();
    const paymentExpirationDate = new Date(paymentDate);
    paymentExpirationDate.setDate(paymentDate.getDate() + planInfo.duration);

    document.update({
      paymentStatus: status,
      paymentDate:
        status === PaymentStatus.APPROVED
          ? paymentDate.toLocaleString("es-AR", dateConfig)
          : null,
      paymentExpirationDate:
        status === PaymentStatus.APPROVED
          ? paymentExpirationDate.toLocaleString("es-AR", dateConfig)
          : null,
      orderId: order.id,
    });
  } catch (error) {
    console.error("Error updating user document: ", error);
  }
};

export async function POST(request: Request) {
  try {
    const body: MercadopagoWebhookInterface = await request.json();

    if (body.type == "payment") await handlePaymentWebhook(body.data?.id);

    console.log("==============> body");
    console.log(body.data?.id);
    console.log(body.data);
    console.log(body);
    console.log("==============");

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
