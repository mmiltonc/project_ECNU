#!/bin/bash
set -x

echo "📂 Creando carpetas necesarias para deploy..."

mkdir -p /home/deploy/onepage/shared
mkdir -p /home/deploy/onepage/source
mkdir -p /home/deploy/onepage/deploy-scripts

chown -R deploy:deploy /home/deploy/onepage