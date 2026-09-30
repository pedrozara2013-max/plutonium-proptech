import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSupabaseRuntimeConfig } from '@/lib/environment'

export async function createClient() {
  const cookieStore = await cookies()
  const { url, anonKey } = getSupabaseRuntimeConfig()
  if (!url || !anonKey) throw new Error('Supabase client configuration is missing')

  return createServerClient(
    url,
    anonKey,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {}
        },
      },
    },
  )
}
