import { createClient } from '@supabase/supabase-js' 
 
const urlSupabase = import.meta.env.VITE_SUPABASE_URL 
const clavePublicableSupabase = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY 
 
export const supabase = createClient( 
  urlSupabase, 
  clavePublicableSupabase, 
) 