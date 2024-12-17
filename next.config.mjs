/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.88.181',
        port: '5026',
        pathname: '**'
      }
    ]
  },
  env: {
    BASE_URL_API:
      'https://2526-2402-800-7d91-a936-dc14-d766-b56e-7dab.ngrok-free.app/api',
    HIEU_URL:
      'https://5106-2001-ee0-41c1-367e-7cae-c3e9-1fe9-37fd.ngrok-free.app'
  }
};

export default nextConfig;
