import { AuthForm } from '@/components/auth-form'
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ returnTo?: string }> }) { return <AuthForm mode="login" returnTo={(await searchParams).returnTo} /> }
