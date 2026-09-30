import Link from 'next/link'
import { requireRole } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'

export default async function InvestorPage() {
  const { user } = await requireRole(['investor'], '/investor')
  const supabase = await createClient()
  const [{ count: opportunities }, { count: interests }, { count: documents }, { count: notifications }] = await Promise.all([
    supabase.from('investment_projects').select('id', { count: 'exact', head: true }).in('project_status', ['open', 'funding']),
    supabase.from('investment_interests').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
    supabase.from('documents').select('id', { count: 'exact', head: true }).eq('user_id', user.id).eq('status', 'active'),
    supabase.from('notifications').select('id', { count: 'exact', head: true }).eq('user_id', user.id).eq('is_read', false),
  ])
  return <section><p className="section-kicker">Área reservada</p><h1 className="section-title">O seu <span>investimento</span></h1><p className="mt-4 max-w-2xl text-lg leading-8 text-[#58708f]">Acompanhe oportunidades, manifestações de interesse e documentos num só lugar.</p><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['Interesses ativos', interests ?? 0, '/investor/interests'], ['Oportunidades disponíveis', opportunities ?? 0, '/investor/opportunities'], ['Documentos', documents ?? 0, '/investor/documents'], ['Notificações por ler', notifications ?? 0, '/dashboard/notifications']].map(([label, value, href]) => <Link href={href as string} key={label as string} className="rounded-2xl border border-[#dbe4f0] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg"><p className="text-sm text-[#58708f]">{label}</p><p className="mt-3 text-3xl font-bold text-[#0b3d91]">{value}</p><p className="mt-4 text-sm font-semibold text-[#0b3d91]">Abrir →</p></Link>)}</div><div className="mt-8 rounded-2xl border border-[#dbe4f0] bg-white p-6"><h2 className="text-xl font-semibold">Próximos passos</h2><div className="mt-4 flex flex-wrap gap-3"><Link href="/investor/opportunities" className="rounded-xl bg-[#0b3d91] px-4 py-3 text-sm font-semibold text-white">Ver oportunidades</Link><Link href="/investor/profile" className="rounded-xl border border-[#c7d5e6] px-4 py-3 text-sm font-semibold text-[#0b3d91]">Atualizar perfil</Link></div></div></section>
}
