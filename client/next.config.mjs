/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://sadik-portfolio.onrender.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;
