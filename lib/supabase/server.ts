import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '@/lib/supabase/config';

export function getSupabaseServerClient() {
  if (!supabaseConfig.url || !supabaseConfig.serviceRoleKey) {
    return null;
  }

  return createClient(supabaseConfig.url, supabaseConfig.serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
