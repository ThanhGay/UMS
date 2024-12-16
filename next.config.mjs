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
      'https://5e1e-2401-d800-1e1-7f5f-e870-3bd5-6c00-6cc5.ngrok-free.app/api',
    HIEU_URL:
      'https://edf0-2001-ee0-41c1-367e-d957-c702-4e1d-68af.ngrok-free.app'
  }
};

export default nextConfig;
