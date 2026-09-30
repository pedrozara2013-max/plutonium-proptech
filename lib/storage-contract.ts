export const storageBuckets = { public: 'plutonium-public', private: 'plutonium-private' } as const

export const publicStoragePaths = {
  branding: 'branding',
  propertyGallery: (propertyId: string) => `properties/${propertyId}/gallery`,
  property360: (propertyId: string) => `properties/${propertyId}/360`,
  propertyVideos: (propertyId: string) => `properties/${propertyId}/videos`,
  propertyFloorplans: (propertyId: string) => `properties/${propertyId}/floorplans`,
} as const

export const privateStoragePaths = {
  user: (userId: string) => `users/${userId}`,
  investorDocuments: (userId: string) => `investors/${userId}/documents`,
  investorAgreements: (userId: string) => `investors/${userId}/agreements`,
  investorStatements: (userId: string) => `investors/${userId}/statements`,
} as const

export type StorageVisibility = 'public' | 'private'
