import { createClient } from '@/lib/supabase/server'
import { demoProperties, getProperties as getDemoProperties, getPropertyBySlug as getDemoPropertyBySlug, getSimilarProperties as getDemoSimilarProperties } from '@/data/properties'
import type { Property, PropertyFilters, PropertyPage, PropertySort } from '@/types/domain'

const configured = () => Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

function mapProperty(row: Record<string, unknown>): Property {
  const categoryMap: Record<string, Property['category']> = { medium: 'medium-value', social_impact: 'social-impact', investment: 'investment', luxury: 'luxury', affordable: 'affordable', commercial: 'commercial', land: 'land' }
  return {
    id: String(row.id), title: String(row.title_pt || row.title || ''), titlePt: row.title_pt as string | null, titleEn: row.title_en as string | null, slug: String(row.slug), description: String(row.description_pt || row.description || ''), descriptionPt: row.description_pt as string | null, descriptionEn: row.description_en as string | null,
    propertyType: row.property_type as Property['propertyType'], category: categoryMap[String(row.category)] ?? 'commercial', status: row.status === 'published' ? 'available' : 'reserved', price: row.price == null ? null : Number(row.price), currency: row.currency as Property['currency'], country: String(row.country), province: String(row.province), municipality: String(row.municipality), neighborhood: String(row.neighborhood), address: row.address as string | null, latitude: row.latitude as number | null, longitude: row.longitude as number | null, bedrooms: row.bedrooms as number | null, bathrooms: row.bathrooms as number | null, parkingSpaces: row.parking_spaces as number | null, builtArea: row.built_area_m2 as number | null, landArea: row.land_area_m2 as number | null, yearBuilt: row.year_built as number | null, isFeatured: Boolean(row.is_featured), isVerified: Boolean(row.is_verified), isPublished: Boolean(row.is_published), isInvestmentOpportunity: row.category === 'social_impact', agentId: row.agent_id as string | null, image: '', gallery: [], features: [],
  }
}

export async function getPublishedProperties(filters: PropertyFilters = {}, pagination = { page: 1, pageSize: 9 }, sort: PropertySort = 'featured'): Promise<PropertyPage> {
  if (!configured()) return getDemoProperties(filters, pagination, sort)
  const supabase = await createClient()
  let query = supabase.from('properties').select('*', { count: 'exact' }).eq('is_published', true).eq('status', 'published')
  if (filters.keyword) query = query.or(`title.ilike.%${filters.keyword}%,description.ilike.%${filters.keyword}%,neighborhood.ilike.%${filters.keyword}%`)
  if (filters.municipality) query = query.eq('municipality', filters.municipality)
  if (filters.neighborhood) query = query.eq('neighborhood', filters.neighborhood)
  if (filters.category) query = query.eq('category', filters.category)
  if (filters.propertyType) query = query.eq('property_type', filters.propertyType)
  if (filters.minPrice !== undefined) query = query.gte('price', filters.minPrice)
  if (filters.maxPrice !== undefined) query = query.lte('price', filters.maxPrice)
  if (filters.bedrooms !== undefined) query = query.gte('bedrooms', filters.bedrooms)
  if (filters.bathrooms !== undefined) query = query.gte('bathrooms', filters.bathrooms)
  if (filters.minArea !== undefined) query = query.gte('built_area_m2', filters.minArea)
  if (filters.maxArea !== undefined) query = query.lte('built_area_m2', filters.maxArea)
  if (filters.featured) query = query.eq('is_featured', true)
  const order = sort === 'price-asc' ? ['price', { ascending: true }] : sort === 'price-desc' ? ['price', { ascending: false }] : sort === 'area-asc' ? ['built_area_m2', { ascending: true }] : sort === 'area-desc' ? ['built_area_m2', { ascending: false }] : ['created_at', { ascending: false }]
  query = query.order(order[0] as string, order[1] as { ascending: boolean })
  const from = (pagination.page - 1) * pagination.pageSize
  const { data, count, error } = await query.range(from, from + pagination.pageSize - 1)
  if (error) throw new Error('Unable to load published properties')
  const items = (data ?? []).map(mapProperty)
  return { items, total: count ?? 0, page: pagination.page, pageSize: pagination.pageSize, totalPages: Math.max(1, Math.ceil((count ?? 0) / pagination.pageSize)) }
}

export async function getPublishedPropertyBySlug(slug: string) {
  if (!configured()) return getDemoPropertyBySlug(slug)
  const supabase = await createClient()
  const { data, error } = await supabase.from('properties').select('*').eq('slug', slug).eq('is_published', true).eq('status', 'published').maybeSingle()
  if (error) throw new Error('Unable to load property')
  return data ? mapProperty(data) : undefined
}

export async function getPublishedSimilarProperties(property: Property) {
  if (!configured()) return getDemoSimilarProperties(property)
  const supabase = await createClient()
  const { data } = await supabase.from('properties').select('*').eq('is_published', true).eq('status', 'published').neq('id', property.id).or(`category.eq.${property.category},municipality.eq.${property.municipality}`).limit(3)
  return (data ?? []).map(mapProperty)
}

export { demoProperties }
