/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.88.181',
        port: '5026',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'e6e4-2001-ee0-41c1-367e-4d26-e8ea-7b6e-1c42.ngrok-free.app',
        port: '',
        pathname: '**'
      }
    ]
  },
  env: {
    BASE_URL_API: 'https://f83c-116-96-47-118.ngrok-free.app/api',
    HIEU_URL:
      'https://e6e4-2001-ee0-41c1-367e-4d26-e8ea-7b6e-1c42.ngrok-free.app'
  }
};

export default nextConfig;
