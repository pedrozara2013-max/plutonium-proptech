'use client'

import { useState } from 'react'
import { CalendarDays, Check, Heart, Loader2, Share2, X } from 'lucide-react'
import { addFavorite, removeFavorite, submitAppointment, submitInquiry } from '@/app/properties/actions'

type Props = { propertyId: string; title: string; userId?: string | null; initiallyFavorite?: boolean }

type Modal = 'appointment' | 'inquiry' | null

export function PropertyDetailActions({ propertyId, title, userId, initiallyFavorite = false }: Props) {
  const [modal, setModal] = useState<Modal>(null)
  const [favorite, setFavorite] = useState(initiallyFavorite)
  const [busy, setBusy] = useState(false)
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState('')

  const toggleFavorite = async () => {
    if (!userId) { setMessage('Inicie sessão para guardar favoritos.'); return }
    setBusy(true)
    const result = favorite ? await removeFavorite(userId, propertyId) : await addFavorite(userId, propertyId)
    setBusy(false)
    if (result.ok) setFavorite(!favorite); else setMessage(result.message)
  }

  const share = async () => {
    const url = window.location.href
    try { if (navigator.share) await navigator.share({ title, url }); else { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1800) } } catch {}
  }

  const close = () => { setModal(null); setMessage('') }
  return <>
    <div className="flex flex-wrap gap-3">
      <button onClick={() => setModal('appointment')} className="inline-flex items-center gap-2 rounded-xl bg-[#ffc107] px-5 py-3 text-sm font-bold text-[#071d3d]"><CalendarDays className="size-4" /> Agendar visita</button>
      <button onClick={() => setModal('inquiry')} className="rounded-xl border border-[#0b3d91] px-5 py-3 text-sm font-bold text-[#0b3d91]">Solicitar informações</button>
      <button onClick={toggleFavorite} disabled={busy} className="inline-flex items-center gap-2 rounded-xl border border-[#dbe3ed] px-4 py-3 text-sm font-semibold"><Heart className={`size-4 ${favorite ? 'fill-[#0b3d91] text-[#0b3d91]' : ''}`} /> Favorito</button>
      <button onClick={share} className="inline-flex items-center gap-2 rounded-xl border border-[#dbe3ed] px-4 py-3 text-sm font-semibold">{copied ? <Check className="size-4" /> : <Share2 className="size-4" />} {copied ? 'Link copiado' : 'Partilhar'}</button>
    </div>
    {message && <p className="mt-3 text-sm text-[#b42318]">{message}</p>}
    {modal && <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-[#071d3d]/50 p-4" onClick={close}>
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4"><div><p className="section-kicker">{modal === 'appointment' ? 'Visita ao imóvel' : 'Contacto'}</p><h2 className="mt-1 text-2xl font-semibold text-[#071d3d]">{modal === 'appointment' ? 'Agendar visita' : 'Solicitar informações'}</h2></div><button onClick={close} aria-label="Fechar" className="rounded-lg p-2 text-[#607089] hover:bg-[#f1f4f8]"><X className="size-5" /></button></div>
        {modal === 'appointment' ? <AppointmentForm propertyId={propertyId} close={close} setBusy={setBusy} busy={busy} setMessage={setMessage} /> : <InquiryForm propertyId={propertyId} close={close} setBusy={setBusy} busy={busy} setMessage={setMessage} />}
      </div>
    </div>}
  </>
}

function Field({ label, name, type = 'text', required = true }: { label: string; name: string; type?: string; required?: boolean }) { return <label className="grid gap-1 text-sm font-medium text-[#071d3d]">{label}<input name={name} type={type} required={required} className="rounded-lg border border-[#dbe3ed] px-3 py-2.5 outline-none focus:border-[#0b3d91]" /></label> }
function FormActions({ close, busy }: { close: () => void; busy: boolean }) { return <div className="mt-5 flex justify-end gap-3"><button type="button" onClick={close} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-[#607089]">Cancelar</button><button disabled={busy} className="inline-flex items-center gap-2 rounded-lg bg-[#0b3d91] px-4 py-2.5 text-sm font-bold text-white">{busy && <Loader2 className="size-4 animate-spin" />} Enviar</button></div> }
function AppointmentForm({ propertyId, close, setBusy, busy, setMessage }: { propertyId: string; close: () => void; setBusy: (value: boolean) => void; busy: boolean; setMessage: (value: string) => void }) { const submit = async (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); const data = new FormData(event.currentTarget); setBusy(true); const result = await submitAppointment({ propertyId, name: String(data.get('name')), email: String(data.get('email')), phone: String(data.get('phone')), date: String(data.get('date')), time: String(data.get('time')), notes: String(data.get('notes') || '') }); setBusy(false); if (result.ok) { close(); alert('Pedido de visita enviado com sucesso.'); } else setMessage(result.message) }; return <form onSubmit={submit} className="mt-5 grid gap-3"><div className="grid gap-3 sm:grid-cols-2"><Field label="Nome" name="name" /><Field label="Telefone" name="phone" type="tel" /></div><Field label="Email" name="email" type="email" /><div className="grid gap-3 sm:grid-cols-2"><Field label="Data" name="date" type="date" /><Field label="Hora" name="time" type="time" /></div><label className="grid gap-1 text-sm font-medium text-[#071d3d]">Observações<textarea name="notes" rows={3} className="rounded-lg border border-[#dbe3ed] px-3 py-2.5" /></label><FormActions close={close} busy={busy} /></form> }
function InquiryForm({ propertyId, close, setBusy, busy, setMessage }: { propertyId: string; close: () => void; setBusy: (value: boolean) => void; busy: boolean; setMessage: (value: string) => void }) { const submit = async (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); const data = new FormData(event.currentTarget); setBusy(true); const result = await submitInquiry({ propertyId, name: String(data.get('name')), email: String(data.get('email')), phone: String(data.get('phone') || ''), message: String(data.get('message')) }); setBusy(false); if (result.ok) { close(); alert('Pedido de informação enviado com sucesso.'); } else setMessage(result.message) }; return <form onSubmit={submit} className="mt-5 grid gap-3"><Field label="Nome" name="name" /><Field label="Email" name="email" type="email" /><Field label="Telefone" name="phone" type="tel" required={false} /><label className="grid gap-1 text-sm font-medium text-[#071d3d]">Mensagem<textarea name="message" required minLength={10} rows={4} className="rounded-lg border border-[#dbe3ed] px-3 py-2.5" /></label><FormActions close={close} busy={busy} /></form> }
