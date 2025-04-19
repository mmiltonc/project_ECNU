#!/bin/bash
set -x

echo "📦 Instalando PM2 y creando carpetas necesarias..."
npm install -g pm2
mkdir -p /home/deploy/app
pm2 install pm2-logrotate || true