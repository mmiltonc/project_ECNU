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

      "pre-setup":
        "set -e && " +
        "echo 'Limpieza previa' && " +
        "rm -rf /home/deployer/app/source /home/deployer/app/current || true",

      "post-setup":
        "set -e && " +
        "sudo apt-get update -y && " +
        "if ! command -v node >/dev/null; then " +
        "  curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && " +
        "  sudo apt-get update -y && " +
        "  sudo apt-get install -y nodejs; " +
        "fi && " +
        "if ! command -v nginx >/dev/null; then sudo apt-get install -y nginx; fi && " +
        "if ! command -v pm2 >/dev/null; then sudo npm install -g pm2; fi && " +
        "pm2 install pm2-logrotate || true && " +
        "bash /home/deployer/app/source/deploy-scripts/nginx-apply.sh",

      "pre-deploy-local":
        "set -e && " +
        "echo '📁 Verificando si .env.production ya existe en el servidor...' && " +
        'if ssh -F ~/.ssh/config ecnuteam-deployer "test -f /home/deployer/app/shared/.env.production"; then ' +
        "  echo '✅ .env.production ya existe en el servidor.'; " +
        "else " +
        "  echo '📁 Copiando .env.production al servidor...' && " +
        "  scp -F ~/.ssh/config .env.production ecnuteam-deployer:/home/deployer/app/shared/.env.production; " +
        "fi",

      "post-deploy":
        "set -e && " +
        "cd /home/deployer/app/current && " +
        "ln -sf /home/deployer/app/shared/.env.production .env.production && " +
        "npm ci --omit=dev && " +
        "npm run build && " +
        "pm2 reload ecosystem.config.js --env production && " +
        "pm2 save && " +
        "bash /home/deployer/app/source/deploy-scripts/nginx-apply.sh",
    },
  },
};
