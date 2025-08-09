import { api } from '../lib/api'

import { useEffect, useState } from 'react'

type Progress = {
  xp:number
  streak:number
  lastActiveISO:string | null
  completions:{ lessonId:string, dateISO:string }[]
  quizzes:{ lessonId:string, correct:number, total:number, dateISO:string }[]
}

export default function Progress(){
  const [p, setP] = useState<Progress | null>(null)
  useEffect(()=>{
    fetch(api('/progress')).then(r=>r.json()).then(setP)
  },[])

  if (!p) return <div>Loading...</div>

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <section className="card">
        <div className="text-sm text-stone-500">Total XP</div>
        <div className="text-3xl font-bold">{p.xp}</div>
      </section>
      <section className="card">
        <div className="text-sm text-stone-500">Streak</div>
        <div className="text-3xl font-bold">{p.streak} 🔥</div>
      </section>
      <section className="card">
        <div className="text-sm text-stone-500">Last Active</div>
        <div className="text-3xl font-bold">{p.lastActiveISO ? new Date(p.lastActiveISO).toLocaleString() : '—'}</div>
      </section>

      <section className="md:col-span-2 card">
        <h3 className="font-semibold">Lesson Completions</h3>
        <ul className="mt-2 space-y-1">
          {p.completions.map((c,i)=>(
            <li key={i} className="flex justify-between border-b py-2">
              <span>Lesson {c.lessonId}</span>
              <span className="text-stone-500">{new Date(c.dateISO).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="card">
        <h3 className="font-semibold">Quiz Results</h3>
        <ul className="mt-2 space-y-1">
          {p.quizzes.map((q,i)=>(
            <li key={i} className="flex justify-between border-b py-2">
              <span>Lesson {q.lessonId}</span>
              <span className="text-stone-500">{q.correct}/{q.total}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
