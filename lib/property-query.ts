import type { PropertyCategory, PropertyFilters, PropertySort, PropertyStatus, PropertyType } from '@/types/domain'

const categories = new Set<PropertyCategory>(['luxury', 'medium-value', 'affordable', 'social-impact', 'commercial', 'land', 'investment'])
const propertyTypes = new Set<PropertyType>(['apartment', 'house', 'villa', 'townhouse', 'office', 'commercial', 'land', 'warehouse', 'development'])
const statuses = new Set<PropertyStatus>(['available', 'reserved', 'sold'])
const sorts = new Set<PropertySort>(['featured', 'newest', 'price-asc', 'price-desc', 'area-asc', 'area-desc'])

function text(value: string | null) { return value?.trim() || undefined }
function number(value: string | null, minimum = 0) {
  if (!value) return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= minimum ? parsed : undefined
}
function oneOf<T extends string>(value: string | null, values: Set<T>) {
  return value && values.has(value as T) ? value as T : undefined
}

export function parsePropertyQuery(params: URLSearchParams) {
  const filters: PropertyFilters = {
    keyword: text(params.get('keyword')),
    location: text(params.get('location')),
    municipality: text(params.get('municipality')),
    neighborhood: text(params.get('neighborhood')),
    category: oneOf(params.get('category'), categories),
    propertyType: oneOf(params.get('propertyType'), propertyTypes),
    minPrice: number(params.get('minPrice')),
    maxPrice: number(params.get('maxPrice')),
    bedrooms: number(params.get('bedrooms')),
    bathrooms: number(params.get('bathrooms')),
    minArea: number(params.get('minArea')),
    maxArea: number(params.get('maxArea')),
    availability: oneOf(params.get('availability'), statuses),
    featured: params.get('featured') === 'true' ? true : undefined,
    investmentOpportunity: params.get('investmentOpportunity') === 'true' ? true : undefined,
  }
  const pageSize = 9
  const requestedPage = number(params.get('page'), 1)
  return { filters, sort: oneOf(params.get('sort'), sorts) ?? 'featured', page: requestedPage ? Math.floor(requestedPage) : 1, pageSize }
}

export function searchParamsFromRecord(record: Record<string, string | string[] | undefined>) {
  return new URLSearchParams(Object.entries(record).flatMap(([key, value]) => value ? [[key, Array.isArray(value) ? value[0] : value]] : []))
}
