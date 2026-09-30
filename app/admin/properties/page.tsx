import Link from 'next/link'
import { requireRole } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { deleteProperty } from './actions'

export default async function AdminPropertiesPage() {
  await requireRole(['super_admin', 'admin', 'property_manager'], '/admin/properties')
  const supabase = await createClient(); const { data, error } = await supabase.from('properties').select('id,title,slug,status,category,municipality,price,currency,is_published,updated_at').order('updated_at', { ascending: false })
  if (error) throw new Error(error.message)
  const properties = data ?? []
  return <section><div className="mb-7 flex items-end justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d91]">Catálogo</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">Imóveis</h1></div><Link href="/admin/properties/new" className="rounded-xl bg-[#0b3d91] px-4 py-2.5 text-sm font-semibold text-white">Novo imóvel</Link></div><div className="overflow-hidden rounded-2xl border border-[#dbe4f0] bg-white shadow-sm"><div className="divide-y divide-[#e7edf5]">{properties.map((property) => <div key={property.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-semibold">{property.title}</h2><p className="mt-1 text-sm text-[#58708f]">{property.municipality} · {property.category} · {property.status}</p></div><div className="flex items-center gap-3"><Link className="text-sm font-semibold text-[#0b3d91]" href={`/admin/properties/${property.id}`}>Editar</Link><form action={deleteProperty}><input type="hidden" name="id" value={property.id}/><button className="text-sm font-semibold text-red-600" type="submit">Eliminar</button></form></div></div>)}{properties.length === 0 && <p className="p-8 text-sm text-[#58708f]">Nenhum imóvel encontrado.</p>}</div></div></section>
}
