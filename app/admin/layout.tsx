import Link from 'next/link'
import { requireRole } from '@/lib/auth'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireRole(['super_admin', 'admin', 'property_manager'], '/admin')
  return <div className="min-h-screen bg-[#f5f8fc] text-[#071d3d]"><header className="border-b border-[#dbe4f0] bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"><Link href="/admin" className="font-semibold tracking-tight">Plutonium Admin</Link><span className="text-sm text-[#58708f]">{profile.first_name || 'Administrador'} · {profile.role}</span></div></header><div className="mx-auto flex max-w-7xl gap-6 px-5 py-6"><aside className="hidden w-56 shrink-0 md:block"><nav className="space-y-1"><Link className="admin-nav-link" href="/admin">Visão geral</Link><Link className="admin-nav-link" href="/admin/properties">Imóveis</Link><Link className="admin-nav-link" href="/admin/crm">CRM</Link><Link className="admin-nav-link" href="/dashboard">Área do cliente</Link></nav></aside><main className="min-w-0 flex-1">{children}</main></div></div>
}
