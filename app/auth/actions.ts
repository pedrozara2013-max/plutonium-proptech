'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[+()\d\s.-]{7,24}$/
const safePath = (value?: string) => value && value.startsWith('/') && !value.startsWith('//') ? value : '/dashboard'

type AuthResult = { ok: true } | { ok: false; message: string }

export async function register(input: { firstName: string; lastName: string; email: string; phone: string; password: string; confirmPassword: string; preferredLanguage: 'pt' | 'en' }): Promise<AuthResult> {
  const firstName = input.firstName.trim(), lastName = input.lastName.trim(), email = input.email.trim().toLowerCase(), phone = input.phone.trim()
  if (!firstName || firstName.length > 80 || !lastName || lastName.length > 80 || !emailPattern.test(email) || !phonePattern.test(phone) || input.password.length < 8 || input.password.length > 128 || input.password !== input.confirmPassword) return { ok: false, message: 'Verifique os campos e tente novamente.' }
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({ email, password: input.password, options: { data: { first_name: firstName, last_name: lastName, phone, preferred_language: input.preferredLanguage } } })
  if (error) return { ok: false, message: 'Não foi possível criar a conta. Verifique o email e tente novamente.' }
  if (data.user && data.session) await supabase.from('profiles').upsert({ id: data.user.id, first_name: firstName, last_name: lastName, phone, preferred_language: input.preferredLanguage, role: 'viewer' }, { onConflict: 'id' })
  return { ok: true }
}

export async function login(input: { email: string; password: string; returnTo?: string }): Promise<AuthResult> {
  const email = input.email.trim().toLowerCase()
  if (!emailPattern.test(email) || !input.password) return { ok: false, message: 'Email ou palavra-passe inválidos.' }
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password: input.password })
  if (error) return { ok: false, message: 'Email ou palavra-passe inválidos.' }
  redirect(safePath(input.returnTo))
}

export async function logout() { const supabase = await createClient(); await supabase.auth.signOut(); redirect('/') }

export async function requestPasswordReset(email: string): Promise<AuthResult> {
  if (!emailPattern.test(email.trim())) return { ok: false, message: 'Introduza um email válido.' }
  const supabase = await createClient(); const origin = process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || 'http://localhost:3000'
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), { redirectTo: `${origin}/reset-password` })
  return error ? { ok: false, message: 'Não foi possível iniciar a recuperação.' } : { ok: true }
}

export async function updatePassword(password: string, confirmPassword: string): Promise<AuthResult> {
  if (password.length < 8 || password !== confirmPassword) return { ok: false, message: 'A palavra-passe deve ter 8 caracteres e coincidir.' }
  const supabase = await createClient(); const { error } = await supabase.auth.updateUser({ password }); return error ? { ok: false, message: 'Não foi possível atualizar a palavra-passe.' } : { ok: true }
}
