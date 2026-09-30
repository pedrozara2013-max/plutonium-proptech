'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

type Result = { ok: true } | { ok: false; message: string }

async function publishedProperty(propertyId: string) {
  if (!uuidPattern.test(propertyId)) return null
  const supabase = await createClient()
  const { data } = await supabase.from('properties').select('id').eq('id', propertyId).eq('is_published', true).eq('status', 'published').maybeSingle()
  return data
}

export async function submitInquiry(input: { propertyId: string; name: string; email: string; phone?: string; message: string }): Promise<Result> {
  const name = input.name.trim(), email = input.email.trim().toLowerCase(), message = input.message.trim(), phone = input.phone?.trim() || null
  if (!name || name.length > 120 || !emailPattern.test(email) || message.length < 10 || message.length > 4000 || !(await publishedProperty(input.propertyId))) return { ok: false, message: 'Não foi possível enviar o pedido. Verifique os dados e tente novamente.' }
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('inquiries').insert({ property_id: input.propertyId, user_id: user?.id ?? null, name, email, phone, message, status: 'new' })
    if (error) return { ok: false, message: 'Não foi possível enviar o pedido. Tente novamente.' }
    try { await createAdminClient().from('leads').insert({ name, email, phone, property_id: input.propertyId, lead_type: 'buyer', status: 'new', notes: message }) } catch {}
    return { ok: true }
  } catch { return { ok: false, message: 'Não foi possível enviar o pedido. Tente novamente.' } }
}

export async function submitAppointment(input: { propertyId: string; name: string; email: string; phone: string; date: string; time: string; notes?: string }): Promise<Result> {
  const name = input.name.trim(), email = input.email.trim().toLowerCase(), phone = input.phone.trim(), notes = input.notes?.trim() || null, scheduledAt = new Date(`${input.date}T${input.time}:00`)
  if (!name || name.length > 120 || !emailPattern.test(email) || !phone || Number.isNaN(scheduledAt.getTime()) || scheduledAt <= new Date() || notes && notes.length > 2000 || !(await publishedProperty(input.propertyId))) return { ok: false, message: 'Não foi possível agendar a visita. Verifique os dados e tente novamente.' }
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('appointments').insert({ property_id: input.propertyId, user_id: user?.id ?? null, name, email, phone, scheduled_at: scheduledAt.toISOString(), notes, status: 'requested', appointment_type: 'property_viewing' })
    return error ? { ok: false, message: 'Não foi possível agendar a visita. Tente novamente.' } : { ok: true }
  } catch { return { ok: false, message: 'Não foi possível agendar a visita. Tente novamente.' } }
}

export async function addFavorite(userId: string, propertyId: string): Promise<Result> {
  if (!uuidPattern.test(userId) || !uuidPattern.test(propertyId) || !(await publishedProperty(propertyId))) return { ok: false, message: 'Não foi possível guardar este favorito.' }
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.id !== userId) return { ok: false, message: 'É necessário iniciar sessão para guardar favoritos.' }
  const { error } = await supabase.from('property_favorites').insert({ user_id: userId, property_id: propertyId })
  return error && error.code !== '23505' ? { ok: false, message: 'Não foi possível guardar este favorito.' } : { ok: true }
}

export async function removeFavorite(userId: string, propertyId: string): Promise<Result> {
  const supabase = await createClient(); const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.id !== userId) return { ok: false, message: 'É necessário iniciar sessão para gerir favoritos.' }
  const { error } = await supabase.from('property_favorites').delete().eq('user_id', userId).eq('property_id', propertyId)
  return error ? { ok: false, message: 'Não foi possível remover este favorito.' } : { ok: true }
}

export async function isFavorite(userId: string, propertyId: string) { const supabase = await createClient(); const { data } = await supabase.from('property_favorites').select('id').eq('user_id', userId).eq('property_id', propertyId).maybeSingle(); return Boolean(data) }
export async function getUserFavorites(userId: string) { const supabase = await createClient(); const { data } = await supabase.from('property_favorites').select('property_id').eq('user_id', userId); return data?.map((item) => item.property_id) ?? [] }

export async function getCurrentUserId() { const { data: { user } } = await (await createClient()).auth.getUser(); return user?.id ?? null }

export async function getPropertyMedia(propertyId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('property_media').select('id,media_type,storage_path,public_url,alt_text,sort_order').eq('property_id', propertyId).neq('media_type', 'document').order('sort_order')
  if (error) throw new Error('Unable to load property media')
  return data ?? []
}

export { publishedProperty }
