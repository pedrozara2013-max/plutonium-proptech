import { requireUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import DocumentList from './document-list'

export default async function DocumentsPage() {
  const user = await requireUser('/dashboard/documents')
  const supabase = await createClient()
  const { data: documents } = await supabase.from('documents').select('id,file_name,description,document_type,file_size,status,created_at').eq('user_id', user.id).eq('status', 'active').order('created_at', { ascending: false })
  return <section><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0b3d91]">Documentos</p><h1 className="mt-2 text-3xl font-bold">Centro de documentos</h1><p className="mt-2 text-slate-600">Aceda aos ficheiros disponibilizados para si.</p><DocumentList documents={documents ?? []} /></section>
}
