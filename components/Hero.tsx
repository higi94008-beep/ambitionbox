export default function Hero() {
  return (
    <section className="overflow-hidden rounded-b-[28px] bg-[#48358b] text-white">
      <div className="container-page grid min-h-[250px] items-center gap-6 py-10 md:grid-cols-[1fr_1.4fr_1fr]">
        <div className="hidden md:block">
          <div className="h-40 rounded-3xl bg-white/10" />
        </div>
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-white/70">Employer Brand</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">Shape the spaces that shape lives</h1>
          <button className="mt-6 rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-900">Build With Us</button>
        </div>
        <div className="hidden md:block">
          <div className="h-40 rounded-3xl bg-orange-400/40" />
        </div>
      </div>
    </section>
  )
}
