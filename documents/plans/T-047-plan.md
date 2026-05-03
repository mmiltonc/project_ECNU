# T-047 Plan: factories y mocks reutilizables

## Objetivo

Crear utilidades de test para backend de compra que eviten duplicacion y aseguren que ningun spec use servicios reales.

## Ubicacion sugerida

- `specs/factories/purchase.ts`
- `specs/factories/payments.ts`
- `specs/mocks/firestore.ts`
- `specs/mocks/resend.ts`
- `specs/mocks/mercadopago.ts`
- `specs/mocks/paypal.ts`
- `specs/helpers/request.ts`

## Factories sugeridas

- `buildFormData(overrides)`
- `buildPlan(overrides)`
- `buildFirestoreUser(overrides)`
- `buildMercadoPagoPayment(overrides)`
- `buildPaypalCaptureEvent(overrides)`
- `buildJsonRequest(body)`

## Mocks sugeridos

- Firestore document con spies para `set`, `get`, `update`.
- Resend con spy para `emails.send`.
- MercadoPago Preference con spy para `create`.
- PayPal OrdersController con spy para `createOrder`.
- UUID deterministico.

## Reglas

- Ningun factory debe leer `.env`.
- Ningun mock debe hacer red.
- Cada spec debe resetear spies entre casos.
- Los mocks deben permitir configurar exito y fallo por test.

## Verificacion

- Usar estas factories en el primer spec real de backend.
- Ejecutar `npm run spec` y confirmar que el smoke test y los specs nuevos pasan.
