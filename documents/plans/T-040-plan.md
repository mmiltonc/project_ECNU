# T-040 Plan: tests de preferencia MercadoPago

## Objetivo

Cubrir la construccion de la preferencia de MercadoPago sin llamar al SDK real ni crear preferencias reales.

## Alcance

- Testear el `body` pasado a `new Preference(mercadopago).create({ body })`.
- No usar red.
- No usar access token real.

## Casos a cubrir

- `items` contiene SKU, titulo, descripcion, cantidad `1` y precio ARS.
- `metadata` incluye datos del formulario, email gmail armado, pais, plan y codigo de area.
- `back_urls` usa `NEXT_PUBLIC_BASE_URL` para success, pending y failure.
- `external_reference` usa el UUID del usuario.
- `payer` separa nombre y apellido.
- `notification_url` apunta al webhook de MercadoPago.
- `payment_methods` mantiene exclusiones/cuotas actuales.
- Respuesta exitosa devuelve `{ url: preference.init_point }`.

## Estrategia sin tocar codigo

- Setear env dummy: `MERCADO_PAGO_ACCESS_TOKEN`, `NEXT_PUBLIC_BASE_URL`, `RESEND_API_KEY`.
- Mockear modulo `mercadopago` para capturar el payload enviado a `create`.
- Mockear Firestore para permitir flujo completo.
- Mockear UUID.

## Riesgo tecnico

La ruta instancia `MercadoPagoConfig` en import-time. El mock debe estar registrado antes de importar el route. Si esto no alcanza con Jasmine, usar `mock-require`/`proxyquire` para cargar el modulo bajo prueba.

## Verificacion

- Ejecutar `npm run spec -- --filter="T-040"`.
- Confirmar que no se realiza ningun request real a MercadoPago.
