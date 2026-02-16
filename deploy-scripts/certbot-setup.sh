#!/bin/bash
set -euo pipefail

DOMAIN="ecnuteam.com"
EMAIL="sysadmin@ecnuteam.com"
RENEW_SCRIPT="/usr/local/bin/certbot-cloudflare-renew.sh"

echo "🔐 Configurando SSL Let's Encrypt con Cloudflare DNS challenge"

# 1️⃣ Verificar token
if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
  echo "❌ CLOUDFLARE_API_TOKEN no está definido."
  exit 1
fi

# 2️⃣ Instalar certbot + plugin si falta
if ! command -v certbot >/dev/null 2>&1; then
  echo "🔧 Instalando Certbot..."
  sudo apt update
  sudo apt install -y certbot python3-certbot-dns-cloudflare
fi

# 3️⃣ Crear archivo temporal con token
CF_FILE=$(mktemp)
chmod 600 "$CF_FILE"
echo "dns_cloudflare_api_token = $CLOUDFLARE_API_TOKEN" > "$CF_FILE"
trap 'rm -f "$CF_FILE"' EXIT

echo "🌐 Solicitando certificado..."

sudo certbot certonly \
  --dns-cloudflare \
  --dns-cloudflare-credentials "$CF_FILE" \
  --dns-cloudflare-propagation-seconds 120 \
  --non-interactive --agree-tos \
  --email "$EMAIL" \
  --keep-until-expiring \
  -d "$DOMAIN" -d "www.$DOMAIN"

echo "✅ Certificado emitido."

# 4️⃣ Recargar nginx si existe
if command -v nginx >/dev/null 2>&1; then
  sudo nginx -t
  sudo systemctl reload nginx
fi

# 5️⃣ Crear script de renovación automática
echo "🔄 Configurando renovación automática..."

sudo bash -c "cat > $RENEW_SCRIPT" <<'EOF'
#!/bin/bash
set -e

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
  echo "CLOUDFLARE_API_TOKEN no definido"
  exit 1
fi

CF_FILE=$(mktemp)
chmod 600 "$CF_FILE"
echo "dns_cloudflare_api_token = $CLOUDFLARE_API_TOKEN" > "$CF_FILE"

certbot renew \
  --dns-cloudflare \
  --dns-cloudflare-credentials "$CF_FILE" \
  --quiet

rm -f "$CF_FILE"
EOF

sudo chmod +x "$RENEW_SCRIPT"

# 6️⃣ Guardar token para renovaciones futuras (solo sistema)
if ! grep -q CLOUDFLARE_API_TOKEN /etc/environment; then
  echo "🔐 Guardando token en entorno del sistema para renovaciones..."
  echo "CLOUDFLARE_API_TOKEN=$CLOUDFLARE_API_TOKEN" | sudo tee -a /etc/environment > /dev/null
fi

# 7️⃣ Programar cron diario si no existe
CRON_JOB="0 3 * * * $RENEW_SCRIPT >> /var/log/certbot-renew.log 2>&1"

if ! sudo crontab -l 2>/dev/null | grep -Fq "$RENEW_SCRIPT"; then
  (sudo crontab -l 2>/dev/null; echo "$CRON_JOB") | sudo crontab -
  echo "📅 Renovación automática configurada."
else
  echo "📅 Renovación ya configurada."
fi

# 8️⃣ Probar renovación
echo "🧪 Probando renovación..."
sudo "$RENEW_SCRIPT" || true

echo "🎉 SSL listo y renovación automática activa."
