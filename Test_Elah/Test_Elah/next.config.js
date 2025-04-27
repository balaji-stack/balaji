/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath:'/ElahFrontEnd',
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
       
       },
     ];
   },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
 env:{
  SERVER_URL : 'http://localhost:8080',
 }
};

module.exports = nextConfig;

