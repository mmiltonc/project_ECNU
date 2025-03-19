import { MercadoPagoConfig, Preference } from "mercadopago";

interface DatosPersona {
  nombre: string;
  pais: string;
  ciudad: string;
  email: string;
  codigoArea: string;
  celular: string;
  objetivos: string;
  arPrice: number;
  usdPrice: number;
}

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

if (!accessToken) throw new Error("MERCADO_PAGO_ACCESS_TOKEN is not defined.");

export const mercadopago = new MercadoPagoConfig({ accessToken });

const api = {
  message: {
    async submit(datos: DatosPersona) {
      console.log("datos: ", datos);
      // Creamos la preferencia incluyendo el precio, titulo y metadata. La información de `items` es standard de Mercado Pago. La información que nosotros necesitamos para nuestra DB debería vivir en `metadata`.
      const preference = await new Preference(mercadopago).create({
        body: {
          items: [
            {
              id: "message",
              unit_price:
                datos.pais === "Argentina" ? datos.arPrice : datos.usdPrice,
              quantity: 1,
              title: "Plan Plus",
            },
          ],
          metadata: {
            datos,
          },
<<<<<<< HEAD
          "back_urls": {
            "success": "http://localhost:3000/?modal=1#clasesyretos",
            "failure": "http://localhost:3000/?modal=3#clasesyretos"
=======
          back_urls: {
            success: "http://localhost:3000/?modal=1#clasesyretos",
            pending: "http://localhost:3000/?modal=2#clasesyretos",
            failure: "http://localhost:3000/?modal=3#clasesyretos",
>>>>>>> 3bb8a9f (Mercadolibre webhook endpoint - send email if payment is successful)
          },
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
        },
      });

      // Devolvemos el init point (url de pago) para que el usuario pueda pagar
      return preference.init_point!;
    },
  },
};

export default api;
