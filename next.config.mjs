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
    BASE_URL_API: 'https://60fc-116-96-47-79.ngrok-free.app/api',
    HIEU_URL:
      'https://834d-2001-ee0-41c1-367e-a569-dbd3-3a02-c43b.ngrok-free.app'
  }
};

export default nextConfig;
