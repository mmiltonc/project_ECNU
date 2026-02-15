

const isDevelopmentMode = ["development", "local"].includes(process.env.NODE_ENV);

const nextConfig = {
  async redirects() {
    return isDevelopmentMode
      ? [] // no redirections in development mode
      : [
        {
          source: "/emails/preview",
          destination: "/",
          permanent: false,
        },
      ];
  },
};

module.exports = nextConfig;