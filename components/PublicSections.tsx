import { fallbackSections, type CmsSection } from '@/lib/fallback-content'
import SectionHeading from './SectionHeading'

function Img({src,alt,className=''}:{src?:string,alt:string,className?:string}) {
  if (!src) return <div className={`bg-gradient-to-br from-slate-100 to-slate-200 ${className}`} />
  return <img src={src} alt={alt} className={`object-cover ${className}`} />
}

function Cards({items, render}:{items:any[],render:(item:any,i:number)=>React.ReactNode}) {
  return <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map(render)}</div>
}

export default function PublicSections({sections}:{sections?:CmsSection[]}) {
  const data = (sections?.length ? sections : fallbackSections).filter(s=>s.is_visible).sort((a,b)=>a.sort_order-b.sort_order)
  const hero = data.find(s=>s.section_type==='banner')
  const company = data.find(s=>s.section_type==='company_header')
  const rest = data.filter(s=>!['banner','company_header'].includes(s.section_type))
  return <>
    {hero && <section className="relative overflow-hidden bg-[#24263f] text-white">
      {hero.content.desktop_image && <Img src={hero.content.desktop_image} alt="MJIPL banner" className="absolute inset-0 h-full w-full opacity-60" />}
      <div className="absolute inset-0 bg-black/30" />
      <div className="container-page relative z-10 flex min-h-[320px] flex-col items-center justify-center py-16 text-center md:min-h-[380px]">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/75">{hero.content.eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">{hero.content.headline}</h1>
        {hero.content.cta_label && <a className="mt-7 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink" href={hero.content.cta_url||'#'}>{hero.content.cta_label}</a>}
      </div>
    </section>}

    {company && <section className="container-page -mt-8 relative z-10">
      <div className="rounded-3xl border border-line bg-white p-5 shadow-lg md:p-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            {company.content.logo ? <img src={company.content.logo} alt="MJIPL logo" className="h-20 w-20 rounded-2xl border object-contain p-2"/> : <div className="flex h-20 w-20 items-center justify-center rounded-2xl border bg-white text-xl font-bold text-brand">MJIPL</div>}
            <div><h2 className="text-2xl font-semibold">{company.content.company_name}</h2><p className="mt-1 text-sm text-slate-500">{company.content.tagline}</p></div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm md:grid-cols-3">
            <div><span className="text-slate-400">Founded</span><div className="font-semibold">{company.content.founded}</div></div>
            <div><span className="text-slate-400">Headquarters</span><div className="font-semibold">{company.content.headquarters}</div></div>
            <div><span className="text-slate-400">Website</span><div><a href={company.content.website} className="font-semibold text-brand">jaytea.com</a></div></div>
          </div>
        </div>
      </div>
    </section>}

    <main className="container-page py-12 md:py-16">
      {rest.map(section => <RenderSection key={section.id} section={section}/>) }
    </main>
  </>
}

function RenderSection({section}:{section:CmsSection}) {
  const c = section.content || {}
  const title = section.title
  const base = "py-10 md:py-14"
  switch(section.section_type) {
    case 'about': return <section className={base}><SectionHeading title={title} subtitle={section.subtitle||undefined}/><div className="grid items-center gap-8 md:grid-cols-2"><div><p className="text-3xl leading-snug md:text-4xl">{c.statement}</p><p className="mt-6 text-sm leading-7 text-slate-600">{c.body}</p><div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">{(c.stats||[]).map((s:any,i:number)=><div key={i} className="rounded-2xl bg-panel p-4 text-center"><div className="text-2xl font-bold text-brand">{s.value}</div><div className="mt-1 text-xs text-slate-600">{s.label}</div></div>)}</div></div><Img src={c.image} alt={title} className="aspect-[16/10] w-full rounded-3xl"/></div></section>
    case 'leaders': return <section className={base}><SectionHeading title={title} subtitle={c.intro}/><Cards items={c.items||[]} render={(x,i)=><div key={i} className="card p-6 text-center"><Img src={x.image} alt={x.name||'Leader'} className="mx-auto aspect-square w-36 rounded-full"/><h3 className="mt-4 text-lg font-semibold">{x.name}</h3><p className="text-sm text-slate-500">{x.designation}</p>{x.bio&&<p className="mt-3 text-sm leading-6 text-slate-600">{x.bio}</p>}</div>}/></section>
    case 'benefits': return <section className={base}><SectionHeading title={title} subtitle={c.intro}/><Cards items={c.items||[]} render={(x,i)=><div key={i} className="card p-6"><div className="text-3xl">{x.icon||'•'}</div><h3 className="mt-4 text-lg font-semibold">{x.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{x.description}</p></div>}/></section>
    case 'chro': return <section className={base}><div className="grid items-center gap-8 md:grid-cols-2"><Img src={c.image} alt={c.name||title} className="aspect-[16/10] w-full rounded-3xl"/><div><SectionHeading title={title}/><h3 className="text-lg font-semibold">{c.name}</h3><p className="text-sm text-slate-500">{c.designation}</p><p className="mt-5 text-sm leading-7 text-slate-600">{c.message}</p></div></div></section>
    case 'dei':
    case 'sustainability':
    case 'creche': return <section className={base}><div className="grid items-center gap-8 md:grid-cols-2"><div><SectionHeading title={title}/>{c.headline&&<h3 className="text-xl font-semibold">{c.headline}</h3>}<p className="mt-4 text-sm leading-7 text-slate-600">{c.body}</p>{c.stats&&<div className="mt-6 grid grid-cols-2 gap-3">{c.stats.map((s:any,i:number)=><div key={i} className="rounded-2xl bg-panel p-4"><div className="text-xl font-bold text-brand">{s.value}</div><div className="text-xs text-slate-600">{s.label}</div></div>)}</div>}{c.cta_label&&<a href={c.cta_url||'#'} className="mt-6 inline-flex font-semibold text-brand">{c.cta_label} →</a>}</div><Img src={c.image} alt={title} className="aspect-[16/10] w-full rounded-3xl"/></div></section>
    case 'csr':
    case 'life': return <section className={`${base} rounded-3xl bg-panel px-5 md:px-8`}><SectionHeading title={title} subtitle={c.intro}/><Cards items={c.items||[]} render={(x,i)=><a key={i} href={x.url||'#'} className="overflow-hidden rounded-2xl bg-white"><Img src={x.image} alt={x.title||title} className="aspect-video w-full"/><div className="p-5"><h3 className="font-semibold">{x.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{x.description}</p></div></a>}/></section>
    case 'awards':
    case 'achievements': return <section className={base}><SectionHeading title={title}/><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{(c.items||[]).map((x:any,i:number)=><div key={i} className="card p-5 text-center"><Img src={x.image} alt={x.title||title} className="mx-auto h-20 w-20 rounded-xl"/><div className="mt-4 text-xl font-bold text-brand">{x.year||x.value}</div><h3 className="mt-2 font-semibold">{x.title}</h3><p className="mt-2 text-xs leading-5 text-slate-500">{x.description}</p></div>)}</div></section>
    case 'reviews': return <section className={base}><SectionHeading title={title}/><div className="rounded-3xl bg-panel p-6 text-center"><div className="text-3xl font-semibold">{c.rating} <span className="text-amber-400">★★★★★</span></div><p className="mt-2 text-sm text-slate-500">Overall rating based on {c.review_count} reviews</p></div><div className="mt-5"><Cards items={c.items||[]} render={(x,i)=><div key={i} className="card p-5"><div className="font-semibold text-brand">★ {x.rating}</div><p className="mt-2 text-sm font-medium">{x.name} {x.designation&&`• ${x.designation}`}</p><p className="mt-4 text-sm leading-6 text-slate-600"><b>Likes:</b> {x.likes}</p><p className="mt-3 text-sm leading-6 text-slate-600"><b>Dislikes:</b> {x.dislikes}</p></div>}/></div></section>
    case 'communities': return <section className={base}><SectionHeading title={title}/><div className="grid gap-8 md:grid-cols-2"><Img src={c.image} alt={title} className="aspect-[4/3] w-full rounded-3xl"/><div><p className="text-sm leading-7 text-slate-600">{c.body}</p><div className="mt-5 space-y-3">{(c.items||[]).map((x:any,i:number)=><div key={i} className="rounded-2xl bg-panel p-4"><div className="font-semibold">{x.state}</div><div className="text-sm text-brand">{x.project}</div><p className="mt-2 text-sm text-slate-600">{x.description}</p></div>)}</div></div></div></section>
    case 'jobs': return <section className={base}><SectionHeading title={title} subtitle={c.intro}/><Cards items={c.items||[]} render={(x,i)=><div key={i} className="card p-5"><h3 className="font-semibold">{x.title}</h3><p className="mt-2 text-sm text-slate-500">{[x.department,x.location,x.experience].filter(Boolean).join(' • ')}</p><p className="mt-3 text-sm leading-6 text-slate-600">{x.description}</p>{x.apply_url&&<a className="mt-4 inline-flex font-semibold text-brand" href={x.apply_url}>Apply now →</a>}</div>}/></section>
    case 'locations': return <section className={`${base} rounded-3xl bg-panel px-5 md:px-8`}><SectionHeading title={title}/><div className="grid gap-4 md:grid-cols-2">{(c.items||[]).map((x:any,i:number)=><div key={i} className="rounded-2xl bg-white p-5"><h3 className="font-semibold">{x.office_name||[x.city,x.state].filter(Boolean).join(', ')}</h3><p className="mt-2 text-sm text-slate-600">{[x.address,x.city,x.state,x.country].filter(Boolean).join(', ')}</p><p className="mt-3 text-xs text-slate-500">{[x.phone,x.email].filter(Boolean).join(' • ')}</p></div>)}</div></section>
    case 'connect': return <section className={base}><SectionHeading title={title}/><div className="grid gap-4 md:grid-cols-2"><div className="card p-5"><div className="text-xs uppercase tracking-wide text-slate-400">Website</div><a href={c.website} className="mt-2 block font-semibold text-brand">{c.website}</a><div className="mt-3 text-sm text-slate-600">{c.email}<br/>{c.phone}</div></div><div className="card p-5"><div className="text-xs uppercase tracking-wide text-slate-400">Social media</div><div className="mt-3 flex flex-wrap gap-2">{(c.socials||[]).map((x:any,i:number)=><a key={i} href={x.url} className="rounded-full bg-panel px-3 py-2 text-sm font-semibold">{x.label}</a>)}</div></div></div></section>
    case 'faqs': return <section className={`${base} rounded-3xl bg-panel px-5 md:px-8`}><SectionHeading title={title}/><div className="overflow-hidden rounded-2xl bg-white">{(c.items||[]).map((x:any,i:number)=><details key={i} className="border-b px-5 py-4 last:border-b-0"><summary className="cursor-pointer font-medium">{x.question}</summary><p className="pt-3 text-sm leading-6 text-slate-600">{x.answer}</p></details>)}</div></section>
    default: return null
  }
}
