import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://plutonium.ao'
  return ['', '/properties'].map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: 'monthly', priority: path ? 0.8 : 1 }))
}
