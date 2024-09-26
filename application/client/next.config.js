/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        internalApiUrl: process.env.internalApiUrl || "http://localhost:8000",
        externalApiUrl: process.env.externalApiUrl || "http://localhost:8000",
    }
};

module.exports = nextConfig;