/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pdfjs-dist', '@react-pdf-viewer/core'],
  },
};

export default nextConfig;  // Changed from module.exports
