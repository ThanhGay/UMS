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
    HIEU_URL: 'http://192.168.88.181:5026'
  }
};

export default nextConfig;
