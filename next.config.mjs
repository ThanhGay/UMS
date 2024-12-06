/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**'
      }
    ]
  },
  env: {
    BASE_URL_API: 'https://0d98-27-72-100-108.ngrok-free.app/api',
    HIEU_URL: 'https://8f00-27-72-100-108.ngrok-free.app'
  }
};

export default nextConfig;
