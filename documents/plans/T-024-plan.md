# T-024 Plan: tests de helpers de estado de webhooks

## Objetivo

Cubrir `app/api/webhooks/helpers.tsx`, especialmente `getStatus`, porque es una funcion pura que traduce estados externos de MercadoPago y PayPal a estados internos.

## Alcance

- No requiere mocks.
- No usa SDKs.
- No usa Firestore, Resend ni red.
- Sirve como primer test real de backend con Jasmine + TypeScript.

## Casos MercadoPago

- `APPROVED` y `approved` devuelven `PaymentStatus.APPROVED`.
- `PENDING`, `AUTHORIZED`, `IN_PROCESS`, `IN_MEDIATION` devuelven `PaymentStatus.PENDING`.
- `REJECTED`, `CANCELLED`, `REFUNDED`, `CHARGED_BACK` devuelven `PaymentStatus.REJECTED`.

## Casos PayPal

- `COMPLETED` y `completed` devuelven `PaymentStatus.APPROVED`.
- `APPROVED`, `CREATED`, `PENDING` devuelven `PaymentStatus.PENDING`.
- `DENIED`, `FAILED`, `CANCELLED`, `REFUNDED`, `PARTIALLY_REFUNDED` devuelven `PaymentStatus.REJECTED`.

## Casos borde

- Gateway desconocido devuelve string vacio.
- Estado desconocido para gateway conocido devuelve `undefined`, que es el comportamiento actual.

## Implementacion

- Crear `app/api/webhooks/helpers.spec.ts`.
- Importar `getStatus` y `PaymentStatus`.
- Usar tablas de casos para evitar duplicacion.
- Marcar `T-024` como completada si `npm run spec -- --filter="webhook status helpers"` pasa.
