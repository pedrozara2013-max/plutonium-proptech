"use server"

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/auth'

export async function submitInvestmentInterest(formData: FormData) {
  const user = await requireUser('/investments')
  const projectId = String(formData.get('projectId') || '')
  const amount = Number(formData.get('amount'))
  const notes = String(formData.get('notes') || '').trim()
  if (!projectId || !Number.isFinite(amount) || amount <= 0) throw new Error('Informe um valor válido.')
  const supabase = await createClient()
  const { error } = await supabase.from('investment_interests').insert({ user_id: user.id, investment_project_id: projectId, amount, currency: 'AOA', notes, status: 'submitted' })
  if (error) throw new Error(error.message)
  revalidatePath('/investments')
  revalidatePath('/dashboard/investments')
}

export async function withdrawInvestmentInterest(formData: FormData) {
  const user = await requireUser('/dashboard/investments')
  const id = String(formData.get('id') || '')
  const supabase = await createClient()
  const { error } = await supabase.from('investment_interests').update({ status: 'withdrawn' }).eq('id', id).eq('user_id', user.id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/investments')
}
