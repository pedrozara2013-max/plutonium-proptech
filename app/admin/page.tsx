import Link from 'next/link'
import { requireRole } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'

export default async function AdminPage() {
  await requireRole(['super_admin', 'admin', 'property_manager'], '/admin')
  const supabase = await createClient()
  const [{ count: total }, { count: published }, { count: pending }, { count: leads }] = await Promise.all([
    supabase.from('properties').select('*', { count: 'exact', head: true }),
    supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'pending_review'),
    supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'new'),
  ])
  const cards = [['Imóveis', total ?? 0], ['Publicados', published ?? 0], ['Em revisão', pending ?? 0], ['Novos leads', leads ?? 0]]
  return <section><div className="mb-7 flex items-end justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d91]">Operações</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">Visão geral</h1></div><Link href="/admin/properties/new" className="rounded-xl bg-[#0b3d91] px-4 py-2.5 text-sm font-semibold text-white">Adicionar imóvel</Link></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{cards.map(([label, value]) => <div key={String(label)} className="rounded-2xl border border-[#dbe4f0] bg-white p-5 shadow-sm"><p className="text-sm text-[#58708f]">{label}</p><p className="mt-3 text-3xl font-semibold">{value}</p></div>)}</div><div className="mt-6 rounded-2xl border border-[#dbe4f0] bg-white p-6"><h2 className="font-semibold">Gestão de catálogo</h2><p className="mt-2 text-sm text-[#58708f]">Crie, edite, publique e acompanhe o histórico de imóveis através do painel administrativo.</p><div className="mt-5 flex gap-5 text-sm font-semibold"><Link href="/admin/properties" className="text-[#0b3d91]">Abrir catálogo →</Link><Link href="/admin/crm" className="text-[#0b3d91]">Abrir CRM →</Link></div></div></section>
}
