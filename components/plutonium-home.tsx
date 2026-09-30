'use client'

import {
  ArrowRight,
  BarChart3,
  Building2,
  ChevronDown,
  Globe2,
  House,
  Leaf,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { demoProperties } from '@/data/properties'

const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/P%20LOGO-HSIhJdO9nqU9sx8PVnAnhToHAm0YWu.jpeg'

const properties = demoProperties.map((property) => ({
  ...property,
  place: `${property.neighborhood}, ${property.province}`,
  type: property.category === 'investment' ? 'Investimento' : property.propertyType === 'house' ? 'Moradia' : 'Apartamento',
  price: property.price ? `${property.price.toLocaleString('pt-AO')} ${property.currency}` : 'Sob consulta',
}))

const categories = [
  { name: 'Residencial', label: 'Espaços para viver melhor', icon: House },
  { name: 'Comercial', label: 'Activos para crescer', icon: Building2 },
  { name: 'Investimento', label: 'Oportunidades com visão', icon: BarChart3 },
]

export function PlutoniumHome() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f9fc] text-[#142238]">
      <nav className="absolute inset-x-0 top-0 z-30 border-b border-white/15 bg-[#071d3d]/85 text-white backdrop-blur-md">
        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 lg:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="Plutonium PropTech início">
            <img src={logoUrl} alt="PLUTONIUM PropTech" className="h-11 w-auto rounded-sm object-contain mix-blend-screen" />
            <span className="sr-only">PLUTONIUM PropTech — O Elo Entre O Sonho e Chave Na Mão</span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium lg:flex">
            <a href="#imoveis" className="text-white/80 transition hover:text-[#ffc107]">Imóveis</a>
            <a href="#investimentos" className="text-white/80 transition hover:text-[#ffc107]">Investimentos</a>
            <a href="#sobre" className="text-white/80 transition hover:text-[#ffc107]">Sobre nós</a>
            <a href="#contacto" className="text-white/80 transition hover:text-[#ffc107]">Contacto</a>
          </div>
          <div className="hidden items-center gap-4 lg:flex">
            <button className="flex items-center gap-2 text-sm text-white/80"><Globe2 className="size-4" /> PT <ChevronDown className="size-3" /></button>
            <a href="#contacto" className="rounded-full bg-[#ffc107] px-5 py-3 text-sm font-bold text-[#071d3d] transition hover:bg-white">Fale connosco</a>
          </div>
          <button className="rounded-lg p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <div className="border-t border-white/15 bg-[#071d3d] px-5 py-5 lg:hidden"><div className="flex flex-col gap-5 text-sm"><a href="#imoveis" onClick={() => setMenuOpen(false)}>Imóveis</a><a href="#investimentos" onClick={() => setMenuOpen(false)}>Investimentos</a><a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre nós</a><a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a></div></div>}
      </nav>

      <section id="top" className="relative flex min-h-[720px] items-center bg-[#071d3d] pt-28 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,193,7,.24),transparent_28%),linear-gradient(110deg,#071d3d_15%,rgba(7,29,61,.83)_55%,rgba(7,29,61,.35)),url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=85')] bg-cover bg-center" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 pb-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-10">
          <div className="max-w-2xl">
            <div className="mb-6 flex flex-col items-start gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ffc107]/35 bg-[#ffc107]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.18em] text-[#ffc107]"><Sparkles className="size-3.5" /> PropTech angolana</div>
              <p className="text-sm font-medium tracking-wide text-white/75">PLUTONIUM PropTech · O Elo Entre O Sonho e Chave Na Mão</p>
            </div>
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-.04em] sm:text-6xl lg:text-8xl">O seu próximo <span className="text-[#ffc107]">espaço</span> começa aqui.</h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-white/70">Transformamos o imobiliário com tecnologia, clareza e uma visão construída para o futuro de Angola.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#imoveis" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#ffc107] px-7 py-4 font-bold text-[#071d3d] transition hover:bg-white">Explorar imóveis <ArrowRight className="size-4" /></a><a href="#investimentos" className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 font-semibold text-white transition hover:border-[#ffc107] hover:text-[#ffc107]">Ver oportunidades</a></div>
          </div>
          <div className="hidden justify-end lg:flex"><div className="w-[310px] rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl"><div className="mb-20 flex items-center justify-between text-xs text-white/70"><span>PLUTONIUM INDEX</span><span className="rounded-full bg-[#ffc107] px-2 py-1 font-bold text-[#071d3d]">2024</span></div><div className="text-5xl font-semibold tracking-tight">9 regiões</div><p className="mt-2 text-sm text-white/60">onde novas possibilidades estão a nascer.</p><div className="mt-7 h-1 rounded-full bg-white/15"><div className="h-full w-3/4 rounded-full bg-[#ffc107]" /></div></div></div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-9 max-w-6xl px-5 lg:px-10"><div className="rounded-2xl bg-white p-3 shadow-xl shadow-[#071d3d]/10"><div className="flex flex-col gap-3 md:flex-row"><div className="flex flex-1 items-center gap-3 rounded-xl bg-[#f3f6fa] px-5 py-4 text-sm text-[#607089]"><Search className="size-5 text-[#0b3d91]" /><span>Pesquise por localização, tipo ou projecto</span></div><button className="rounded-xl bg-[#0b3d91] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#071d3d]">Encontrar um imóvel</button></div></div></section>

      <section id="imoveis" className="mx-auto max-w-7xl px-5 py-24 lg:px-10"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="section-kicker">Selecção Plutonium</p><h2 className="section-title">Espaços com <span>propósito.</span></h2></div><a href="#imoveis" className="inline-flex items-center gap-2 text-sm font-bold text-[#0b3d91]">Ver todos os imóveis <ArrowRight className="size-4" /></a></div><div className="mt-10 grid gap-6 md:grid-cols-3">{properties.map((property) => <article key={property.title} className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="relative aspect-[1.12] overflow-hidden"><img src={property.image} alt={property.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#0b3d91]">{property.type}</span><button className="absolute right-4 top-4 rounded-full bg-[#071d3d]/70 p-2 text-white" aria-label={`Guardar ${property.title}`}>♡</button></div><div className="p-5"><p className="text-xs font-semibold uppercase tracking-wider text-[#8a98aa]">{property.place}</p><h3 className="mt-2 text-xl font-semibold">{property.title}</h3><div className="mt-5 flex items-center justify-between border-t border-[#e8edf3] pt-4"><span className="text-sm text-[#607089]">{property.price}</span><ArrowRight className="size-4 text-[#ffc107]" /></div></div></article>)}</div></section>

      <section className="bg-[#eef3f8] px-5 py-20 lg:px-10"><div className="mx-auto max-w-7xl"><div className="max-w-xl"><p className="section-kicker">Encontre o seu lugar</p><h2 className="section-title">Uma cidade. <span>Muitas possibilidades.</span></h2></div><div className="mt-10 grid gap-4 md:grid-cols-3">{categories.map(({ name, label, icon: Icon }) => <a href="#imoveis" key={name} className="group rounded-2xl border border-[#dae3ee] bg-white p-7 transition hover:border-[#ffc107] hover:shadow-lg"><Icon className="size-8 text-[#0b3d91]" strokeWidth={1.5} /><h3 className="mt-14 text-2xl font-semibold">{name}</h3><p className="mt-2 text-sm text-[#607089]">{label}</p><ArrowRight className="mt-7 size-5 text-[#ffc107] transition group-hover:translate-x-1" /></a>)}</div></div></section>

      <section id="investimentos" className="bg-[#071d3d] px-5 py-24 text-white lg:px-10"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="section-kicker text-[#ffc107]">Para investidores</p><h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Invista onde o futuro está a acontecer.</h2><p className="mt-6 leading-8 text-white/65">Aceda a oportunidades imobiliárias seleccionadas e tome decisões com informação, contexto e confiança.</p><a href="#contacto" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#ffc107] px-6 py-3.5 font-bold text-[#071d3d]">Conhecer oportunidades <ArrowRight className="size-4" /></a></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-white/15 bg-white/5 p-6"><BarChart3 className="size-7 text-[#ffc107]" /><h3 className="mt-16 text-xl font-semibold">Dados que orientam</h3><p className="mt-2 text-sm leading-6 text-white/55">Uma leitura mais clara do mercado para escolhas mais conscientes.</p></div><div className="rounded-2xl border border-white/15 bg-white/5 p-6"><ShieldCheck className="size-7 text-[#ffc107]" /><h3 className="mt-16 text-xl font-semibold">Confiança em cada etapa</h3><p className="mt-2 text-sm leading-6 text-white/55">Um processo simples, transparente e pensado para pessoas.</p></div></div></div></section>

      <section id="sobre" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-2 lg:items-center lg:px-10"><div className="relative overflow-hidden rounded-3xl"><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85" alt="Espaço de trabalho moderno" className="aspect-[1.08] w-full object-cover" /><div className="absolute bottom-5 left-5 rounded-2xl bg-[#ffc107] p-5 text-[#071d3d]"><p className="text-3xl font-bold">01</p><p className="mt-1 max-w-[130px] text-sm font-semibold">tecnologia com impacto real</p></div></div><div><p className="section-kicker">Porquê Plutonium</p><h2 className="section-title">O elo entre o <span>sonho</span> e a chave na mão.</h2><p className="mt-6 leading-8 text-[#607089]">Somos uma plataforma imobiliária criada para aproximar pessoas, projectos e capital. Tornamos cada decisão mais informada e cada jornada mais humana.</p><div className="mt-8 grid gap-5 sm:grid-cols-2"><div><Leaf className="size-6 text-[#0b3d91]" /><h3 className="mt-3 font-semibold">Visão sustentável</h3><p className="mt-1 text-sm leading-6 text-[#607089]">Pensamos no valor que permanece.</p></div><div><Globe2 className="size-6 text-[#0b3d91]" /><h3 className="mt-3 font-semibold">Visão local</h3><p className="mt-1 text-sm leading-6 text-[#607089]">Construído para Angola, aberto ao mundo.</p></div></div></div></section>

      <section id="contacto" className="px-5 pb-16 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 rounded-3xl bg-[#e5edf6] p-8 sm:p-12 lg:flex-row lg:items-end"><div><p className="section-kicker">Vamos conversar</p><h2 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-[#071d3d]">A próxima grande oportunidade pode começar com uma conversa.</h2></div><a href="mailto:hello@plutonium.ao" className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#0b3d91] px-7 py-4 font-bold text-white transition hover:bg-[#071d3d]">Entrar em contacto <ArrowRight className="size-4" /></a></div></section>

      <footer className="bg-[#071d3d] px-5 py-10 text-white lg:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"><div><img src={logoUrl} alt="Plutonium" className="h-12 w-auto rounded-sm object-contain mix-blend-screen" /><p className="mt-4 max-w-xs text-sm leading-6 text-white/50">Transformando o imobiliário com tecnologia.</p></div><div className="text-sm text-white/50">© 2024 Plutonium PropTech. Projecto demonstrativo.</div></div></footer>
    </main>
  )
}
