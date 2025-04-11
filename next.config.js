const withVideos = require("next-videos");

const isDevelopmentMode = process.env.NODE_ENV === "development";

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

module.exports = withVideos(nextConfig);
