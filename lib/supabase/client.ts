import { createClient } from '@supabase/supabase-js';
import { hasPublicSupabaseConfig, supabaseConfig } from '@/lib/supabase/config';

export function getSupabaseBrowserClient() {
  if (!hasPublicSupabaseConfig) {
    return null;
  }

  return createClient(supabaseConfig.url!, supabaseConfig.anonKey!);
}
