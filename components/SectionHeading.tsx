export default function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return <div className="mb-8"><h2 className="section-title">{title}</h2><div className="section-underline" />{subtitle ? <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">{subtitle}</p> : null}</div>
}
