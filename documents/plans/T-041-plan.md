# T-041 Plan: tests de orden PayPal

## Objetivo

Cubrir la construccion de la orden de PayPal sin llamar al SDK real.

## Alcance

- Testear el payload enviado a `ordersController.createOrder(order)`.
- No usar credenciales reales.
- No usar red.

## Casos a cubrir

- `intent` es `Capture`.
- `purchaseUnits[0].customId` usa el UUID del usuario.
- `amount.currencyCode` es `USD`.
- `amount.value` usa `planInfo.price.usd`.
- `items[0]` contiene `name`, `description`, `quantity`, `unitAmount`, `category` y `sku`.
- `payer.emailAddress` arma email gmail.
- `payer.name.givenName` y `surname` salen de `nombre`.
- `payer.phone.phoneNumber` usa codigo pais y celular.
- Respuesta exitosa devuelve `{ id: result.id }`.

## Estrategia sin tocar codigo

- Mockear `@paypal/paypal-server-sdk` antes de importar route.
- Hacer que `OrdersController.createOrder` devuelva `statusCode: 201` y body JSON con `id`.
- Mockear Firestore, UUID y Resend.
- Capturar el payload pasado a `createOrder`.

## Verificacion

- Ejecutar `npm run spec -- --filter="T-041"`.
- Confirmar que no se llama PayPal real.
