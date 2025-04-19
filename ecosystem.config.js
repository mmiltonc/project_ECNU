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
        echo "📁 Copiando scripts al servidor..." &&
        scp -P 2222 -i ../vps-sim/ssh_config/fake-hostinger -r ./deploy-scripts deploy@localhost:/home/deploy/app/ &&
        echo "⚙️  Ejecutando setup-directories.sh..." &&
        ssh -tt -i ../vps-sim/ssh_config/fake-hostinger -p 2222 deploy@localhost "bash /home/deploy/app/deploy-scripts/setup-directories.sh"
      `,


      'post-setup': `
        bash /home/deploy/app/deploy-scripts/post-setup.sh
      `,

      'pre-deploy-local': `
        bash ./deploy-scripts/pre-deploy-local.sh
      `,

      'post-deploy': `
        bash /home/deploy/app/deploy-scripts/post-deploy.sh
      `,
    },
  },
};
