# T-036 Plan: tests de validacion backend de compra

## Objetivo

Cubrir la validacion backend que hoy esta duplicada manualmente en `app/api/mercadopago/route.tsx` y `app/api/paypal/route.ts`, sin tocar servicios reales.

## Alcance

- Testear los casos observables desde los handlers `POST`.
- No usar MercadoPago, PayPal, Firestore ni Resend reales.
- Mockear las dependencias externas para que la prueba llegue solo hasta la validacion.

## Casos a cubrir

- Falta `celular` devuelve error.
- Falta `ciudad` devuelve error.
- Falta `emailLocalPart` devuelve error.
- Falta `nombre` devuelve error.
- Falta `objetivos` devuelve error.
- Falta `pais` devuelve error.
- Falta `plan` devuelve error.
- MercadoPago rechaza pais distinto de `ARG`.
- PayPal rechaza pais `ARG`.

## Estrategia sin tocar codigo

- Importar los handlers `POST` en specs aislados.
- Setear variables de entorno dummy antes del import.
- Interceptar dependencias con mocks de modulo antes de cargar el route.
- Construir `Request` con JSON invalido/valido segun el caso.
- Afirmar status `500` y mensaje de error esperado.

## Mocks necesarios

- `@/app/lib/firebaseAdmin`: mock de `db.collection().doc()`.
- `mercadopago`: mock de `MercadoPagoConfig` y `Preference`.
- `@paypal/paypal-server-sdk`: mock de `Client`, `OrdersController` y enums usados.
- `resend`: mock de `Resend`.
- `uuid`: mock estable de `v4`.

## Riesgo tecnico

Jasmine no trae mocking de modulos integrado. Si no se puede interceptar imports con el setup actual, evaluar agregar una dependencia de test como `mock-require` o `proxyquire`, manteniendo codigo productivo intacto.

## Verificacion

- Ejecutar `npm run spec -- --filter="T-036"`.
- Confirmar que ningun mock externo fue llamado en casos de validacion temprana.
