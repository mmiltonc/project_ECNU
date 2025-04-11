import { NextApiRequest, NextApiResponse } from "next";
// SDK de Mercado Pago
import { MercadoPagoConfig } from 'mercadopago';
// Agrega credenciales
import mercadopago from 'mercadopago'

const client = new MercadoPagoConfig({ accessToken: 'YOUR_ACCESS_TOKEN' });


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { title, price, quantity } = req.body;

    try {
      const preference = {
        items: [ 
          {
            title: title || "Sin título",
            unit_price: parseFloat(price),
            quantity: parseInt(quantity),
          },
        ],
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/failure`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/pending`,
        },
        auto_return: "approved",
      };

      const response = await mercadopago.preferences.create(preference);

      res.status(200).json({ id: response.body.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear la preferencia" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
