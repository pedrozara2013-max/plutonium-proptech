export type PropertyType = 'apartment' | 'house' | 'villa' | 'townhouse' | 'office' | 'commercial' | 'land' | 'warehouse' | 'development'
export type PropertyCategory = 'luxury' | 'medium-value' | 'affordable' | 'social-impact' | 'commercial' | 'land' | 'investment'
export type PropertyStatus = 'available' | 'reserved' | 'sold'
export type PropertySort = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'area-asc' | 'area-desc'

export interface Property {
  id: string; title: string; titlePt?: string | null; titleEn?: string | null; slug: string; description: string; descriptionPt?: string | null; descriptionEn?: string | null; propertyType: PropertyType; category: PropertyCategory; status: PropertyStatus; price: number | null; currency: 'AOA' | 'USD'; country: string; province: string; municipality: string; neighborhood: string; address: string | null; latitude: number | null; longitude: number | null; bedrooms: number | null; bathrooms: number | null; parkingSpaces: number | null; builtArea: number | null; landArea: number | null; yearBuilt: number | null; isFeatured: boolean; isVerified: boolean; isPublished: boolean; isInvestmentOpportunity: boolean; agentId: string | null; image: string; gallery: string[]; features: string[]
}
export interface PropertyFilters { keyword?: string; location?: string; municipality?: string; neighborhood?: string; category?: PropertyCategory; propertyType?: PropertyType; minPrice?: number; maxPrice?: number; bedrooms?: number; bathrooms?: number; minArea?: number; maxArea?: number; availability?: PropertyStatus; featured?: boolean; investmentOpportunity?: boolean }
export interface PropertyPage { items: Property[]; total: number; page: number; pageSize: number; totalPages: number }
export interface InvestmentProject { id: string; title: string; slug: string; description: string; location: string; minimumInvestment: number; targetAmount: number; raisedAmount: number; currency: 'AOA' | 'USD'; projectStatus: 'draft' | 'open' | 'funded' | 'closed'; expectedReturn: string; investmentPeriod: string; riskDisclosure: string; startDate: string; endDate: string | null }
export interface Lead { id: string; name: string; email: string; phone: string | null; message: string; createdAt: string }
export interface Appointment { id: string; propertyId: string; name: string; email: string; scheduledAt: string; status: 'requested' | 'confirmed' | 'cancelled' }
export interface UserProfile { id: string; displayName: string; email: string; role: 'buyer' | 'investor' | 'agent' | 'admin'; locale: 'pt' | 'en' }
