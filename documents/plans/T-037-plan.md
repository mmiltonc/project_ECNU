# T-037 Plan: tests de busqueda de plan

## Objetivo

Verificar que los endpoints de compra aceptan SKUs existentes en `app/data/plans.json` y rechazan SKUs inexistentes sin llamar gateways externos.

## Alcance

- Probar comportamiento desde `POST /api/mercadopago` y `POST /api/paypal`.
- No pegarle a SDKs reales.
- No tocar Firestore real.

## Casos a cubrir

- SKU `plan-plus-gym-virtual` es aceptado.
- SKU `plan-plus-calistenia-online` es aceptado.
- SKU inexistente devuelve `Plan not found.`.
- Cuando el plan no existe, no se llama MercadoPago/PayPal.
- Cuando el plan no existe, no se actualiza Firestore a `CREATED`.

## Estrategia sin tocar codigo

- Para casos exitosos, mockear gateway y Firestore para permitir que el handler complete.
- Para plan inexistente, usar form valido excepto `plan`.
- Afirmar status `500` y payload de error.
- Afirmar ausencia de llamadas al SDK del gateway.

## Mocks necesarios

- Firestore mock con `set` y `update`.
- MercadoPago `Preference.create`.
- PayPal `OrdersController.createOrder`.
- Resend mock para que no envie emails.
- UUID estable.

## Verificacion

- Ejecutar `npm run spec -- --filter="T-037"`.
- Confirmar que los tests no dependen de red ni credenciales.
