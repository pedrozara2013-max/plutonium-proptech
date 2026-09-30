import Link from 'next/link'
import { requireRole } from '@/lib/auth'

export default async function InvestorLayout({ children }: { children: React.ReactNode }) {
  await requireRole(['investor'], '/investor')
  return <main className="min-h-screen bg-[#f7f9fc]"><nav className="border-b border-[#dbe4f0] bg-white"><div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-5 py-4"><Link href="/investor" className="mr-4 text-lg font-bold text-[#0b3d91]">Plutonium Capital</Link><Link href="/investor/opportunities" className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-[#eef5ff]">Oportunidades</Link><Link href="/investor/interests" className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-[#eef5ff]">Interesses</Link><Link href="/investor/documents" className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-[#eef5ff]">Documentos</Link><Link href="/investor/profile" className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-[#eef5ff]">Perfil</Link><Link href="/dashboard/notifications" className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-[#eef5ff]">Notificações</Link></div></nav><div className="mx-auto max-w-6xl px-5 py-10">{children}</div></main>
}
