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

console.log("SUPABASE_URL during build:", process.env.SUPABASE_URL)

export default nextConfig
