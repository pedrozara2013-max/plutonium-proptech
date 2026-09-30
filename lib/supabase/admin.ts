import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { getSupabaseRuntimeConfig } from '@/lib/environment'

export function createAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY
  const { url } = getSupabaseRuntimeConfig()
  if (!key) throw new Error('Server admin key is not configured')
  if (!url) throw new Error('Supabase URL is not configured')
  return createSupabaseClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })
}
