# T-013 Plan: idempotencia del webhook de MercadoPago

## Problema

El webhook de MercadoPago puede enviar mas de un evento para el mismo pago. La documentacion indica que las notificaciones de pagos se envian cuando se crea un pago o cuando se modifica su estado. Tambien existen campos como `date_last_updated` y `money_release_date`, por lo que pueden llegar actualizaciones posteriores aunque el pago ya este `approved`.

En el flujo actual, si el pago consultado vuelve con estado aprobado, el webhook puede volver a enviar emails y recalcular datos aunque el usuario ya estuviera marcado como aprobado.

## Objetivo

Procesar el pago aprobado solo una vez. Los eventos posteriores del mismo pago deben ser aceptados por el endpoint, pero no deben volver a enviar emails ni reactivar efectos secundarios.

## Archivos a revisar

- `app/api/webhooks/mercadopago/route.tsx`
- `app/api/webhooks/helpers.tsx`
- `app/api/mercadopago/route.tsx`
- `app/data/plans.json`

## Criterios de implementacion

- Validar que el evento recibido sea de tipo `payment`.
- Consultar el pago en MercadoPago usando `data.id`.
- Usar `external_reference` para encontrar el usuario en Firestore.
- Guardar el `paymentId` de MercadoPago si todavia no esta persistido.
- Antes de enviar emails, verificar si el usuario ya tiene `paymentStatus === "APPROVED"` para ese mismo pago.
- Enviar emails de exito solo cuando exista una transicion real hacia `APPROVED`.
- Para eventos repetidos o posteriores de un pago ya aprobado, responder exitosamente sin efectos secundarios.
- Evitar recalcular `paymentExpirationDate` cuando el pago ya estaba aprobado.
- Responder con `200` o `201`, alineado con la documentacion de MercadoPago para confirmar recepcion del webhook.

## Pseudoflujo sugerido

```ts
if (body.type !== "payment") {
  return new Response(null, { status: 200 });
}

const payment = await getMercadoPagoPayment(body.data.id);
const status = getStatus(payment.status, "mercadopago");
const userId = payment.external_reference;
const document = db.collection("users").doc(userId);
const user = await document.get();

if (
  user.paymentStatus === PaymentStatus.APPROVED &&
  user.paymentId === String(payment.id)
) {
  return new Response(null, { status: 200 });
}

if (status === PaymentStatus.APPROVED) {
  await sendPaymentSuccessfulEmail(payerData);
  await sendOwnerPaymentSuccessfulEmail(payerData);
}

await document.update(paymentData);
return new Response(null, { status: 200 });
```

## Verificaciones

- Simular un primer webhook de pago aprobado y confirmar que actualiza Firestore y envia emails.
- Simular el mismo webhook por segunda vez y confirmar que no reenvia emails.
- Simular un evento posterior con el mismo pago aprobado y confirmar que responde `200` sin efectos secundarios.
- Simular estados `PENDING` y `REJECTED` para confirmar que conservan el comportamiento esperado.

## Referencias

- MercadoPago: configurar notificaciones de pago: `https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/payment-notifications`
- MercadoPago: obtener pago: `https://www.mercadopago.com.ar/developers/es/reference/online-payments/checkout-pro/get-payment/get`
- MercadoPago: webhooks y confirmacion de recepcion: `https://www.mercadopago.com.ar/developers/en/docs/your-integrations/notifications/webhooks`
