/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    WEBSITE_URL: process.env.WEBSITE_URL,
    APP_NAME: process.env.APP_NAME,
  },
};

module.exports = nextConfig; 