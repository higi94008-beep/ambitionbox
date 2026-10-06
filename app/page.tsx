import PublicSections from '@/components/PublicSections'
import { fallbackSections, type CmsSection } from '@/lib/fallback-content'
import { getServerSupabase } from '@/lib/supabase/server'

export const revalidate = 60

export default async function HomePage() {
  let sections: CmsSection[] = fallbackSections
  const supabase = await getServerSupabase()
  if (supabase) {
    const { data } = await supabase.from('page_sections').select('*').eq('page_slug','company-profile').order('sort_order')
    if (data?.length) sections = data as CmsSection[]
  }
  return <>
    <header className="border-b bg-white"><div className="container-page flex h-16 items-center justify-between"><a href="https://www.jaytea.com/" className="font-bold text-brand">MJIPL</a><nav className="hidden gap-6 text-sm text-slate-600 md:flex"><a href="#">Company</a><a href="https://www.jaytea.com/careers">Careers</a><a href="https://www.jaytea.com/sustainability-story">Sustainability</a></nav></div></header>
    <PublicSections sections={sections}/>
    <footer className="mt-12 border-t bg-[#20233b] py-10 text-white"><div className="container-page"><div className="font-semibold">Madhu Jayanti International Pvt Ltd</div><p className="mt-2 text-sm text-white/65">Employer brand and company profile CMS</p></div></footer>
  </>
}
