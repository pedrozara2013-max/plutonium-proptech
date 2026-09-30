'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireRole } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'

const staffRoles = ['super_admin', 'admin', 'property_manager']

export async function updateLead(formData: FormData) {
  const { user } = await requireRole(staffRoles, '/admin/crm')
  const supabase = await createClient()
  const id = String(formData.get('id') || '')
  const status = String(formData.get('status') || 'new')
  const notes = String(formData.get('notes') || '').trim()
  const assignedTo = String(formData.get('assigned_to') || '').trim() || null
  if (!id) throw new Error('Lead inválido.')
  const { error } = await supabase.from('leads').update({ status, notes, assigned_to: assignedTo }).eq('id', id)
  if (error) throw new Error(error.message)
  await supabase.from('audit_logs').insert({ user_id: user.id, action: 'update', entity_type: 'lead', entity_id: id, new_values: { status, notes, assigned_to: assignedTo } })
  revalidatePath('/admin/crm'); revalidatePath(`/admin/crm/leads/${id}`); redirect(`/admin/crm/leads/${id}`)
}

export async function updateAppointment(formData: FormData) {
  const { user } = await requireRole(staffRoles, '/admin/crm')
  const supabase = await createClient()
  const id = String(formData.get('id') || '')
  const status = String(formData.get('status') || 'requested')
  const notes = String(formData.get('notes') || '').trim()
  const { error } = await supabase.from('appointments').update({ status, notes }).eq('id', id)
  if (error) throw new Error(error.message)
  await supabase.from('audit_logs').insert({ user_id: user.id, action: 'update', entity_type: 'appointment', entity_id: id, new_values: { status, notes } })
  revalidatePath('/admin/crm')
}

export async function convertInquiry(formData: FormData) {
  const { user } = await requireRole(staffRoles, '/admin/crm')
  const supabase = await createClient()
  const inquiryId = String(formData.get('inquiry_id') || '')
  const { data: inquiry, error: inquiryError } = await supabase.from('inquiries').select('*').eq('id', inquiryId).single()
  if (inquiryError || !inquiry) throw new Error('Pedido não encontrado.')
  if (inquiry.lead_id) redirect(`/admin/crm/leads/${inquiry.lead_id}`)
  const { data: existing } = await supabase.from('leads').select('id').eq('email', inquiry.email).eq('property_id', inquiry.property_id).limit(1).maybeSingle()
  const lead = existing ?? (await supabase.from('leads').insert({ name: inquiry.name, email: inquiry.email, phone: inquiry.phone, source: 'website_inquiry', property_id: inquiry.property_id, lead_type: 'general', status: 'new', notes: inquiry.message, assigned_to: inquiry.assigned_to }).select('id').single()).data
  if (!lead) throw new Error('Não foi possível criar o lead.')
  await supabase.from('inquiries').update({ lead_id: lead.id }).eq('id', inquiryId)
  await supabase.from('audit_logs').insert({ user_id: user.id, action: 'convert', entity_type: 'inquiry', entity_id: inquiryId, new_values: { lead_id: lead.id } })
  revalidatePath('/admin/crm'); redirect(`/admin/crm/leads/${lead.id}`)
}
