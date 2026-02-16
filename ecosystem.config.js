module.exports = {
  apps: [
    {
      name: "ecnu-team-website",
      script: "npm",
      args: "start",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
  production: {
    host: "77.37.40.29",
    user: "deployer",
    key: "~/.ssh/id_ecnuteam",
    ref: "origin/main",
    repo: "https://github.com/mmiltonc/project_ECNU.git",
    path: "/home/deployer/app",

    "post-setup":
      "set -e && " +
      "echo '📦 Instalando Node, PM2 y Nginx...' && " +
      "sudo apt-get update -y && " +
      "if ! command -v node >/dev/null; then " +
      "  curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && " +
      "  sudo apt-get update -y && " +
      "  sudo apt-get install -y nodejs; " +
      "fi && " +
      "if ! command -v nginx >/dev/null; then " +
      "  sudo apt-get install -y nginx; " +
      "fi && " +
      "if ! command -v pm2 >/dev/null; then sudo npm install -g pm2; fi && " +
      "sudo mkdir -p /etc/nginx/sites-enabled && " +
      "if [ -f /home/deployer/app/source/nginx/default ]; then " +
      "  sudo cp /home/deployer/app/source/nginx/default /etc/nginx/sites-enabled/default && " +
      "  sudo nginx -t && " +
      "  sudo systemctl reload nginx; " +
      "else " +
      "  echo '⚠️  No existe /home/deployer/app/source/nginx/default (salteo Nginx)'; " +
      "fi && " +
      "pm2 install pm2-logrotate || true",

    "pre-deploy-local":
      "echo '📁 Verificando si .env.production ya existe en el servidor...' && " +
      "ssh -F ~/.ssh/config ecnuteam-deployer '[ -f /home/deployer/app/shared/.env.production ]' || " +
      "(echo '📁 Copiando .env.production al servidor...' && scp -F ~/.ssh/config .env.production ecnuteam-deployer:/home/deployer/app/shared/.env.production)",

    "post-deploy":
      "set -e && " +
      "echo '🚀 Post-deploy iniciado...' && " +
      "cd /home/deployer/app/current && " +
      "ln -sf /home/deployer/app/shared

};
