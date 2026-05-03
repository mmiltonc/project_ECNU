# T-045 Plan: tests de webhook MercadoPago

## Objetivo

Cubrir el webhook de MercadoPago enfocado en compra, incluyendo idempotencia, sin usar MercadoPago, Firestore ni Resend reales.

## Casos a cubrir

- `body.type !== "payment"` responde exitosamente sin consultar MercadoPago.
- `body.type === "payment"` consulta `https://api.mercadopago.com/v1/payments/{id}`.
- Pago `approved` actualiza usuario y envia emails de exito a cliente y owner.
- Pago `pending` envia email de pendiente.
- Pago rechazado/cancelado/refund envia email de rechazo.
- Usa `external_reference` para ubicar usuario.
- Si falta plan, envia email de backup.
- Si Firestore falla, envia email de backup.
- Evento repetido de pago ya aprobado no debe reenviar emails cuando se implemente T-013.

## Mocks necesarios

- `global.fetch` para respuesta de MercadoPago.
- Firestore `get`, `data`, `update`.
- Resend `emails.send`.
- Templates pueden ser reales o mocks simples.

## Estrategia sin tocar codigo

- Preparar env dummy `RESEND_API_KEY` y `MERCADO_PAGO_ACCESS_TOKEN`.
- Mockear `fetch` por caso.
- Mockear Firestore document snapshot.
- Ejecutar `POST` con request JSON.
- Afirmar response status actual; registrar que hoy devuelve `204`.

## Nota de idempotencia

El caso de idempotencia puede quedar como spec pendiente o esperado fallido hasta implementar T-013, porque el codigo actual reprocesa pagos aprobados.

## Verificacion

- Ejecutar `npm run spec -- --filter="T-045"`.
