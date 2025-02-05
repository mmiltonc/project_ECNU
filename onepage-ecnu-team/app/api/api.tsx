import {MercadoPagoConfig, Preference} from "mercadopago";

interface DatosPersona {
    nombre: string;
    pais:  string;
    codigoArea:  string;
    celular:  number;
}

export const mercadopago = new MercadoPagoConfig({accessToken: "APP_USR-936399762236640-020417-6bb44294fc8159fc593bb2f5f82a07f9-2251223028"});

const api = {
  message: {
    async submit(datos: DatosPersona[]) {
      // Creamos la preferencia incluyendo el precio, titulo y metadata. La información de `items` es standard de Mercado Pago. La información que nosotros necesitamos para nuestra DB debería vivir en `metadata`.
      const preference = await new Preference(mercadopago).create({
        body: {
          items: [
            {
              id: "message",
              unit_price: 100,
              quantity: 1,
              title: "Mensaje de producto",
            },
          ],
          metadata: {
            datos,
          },
          "back_urls": {
            "success": "http://localhost:3000/#clasesyretos",
            "pending": "http://localhost:3000/#clasesyretos",
            "failure": "http://localhost:3000/#clasesyretos"
          },
          "auto_return": "approved",
        },
      });

      // Devolvemos el init point (url de pago) para que el usuario pueda pagar
      return preference.init_point!;
    },
  },
};

export default api;