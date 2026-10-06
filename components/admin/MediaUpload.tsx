'use client'
import { useState } from 'react'
import { Upload } from 'lucide-react'
import { getBrowserSupabase } from '@/lib/supabase/client'

export default function MediaUpload({value,onChange,label}:{value?:string,onChange:(v:string)=>void,label:string}) {
  const [busy,setBusy]=useState(false)
  async function upload(file: File) {
    const supabase=getBrowserSupabase(); if(!supabase){alert('Supabase is not configured.');return}
    setBusy(true)
    const path=`cms/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g,'-')}`
    const {error}=await supabase.storage.from('cms-media').upload(path,file,{upsert:false})
    if(error){alert(error.message);setBusy(false);return}
    const {data}=supabase.storage.from('cms-media').getPublicUrl(path)
    onChange(data.publicUrl); setBusy(false)
  }
  return <div><label className="label">{label}</label><div className="flex gap-2"><input className="input" value={value||''} onChange={e=>onChange(e.target.value)} placeholder="Image URL"/><label className="btn-secondary cursor-pointer whitespace-nowrap"><Upload className="mr-2 h-4 w-4"/>{busy?'Uploading':'Upload'}<input type="file" accept="image/*" className="hidden" onChange={e=>{const f=e.target.files?.[0]; if(f) upload(f)}}/></label></div>{value&&<img src={value} alt="Preview" className="mt-3 h-28 rounded-xl border object-cover"/>}</div>
}
