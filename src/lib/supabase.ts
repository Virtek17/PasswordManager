import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://xwdleasqylkxwcqpqaqf.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3ZGxlYXNxeWxreHdjcXBxYXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzOTc5MDIsImV4cCI6MjA3NDk3MzkwMn0.mTz6A8Q2-z1Jg7K5yeXgCZoTRdZNeQ3jbS8QLIL920Y"
);