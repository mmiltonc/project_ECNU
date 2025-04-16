# 🚀 Deploy automático con versionado y rollback para Next.js en VPS (Hostinger)

Este documento describe cómo configurar un sistema de deploy automático, versionado y con rollback, usando GitHub Actions y acceso por SSH a tu servidor VPS (como Hostinger).

Ideal para proyectos en Next.js o cualquier app Node.js.

---

## 🔐 1. Configurar secretos en GitHub

Ir a tu repositorio → ⚙️ Settings → Secrets and variables → Actions → New repository secret, y crear:

Nombre del secreto | Descripción
------------------|-------------
VPS_HOST          | IP pública del servidor
VPS_USER          | Usuario SSH (ej: root o ubuntu)
VPS_SSH_KEY       | Clave privada SSH (formato PEM/RSA)

💡 Asegurate de que la clave pública correspondiente esté en ~/.ssh/authorized_keys en el servidor.

---

## ⚙️ 2. Estructura del servidor

Este sistema de deploy usará la siguiente estructura en tu servidor:

```sh
/var/www/mi-app/
├── current → releases/20240415-1530   # symlink al release activo
├── releases/
│   ├── 20240415-1530/
│   ├── 20240415-1600/
│   └── ...
└── rollback.sh
```


---

## ⚡ 3. Workflow de GitHub Actions

Crear el archivo .github/workflows/deploy.yml en tu repo con el siguiente contenido:

```yaml
name: Deploy versionado con rollback

on:
  push:
    branches: [prd]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy vía SSH (versionado)
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          port: 22
          script: |
            TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
            APP_DIR=/var/www/mi-app
            RELEASE_DIR=$APP_DIR/releases/$TIMESTAMP
            CURRENT_DIR=$APP_DIR/current

            echo "🛠️ Creando estructura de carpetas..."
            mkdir -p $RELEASE_DIR
            mkdir -p $APP_DIR/releases

            echo "🔍 Verificando Node.js..."
            if ! command -v node > /dev/null; then
              curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
              sudo apt install -y nodejs
            fi

            echo "🔍 Verificando PM2..."
            if ! command -v pm2 > /dev/null; then
              sudo npm install -g pm2@5.3.0
            fi

            echo "📥 Clonando repo en $RELEASE_DIR..."
            git clone https://github.com/USUARIO/REPO.git $RELEASE_DIR

            echo "📦 Instalando dependencias..."
            cd $RELEASE_DIR
            npm install
            npm run build

            echo "🔗 Apuntando symlink a release actual..."
            ln -sfn $RELEASE_DIR $CURRENT_DIR

            echo "🚀 Lanzando app con PM2 desde $CURRENT_DIR..."
            pm2 start npm --name "mi-app" -- start --prefix $CURRENT_DIR || pm2 restart "mi-app"

            echo "📝 Guardando script de rollback..."
            echo "ln -sfn $RELEASE_DIR $CURRENT_DIR && pm2 restart mi-app" > $APP_DIR/rollback.sh
            chmod +x $APP_DIR/rollback.sh

            echo "🧹 Limpiando releases antiguos (manteniendo los últimos 3)..."
            cd $APP_DIR/releases
            ls -1tr | head -n -3 | xargs -d '\n' rm -rf --

            echo "✅ Deploy completado: $TIMESTAMP"
```

---

### 🔁 Cambiar USUARIO, REPO y nombre de la app

- Reemplazá USUARIO y REPO en la línea del git clone por tu usuario y nombre de repositorio reales:

```sh
    git clone https://github.com/miusuario/mi-repo.git $RELEASE_DIR
```

- Cambiá el nombre "mi-app" por el nombre de tu app en todas las referencias a PM2:

```sh
    pm2 start npm --name "nombre-real" -- start --prefix ...
```

- Si tu ruta base no es /var/www/mi-app, también actualizala en el script.

---

## ⏪ 4. Rollback (volver a un deploy anterior)

### 🟢 Opción rápida (automática)

Si el deploy falló o tu app tiene errores, podés hacer rollback desde SSH ejecutando:

```sh
    cd /var/www/mi-app
    ./rollback.sh
```

Esto vuelve al release anterior apuntando el symlink current a la carpeta anterior y reiniciando PM2.

---

### 🔧 Opción manual (avanzado)

Si querés elegir un release específico:

```sh
    cd /var/www/mi-app/releases
    ls -1t   # Muestra los últimos deploys ordenados por fecha

    # Elegí uno y luego:
    ln -sfn /var/www/mi-app/releases/20240415-1530 /var/www/mi-app/current
    pm2 restart mi-app
```

---

## ✅ Recomendaciones finales

✔️ Evitá hacer `apt upgrade -y en cada deploy`
Mejor hacelo manualmente y con control desde SSH.

✔️ Usá versiones fijas
En package.json, fijá la versión de Node:
```json
    "engines": {
      "node": "18.x"
    }
```

Y en el deploy, instalá PM2 con versión:

```sh
    sudo npm install -g pm2@5.3.0
```

✔️ Usá npm run build solo si tu app lo necesita
(En Next.js, sí lo necesita para SSR o SSG.)

✔️ Revisá que el script de start en tu package.json esté bien configurado:

```json
    "scripts": {
      "start": "next start"
    }
```

---

## 🧪 Resultado final

Cada push a prd:

- Genera un nuevo release con timestamp
- Compila la app en una carpeta aislada
- Actualiza el symlink current
- Limpia releases viejos
- Deja un script listo para rollback
- Te permite volver a cualquier versión anterior fácilmente