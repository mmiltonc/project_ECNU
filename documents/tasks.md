# Tareas pendientes e issues

## SEO y metadata

- [ ] T-001 Revisar la metadata de `app/layout.tsx`: actualmente `robots.index` esta en `false`, por lo que el sitio no queda indexable en buscadores.

## Documentacion

- [ ] T-002 Actualizar el README: menciona Next.js 15+, pero `package.json` usa Next.js 16.1.x.

## Seguridad

- [ ] T-003 Endurecer webhooks de MercadoPago y PayPal con verificacion explicita de firma/origen antes de procesar eventos.
- [ ] T-004 Reducir o eliminar logs de datos de usuarios, ordenes y pagos en produccion.
- [ ] T-005 Confirmar que los secrets pendientes listados abajo hayan sido rotados/eliminados del historial si alguna vez estuvieron expuestos.
- [x] T-006 Eliminar `MERCADO_PAGO_ACCESS_TOKEN`.
- [x] T-007 Eliminar `NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY`.
- [x] T-008 Eliminar `NEXT_PUBLIC_PAYPAL_CLIENT_ID`.
- [x] T-009 Eliminar `PAYPAL_CLIENT_SECRET`.
- [x] T-010 Eliminar `FIREBASE_PRIVATE_KEY_ID`.
- [x] T-011 Eliminar `FIREBASE_PRIVATE_KEY`.
- [x] T-012 Eliminar `FIREBASE_CLIENT_ID`.

## Backend y pagos

- [ ] T-013 Hacer idempotente el webhook de MercadoPago para evitar reprocesar pagos ya aprobados ante eventos posteriores como actualizaciones o liberacion/acreditacion de dinero. Ver `documents/plans/T-013-plan.md`.
- [ ] T-014 Centralizar la validacion backend con Joi u otro esquema compartido; hoy hay validaciones manuales duplicadas.
- [ ] T-015 Extraer logica comun entre MercadoPago y PayPal: creacion de usuario, calculo de expiracion, actualizacion de Firestore, emails y manejo de errores.
- [ ] T-016 Revisar el manejo de errores cuando falla Firestore: hoy algunos flujos continuan despues de errores de persistencia.
- [ ] T-017 Revisar el uso fijo de email `@gmail.com` construido desde `emailLocalPart`; puede limitar casos reales o generar errores de datos.
- [ ] T-018 Revisar URLs hardcodeadas como `https://ecnuteam.com` en componentes y rutas API; conviene centralizarlas con `NEXT_PUBLIC_BASE_URL`.

## Tooling

- [ ] T-019 Corregir el runtime local de Node: `/usr/local/bin/node` apunta a Node 14.8.0 y falla por una dependencia ICU faltante.
- [ ] T-020 Ejecutar `npm run lint` cuando Node este corregido.
- [ ] T-021 Ejecutar una auditoria final con `npm audit` cuando el entorno local de Node este corregido.

## Tests

- [x] T-022 Definir e instalar stack de testing con Jasmine para unit/integration tests del flujo de compra.
- [ ] T-023 Extraer y testear el schema de validacion del formulario de compra hoy embebido en `partials/programs.tsx`, cubriendo campos requeridos, nombre/ciudad alfabeticos, email local sin dominio, celular numerico, objetivos minimos y plan requerido.
- [ ] T-024 Agregar tests unitarios para `app/api/webhooks/helpers.tsx`, cubriendo el mapeo de estados de MercadoPago y PayPal a `APPROVED`, `PENDING` y `REJECTED`, incluyendo estados desconocidos.
- [ ] T-025 Extraer y testear la construccion del usuario inicial de compra para MercadoPago y PayPal, validando moneda, pais, gateway, plan, precio, email, telefono y estado inicial `STARTED`.
- [ ] T-026 Extraer y testear la construccion de la preferencia de MercadoPago, validando `items`, `metadata`, `back_urls`, `external_reference`, `payer`, moneda/precio ARS y `notification_url`.
- [ ] T-027 Extraer y testear la construccion de la orden de PayPal, validando `purchaseUnits`, `customId`, payer, telefono con codigo pais, moneda/precio USD, SKU e intent `Capture`.
- [ ] T-028 Agregar tests de handlers API para `POST /api/mercadopago` con mocks de Firestore, MercadoPago SDK, UUID y Resend: caso exitoso, datos invalidos, pais no Argentina, plan inexistente y fallo al crear preferencia.
- [ ] T-029 Agregar tests de handlers API para `POST /api/paypal` con mocks de Firestore, PayPal SDK, UUID y Resend: caso exitoso, datos invalidos, pais Argentina, plan inexistente, respuesta PayPal no 201 y respuesta sin order id.
- [ ] T-030 Agregar tests para el webhook de MercadoPago con mocks de `fetch`, Firestore y Resend: pago aprobado, pendiente, rechazado, tipo distinto de `payment`, pago sin `external_reference` y evento repetido de un pago ya aprobado.
- [ ] T-031 Agregar tests para el webhook de PayPal con mocks de Firestore y Resend: captura completada, pendiente, rechazada, evento no `PAYMENT.CAPTURE`, usuario inexistente y evento repetido de pago ya aprobado.
- [ ] T-032 Agregar tests de render basico para templates de email transaccionales, verificando que rendericen nombre, plan y estados principales sin romper.
- [ ] T-033 Agregar tests de interaccion del componente de MercadoPago, verificando loading, `fetch` a `/api/mercadopago`, manejo de URL devuelta y comportamiento ante error de API.
- [ ] T-034 Agregar tests de interaccion del componente de PayPal con mocks de `@paypal/react-paypal-js`, verificando que `createOrder` envie el formulario a `/api/paypal` y que `onApprove` redirija segun estado.
- [ ] T-035 Agregar un test de flujo de compra de alto nivel con mocks, desde formulario valido hasta seleccion del gateway correcto segun pais: Argentina usa MercadoPago y otros paises usan PayPal.

## Tests backend compra

- [ ] T-036 Extraer la validacion backend de compra a un modulo importable y testearla con Jasmine: campos requeridos, plan requerido, pais requerido, email local, celular, objetivos y errores esperados. Ver `documents/plans/T-036-plan.md`.
- [ ] T-037 Extraer la busqueda de plan y testear que resuelva planes validos desde `app/data/plans.json` y rechace SKUs inexistentes sin llamar gateways externos. Ver `documents/plans/T-037-plan.md`.
- [ ] T-038 Extraer el armado del documento Firestore `users` para compra y testear diferencias por gateway: MercadoPago usa `ARS`, PayPal usa `USD`, ambos guardan `STARTED`, `planSKU`, `paymentValue`, `country`, `countryCode`, `email` y `phone`. Ver `documents/plans/T-038-plan.md`.
- [ ] T-039 Extraer el calculo de fechas de pago y expiracion y testear que respete la duracion del plan y el timezone esperado `America/Argentina/Buenos_Aires`. Ver `documents/plans/T-039-plan.md`.
- [ ] T-040 Refactorizar `app/api/mercadopago/route.tsx` para que la construccion de la preferencia sea testeable sin instanciar el SDK en import-time, y cubrir `items`, `metadata`, `back_urls`, `external_reference`, `payer`, `payment_methods` y `notification_url`. Ver `documents/plans/T-040-plan.md`.
- [ ] T-041 Refactorizar `app/api/paypal/route.ts` para que la construccion de la orden sea testeable sin instanciar el SDK en import-time, y cubrir `intent`, `purchaseUnits`, `customId`, `amount`, `items`, payer y telefono con codigo pais. Ver `documents/plans/T-041-plan.md`.
- [ ] T-042 Agregar tests de `POST /api/mercadopago` con mocks de Firestore, MercadoPago, UUID y Resend: compra exitosa devuelve `url`, crea usuario `STARTED`, actualiza a `CREATED`, rechaza pais no Argentina, rechaza plan inexistente y maneja fallo de preferencia. Ver `documents/plans/T-042-plan.md`.
- [ ] T-043 Agregar tests de `POST /api/paypal` con mocks de Firestore, PayPal, UUID y Resend: compra exitosa devuelve `id`, crea usuario `STARTED`, actualiza a `CREATED`, rechaza Argentina, rechaza plan inexistente, maneja HTTP distinto de 201 y respuesta sin order id. Ver `documents/plans/T-043-plan.md`.
- [ ] T-044 Agregar tests para fallos de Firestore durante compra: fallo en `document.set`, fallo en `document.update`, envio de email de respaldo cuando corresponde y comportamiento esperado de la respuesta HTTP. Ver `documents/plans/T-044-plan.md`.
- [ ] T-045 Agregar tests de webhook MercadoPago enfocados en compra: consulta del pago por `data.id`, uso de `external_reference`, mapeo de estado, actualizacion del usuario, emails por `APPROVED`/`PENDING`/`REJECTED` e idempotencia ante pago ya aprobado. Ver `documents/plans/T-045-plan.md`.
- [ ] T-046 Agregar tests de webhook PayPal enfocados en compra: filtro de `PAYMENT.CAPTURE`, uso de `resource.custom_id`, mapeo de estado, actualizacion del usuario, emails por estado, usuario inexistente e idempotencia ante pago ya aprobado. Ver `documents/plans/T-046-plan.md`.
- [ ] T-047 Agregar factories/mocks reutilizables para tests de backend de compra: `FormDataType`, `PlanType`, usuario Firestore, respuesta MercadoPago, respuesta PayPal, mock de Resend y mock de documento Firestore. Ver `documents/plans/T-047-plan.md`.
- [x] T-048 Elegir e instalar una herramienta de mocking de modulos para Jasmine, preferentemente `proxyquire`, para poder mockear SDKs, Firestore, Resend, UUID y otros imports CommonJS sin tocar servicios reales. Ver `documents/plans/T-048-plan.md`.
