/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hlvrqkpohsfbqqmpruhx.supabase.co',
        pathname: '/storage/v1/object/sign/recipes-images/**',
      },
    ],
  },
};

export default nextConfig;