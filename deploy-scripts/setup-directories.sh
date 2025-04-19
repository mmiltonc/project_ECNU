#!/bin/bash

echo "📂 Creando carpetas necesarias para deploy..."

echo $(pwd)
mkdir -p /home/deploy/onepage/shared
mkdir -p /home/deploy/onepage/source
mkdir -p /home/deploy/onepage/deploy-scripts

chown -R deploy:deploy /home/deploy/onepage