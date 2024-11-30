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
    BASE_URL_API: 'https://7af6-116-96-47-79.ngrok-free.app/api',
    HIEU_URL:
      'https://9fc5-2001-ee0-41c1-12a6-c86-a8c8-438b-9c09.ngrok-free.app'
  }
};

export default nextConfig;
