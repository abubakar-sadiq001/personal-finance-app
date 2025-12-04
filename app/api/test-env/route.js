export async function GET() {
  console.log("SERVER SUPABASE_URL:", process.env.SUPABASE_URL)
  console.log(
    "SERVER NEXT_PUBLIC_SUPABASE_URL:",
    process.env.NEXT_PUBLIC_SUPABASE_URL
  )
  return new Response("ok")
}
