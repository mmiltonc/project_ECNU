module.exports = {
  apps: [
    {
      name: "onepage-ecnu-team",
      script: "npm",
      args: "start",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    production: {
      user: "deploy",
      host: "127.0.0.1",
      port: "2222",
      key: "../hostinger-server/vps-sim/ssh_config/fake-hostinger",
      ref: "origin/deploy-md",
      repo: "https://github.com/mmiltonc/project_ECNU.git",
      path: "/home/deploy/app",

      "pre-setup":
        "echo 'Copiando clave pública y creando carpetas iniciales...'",

      "post-setup":
        "echo '📦 Instalando PM2 y creando carpetas necesarias...' && " +
        "if ! command -v pm2 > /dev/null; then sudo npm install -g pm2; fi && " +
        "mkdir -p /home/deploy/app/shared && " +
        "cp /home/deploy/app/source/.env.production /home/deploy/app/shared/.env.production && " +
        "pm2 install pm2-logrotate || true",

      "pre-deploy": "echo 'Deploy local iniciado'",

      "post-deploy":
        "cd /home/deploy/app/current && " +
        "npm install && " +
        "npm run build && " +
        "pm2 reload ecosystem.config.js --env production && " +
        "pm2 save",

      "post-deploy":
        "echo '🚀 Post-deploy iniciado...' && " +
        "cd /home/deploy/app/source && " +
        "ln -sf /home/deploy/app/shared/.env.production .env.production && " +
        "npm install && " +
        "npm run build && " +
        "pm2 reload ecosystem.config.js --env production && " +
        "pm2 save",
    },
  },
};
