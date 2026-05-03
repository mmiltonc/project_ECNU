# Resumen del proyecto

Documento generado a partir del analisis inicial del proyecto ECNU Team.
No se revisaron archivos sensibles como `.env*`, certificados, claves, secrets o credentials.

## Descripcion general

- Aplicacion comercial/landing para ECNU Team construida con Next.js App Router, React 18 y TypeScript.
- La home principal se arma desde `app/page.tsx` combinando secciones de `partials/`: home, introduccion, programas, cambios, about, motivacion, FAQ y contacto.
- Usa TailwindCSS, Emotion, MUI, Framer Motion, GSAP, Lenis y Swiper para UI, estilos y animaciones.
- Integra pagos con MercadoPago para Argentina y PayPal para otros paises.
- Persiste datos de usuarios/compras en Firestore mediante Firebase Admin.
- Envia emails transaccionales con Resend y templates de React Email.
- El deploy esta configurado con PM2, NGINX y scripts asociados a Certbot/SSL.

## Flujo funcional detectado

- El usuario completa un formulario en la seccion de programas.
- El frontend valida datos con Joi.
- Los planes se cargan desde `app/data/plans.json`.
- El backend crea un usuario en Firestore con estado inicial `STARTED`.
- Luego crea la preferencia u orden de pago y actualiza el usuario a `CREATED`.
- Los webhooks de MercadoPago y PayPal actualizan el estado final del pago.
- Segun el estado, se envian emails de pago aprobado, pendiente o rechazado.
