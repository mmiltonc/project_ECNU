#!/usr/bin/env bash
set -euo pipefail

DOMAIN="ecnuteam.com"

APP_PATH="/home/deployer/app"
SRC="$APP_PATH/source"
NGINX_DST="/etc/nginx/sites-enabled/default"

LE_DIR="/etc/letsencrypt"
CERT="$LE_DIR/live/$DOMAIN/fullchain.pem"
KEY="$LE_DIR/live/$DOMAIN/privkey.pem"
OPTIONS="$LE_DIR/options-ssl-nginx.conf"
DHPARAM="$LE_DIR/ssl-dhparams.pem"

echo "🧩 Aplicando Nginx HTTP-only (seguro sin cert)..."
sudo mkdir -p /etc/nginx/sites-enabled
sudo cp "$SRC/nginx/default.http" "$NGINX_DST"
sudo nginx -t
sudo systemctl reload nginx

if sudo test -f "$CERT" && sudo test -f "$KEY" && sudo test -f "$OPTIONS" && sudo test -f "$DHPARAM"; then
  echo "🔐 Cert + archivos SSL encontrados. Aplicando Nginx HTTPS..."
  sudo cp "$SRC/nginx/default.https" "$NGINX_DST"
  sudo nginx -t
  sudo systemctl reload nginx
else
  echo "ℹ️ Aún no hay SSL completo:"
  sudo test -f "$CERT"    || echo " - falta $CERT"
  sudo test -f "$KEY"     || echo " - falta $KEY"
  sudo test -f "$OPTIONS" || echo " - falta $OPTIONS"
  sudo test -f "$DHPARAM" || echo " - falta $DHPARAM"
  echo "👉 Queda HTTP-only por ahora."
fi
