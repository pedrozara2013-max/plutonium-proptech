import { notFound } from 'next/navigation'
import { requireRole } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { AdminPropertyForm } from '@/components/admin-property-form'

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) { await requireRole(['super_admin','admin','property_manager'], '/admin/properties'); const supabase = await createClient(); const { data } = await supabase.from('properties').select('*').eq('id', (await params).id).maybeSingle(); if (!data) notFound(); return <section><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d91]">Catálogo</p><h1 className="mb-7 mt-2 text-3xl font-semibold tracking-tight">Editar imóvel</h1><AdminPropertyForm property={data} /></section> }
