export type AppEnvironment = 'development' | 'staging' | 'production' | 'unknown'

const APP_ENVIRONMENTS = new Set<AppEnvironment>(['development', 'staging', 'production'])
const KNOWN_PRODUCTION_PROJECT_REF = 'wtsiaxptfeoanoxhsths'

export function getAppEnvironment(): AppEnvironment {
  const value = process.env.NEXT_PUBLIC_APP_ENV
  return APP_ENVIRONMENTS.has(value as AppEnvironment) ? (value as AppEnvironment) : 'unknown'
}

export function getSupabaseRuntimeConfig() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '',
  }
}

export function isConfirmedStagingEnvironment() {
  const configuredProjectRef = process.env.SUPABASE_PROJECT_REF
  const stagingProjectRef = process.env.STAGING_SUPABASE_PROJECT_REF

  return getAppEnvironment() === 'staging'
    && Boolean(configuredProjectRef && stagingProjectRef)
    && configuredProjectRef === stagingProjectRef
    && configuredProjectRef !== KNOWN_PRODUCTION_PROJECT_REF
}

export function assertQaEnvironment() {
  if (!isConfirmedStagingEnvironment()) {
    throw new Error('QA operations are disabled because the Supabase environment is not confirmed as staging.')
  }
}

export function getQaEnvironmentStatus() {
  const appEnvironment = process.env.NEXT_PUBLIC_APP_ENV ?? ''
  const configuredProjectRef = process.env.SUPABASE_PROJECT_REF ?? ''
  const stagingProjectRef = process.env.STAGING_SUPABASE_PROJECT_REF ?? ''

  return {
    environmentConfigured: Boolean(appEnvironment),
    environmentIsStaging: appEnvironment === 'staging',
    supabaseProjectConfigured: Boolean(configuredProjectRef),
    stagingProjectConfigured: Boolean(stagingProjectRef),
    projectMatchesStaging: Boolean(configuredProjectRef && stagingProjectRef && configuredProjectRef === stagingProjectRef),
    projectIsProduction: configuredProjectRef === KNOWN_PRODUCTION_PROJECT_REF,
    isConfirmedStaging: isConfirmedStagingEnvironment(),
  }
}
