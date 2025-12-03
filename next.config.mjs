/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "owryejktncbewshnrtva.supabase.co",
      },
    ],
  },
}

export default nextConfig
