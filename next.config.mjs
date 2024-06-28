/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "specials-images.forbesimg.com",
      },
      {
        hostname: "undefined",
      },
    ],
  },
};

export default nextConfig;
