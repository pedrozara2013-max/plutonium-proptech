'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

const safePath = (value?: string) => value && value.startsWith('/') && !value.startsWith('//') ? value : '/dashboard'

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getCurrentProfile() {
  const user = await getCurrentUser()
  if (!user) return null
  const supabase = await createClient()
  const { data } = await supabase.from('profiles').select('id,first_name,last_name,phone,avatar_url,role,status,preferred_language,country,created_at,updated_at').eq('id', user.id).maybeSingle()
  return data ? { ...data, email: user.email ?? '' } : null
}

export async function requireUser(returnTo?: string) {
  const user = await getCurrentUser()
  if (!user) redirect(`/login?returnTo=${encodeURIComponent(safePath(returnTo))}`)
  return user
}

export async function requireRole(roles: string[], returnTo?: string) {
  const user = await requireUser(returnTo)
  const profile = await getCurrentProfile()
  if (!profile || !roles.includes(profile.role)) redirect('/dashboard')
  return { user, profile }
}

export async function safeReturnTo(value?: string) { return safePath(value) }
