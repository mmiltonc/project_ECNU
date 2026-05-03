# T-043 Plan: tests de POST /api/paypal

## Objetivo

Cubrir el handler de creacion de compra PayPal con mocks completos.

## Casos a cubrir

- Compra exitosa devuelve status `200` con `{ id }`.
- Crea usuario con `paymentStatus: "STARTED"`.
- Luego actualiza usuario con `paymentStatus: "CREATED"` y `paymentId`.
- Rechaza pais `ARG`.
- Rechaza plan inexistente.
- Si PayPal devuelve HTTP distinto de `201`, devuelve error `500`.
- Si PayPal devuelve body sin `id`, devuelve error `500`.

## Mocks necesarios

- `@paypal/paypal-server-sdk`: cliente, controller y enums.
- Firestore: `collection`, `doc`, `set`, `update`.
- `uuid`.
- `resend`.

## Estrategia sin tocar codigo

- Preparar env dummy para client id/secret.
- Mockear SDK antes de importar route.
- Ejecutar `POST` con request valido e invalido.
- Afirmar respuesta y llamadas de Firestore.

## Verificacion

- Ejecutar `npm run spec -- --filter="T-043"`.
- Confirmar cero llamadas reales a PayPal.
