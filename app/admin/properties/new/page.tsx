import { requireRole } from '@/lib/auth'
import { AdminPropertyForm } from '@/components/admin-property-form'

export default async function NewPropertyPage() { await requireRole(['super_admin','admin','property_manager'], '/admin/properties/new'); return <section><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d91]">Catálogo</p><h1 className="mb-7 mt-2 text-3xl font-semibold tracking-tight">Novo imóvel</h1><AdminPropertyForm /></section> }
