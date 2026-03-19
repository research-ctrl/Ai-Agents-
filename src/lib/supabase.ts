import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

export async function uploadMaterialImage(path: string, file: File) {
  if (!supabase) {
    return { data: { path }, error: null, mocked: true };
  }

  const { data, error } = await supabase.storage.from('material-control-images').upload(path, file, {
    upsert: true,
  });

  return { data, error, mocked: false };
}
