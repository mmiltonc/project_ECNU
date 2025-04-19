#!/bin/bash
set -x

echo "📦 Ejecutando post-setup..."

# Intentar con sudo si está disponible
if command -v sudo >/dev/null; then
  echo "🔧 Instalando pm2 global con sudo..."
  sudo npm install -g pm2
else
  echo "⚠️ No se puede usar sudo. Instalando pm2 localmente en ~/.npm-global..."

  # Instalar pm2 local si no hay sudo
  mkdir -p ~/.npm-global
  npm config set prefix ~/.npm-global

  # Agregar al PATH si no está ya
  if ! grep -q "npm-global" ~/.bashrc; then
    echo 'export PATH=$HOME/.npm-global/bin:$PATH' >> ~/.bashrc
  fi
  source ~/.bashrc

  npm install -g pm2
fi

# Verificación
if command -v pm2 >/dev/null; then
  echo "✅ pm2 instalado correctamente: $(pm2 --version)"
else
  echo "❌ pm2 no se pudo instalar. Verificá los permisos y PATH."
fi