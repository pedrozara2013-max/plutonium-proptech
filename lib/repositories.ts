import { getPublishedProperties, getPublishedPropertyBySlug, getPublishedSimilarProperties } from '@/data/supabase-properties'

export const getProperties = getPublishedProperties
export const getPropertyBySlug = getPublishedPropertyBySlug
export const getSimilarProperties = getPublishedSimilarProperties
export async function listFeaturedProperties() { return (await getPublishedProperties({ featured: true })).items }
export { listInvestmentProjects } from '@/data/investments'

export type { AppointmentRepository, InvestmentRepository, LeadRepository, PropertyRepository, UserRepository } from '@/lib/repository-contracts'

// Demo implementations remain active until the Supabase connection phase.
// Future adapters must implement the contracts above without changing UI callers.
