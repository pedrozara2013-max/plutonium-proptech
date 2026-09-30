import { requireUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { withdrawInvestmentInterest } from '@/app/investments/actions'

export default async function InvestorDashboardPage() {
  const user = await requireUser('/dashboard/investments')
  const supabase = await createClient()
  const { data: interests } = await supabase.from('investment_interests').select('*, investment_projects(title,slug)').eq('user_id', user.id).order('created_at', { ascending: false })
  return <section><p className="section-kicker">Área do investidor</p><h1 className="section-title">Os meus <span>investimentos</span></h1><div className="mt-8 space-y-4">{(interests ?? []).map((interest) => <article key={interest.id} className="rounded-2xl border border-[#dbe4f0] bg-white p-5"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-lg font-semibold">{interest.investment_projects?.title || 'Oportunidade'}</h2><p className="mt-1 text-sm text-[#58708f]">{Number(interest.amount).toLocaleString('pt-PT')} {interest.currency}</p></div><span className="rounded-full bg-[#eaf1fa] px-3 py-1 text-xs font-semibold text-[#0b3d91]">{interest.status}</span></div><p className="mt-4 text-sm text-[#58708f]">Submetido em {new Date(interest.created_at).toLocaleDateString('pt-PT')}</p>{!['withdrawn','declined','completed'].includes(interest.status) && <form action={withdrawInvestmentInterest} className="mt-4"><input type="hidden" name="id" value={interest.id} /><button className="text-sm font-semibold text-[#9b3d35]">Retirar interesse</button></form>}</article>)}{!interests?.length && <p className="rounded-2xl bg-white p-8 text-[#58708f]">Ainda não manifestou interesse em nenhuma oportunidade.</p>}</div></section>
}
