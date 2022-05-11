/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: [
      "components",
      "containers",
      "layouts",
      "pages",
      "redux",
      "hooks",
      "services",
      "models",
    ],
  },
  experimental: {
    outputStandalone: true,
  },
  images: {
    domains: ["static.f365.com.vn", "api.f365.vn"],
  },
};

module.exports = nextConfig;
