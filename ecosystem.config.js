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
        set -x &&
        echo "hola" > ~/hola.txt &&
        echo "Copiando clave pública y creando carpetas iniciales..." &&
        mkdir -p ~/.ssh &&
        chmod 700 ~/.ssh &&
        echo '$(cat ../hostinger-server/vps-sim/ssh_config/fake-hostinger.pub)' >> ~/.ssh/authorized_keys &&
        chmod 600 ~/.ssh/authorized_keys &&
        mkdir -p /home/deploy/onepage/shared &&
        mkdir -p /home/deploy/onepage/source &&
        mkdir -p /home/deploy/onepage/deploy-scripts &&
        chown -R deploy:deploy /home/deploy/onepage
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
        echo "deployeddd!" &&
        set -x &&
        cd /home/deploy/app &&
        npm install &&
        pm2 reload ecosystem.config.js --env production &&
        pm2 save
      `
    },
  },
};
