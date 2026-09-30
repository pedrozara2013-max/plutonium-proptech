import { getAppEnvironment, getSupabaseRuntimeConfig } from '@/lib/environment'

export const supabaseEnvironment = {
  url: 'NEXT_PUBLIC_SUPABASE_URL',
  anonKey: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
} as const

export function hasSupabaseConfiguration() {
  const { url, anonKey } = getSupabaseRuntimeConfig()
  return Boolean(url && anonKey)
}

export function getSupabaseEnvironmentSummary() {
  const { url, anonKey } = getSupabaseRuntimeConfig()
  return {
    appEnvironment: getAppEnvironment(),
    hasUrl: Boolean(url),
    hasClientKey: Boolean(anonKey),
    hasServerAdminKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY),
  }
}

// Client/server Supabase SDK creation belongs here in the connection phase.
// Never place a service-role key in this boundary or in client bundles.
