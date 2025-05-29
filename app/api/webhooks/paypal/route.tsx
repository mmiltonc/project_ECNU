import plansData from "@/app/data/plans.json";
import { PaymentSuccessfulTemplate } from "@/app/emails/payment_successful_template";
import { db } from "@/app/lib/firebaseAdmin";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getStatus, PaymentStatus } from "../helpers";
import OwnerPaymentSuccessfulTemplate from "@/app/emails/owner_payment_successful_template";
import UpdateUserErrorTemplate from "@/app/emails/update_user_error_template";

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
  phone: string;
  date: string;
}

const sendBackupEmail = async (userId: string, status: string) => {
  const paymentDate = new Date();

  const paymentData = {
    paymentStatus: status || "",
    paymentDate:
      status === PaymentStatus.APPROVED
        ? paymentDate.toLocaleString("es-AR", dateConfig)
        : "",
    id: userId,
  };
  const apiKey = process.env.RESEND_API_KEY;
  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: `E.C.N.U. <noreply@ecnuteam.com>`,
    to: "facundopereztomasek@gmail.com",
    subject: `Intento de pago de alumno ${userId}`,
    react: UpdateUserErrorTemplate(paymentData),
  });
};

const sendOwnerPaymentSuccessfulEmail = async (payer: PayerInterface) => {
  await resend.emails.send({
    from: `E.C.N.U. <noreply@ecnuteam.com>`,
    to: "facundopereztomasek@gmail.com",
    subject: `Un nuevo alumno: ${payer.name} suscripto a ${payer.plan}!`,
    react: OwnerPaymentSuccessfulTemplate(payer),
  });
};

const sendPaymentSuccessfulEmail = async (payer: PayerInterface) => {
  await resend.emails.send({
    from: `E.C.N.U. <noreply@ecnuteam.com>`,
    to: payer.email,
    subject: `¡Bienvenido ${payer.name} a tu ${payer.plan}!`,
    react: PaymentSuccessfulTemplate(payer),
  });
};

const sendPaymentPendingEmail = async (payer: PayerInterface) => {
  await resend.emails.send({
    from: "E.C.N.U. <noreply@ecnuteam.com>",
    to: payer.email,
    subject: "Pago pendiente de aprobación",
    react: PaymentSuccessfulTemplate(payer),
  });
};

const sendPaymentRejectedEmail = async (payer: PayerInterface) => {
  await resend.emails.send({
    from: "E.C.N.U. <noreply@ecnuteam.com>",
    to: payer.email,
    subject: "Pago rechazado",
    react: PaymentSuccessfulTemplate(payer),
  });
};

const handlePaymentWebhook = async (body: any) => {
  const paymentId = body.resource.id;
  if (!paymentId) throw new Error("Invalid request.");

  const userId = body.resource.custom_id;
  const status = getStatus(body.resource.status, "paypal") as string;

  try {
    const document = db.collection("users").doc(userId);
    const documentRef = await document.get();
    const user = documentRef.data() as FirestoreUser | undefined;

    if (!user) throw new Error("User not found in DB");

    const payerData: PayerInterface = {
      name: user?.name,
      email: user?.email,
      plan: user?.plan,
      phone: user?.phone,
      date: user?.paymentDate,
    };

    if (status === PaymentStatus.APPROVED) {
      await sendPaymentSuccessfulEmail(payerData);
      await sendOwnerPaymentSuccessfulEmail(payerData);
    }
    if (status === PaymentStatus.REJECTED) {
      await sendPaymentRejectedEmail(payerData);
    }
    if (status === PaymentStatus.PENDING) {
      await sendPaymentPendingEmail(payerData);
    }

    const planInfo = plansData.plans.find(
      (plan: any) => plan.sku === user.planSKU
    );

    if (!planInfo) throw new Error("Plan not found.");

    const paymentDate = new Date();
    const paymentExpirationDate = new Date(paymentDate);
    paymentExpirationDate.setDate(paymentDate.getDate() + planInfo.duration);

    const paymentData = {
      paymentStatus: status || "",
      paymentDate:
        status === PaymentStatus.APPROVED
          ? paymentDate.toLocaleString("es-AR", dateConfig)
          : "",
      paymentExpirationDate:
        status === PaymentStatus.APPROVED
          ? paymentExpirationDate.toLocaleString("es-AR", dateConfig)
          : "",
    };

    document.update(paymentData);
  } catch (error) {
    await sendBackupEmail(userId, status);
    console.error("Error updating getting user document: ", error);
  }
};

export async function POST(request: Request) {
  try {
    console.log("===========PAYPAL WEBHOOK============");
    const body = await request.json();
    console.log("Body", body);
    if (body.event_type.includes("PAYMENT.CAPTURE"))
      await handlePaymentWebhook(body);

    // const body: MercadopagoWebhookInterface = await request.json();

    // if (body.type == "payment") await handlePaymentWebhook(body.data?.id);

    // console.log("==============> body");
    // console.log(body.data?.id);
    // console.log(body.data);
    // console.log(body);
    // console.log("==============");

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
