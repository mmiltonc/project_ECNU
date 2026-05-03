# T-039 Plan: tests de fechas de pago y expiracion

## Objetivo

Verificar que los handlers calculan `paymentDate` y `paymentExpirationDate` sumando la duracion del plan y formateando con timezone `America/Argentina/Buenos_Aires`.

## Alcance

- Testear los campos pasados a `document.update`.
- No tocar reloj real sin control.
- No usar Firestore ni gateways reales.

## Casos a cubrir

- Con plan de `duration: 31`, la fecha de expiracion queda 31 dias despues de la fecha de pago.
- MercadoPago actualiza `paymentStatus: "CREATED"`, `paymentDate`, `paymentExpirationDate` y `orderId`.
- PayPal actualiza `paymentStatus: "CREATED"`, `paymentDate`, `paymentExpirationDate` y `paymentId`.

## Estrategia sin tocar codigo

- Usar `jasmine.clock().install()` y fijar una fecha conocida.
- Mockear gateway para respuesta exitosa.
- Capturar argumento de `document.update`.
- Comparar contra `new Date(...).toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" })`.

## Mocks necesarios

- Firestore document mock.
- Gateway mocks exitosos.
- UUID estable.
- Resend mock.

## Verificacion

- Ejecutar `npm run spec -- --filter="T-039"`.
- Desinstalar clock en `afterEach`.
