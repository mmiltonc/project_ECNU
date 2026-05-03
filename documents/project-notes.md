# Notas del analisis

## Estado de verificacion local

- `git status --short` no mostro cambios antes de crear la documentacion.
- No se pudo ejecutar `npm run lint` porque el Node local falla al iniciar.
- El error apunta a `/usr/local/bin/node`, instalado como Node 14.8.0, con dependencia faltante `libicui18n.67.dylib`.
- Esto parece un problema del runtime local, no necesariamente del codigo del proyecto.

## Archivos relevantes

- `app/page.tsx`: composicion principal de la landing.
- `app/layout.tsx`: metadata, fuentes, GTM y configuracion de robots.
- `partials/programs.tsx`: formulario, seleccion de planes y botones de pago.
- `app/api/mercadopago/route.tsx`: creacion de preferencia de MercadoPago.
- `app/api/paypal/route.ts`: creacion de orden de PayPal.
- `app/api/webhooks/mercadopago/route.tsx`: procesamiento de webhook de MercadoPago.
- `app/api/webhooks/paypal/route.tsx`: procesamiento de webhook de PayPal.
- `app/lib/firebaseAdmin.ts`: inicializacion de Firebase Admin desde variables de entorno.
- `app/data/plans.json`: definicion actual de planes y precios.
- `ecosystem.config.js`: configuracion de PM2 y deploy.
- `security-updates.md`: plan de remediacion de seguridad existente.
- `TODO.md`: lista de secrets y tareas de seguridad pendientes.
