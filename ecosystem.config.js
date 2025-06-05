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
      host: "77.37.40.29",
      user: "deployer",
      key: "~/.ssh/deployer-ecnuteam",
      ref: "origin/develop",
      repo: "https://github.com/mmiltonc/project_ECNU.git",
      path: "/home/deployer/app",

      "post-setup":
        "echo '📦 Instalando PM2 y configurando Nginx...' && " +
        "if ! command -v pm2 > /dev/null; then sudo npm install -g pm2; fi && " +
        "sudo cp /home/deployer/app/source/nginx/default /etc/nginx/sites-enabled/default && " +
        "sudo service nginx reload && " +
        "pm2 install pm2-logrotate || true",

      "pre-deploy-local":
        "echo '📁 Verificando si .env.production ya existe en el servidor...' && " +
        "ssh -F ~/.ssh/config ecnuteam-deployer '[ -f /home/deployer/app/shared/.env.production ]' || " +
        "(echo '📁 Copiando .env.production al servidor...' && scp -F ~/.ssh/config .env.production ecnuteam-deployer:/home/deployer/app/shared/.env.production)",

      "post-deploy":
        "echo '🚀 Post-deploy iniciado...' && " +
        "cd /home/deployer/app/current && " +
        "ln -sf /home/deployer/app/shared/.env.production .env.production && " +
        "npm install && " +
        "npm run build && " +
        "pm2 reload ecosystem.config.js --env production && " +
        "pm2 save &&" +
        "sudo nginx -t && sudo service nginx reload",
    },
  },
};
