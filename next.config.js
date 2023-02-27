/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  env: {
    GREETING: process.env.GREETING,
  },
}, nextConfig
