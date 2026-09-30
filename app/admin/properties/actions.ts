'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireRole } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'

const staffRoles = ['super_admin', 'admin', 'property_manager']

export async function saveProperty(formData: FormData) {
  const { user } = await requireRole(staffRoles, '/admin/properties')
  const supabase = await createClient()
  const id = String(formData.get('id') || '')
  const title = String(formData.get('title') || '').trim()
  const slug = String(formData.get('slug') || '').trim()
  const province = String(formData.get('province') || '').trim()
  const municipality = String(formData.get('municipality') || '').trim()
  const neighborhood = String(formData.get('neighborhood') || '').trim()
  if (!title || !slug || !province || !municipality || !neighborhood) throw new Error('Preencha os campos obrigatórios.')
  const payload = {
    title, title_pt: title, slug, description: String(formData.get('description') || ''),
    property_type: String(formData.get('property_type') || 'apartment'), category: String(formData.get('category') || 'medium'),
    status: String(formData.get('status') || 'draft'), price: formData.get('price') ? Number(formData.get('price')) : null,
    currency: String(formData.get('currency') || 'AOA'), province, municipality, neighborhood,
    bedrooms: formData.get('bedrooms') ? Number(formData.get('bedrooms')) : null,
    bathrooms: formData.get('bathrooms') ? Number(formData.get('bathrooms')) : null,
    parking_spaces: formData.get('parking_spaces') ? Number(formData.get('parking_spaces')) : null,
    built_area_m2: formData.get('built_area_m2') ? Number(formData.get('built_area_m2')) : null,
    land_area_m2: formData.get('land_area_m2') ? Number(formData.get('land_area_m2')) : null,
    is_featured: formData.get('is_featured') === 'on', is_verified: formData.get('is_verified') === 'on',
    is_published: String(formData.get('status')) === 'published', agent_id: user.id,
  }
  const result = id ? await supabase.from('properties').update(payload).eq('id', id).select('id').single() : await supabase.from('properties').insert(payload).select('id').single()
  if (result.error) throw new Error(result.error.message)
  await supabase.from('audit_logs').insert({ user_id: user.id, action: id ? 'update' : 'create', entity_type: 'property', entity_id: result.data.id, new_values: payload })
  revalidatePath('/admin/properties'); revalidatePath(`/properties/${slug}`); redirect('/admin/properties')
}

export async function deleteProperty(formData: FormData) {
  const { user } = await requireRole(['super_admin', 'admin'], '/admin/properties')
  const supabase = await createClient(); const id = String(formData.get('id') || '')
  const { error } = await supabase.from('properties').delete().eq('id', id)
  if (error) throw new Error(error.message)
  await supabase.from('audit_logs').insert({ user_id: user.id, action: 'delete', entity_type: 'property', entity_id: id })
  revalidatePath('/admin/properties'); redirect('/admin/properties')
}
