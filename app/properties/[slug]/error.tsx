'use client'

export default function PropertyDetailError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="flex min-h-screen items-center justify-center bg-[#f7f9fc] px-6 text-center text-[#071d3d]"><div><p className="section-kicker">Detalhe do imóvel</p><h1 className="mt-3 text-3xl font-semibold">Não foi possível carregar este imóvel.</h1><button onClick={reset} className="mt-6 rounded-xl bg-[#0b3d91] px-5 py-3 font-semibold text-white">Tentar novamente</button></div></main>
}
