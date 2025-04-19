module.exports = {
  apps: [
    {
      name: "onepage-ecnu-team",
      script: "./index.js",
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
      ref: "origin/develop",
      repo: "https://github.com/mmiltonc/project_ECNU.git",
      path: "/home/deploy/app",

      'pre-setup': `
        echo "hola" > ~/app/hola.txt &&
      `,

      'post-setup': `
        set -x &&
        echo "Instalando PM2 y creando carpetas necesarias..." &&
        if ! command -v pm2 > /dev/null; then
          npm install -g pm2
        fi &&
        mkdir -p /home/deploy/app &&
        pm2 install pm2-logrotate || true
      `,

      'pre-deploy-local': `
        set -x &&
        echo "Deploy local iniciado en $(date)"
      `,

      'post-deploy': `
        set -x &&
        cd /home/deploy/app &&
        npm install &&
        pm2 reload ecosystem.config.js --env production &&
        pm2 save
      `
    },
  },
};
