/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL_API: 'http://localhost:5271/api',
    // BASE_URL_API: 'http://192.168.59.245:5271/api',
    HIEU_URL: 'http://192.168.59.229:5026'
  }
};

export default nextConfig;
