# Plan de Remediación de Seguridad - ECNU Team

Este documento detalla los pasos necesarios para remediar las vulnerabilidades detectadas, eliminar dependencias comprometidas o inseguras, y preparar el proyecto para un despliegue limpio.

## 1. Limpieza y Preparación (Inmediato)

- [ ] **Eliminar artefactos comprometidos/innecesarios**:
  - Asegurar que no existan archivos `.env` en el repositorio.
  - Eliminar carpetas temporales o de build (`.next`, `dist`, `tmp`, `node_modules`).
- [ ] **Verificar `.gitignore`**:
  - Confirmar que excluya estrictamente `node_modules`, `.env*` (excepto ejemplo), `.next`, `.DS_Store`.

## 2. Gestión de Dependencias (Breaking Changes)

### A. Eliminar `next-videos`
Esta librería tiene vulnerabilidades y ya no es mantenible.
- [ ] **Remover dependencia**: `npm uninstall next-videos`
- [ ] **Limpiar `next.config.js`**:
  - Eliminar `const withVideos = require("next-videos");`
  - Exportar solo `nextConfig` sin el wrapper `withVideos()`.
- [ ] **Migrar uso en código**:
  - Buscar imports de videos (e.g., `import video from './video.mp4'`).
  - Mover los archivos de video a `public/videos/`.
  - Reemplazar uso con tag estándar HTML5: `<video src="/videos/video.mp4" ... />`.

### B. Actualizar `react-email`
Actualización mayor necesaria para seguridad.
- [ ] **Actualizar paquetes**:
  ```bash
  npm install react-email@latest @react-email/components@latest
  ```
- [ ] **Refactorizar Templates (`app/emails`)**:
  - Revisar componentes que hayan cambiado de API en la versión 3.x/latest.
  - Probar renderizado localmente en modo dev.

### C. Actualizar `nodemailer`
- [ ] **Actualizar**: `npm install nodemailer@latest`
- [ ] **Verificar configuración**: Asegurar que no se usen opciones inseguras de transporte.

### D. Framework y Utilidades
- [ ] **Next.js**: `npm install next@latest` (Verificar compatibilidad con React 18/19).
- [ ] **Auditoría final**: Ejecutar `npm audit` para confirmar resolución.

## 3. Hardening de Infraestructura (Post-Code)

### A. Configuración de PM2 (`ecosystem.config.js`)
- [ ] **Revisar permisos**: Asegurar que la aplicación no requiera root.
- [ ] **Secretos**: NO hardcodear secretos en este archivo. Usar inyección de variables de entorno en tiempo de ejecución/despliegue seguro.

### B. Despliegue en Servidor Limpio
- **NUNCA** reutilizar el VPS comprometido.
- Provisionar nuevo servidor.
- Clonar repositorio limpio.
- Instalar dependencias `npm ci`.
- Configurar variables de entorno desde gestor de secretos o `.env` no versionado.

## Resumen de Comandos para Ejecución

```bash
# 1. Limpieza inicial
rm -rf node_modules .next yarn.lock package-lock.json

# 2. Desinstalación
npm uninstall next-videos

# 3. Instalación de versiones seguras
npm install react-email@latest @react-email/components@latest nodemailer@latest next@latest

# 4. Reinstalación general
npm install
```
