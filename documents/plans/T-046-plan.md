# T-046 Plan: tests de webhook PayPal

## Objetivo

Cubrir el webhook de PayPal enfocado en compra, sin usar PayPal, Firestore ni Resend reales.

## Casos a cubrir

- Evento que no incluye `PAYMENT.CAPTURE` responde exitosamente sin actualizar usuario.
- `COMPLETED` se mapea a aprobado, actualiza usuario y envia emails de exito.
- `PENDING` envia email pendiente.
- `DENIED`, `FAILED`, `CANCELLED`, `REFUNDED` envian email de rechazo.
- Usa `body.resource.custom_id` para ubicar usuario.
- Usuario inexistente dispara email de backup.
- Plan inexistente dispara email de backup.
- Evento repetido de pago ya aprobado no debe reenviar emails cuando exista idempotencia.

## Mocks necesarios

- Firestore `get`, `data`, `update`.
- Resend `emails.send`.
- Templates reales o mocks.

## Estrategia sin tocar codigo

- Preparar env dummy `RESEND_API_KEY`.
- Mockear Firestore antes de importar route.
- Ejecutar `POST` con bodies PayPal simulados.
- Afirmar llamadas a `update` y `emails.send`.

## Nota de idempotencia

El codigo actual no tiene guard de idempotencia para PayPal. El test puede documentarse como pendiente si se decide no tocar codigo todavia.

## Verificacion

- Ejecutar `npm run spec -- --filter="T-046"`.
