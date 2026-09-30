import { getProperties } from '@/lib/repositories'
import { PropertyMarketplace } from '@/components/property-marketplace'
import { parsePropertyQuery, searchParamsFromRecord } from '@/lib/property-query'

export const metadata = { title: 'Imóveis | Plutonium PropTech', description: 'Explore imóveis e oportunidades demonstrativas da Plutonium PropTech em Angola.' }

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { filters, sort, page, pageSize } = parsePropertyQuery(searchParamsFromRecord(await searchParams))
  const result = await getProperties(filters, { page, pageSize }, sort)
  return <PropertyMarketplace page={result} filters={filters} sort={sort} />
}
