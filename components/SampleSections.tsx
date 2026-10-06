import SectionHeading from './SectionHeading'

const leaders = [
  { name: 'Amit Syngle', role: 'MD & CEO' },
  { name: 'Savitha Shivsankar', role: 'CHRO' },
]

const benefits = [
  ['Employee Health & Wellbeing', 'Physical and mental wellbeing initiatives, counselling support and wellness resources.'],
  ['Family Support and Care', 'Maternity support, paternity leave, adoption and family care programmes.'],
  ['Other Benefits', 'Competitive salaries, pension support, learning support and employee benefits.'],
]

export default function SampleSections() {
  return (
    <main className="container-page py-12 md:py-16">
      <section className="py-8">
        <SectionHeading title="About Asian Paints" />
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="text-3xl leading-snug">“Join us Today to Colour your Tomorrow!”</p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {['#1 Paint Company in India', '#1 Decorative Lighting', '#2 Fabric & Furnishing', '#1 Integrated Home Decor'].map((x) => (
                <div key={x} className="border-r last:border-r-0 pr-3 text-center text-sm font-medium">{x}</div>
              ))}
            </div>
            <p className="mt-8 text-sm leading-7 text-slate-600">Founded in 1942, Asian Paints began as a modest partnership firm and grew into a major company. This section is wired to Supabase in the next phase so all copy can be edited from admin.</p>
          </div>
          <div className="aspect-[16/10] rounded-3xl bg-slate-200" />
        </div>
      </section>

      <section className="py-12">
        <SectionHeading title="Our Leaders" />
        <div className="grid max-w-2xl grid-cols-2 gap-10">
          {leaders.map((leader) => (
            <div key={leader.name} className="text-center">
              <div className="mx-auto aspect-square w-36 rounded-full bg-slate-200" />
              <h3 className="mt-4 font-semibold">{leader.name}</h3>
              <p className="text-sm text-slate-500">{leader.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <SectionHeading title="Perks & Benefits" />
        <div className="grid gap-4 md:grid-cols-3">
          {benefits.map(([title, body]) => (
            <div key={title} className="card p-6">
              <div className="mb-4 text-3xl">♥</div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="aspect-[16/10] rounded-3xl bg-slate-200" />
          <div>
            <SectionHeading title="Message from CHRO" />
            <p className="text-sm leading-7 text-slate-600">A fully editable leadership message section with image, title, designation, long-form content and CTA controls.</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-panel p-6 md:p-8">
        <SectionHeading title="Our Awards & Recognitions" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1,2,3,4].map((i) => <div key={i} className="card p-6 text-center"><div className="text-5xl">🏆</div><div className="mt-4 font-semibold">2024</div><p className="mt-2 text-sm text-slate-600">Award title controlled from admin</p></div>)}
        </div>
      </section>

      <section className="py-12">
        <SectionHeading title="Asian Paints Reviews" />
        <div className="rounded-3xl bg-panel p-6 text-center">
          <div className="text-2xl font-semibold">Rating 3.9 ★★★★☆</div>
          <p className="mt-2 text-sm text-slate-500">Overall rating based on reviews</p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[1,2,3].map((i) => <div key={i} className="card p-5"><div className="font-semibold">★ 5.0</div><p className="mt-4 text-sm leading-6 text-slate-600">Likes: Great place to learn and grow...</p><p className="mt-4 text-sm leading-6 text-slate-600">Dislikes: Sample content...</p></div>)}
        </div>
      </section>

      <section className="py-12">
        <SectionHeading title="Asian Paints Job Openings" />
        <div className="grid gap-4 md:grid-cols-3">
          {['Executive - Business Development', 'Senior Executive - Strategy', 'Executive - Administration'].map((job) => <div key={job} className="card p-5"><h3 className="font-semibold">{job}</h3><p className="mt-3 text-sm text-slate-500">Mumbai • 2-5 Yrs</p></div>)}
        </div>
      </section>

      <section className="rounded-3xl bg-panel p-6 md:p-8">
        <SectionHeading title="Asian Paints Office Locations" />
        <div className="grid gap-4 md:grid-cols-2">
          {['Mumbai, Maharashtra', 'Hyderabad, Telangana', 'New Delhi, Delhi', 'Bengaluru, Karnataka'].map((location) => <div key={location} className="rounded-xl bg-white p-4 font-medium">{location}</div>)}
        </div>
      </section>

      <section className="py-12">
        <SectionHeading title="Connect with us" />
        <div className="grid gap-4 md:grid-cols-2"><div className="card p-5">Website</div><div className="card p-5">Social media</div></div>
      </section>

      <section className="rounded-3xl bg-panel p-6 md:p-8">
        <SectionHeading title="Asian Paints FAQs" />
        <div className="overflow-hidden rounded-2xl bg-white">
          {['When was Asian Paints founded?', 'Where is the headquarters located?', 'How many employees work here?', 'Does the company have good work-life balance?', 'Is it good for career growth?'].map((q) => (
            <details key={q} className="border-b px-5 py-4 last:border-b-0"><summary className="cursor-pointer font-medium">{q}</summary><p className="pt-3 text-sm leading-6 text-slate-600">Editable answer from the admin panel.</p></details>
          ))}
        </div>
      </section>
    </main>
  )
}
