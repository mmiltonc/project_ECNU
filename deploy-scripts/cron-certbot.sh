#!/bin/bash

CRON_LINE="0 19 * * * /usr/bin/certbot renew --dry-run >> /var/log/certbot-renew.log 2>&1"

# Verificar si ya existe la línea en el crontab
if crontab -l 2>/dev/null | grep -Fq "$CRON_LINE"; then
  echo "✅ Entrada del cron ya existe, no se duplica."
else
  (crontab -l 2>/dev/null; echo "$CRON_LINE") | crontab -
  echo "✅ Entrada del cron agregada: $CRON_LINE"
fi