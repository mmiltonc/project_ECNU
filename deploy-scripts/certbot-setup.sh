#!/bin/bash

DOMAIN="ecnu.dev"
EMAIL="sysadmin@ecnu.dev"
CRON_LINE="0 19 * * * /usr/bin/certbot renew --dry-run >> /var/log/certbot-renew.log 2>&1"

echo "🌐 Verificando que el dominio $DOMAIN apunte a este servidor..."

SERVER_IP=$(curl -s ifconfig.me)
DOMAIN_IP=$(dig +short "$DOMAIN" | grep -Eo '([0-9]{1,3}\.){3}[0-9]{1,3}' | head -n1)

echo "📡 IP del servidor: $SERVER_IP"
echo "🌍 IP del dominio:  $DOMAIN_IP"

if [ -z "$DOMAIN_IP" ]; then
  echo "❌ El dominio $DOMAIN no tiene un registro A válido (o aún no propagado)."
  exit 1
fi

if [ "$SERVER_IP" != "$DOMAIN_IP" ]; then
  echo "❌ El dominio $DOMAIN apunta a otra IP. Certbot fallará."
  exit 1
fi

echo "✅ Dominio OK. Procediendo con la emisión del certificado..."

# Instalar Certbot si no está
if ! command -v certbot >/dev/null 2>&1; then
  echo "🔧 Instalando Certbot..."
  sudo DEBIAN_FRONTEND=noninteractive apt update
  sudo DEBIAN_FRONTEND=noninteractive apt install -y certbot python3-certbot-nginx tzdata
fi

# Emitir certificado en modo staging
echo "🔐 Solicitando certificado con Let's Encrypt (modo staging)..."
sudo certbot --nginx --staging --non-interactive --agree-tos --email "$EMAIL" -d "$DOMAIN"

# Agregar entrada a crontab
echo "📅 Verificando cron..."
if crontab -l 2>/dev/null | grep -Fq "$CRON_LINE"; then
  echo "✅ Cron ya está configurado."
else
  (crontab -l 2>/dev/null; echo "$CRON_LINE") | crontab -
  echo "✅ Cron agregado para renovación diaria a las 19:00."
fi
