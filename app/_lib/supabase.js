const { createClient } = require("@supabase/supabase-js")

export const supaBaseUrl = "https://owryejktncbewshnrtva.supabase.co"

export const supabase = createClient(
  "https://owryejktncbewshnrtva.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93cnllamt0bmNiZXdzaG5ydHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MzEyNzEsImV4cCI6MjA3NjAwNzI3MX0.kRVIEfHIv7v6UpsM7FqcR5WWJGle_ZYsZ7E6Wap-i3M"
)
