# Plan de Remediación de Seguridad - ECNU Team

Este documento detalla los pasos necesarios para remediar las vulnerabilidades detectadas, eliminar dependencias comprometidas o inseguras, y preparar el proyecto para un despliegue limpio.

## 1. Limpieza y Preparación (Inmediato)

- [ ] **Eliminar artefactos comprometidos/innecesarios**:
  - Asegurar que no existan archivos `.env` en el repositorio. No eliminar los archivos .env locales.
  - Eliminar carpetas temporales o de build (`.next`, `dist`, `tmp`, `node_modules`).
- [ ] **Verificar `.gitignore`**:
  - Confirmar que excluya estrictamente `node_modules`, `.env*` (excepto ejemplo), `.next`, `.DS_Store`.

## 2. Gestión de Dependencias (Breaking Changes)

### A. Eliminar `next-videos`
Esta librería tiene vulnerabilidades y ya no es mantenible.
- [x] **Remover dependencia**: `npm uninstall next-videos`
- [x] **Limpiar `next.config.js`**:
  - Eliminar `const withVideos = require("next-videos");`
  - Exportar solo `nextConfig` sin el wrapper `withVideos()`.
- [x] **Migrar uso en código**:
  - Buscar imports de videos (e.g., `import video from './video.mp4'`).
  - Mover los archivos de video a `public/videos/`.
  - Reemplazar uso con tag estándar HTML5: `<video src="/videos/video.mp4" ... />`.

### B. Actualizar `react-email`
Actualización mayor necesaria para seguridad.
- [x] **Actualizar paquetes**:
  ```bash
  npm install react-email@latest @react-email/components@latest
  ```
- [x] **Refactorizar Templates (`app/emails`)**:
  - Revisar componentes que hayan cambiado de API en la versión 3.x/latest.
  - Probar renderizado localmente en modo dev.

### C. Actualizar `nodemailer`
- [x] **Actualizar**: `npm install nodemailer@latest`
- [x] **Verificar configuración**: Asegurar que no se usen opciones inseguras de transporte. (No se encontró uso explícito en el código)

### D. Framework y Utilidades
- [x] **Next.js**: `npm install next@latest` (Verificar compatibilidad con React 18/19).
- [ ] **Auditoría final**: Ejecutar `npm audit` para confirmar resolución.

## 3. Hardening de Infraestructura (Post-Code)

### A. Configuración de PM2 (`ecosystem.config.js`)
- [x] **Revisar permisos**: Asegurar que la aplicación no requiera root.
  - *Estado*: Configurado para correr bajo usuario `deployer`.
  - *Riesgo aceptado*: El usuario `deployer` tiene permisos `sudo` para `service nginx reload`. Se recomienda restringir sudoers en el nuevo servidor.

### B. Despliegue en Servidor Limpio
- **NUNCA** reutilizar el VPS comprometido.
- Provisionar nuevo servidor.
- Clonar repositorio limpio.
- Instalar dependencias `npm ci`.
- Configurar variables de entorno desde gestor de secretos o `.env` no versionado.

### C. Resultado Final de Auditoría
- [x] **Vulnerabilidades Críticas**: 0
- [x] **Vulnerabilidades Totales**: 1 (PM2 ReDoS - Low Severity, sin fix disponible, riesgo aceptado).

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
