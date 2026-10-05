import { assertQaEnvironment } from '@/lib/environment'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    assertQaEnvironment()
    return Response.json(
      { environment: 'staging', isConfirmedStaging: true },
      { headers: { 'Cache-Control': 'no-store' } },
    )
  } catch {
    return Response.json(
      { environment: 'unknown', isConfirmedStaging: false },
      { headers: { 'Cache-Control': 'no-store' } },
    )
  }
}
