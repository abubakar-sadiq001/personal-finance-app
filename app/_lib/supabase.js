const { createClient } = require("@supabase/supabase-js")

export const supaBaseUrl = "https://owryejktncbewshnrtva.supabase.co"

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
