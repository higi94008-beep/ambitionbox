'use client'
import { useEffect,useMemo,useState } from 'react'
import { ArrowDown, ArrowUp, Eye, EyeOff, LogOut, Save, Settings2 } from 'lucide-react'
import { fallbackSections, type CmsSection } from '@/lib/fallback-content'
import { sectionDefinitionMap } from '@/lib/cms-config'
import { getBrowserSupabase } from '@/lib/supabase/client'
import DynamicFields from './DynamicFields'

export default function AdminCms(){
  const [sections,setSections]=useState<CmsSection[]>(fallbackSections)
  const [selectedId,setSelectedId]=useState(fallbackSections[0].id)
  const [loading,setLoading]=useState(true)
  const [saving,setSaving]=useState(false)
  const [status,setStatus]=useState('')
  const selected=useMemo(()=>sections.find(s=>s.id===selectedId)||sections[0],[sections,selectedId])
  const def=selected?sectionDefinitionMap[selected.section_type]:undefined

  useEffect(()=>{(async()=>{const supabase=getBrowserSupabase(); if(!supabase){setLoading(false);setStatus('Demo mode: connect Supabase to persist changes.');return} const {data,error}=await supabase.from('page_sections').select('*').eq('page_slug','company-profile').order('sort_order'); if(error){setStatus(error.message)} else if(data?.length){setSections(data as CmsSection[]);setSelectedId(data[0].id)} setLoading(false)})()},[])

  function patch(id:string,changes:Partial<CmsSection>){setSections(xs=>xs.map(x=>x.id===id?{...x,...changes}:x))}
  function reorder(id:string,delta:number){setSections(xs=>{const arr=[...xs].sort((a,b)=>a.sort_order-b.sort_order); const i=arr.findIndex(x=>x.id===id); const j=i+delta; if(j<0||j>=arr.length)return xs; [arr[i],arr[j]]=[arr[j],arr[i]]; return arr.map((x,k)=>({...x,sort_order:k+1}))})}
  async function saveAll(){const supabase=getBrowserSupabase(); if(!supabase){setStatus('Demo mode only. Add Supabase environment variables to save.');return} setSaving(true); setStatus(''); for(const section of sections){const row={page_slug:'company-profile',section_type:section.section_type,title:section.title,subtitle:section.subtitle||null,content:section.content||{},settings:section.settings||{},sort_order:section.sort_order,is_visible:section.is_visible}; const {error}=await supabase.from('page_sections').upsert(row,{onConflict:'page_slug,section_type'}); if(error){setStatus(error.message);setSaving(false);return}} setStatus('Saved successfully. Public page will update within 60 seconds.');setSaving(false)}
  async function logout(){const s=getBrowserSupabase(); await s?.auth.signOut(); window.location.href='/login'}

  if(loading)return <div className="p-10">Loading CMS…</div>
  return <div className="min-h-screen bg-slate-50">
    <header className="sticky top-0 z-30 border-b bg-white"><div className="flex h-16 items-center justify-between px-5"><div><div className="font-bold text-brand">MJIPL CMS</div><div className="text-xs text-slate-400">Madhu Jayanti International Pvt Ltd</div></div><div className="flex items-center gap-2"><a href="/" target="_blank" className="btn-secondary">Preview site</a><button onClick={saveAll} disabled={saving} className="btn-primary"><Save className="mr-2 h-4 w-4"/>{saving?'Saving…':'Save all'}</button><button onClick={logout} className="btn-secondary"><LogOut className="h-4 w-4"/></button></div></div></header>
    {status&&<div className="border-b bg-amber-50 px-5 py-2 text-sm text-amber-800">{status}</div>}
    <div className="grid min-h-[calc(100vh-64px)] lg:grid-cols-[330px_1fr]">
      <aside className="border-r bg-white p-4"><div className="mb-3 flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-400"><Settings2 className="h-4 w-4"/>Page sections</div><div className="space-y-1">{[...sections].sort((a,b)=>a.sort_order-b.sort_order).map(s=><div key={s.id} className={`group flex items-center gap-2 rounded-xl p-2 ${selectedId===s.id?'bg-red-50':'hover:bg-slate-50'}`}><button onClick={()=>setSelectedId(s.id)} className="min-w-0 flex-1 text-left"><div className="truncate text-sm font-semibold">{sectionDefinitionMap[s.section_type]?.label||s.title}</div><div className="text-xs text-slate-400">{s.is_visible?'Visible':'Hidden'} • #{s.sort_order}</div></button><button title="Move up" onClick={()=>reorder(s.id,-1)}><ArrowUp className="h-4 w-4 text-slate-400"/></button><button title="Move down" onClick={()=>reorder(s.id,1)}><ArrowDown className="h-4 w-4 text-slate-400"/></button></div>)}</div></aside>
      <main className="p-5 md:p-8"><div className="mx-auto max-w-4xl"><div className="mb-6 flex items-start justify-between"><div><div className="text-xs font-semibold uppercase tracking-wide text-brand">Edit section</div><h1 className="mt-1 text-3xl font-bold">{def?.label||selected?.title}</h1></div><button onClick={()=>patch(selected.id,{is_visible:!selected.is_visible})} className="btn-secondary">{selected.is_visible?<><Eye className="mr-2 h-4 w-4"/>Visible</>:<><EyeOff className="mr-2 h-4 w-4"/>Hidden</>}</button></div>
        <div className="card p-5 md:p-7"><div className="grid gap-5 md:grid-cols-2"><div><label className="label">Section title</label><input className="input" value={selected.title||''} onChange={e=>patch(selected.id,{title:e.target.value})}/></div><div><label className="label">Section subtitle</label><input className="input" value={selected.subtitle||''} onChange={e=>patch(selected.id,{subtitle:e.target.value})}/></div></div><div className="my-7 h-px bg-line"/>{def&&<DynamicFields fields={def.fields} value={selected.content||{}} onChange={content=>patch(selected.id,{content})}/>}</div>
      </div></main>
    </div>
  </div>
}
