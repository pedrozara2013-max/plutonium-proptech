'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function getDocumentUrl(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Sessão expirada.' }
  const { data: document } = await supabase.from('documents').select('storage_path').eq('id', id).eq('user_id', user.id).eq('status', 'active').single()
  if (!document) return { error: 'Documento não encontrado.' }
  const admin = createAdminClient()
  const { data, error } = await admin.storage.from('plutonium-private').createSignedUrl(document.storage_path, 300)
  if (error) return { error: 'Não foi possível preparar o download.' }
  return { url: data.signedUrl }
}

export async function markNotificationRead(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  await supabase.from('notifications').update({ is_read: true }).eq('id', id).eq('user_id', user.id)
  revalidatePath('/dashboard/notifications')
} 

export async function markAllNotificationsRead() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  await supabase.from('notifications').update({ is_read: true }).eq('user_id', user.id).eq('is_read', false)
  revalidatePath('/dashboard/notifications')
}
