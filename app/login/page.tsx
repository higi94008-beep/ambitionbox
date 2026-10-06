'use client'
import { FormEvent,useState } from 'react'
import { getBrowserSupabase } from '@/lib/supabase/client'

export default function LoginPage(){
  const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [error,setError]=useState('');const [busy,setBusy]=useState(false)
  async function submit(e:FormEvent){e.preventDefault();setError('');const s=getBrowserSupabase();if(!s){setError('Supabase is not configured yet. Add environment variables first.');return}setBusy(true);const {error}=await s.auth.signInWithPassword({email,password});if(error){setError(error.message);setBusy(false);return}window.location.href='/admin'}
  return <main className="flex min-h-screen items-center justify-center bg-panel p-5"><form onSubmit={submit} className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-sm"><div className="text-sm font-bold text-brand">MJIPL CMS</div><h1 className="mt-2 text-3xl font-bold">Admin login</h1><p className="mt-2 text-sm text-slate-500">Manage the Madhu Jayanti International company profile.</p><div className="mt-7"><label className="label">Email</label><input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></div><div className="mt-4"><label className="label">Password</label><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></div>{error&&<p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button className="btn-primary mt-6 w-full" disabled={busy}>{busy?'Signing in…':'Sign in'}</button></form></main>
}
