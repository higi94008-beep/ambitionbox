export default function CompanyHeader() {
  return (
    <section className="container-page -mt-8 relative z-10">
      <div className="rounded-3xl border border-line bg-white p-5 shadow-sm md:p-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border bg-white text-sm font-semibold">LOGO</div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold">Asian Paints</h2>
                <span className="rounded-full bg-amber-100 px-2 py-1 text-xs">Verified</span>
              </div>
              <p className="mt-2 text-sm text-slate-500">3.9 rating • 10.5k reviews</p>
              <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">“Join us Today to Colour your Tomorrow!”</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">Write a Review</button>
            <button className="rounded-full border px-4 py-2 text-sm font-semibold">Follow</button>
            <button className="rounded-full border px-4 py-2 text-sm font-semibold">Compare</button>
          </div>
        </div>
      </div>
    </section>
  )
}
