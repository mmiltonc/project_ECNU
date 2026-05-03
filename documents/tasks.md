# Tareas pendientes e issues

## Seguridad y pagos

### HIGH

- [ ] T-003 — Endurecer webhooks
  - Descripción: Agregar verificacion explicita de firma/origen en webhooks de MercadoPago y PayPal antes de procesar eventos.
  - Estado: Pendiente
  - Nivel: HIGH

- [ ] T-004 — Reducir logs sensibles
  - Descripción: Reducir o eliminar logs de datos de usuarios, ordenes y pagos en produccion.
  - Estado: Pendiente
  - Nivel: HIGH

- [ ] T-005 — Confirmar rotacion de secrets
  - Descripción: Confirmar que los secrets pendientes hayan sido rotados o eliminados del historial si alguna vez estuvieron expuestos.
  - Estado: Pendiente
  - Nivel: HIGH

- [ ] T-013 — Idempotencia webhook MercadoPago
  - Descripción: Evitar reprocesar pagos ya aprobados ante eventos posteriores como actualizaciones o liberacion/acreditacion de dinero. Ver `documents/plans/T-013-plan.md`.
  - Estado: Pendiente
  - Nivel: HIGH

- [ ] T-016 — Revisar errores de Firestore
  - Descripción: Revisar flujos donde fallas de Firestore no cortan la compra y el proceso continua.
  - Estado: Pendiente
  - Nivel: HIGH

- [ ] T-049 — Responder 400 en errores de input/dominio
  - Descripción: Cambiar errores como `Plan not found.` para responder `400 Bad Request` en vez de `500`. Ver `documents/plans/T-049-plan.md`.
  - Estado: Pendiente
  - Nivel: HIGH

## Backend y arquitectura

### MEDIUM

- [ ] T-014 — Centralizar validacion backend
  - Descripción: Centralizar validacion backend con Joi u otro esquema compartido para eliminar validaciones manuales duplicadas.
  - Estado: Pendiente
  - Nivel: MEDIUM

- [ ] T-015 — Extraer logica comun de pagos
  - Descripción: Extraer logica comun entre MercadoPago y PayPal: creacion de usuario, expiracion, Firestore, emails y manejo de errores.
  - Estado: Pendiente
  - Nivel: MEDIUM

- [ ] T-017 — Revisar email gmail fijo
  - Descripción: Revisar el uso fijo de `@gmail.com` construido desde `emailLocalPart` porque puede limitar casos reales o generar errores de datos.
  - Estado: Pendiente
  - Nivel: MEDIUM

- [ ] T-018 — Centralizar URLs base
  - Descripción: Revisar URLs hardcodeadas como `https://ecnuteam.com` y centralizarlas con `NEXT_PUBLIC_BASE_URL`.
  - Estado: Pendiente
  - Nivel: MEDIUM

## Tests backend compra

### HIGH

- [ ] T-028 — Tests handler MercadoPago
  - Descripción: Cubrir `POST /api/mercadopago` con mocks de Firestore, MercadoPago SDK, UUID y Resend: exito, datos invalidos, pais no Argentina, plan inexistente y fallo al crear preferencia.
  - Estado: Pendiente
  - Nivel: HIGH

- [ ] T-029 — Tests handler PayPal
  - Descripción: Cubrir `POST /api/paypal` con mocks de Firestore, PayPal SDK, UUID y Resend: exito, datos invalidos, pais Argentina, plan inexistente, respuesta PayPal no 201 y respuesta sin order id.
  - Estado: Pendiente
  - Nivel: HIGH

- [ ] T-030 — Tests webhook MercadoPago
  - Descripción: Cubrir webhook MercadoPago con mocks de `fetch`, Firestore y Resend: aprobado, pendiente, rechazado, tipo distinto de `payment`, pago sin `external_reference` y evento repetido.
  - Estado: Pendiente
  - Nivel: HIGH

- [ ] T-031 — Tests webhook PayPal
  - Descripción: Cubrir webhook PayPal con mocks de Firestore y Resend: captura completada, pendiente, rechazada, evento no `PAYMENT.CAPTURE`, usuario inexistente y evento repetido.
  - Estado: Pendiente
  - Nivel: HIGH

- [ ] T-036 — Tests validacion backend
  - Descripción: Extraer validacion backend de compra a un modulo importable y testear campos requeridos, plan, pais, email local, celular, objetivos y errores esperados. Ver `documents/plans/T-036-plan.md`.
  - Estado: Pendiente
  - Nivel: HIGH

- [ ] T-037 — Tests busqueda de plan
  - Descripción: Testear que los planes validos de `app/data/plans.json` se resuelvan y que SKUs inexistentes sean rechazados sin llamar gateways externos. Ver `documents/plans/T-037-plan.md`.
  - Estado: Pendiente
  - Nivel: HIGH

- [ ] T-042 — Tests POST MercadoPago
  - Descripción: Cubrir compra exitosa, usuario `STARTED`, actualizacion `CREATED`, pais no Argentina, plan inexistente y fallo de preferencia. Ver `documents/plans/T-042-plan.md`.
  - Estado: Pendiente
  - Nivel: HIGH

- [ ] T-043 — Tests POST PayPal
  - Descripción: Cubrir compra exitosa, usuario `STARTED`, actualizacion `CREATED`, Argentina rechazada, plan inexistente, HTTP distinto de 201 y respuesta sin order id. Ver `documents/plans/T-043-plan.md`.
  - Estado: Pendiente
  - Nivel: HIGH

- [ ] T-044 — Tests fallos Firestore
  - Descripción: Cubrir fallos en `document.set`, `document.update`, envio de email de respaldo y comportamiento esperado de respuesta HTTP. Ver `documents/plans/T-044-plan.md`.
  - Estado: Pendiente
  - Nivel: HIGH

- [ ] T-045 — Tests webhook MercadoPago compra
  - Descripción: Cubrir consulta por `data.id`, `external_reference`, mapeo de estado, actualizacion de usuario, emails por estado e idempotencia. Ver `documents/plans/T-045-plan.md`.
  - Estado: Pendiente
  - Nivel: HIGH

- [ ] T-046 — Tests webhook PayPal compra
  - Descripción: Cubrir filtro `PAYMENT.CAPTURE`, `resource.custom_id`, mapeo de estado, actualizacion de usuario, emails, usuario inexistente e idempotencia. Ver `documents/plans/T-046-plan.md`.
  - Estado: Pendiente
  - Nivel: HIGH

### MEDIUM

- [ ] T-023 — Tests schema formulario compra
  - Descripción: Extraer y testear el schema de `partials/programs.tsx`: requeridos, nombre/ciudad alfabeticos, email local, celular, objetivos y plan.
  - Estado: Pendiente
  - Nivel: MEDIUM

- [ ] T-025 — Tests usuario inicial compra
  - Descripción: Testear construccion del usuario inicial para MercadoPago y PayPal: moneda, pais, gateway, plan, precio, email, telefono y `STARTED`.
  - Estado: Pendiente
  - Nivel: MEDIUM

- [ ] T-026 — Tests preferencia MercadoPago
  - Descripción: Testear construccion de preferencia: `items`, `metadata`, `back_urls`, `external_reference`, `payer`, precio ARS y `notification_url`.
  - Estado: Pendiente
  - Nivel: MEDIUM

- [ ] T-027 — Tests orden PayPal
  - Descripción: Testear construccion de orden: `purchaseUnits`, `customId`, payer, telefono, precio USD, SKU e intent `Capture`.
  - Estado: Pendiente
  - Nivel: MEDIUM

- [ ] T-032 — Tests templates de email
  - Descripción: Agregar render basico de emails transaccionales verificando nombre, plan y estados principales.
  - Estado: Pendiente
  - Nivel: MEDIUM

- [ ] T-033 — Tests componente MercadoPago
  - Descripción: Testear loading, `fetch` a `/api/mercadopago`, manejo de URL devuelta y error de API.
  - Estado: Pendiente
  - Nivel: MEDIUM

- [ ] T-034 — Tests componente PayPal
  - Descripción: Testear con mocks de `@paypal/react-paypal-js` que `createOrder` postee a `/api/paypal` y `onApprove` redirija segun estado.
  - Estado: Pendiente
  - Nivel: MEDIUM

- [ ] T-035 — Test flujo compra alto nivel
  - Descripción: Agregar flujo con mocks desde formulario valido hasta gateway correcto: Argentina usa MercadoPago y otros paises usan PayPal.
  - Estado: Pendiente
  - Nivel: MEDIUM

- [ ] T-038 — Tests documento Firestore
  - Descripción: Testear armado de `users`: ARS/USD, `STARTED`, `planSKU`, `paymentValue`, `country`, `countryCode`, `email` y `phone`. Ver `documents/plans/T-038-plan.md`.
  - Estado: Pendiente
  - Nivel: MEDIUM

- [ ] T-039 — Tests fechas de pago
  - Descripción: Testear calculo de fecha de pago y expiracion segun duracion del plan y timezone `America/Argentina/Buenos_Aires`. Ver `documents/plans/T-039-plan.md`.
  - Estado: Pendiente
  - Nivel: MEDIUM

- [ ] T-040 — Refactor testeable MercadoPago
  - Descripción: Refactorizar construccion de preferencia para testear sin instanciar SDK en import-time y cubrir payload completo. Ver `documents/plans/T-040-plan.md`.
  - Estado: Pendiente
  - Nivel: MEDIUM

- [ ] T-041 — Refactor testeable PayPal
  - Descripción: Refactorizar construccion de orden para testear sin instanciar SDK en import-time y cubrir payload completo. Ver `documents/plans/T-041-plan.md`.
  - Estado: Pendiente
  - Nivel: MEDIUM

- [ ] T-047 — Factories y mocks reutilizables
  - Descripción: Agregar factories/mocks para tests backend: `FormDataType`, `PlanType`, usuario Firestore, respuestas de gateways, Resend y documento Firestore. Ver `documents/plans/T-047-plan.md`.
  - Estado: Pendiente
  - Nivel: MEDIUM

## SEO, documentacion y tooling

### LOW

- [ ] T-001 — Revisar metadata SEO
  - Descripción: Revisar `app/layout.tsx`, donde `robots.index` esta en `false` y el sitio no queda indexable.
  - Estado: Pendiente
  - Nivel: LOW

- [ ] T-002 — Actualizar README
  - Descripción: Actualizar README porque menciona Next.js 15+, pero `package.json` usa Next.js 16.1.x.
  - Estado: Pendiente
  - Nivel: LOW

- [ ] T-019 — Corregir Node local
  - Descripción: Corregir runtime local: `/usr/local/bin/node` apunta a Node 14.8.0 y falla por dependencia ICU faltante.
  - Estado: Pendiente
  - Nivel: LOW

- [ ] T-020 — Ejecutar lint
  - Descripción: Ejecutar `npm run lint` cuando Node local este corregido.
  - Estado: Pendiente
  - Nivel: LOW

- [ ] T-021 — Ejecutar audit
  - Descripción: Ejecutar auditoria final con `npm audit` cuando el entorno local de Node este corregido.
  - Estado: Pendiente
  - Nivel: LOW

## Done

### LOW

- [x] T-006 — Eliminar secret MercadoPago access token
  - Descripción: Eliminar `MERCADO_PAGO_ACCESS_TOKEN`.
  - Estado: Completada
  - Nivel: LOW

- [x] T-007 — Eliminar public key MercadoPago
  - Descripción: Eliminar `NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY`.
  - Estado: Completada
  - Nivel: LOW

- [x] T-008 — Eliminar client id PayPal
  - Descripción: Eliminar `NEXT_PUBLIC_PAYPAL_CLIENT_ID`.
  - Estado: Completada
  - Nivel: LOW

- [x] T-009 — Eliminar secret PayPal
  - Descripción: Eliminar `PAYPAL_CLIENT_SECRET`.
  - Estado: Completada
  - Nivel: LOW

- [x] T-010 — Eliminar Firebase private key id
  - Descripción: Eliminar `FIREBASE_PRIVATE_KEY_ID`.
  - Estado: Completada
  - Nivel: LOW

- [x] T-011 — Eliminar Firebase private key
  - Descripción: Eliminar `FIREBASE_PRIVATE_KEY`.
  - Estado: Completada
  - Nivel: LOW

- [x] T-012 — Eliminar Firebase client id
  - Descripción: Eliminar `FIREBASE_CLIENT_ID`.
  - Estado: Completada
  - Nivel: LOW

- [x] T-022 — Configurar Jasmine
  - Descripción: Definir e instalar stack de testing con Jasmine para unit/integration tests del flujo de compra.
  - Estado: Completada
  - Nivel: LOW

- [x] T-024 — Tests helpers webhooks
  - Descripción: Testear `app/api/webhooks/helpers.tsx`: mapeo de estados de MercadoPago y PayPal, incluyendo estados desconocidos. Ver `documents/plans/T-024-plan.md`.
  - Estado: Completada
  - Nivel: LOW

- [x] T-048 — Configurar proxyquire
  - Descripción: Elegir e instalar `proxyquire` para mockear SDKs, Firestore, Resend, UUID y otros imports CommonJS sin servicios reales. Ver `documents/plans/T-048-plan.md`.
  - Estado: Completada
  - Nivel: LOW
