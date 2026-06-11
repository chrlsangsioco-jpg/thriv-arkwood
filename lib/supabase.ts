import { createClient } from '@supabase/supabase-js'

// Anon, read-only client. RLS allows reading published landing pages + active
// testimonials only — no secrets needed in this project.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
