import { createClient } from '@/lib/supabase/server'
import { storageBuckets } from '@/lib/storage-contract'

export async function getPropertyMedia(propertyId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('property_media').select('id,media_type,storage_path,public_url,alt_text,sort_order').eq('property_id', propertyId).neq('media_type', 'document').order('sort_order')
  if (error) throw new Error('Unable to load property media')
  return (data ?? []).map((media) => ({ ...media, url: media.public_url || supabase.storage.from(storageBuckets.public).getPublicUrl(media.storage_path).data.publicUrl }))
}
