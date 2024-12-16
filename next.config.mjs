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
    BASE_URL_API: 'http://localhost:5271/api',
    HIEU_URL:
      'https://6a62-2001-ee0-41c1-367e-d957-c702-4e1d-68af.ngrok-free.app'
  }
};

export default nextConfig;
