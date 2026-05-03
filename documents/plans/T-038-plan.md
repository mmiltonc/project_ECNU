# T-038 Plan: tests del documento Firestore de compra

## Objetivo

Validar que el documento inicial guardado en `users` tiene los campos correctos para MercadoPago y PayPal.

## Alcance

- Testear el objeto pasado a `document.set(user)`.
- No usar Firestore real.
- No usar gateways reales.

## Casos MercadoPago

- `gatewayId` es `mercadopago`.
- `paymentCurrency` es `ARS`.
- `paymentValue` usa `planInfo.price.ars`.
- `paymentStatus` inicia en `STARTED`.
- `email` concatena `emailLocalPart + "@gmail.com"`.
- `country`, `countryCode`, `phone`, `plan`, `planSKU`, `goals`, `city`, `name` se guardan correctamente.

## Casos PayPal

- `gatewayId` es `paypal`.
- `paymentCurrency` es `USD`.
- `paymentValue` usa `planInfo.price.usd`.
- Campos comunes iguales al caso MercadoPago.

## Estrategia sin tocar codigo

- Mockear `db.collection("users").doc(userId).set`.
- Mockear UUID para tener `userId` deterministico.
- Ejecutar ambos handlers con request valido.
- Capturar el primer argumento de `set`.
- Evitar servicios reales con mocks de SDKs y Resend.

## Verificacion

- Ejecutar `npm run spec -- --filter="T-038"`.
- Confirmar que `set` se llama una vez por compra exitosa.
