# T-044 Plan: tests de fallos Firestore durante compra

## Objetivo

Documentar y cubrir el comportamiento actual cuando Firestore falla durante la compra.

## Casos a cubrir

- `document.set` falla en MercadoPago.
- `document.update` falla en MercadoPago.
- `document.set` falla en PayPal.
- `document.update` falla en PayPal.
- Cuando falla `set`, se intenta enviar email de respaldo con Resend.
- Cuando falla `update`, el flujo actual solo loguea error y continua.

## Estrategia sin tocar codigo

- Mockear Firestore para que `set` o `update` rechacen Promises segun el caso.
- Mockear Resend y capturar `emails.send`.
- Mockear gateways como exitosos para observar si el handler continua.
- Afirmar el comportamiento actual, aunque no sea ideal.

## Observaciones

Estos tests pueden revelar deuda tecnica: hoy un fallo de `set` no necesariamente corta la compra. El objetivo inicial es caracterizar comportamiento existente, no corregirlo.

## Verificacion

- Ejecutar `npm run spec -- --filter="T-044"`.
- Confirmar que ningun servicio real recibe llamadas.
