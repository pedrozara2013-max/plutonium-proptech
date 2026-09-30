'use client'

import { useState } from 'react'
import { getDocumentUrl } from './actions'

export default function DocumentList({ documents }: { documents: Array<{ id: string; file_name: string; description: string; document_type: string; file_size: number; created_at: string }> }) {
  const [loading, setLoading] = useState<string | null>(null)
  async function download(id: string) { setLoading(id); const result = await getDocumentUrl(id); setLoading(null); if (result.url) window.open(result.url, '_blank', 'noopener,noreferrer') }
  if (!documents.length) return <div className="mt-8 rounded-2xl border border-dashed border-[#cbd8e8] bg-white p-8 text-slate-600">Ainda não existem documentos disponíveis.</div>
  return <div className="mt-8 grid gap-4">{documents.map((document) => <article key={document.id} className="flex flex-col gap-4 rounded-2xl border border-[#dbe4f0] bg-white p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-semibold">{document.file_name}</h2><p className="mt-1 text-sm text-slate-500">{document.description || document.document_type} · {Math.max(1, Math.round(document.file_size / 1024))} KB</p></div><button onClick={() => download(document.id)} className="rounded-xl bg-[#0b3d91] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60" disabled={loading === document.id}>{loading === document.id ? 'A preparar…' : 'Descarregar'}</button></article>)}</div>
}
