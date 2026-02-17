#!/usr/bin/env bash
set -euo pipefail

DOMAIN="ecnuteam.com"
EMAIL="sysadmin@ecnuteam.com"

LE_DIR="/etc/letsencrypt"
LE_LIVE="$LE_DIR/live/$DOMAIN"
CERT="$LE_LIVE/fullchain.pem"
KEY="$LE_LIVE/privkey.pem"
OPTIONS="$LE_DIR/options-ssl-nginx.conf"
DHPARAM="$LE_DIR/ssl-dhparams.pem"

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
  echo "❌ CLOUDFLARE_API_TOKEN no está definido."
  exit 1
fi

echo "🔧 Instalando certbot + plugin Cloudflare (si falta)..."
sudo apt-get update -y
sudo apt-get install -y certbot python3-certbot-dns-cloudflare openssl

echo "🧩 Asegurando archivos auxiliares de Let's Encrypt para Nginx..."

# options-ssl-nginx.conf (si falta)
if ! sudo test -f "$OPTIONS"; then
  echo "➕ Creando $OPTIONS"
  sudo mkdir -p "$LE_DIR"
  sudo tee "$OPTIONS" >/dev/null <<'EOF'
ssl_session_cache shared:le_nginx_SSL:10m;
ssl_session_timeout 1440m;
ssl_session_tickets off;

ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers off;

ssl_ciphers "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384";
EOF
else
  echo "✅ Ya existe $OPTIONS"
fi

# dhparams (si falta)
if ! sudo test -f "$DHPARAM"; then
  echo "➕ Generando $DHPARAM (puede tardar un poco)..."
  sudo mkdir -p "$LE_DIR"
  sudo openssl dhparam -out "$DHPARAM" 2048
else
  echo "✅ Ya existe $DHPARAM"
fi

echo "🔐 Preparando credenciales Cloudflare (temporal)..."
CF_FILE="$(mktemp)"
chmod 600 "$CF_FILE"
printf "dns_cloudflare_api_token = %s\n" "$CLOUDFLARE_API_TOKEN" > "$CF_FILE"
trap 'rm -f "$CF_FILE"' EXIT

echo "🌐 Solicitando/renovando certificado (DNS-01 Cloudflare)..."
sudo certbot certonly \
  --dns-cloudflare \
  --dns-cloudflare-credentials "$CF_FILE" \
  --dns-cloudflare-propagation-seconds 120 \
  --non-interactive --agree-tos \
  --email "$EMAIL" \
  --keep-until-expiring \
  -d "$DOMAIN" -d "www.$DOMAIN"

echo "✅ Cert listo en: $LE_LIVE"
sudo ls -l "$LE_LIVE" | sed -n '1,6p'

echo "🧪 (Opcional) Si Nginx ya está con SSL configurado, validamos:"
if sudo nginx -t >/dev/null 2>&1; then
  echo "✅ nginx -t OK"
else
  echo "ℹ️ nginx -t aún falla (normal si todavía no aplicaste el template HTTPS)."
fi
