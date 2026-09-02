import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Config
};

if (process.env.NODE_ENV === 'development') {
  setupDevPlatform().catch(console.error);
}

export default nextConfig;
