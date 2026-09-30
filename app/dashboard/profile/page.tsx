import { requireUser, getCurrentProfile } from '@/lib/auth'
import { ProfileForm } from '@/components/profile-form'
export default async function ProfilePage() { await requireUser('/dashboard/profile'); const profile = await getCurrentProfile(); return <section><h1 className="text-3xl font-semibold">Perfil</h1><p className="mt-2 mb-6 text-slate-600">Mantenha os seus dados atualizados.</p><ProfileForm profile={profile} /></section> }
