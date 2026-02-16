#!/bin/bash
set -euo pipefail

DOMAIN="ecnuteam.com"
EMAIL="sysadmin@ecnuteam.com"

echo "🔐 SSL Let's Encrypt con Cloudflare DNS-01 (token por env + archivo temporal)"

# 0) Requerir token por variable de entorno
if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
  echo "❌ CLOUDFLARE_API_TOKEN no está definido en esta sesión."
  echo "Solución: cargalo en el entorno del usuario deployer (ej: ~/.profile) o inyectalo en el comando remoto."
  exit 1
fi

# 1) Instalar certbot + plugin cloudflare si falta
if ! command -v certbot >/dev/null 2>&1; then
  echo "🔧 Instalando Certbot..."
  export DEBIAN_FRONTEND=noninteractive
  sudo apt update
  sudo apt install -y certbot tzdata
fi

if ! dpkg -s python3-certbot-dns-cloudflare >/dev/null 2>&1; then
  echo "🔧 Instalando plugin Cloudflare..."
  sudo apt update
  sudo apt install -y python3-certbot-dns-cloudflare
fi

# 2) Crear cred file temporal (NO persistente)
CF_FILE="$(mktemp)"
chmod 600 "$CF_FILE"
printf "dns_cloudflare_api_token = %s\n" "$CLOUDFLARE_API_TOKEN" > "$CF_FILE"
trap 'rm -f "$CF_FILE"' EXIT

# 3) Emitir/renovar
echo "🌐 Solicitando certificado para $DOMAIN y www.$DOMAIN..."
sudo certbot certonly \
  --dns-cloudflare \
  --dns-cloudflare-credentials "$CF_FILE" \
  --non-interactive --agree-tos \
  --email "$EMAIL" \
  --keep-until-expiring \
  -d "$DOMAIN" -d "www.$DOMAIN"

echo "✅ Certificado listo."

# 4) Recargar nginx si existe
if command -v nginx >/dev/null 2>&1; then
  echo "🔄 Recargando Nginx..."
  sudo nginx -t
  sudo systemctl reload nginx
fi

# 5) Probar renovación
echo "🧪 Probando renovación (dry-run)..."
sudo certbot renew --dry-run

echo "🎉 OK"
