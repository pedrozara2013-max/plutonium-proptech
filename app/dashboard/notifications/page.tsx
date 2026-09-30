import { requireUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { markAllNotificationsRead, markNotificationRead } from '../documents/actions'

export default async function NotificationsPage() {
  const user = await requireUser('/dashboard/notifications')
  const supabase = await createClient()
  const { data: notifications } = await supabase.from('notifications').select('id,title,message,link,is_read,created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(50)
  return <section><div className="flex items-start justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0b3d91]">Notificações</p><h1 className="mt-2 text-3xl font-bold">Centro de notificações</h1></div><form action={markAllNotificationsRead}><button className="text-sm font-semibold text-[#0b3d91]">Marcar tudo como lido</button></form></div><div className="mt-8 grid gap-3">{(notifications ?? []).map((notification) => <article key={notification.id} className={`rounded-2xl border p-5 ${notification.is_read ? 'border-[#dbe4f0] bg-white' : 'border-[#9ab7df] bg-[#eef5ff]'}`}><div className="flex items-start justify-between gap-4"><div><h2 className="font-semibold">{notification.title}</h2><p className="mt-1 text-sm text-slate-600">{notification.message}</p></div>{!notification.is_read && <form action={markNotificationRead.bind(null, notification.id)}><button className="text-xs font-semibold text-[#0b3d91]">Marcar lida</button></form>}</div></article>)}{!notifications?.length && <p className="rounded-2xl border border-dashed border-[#cbd8e8] bg-white p-8 text-slate-600">Não existem notificações novas.</p>}</div></section>
}
