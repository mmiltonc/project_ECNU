# T-042 Plan: tests de POST /api/mercadopago

## Objetivo

Cubrir el handler de creacion de compra MercadoPago con mocks completos.

## Casos a cubrir

- Compra exitosa devuelve status `200` con `{ url }`.
- Crea usuario con `paymentStatus: "STARTED"`.
- Luego actualiza usuario con `paymentStatus: "CREATED"` y `orderId`.
- Rechaza pais distinto de `ARG`.
- Rechaza plan inexistente.
- Si `Preference.create` falla, devuelve error `500`.
- Si `Preference.create` no devuelve resultado, devuelve error `500`.

## Mocks necesarios

- `mercadopago`: `MercadoPagoConfig`, `Preference`.
- Firestore: `collection`, `doc`, `set`, `update`.
- `uuid`.
- `resend`.
- Templates de email pueden quedar reales si no disparan side effects; si complican import, mockearlos.

## Estrategia sin tocar codigo

- Crear helper de spec para construir `Request` JSON.
- Resetear `require.cache` o usar herramienta de module mocking por caso.
- Cargar route despues de preparar env y mocks.
- Leer respuesta con `await response.json()`.

## Verificacion

- Ejecutar `npm run spec -- --filter="T-042"`.
- Confirmar que `Preference.create` solo se llama en casos validos.
