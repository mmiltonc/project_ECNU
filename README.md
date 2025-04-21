
# Documentación Técnica – Proyecto ecnuteam.com

## 🧩 Descripción general

El sitio **ecnuteam.com** es una aplicación construida con **Next.js** (versión 15+), orientada a ser una landing page moderna, rápida y responsiva. Se utiliza **TailwindCSS** para los estilos, y se incluyen animaciones con **Framer Motion** y **GSAP**.

Incluye funciones de pagos a través de **MercadoPago** y **PayPal**, envío de correos vía **Nodemailer** y **Resend**, y deploy automatizado con **PM2** en un servidor Linux con Node.js.

---

## ⚙️ Tecnologías principales

- **Frontend**: Next.js 15, React 18, TailwindCSS
- **Animaciones**: Framer Motion, GSAP, Swiper
- **UI**: MUI + Emotion
- **Email**: Nodemailer, Resend, React Email
- **Pagos**: MercadoPago, PayPal
- **Deploy**: PM2 + Ecosystem config + Certbot para SSL
- **Tracking**: Google Tag Manager via `react-gtm-module`

---

## 🚀 Primeros pasos para desarrollo local

Para iniciar el entorno de desarrollo local:

```bash
npm run dev
```

Luego, abrí el navegador en [http://localhost:3000](http://localhost:3000) para ver la página principal.

### Vista previa de emails (solo en desarrollo)

Podés acceder a la vista previa de los templates de email en:

[http://localhost:3000/emails/preview](http://localhost:3000/emails/preview)

---

## 📂 Scripts disponibles

### Desarrollo

- `dev`: corre el entorno de desarrollo (`next dev`)
- `build`: build de producción
- `start`: inicio en modo producción

### Deploy y gestión remota (PM2)

- `deploy`: realiza el deploy al servidor remoto (`npm run deploy`)
- `deploy:list`: lista todas las aplicaciones corriendo bajo PM2 en el servidor remoto
- `deploy:logs`: muestra los logs en tiempo real de la aplicación corriendo en producción
- `deploy:restart`: reinicia la aplicación `onepage-ecnu-team` en el servidor
- `deploy:stop`: detiene temporalmente la aplicación en el servidor

### Certificados SSL

- `certbot:setup`: ejecuta el script remoto que solicita e instala el certificado SSL con Certbot.
  ⚠️ **Este comando no debe volver a ejecutarse**, ya que el certificado SSL ya está instalado y funcionando correctamente.

---

## 🔐 Certificados SSL con Certbot

El certificado SSL se genera usando Let's Encrypt y se instala automáticamente en el servidor. El proceso:
1. Solicita el certificado válido.
2. Coloca los archivos en la ruta de configuración del servidor.
3. Configura el servidor para HTTPS.
4. Instala un cron automático para la renovación.

---

## 🖥️ Deploy y configuración del servidor

- El deploy al servidor se realiza con el comando:
  ```bash
  npm run deploy
  ```
- El servidor está configurado con Ubuntu 22.04, Node.js y utiliza **NGINX** como servidor web para manejar las peticiones HTTP y redirigir al proceso de Node.js gestionado por PM2.
- El dominio apunta al VPS y tiene SSL habilitado.
- PM2 gestiona la aplicación en producción.

---

## ☝️ Sobre `deploy:setup` y `certbot:setup`

Tanto `deploy:setup` como `certbot:setup` son comandos pensados para la **primera configuración del entorno**.

- **`deploy:setup`**: configura el entorno remoto (estructura de carpetas, repositorio, etc).
- **`certbot:setup`**: instala y configura el certificado SSL.

⚠️ Ambos **ya fueron ejecutados** y **no es necesario volver a correrlos**, ya que el sitio está en producción y funcionando correctamente.

---

## 📮 Emails y formularios

- **Nodemailer** se utiliza para enviar correos personalizados.
- **Resend** se puede usar para integraciones más robustas y escalables.
- Los templates están en `app/emails`.
- En desarrollo, pueden previsualizarse desde [http://localhost:3000/emails/preview](http://localhost:3000/emails/preview)

---

## 💳 Pagos

- **MercadoPago** y **PayPal** están integrados como gateways de pago.
- El backend maneja el procesamiento usando `@paypal/paypal-server-sdk` y el SDK de `mercadopago`.

---

## 📦 Dependencias clave

- **UI y Estilos**: MUI, Emotion, TailwindCSS, tailwindcss-animated
- **Emails**: Nodemailer, React Email, Resend
- **Deploy**: PM2, Certbot
- **Multimedia**: next-videos
- **Analytics**: react-gtm-module
