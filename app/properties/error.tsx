'use client'

export default function PropertiesError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="flex min-h-screen items-center justify-center bg-[#f7f9fc] px-6 text-center text-[#071d3d]"><div><p className="section-kicker">Mercado Plutonium</p><h1 className="mt-3 text-3xl font-semibold">Não foi possível carregar os imóveis.</h1><p className="mt-3 text-[#607089]">Tente novamente. Os dados demonstrativos continuam separados de qualquer pedido real.</p><button onClick={reset} className="mt-6 rounded-xl bg-[#0b3d91] px-5 py-3 font-semibold text-white">Tentar novamente</button></div></main>
}
