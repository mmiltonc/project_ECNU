#!/bin/bash
set -euo pipefail

DOMAIN="ecnuteam.com"
EMAIL="sysadmin@ecnuteam.com"

# Cloudflare credentials file (root-only)
CF_INI="/root/.cloudflare.ini"

echo "🔐 Configurando SSL Let's Encrypt usando DNS-01 con Cloudflare (sin apagar proxy)..."

# 1) Instalar Certbot + plugin Cloudflare si no están
if ! command -v certbot >/dev/null 2>&1; then
  echo "🔧 Instalando Certbot..."
  export DEBIAN_FRONTEND=noninteractive
  sudo apt update
  sudo apt install -y certbot tzdata
fi

if ! dpkg -s python3-certbot-dns-cloudflare >/dev/null 2>&1; then
  echo "🔧 Instalando plugin Cloudflare para Certbot..."
  sudo apt update
  sudo apt install -y python3-certbot-dns-cloudflare
fi

# 2) Verificar credenciales Cloudflare
if [ ! -f "$CF_INI" ]; then
  echo "❌ No existe $CF_INI"
  echo "Crealo con:"
  echo "  sudo nano $CF_INI"
  echo "y adentro:"
  echo "  dns_cloudflare_api_token = TU_API_TOKEN"
  exit 1
fi

# Permisos correctos (certbot exige que sea privado)
sudo chmod 600 "$CF_INI"

# 3) Emitir/expandir certificado
echo "🌐 Solicitando/renovando certificado para $DOMAIN y www.$DOMAIN..."
sudo certbot certonly \
  --dns-cloudflare \
  --dns-cloudflare-credentials "$CF_INI" \
  --non-interactive --agree-tos \
  --email "$EMAIL" \
  --keep-until-expiring \
  -d "$DOMAIN" -d "www.$DOMAIN"

echo "✅ Certificado listo."

# 4) Si usás Nginx: recargar cuando haya renovación
# (esto NO instala el certificado en la config automáticamente, solo recarga nginx)
if command -v nginx >/dev/null 2>&1; then
  echo "🔄 Recargando Nginx..."
  sudo nginx -t
  sudo systemctl reload nginx
fi

# 5) Renovación automática (mejor systemd timer que cron)
echo "⏱ Verificando timer de certbot..."
if systemctl list-timers --all 2>/dev/null | grep -q certbot; then
  echo "✅ systemd timer de certbot ya existe (renovación automática activa)."
else
  echo "ℹ️ No veo timer de certbot. En Ubuntu normalmente viene con el paquete."
  echo "Podés probar habilitarlo:"
  echo "  sudo systemctl enable --now certbot.timer"
fi

# 6) Test de renovación
echo "🧪 Probando renovación (dry-run)..."
sudo certbot renew --dry-run

echo "🎉 Todo OK."
