import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextResponse } from "next/server";
import plansData from "@/app/data/plans.json";
import { PHONE_CODES } from "@/app/types/formData";

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

if (!accessToken) throw new Error("MERCADO_PAGO_ACCESS_TOKEN is not defined.");

export const mercadopago = new MercadoPagoConfig({ accessToken });

export async function POST(request: Request) {
  try {
    const { formData } = await request.json();
    const metadata = {
      plan: formData.plan,
      nombre: formData.nombre,
      pais: formData.pais,
      ciudad: formData.ciudad,
      celular: formData.celular,
      objetivos: formData.objetivos,
      email: formData.emailLocalPart + "@gmail.com",
      codigoArea: PHONE_CODES[formData.pais],
    };

    console.log("metadata: ", metadata);

    const planInfo = plansData.plans.find((plan: any) => plan.sku === formData.plan);

    if (!planInfo) throw new Error("Plan not found.");

    if (!process.env.NEXT_PUBLIC_BASE_URL)
      throw new Error("NEXT_PUBLIC_BASE_URL is not defined.");

    const id = planInfo.sku;
    const unit_price =
      formData.pais === "ARG" ? planInfo.price.ars : planInfo.price.usd;
    const title = planInfo.name;
    const quantity = 1;

    const success = `${process.env.NEXT_PUBLIC_BASE_URL}/?modal=1#clasesyretos`;
    const pending = `${process.env.NEXT_PUBLIC_BASE_URL}/?modal=2#clasesyretos`;
    const failure = `${process.env.NEXT_PUBLIC_BASE_URL}/?modal=3#clasesyretos`;

    const body = {
      items: [{ id, unit_price, quantity, title }],
      metadata,
      back_urls: { success, pending, failure },
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

