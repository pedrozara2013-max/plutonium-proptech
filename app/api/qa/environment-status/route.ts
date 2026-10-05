import { getQaEnvironmentStatus } from '@/lib/environment'

export const dynamic = 'force-dynamic'

export async function GET() {
  return Response.json(getQaEnvironmentStatus(), {
    headers: { 'Cache-Control': 'no-store' },
  })
}
