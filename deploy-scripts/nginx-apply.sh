#!/bin/bash
set -euo pipefail

APP_PATH="/home/deployer/app"
SRC="$APP_PATH/source"
NGINX_DST="/etc/nginx/sites-enabled/default"

echo "🧩 Aplicando Nginx HTTP-only (seguro sin cert)..."
sudo mkdir -p /etc/nginx/sites-enabled
sudo cp "$SRC/nginx/default.http" "$NGINX_DST"
sudo nginx -t
sudo systemctl reload nginx

CERT="/etc/letsencrypt/live/ecnuteam.com/fullchain.pem"
KEY="/etc/letsencrypt/live/ecnuteam.com/privkey.pem"

if [ -f "$CERT" ] && [ -f "$KEY" ]; then
  echo "🔐 Cert encontrado. Aplicando Nginx HTTPS..."
  sudo cp "$SRC/nginx/default.https" "$NGINX_DST"
  sudo nginx -t
  sudo systemctl reload nginx
else
  echo "ℹ️ Aún no hay certificados. Queda HTTP-only por ahora."
fi
