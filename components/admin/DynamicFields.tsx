'use client'
import { Plus, Trash2 } from 'lucide-react'
import type { FieldDef } from '@/lib/cms-config'
import MediaUpload from './MediaUpload'

export default function DynamicFields({fields,value,onChange}:{fields:FieldDef[],value:Record<string,any>,onChange:(v:Record<string,any>)=>void}) {
  const set=(key:string,v:any)=>onChange({...value,[key]:v})
  return <div className="space-y-5">{fields.map(field=>{
    const v=value?.[field.key]
    if(field.type==='textarea') return <div key={field.key}><label className="label">{field.label}</label><textarea rows={5} className="input" value={v||''} onChange={e=>set(field.key,e.target.value)}/></div>
    if(field.type==='image') return <MediaUpload key={field.key} label={field.label} value={v} onChange={x=>set(field.key,x)}/>
    if(field.type==='boolean') return <label key={field.key} className="flex items-center gap-3"><input type="checkbox" checked={!!v} onChange={e=>set(field.key,e.target.checked)}/><span className="text-sm font-medium">{field.label}</span></label>
    if(field.type==='list') {
      const arr=Array.isArray(v)?v:[]
      return <div key={field.key} className="rounded-2xl border border-line bg-panel p-4"><div className="mb-4 flex items-center justify-between"><div className="font-semibold">{field.label}</div><button type="button" className="btn-secondary" onClick={()=>set(field.key,[...arr,{}])}><Plus className="mr-2 h-4 w-4"/>Add</button></div><div className="space-y-4">{arr.map((item:any,i:number)=><div key={i} className="rounded-2xl border bg-white p-4"><div className="mb-4 flex items-center justify-between"><span className="text-xs font-semibold text-slate-400">ITEM {i+1}</span><button type="button" onClick={()=>set(field.key,arr.filter((_:any,j:number)=>j!==i))} className="text-red-600"><Trash2 className="h-4 w-4"/></button></div><DynamicFields fields={field.itemFields||[]} value={item} onChange={x=>set(field.key,arr.map((y:any,j:number)=>j===i?x:y))}/></div>)}</div></div>
    }
    return <div key={field.key}><label className="label">{field.label}</label><input className="input" type={field.type==='number'?'number':'text'} value={v||''} placeholder={field.placeholder} onChange={e=>set(field.key,e.target.value)}/></div>
  })}</div>
}
