import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireRole } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { updateLead } from '../../actions'

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole(['super_admin','admin','property_manager'], '/admin/crm')
  const { id } = await params
  const supabase = await createClient()
  const { data: lead } = await supabase.from('leads').select('*').eq('id', id).single()
  if (!lead) notFound()
  const [{ data: inquiries }, { data: appointments }] = await Promise.all([
    supabase.from('inquiries').select('id,message,created_at,status').eq('lead_id', id).order('created_at', { ascending: false }),
    supabase.from('appointments').select('id,scheduled_at,status,appointment_type,notes').eq('user_id', lead.assigned_to ?? '').order('scheduled_at', { ascending: false }).limit(20),
  ])
  return <section className="space-y-6"><Link href="/admin/crm" className="text-sm font-semibold text-[#0b3d91]">← Voltar ao CRM</Link><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm text-[#58708f]">Lead</p><h1 className="mt-1 text-3xl font-semibold">{lead.name}</h1><p className="mt-2 text-sm text-[#58708f]">{lead.email || 'Sem email'} · {lead.phone || 'Sem telefone'}</p></div><span className="rounded-full bg-[#eaf1fa] px-3 py-1 text-sm font-semibold">{lead.lead_type}</span></div><form action={updateLead} className="rounded-2xl border border-[#dbe4f0] bg-white p-5"><input type="hidden" name="id" value={lead.id}/><div className="grid gap-4 md:grid-cols-2"><label className="text-sm font-medium">Estado<select name="status" defaultValue={lead.status} className="mt-2 w-full rounded-xl border border-[#dbe4f0] bg-white px-3 py-2"><option value="new">Novo</option><option value="contacted">Contactado</option><option value="qualified">Qualificado</option><option value="viewing">Visita</option><option value="proposal">Proposta</option><option value="negotiation">Negociação</option><option value="converted">Convertido</option><option value="lost">Perdido</option></select></label><label className="text-sm font-medium">Responsável<input name="assigned_to" defaultValue={lead.assigned_to || ''} placeholder="UUID do agente" className="mt-2 w-full rounded-xl border border-[#dbe4f0] px-3 py-2"/></label></div><label className="mt-4 block text-sm font-medium">Notas<textarea name="notes" defaultValue={lead.notes || ''} rows={5} className="mt-2 w-full rounded-xl border border-[#dbe4f0] px-3 py-2"/></label><button className="mt-4 rounded-xl bg-[#0b3d91] px-4 py-2.5 text-sm font-semibold text-white">Guardar alterações</button></form><div className="grid gap-6 lg:grid-cols-2"><div className="rounded-2xl border border-[#dbe4f0] bg-white p-5"><h2 className="font-semibold">Pedidos associados</h2>{(inquiries ?? []).map((item) => <div key={item.id} className="mt-3 rounded-xl bg-[#f5f8fc] p-3 text-sm"><p>{item.message}</p><p className="mt-1 text-xs text-[#58708f]">{new Date(item.created_at).toLocaleString('pt-PT')} · {item.status}</p></div>)}</div><div className="rounded-2xl border border-[#dbe4f0] bg-white p-5"><h2 className="font-semibold">Histórico de visitas</h2>{(appointments ?? []).map((item) => <div key={item.id} className="mt-3 rounded-xl bg-[#f5f8fc] p-3 text-sm"><p>{new Date(item.scheduled_at).toLocaleString('pt-PT')}</p><p className="mt-1 text-xs text-[#58708f]">{item.appointment_type} · {item.status}</p></div>)}</div></div></section>
}
