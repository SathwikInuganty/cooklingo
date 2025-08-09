import { api } from '../lib/api'

import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

type Card = { prompt: string, answer: string }
type LessonData = { id:string, title:string, cards: Card[], xp:number }

export default function Lesson() {
  const { id } = useParams()
  const nav = useNavigate()
  const [data, setData] = useState<LessonData | null>(null)
  const [idx, setIdx] = useState(0)
  const [input, setInput] = useState('')
  const [correct, setCorrect] = useState<boolean | null>(null)
  const [xpEarned, setXpEarned] = useState(0)

  useEffect(() => {
    fetch(`/api/lesson/${id}`).then(r=>r.json()).then(setData)
  }, [id])

  const current = useMemo(()=> data?.cards[idx], [data, idx])

  function submit() {
    if (!current) return
    const ok = input.trim().toLowerCase() === current.answer.toLowerCase()
    setCorrect(ok)
    if (ok) setXpEarned(x => x + Math.ceil((data?.xp || 10)/data!.cards.length))
  }

  function next() {
    setCorrect(null)
    setInput('')
    if (idx + 1 < (data?.cards.length || 0)) setIdx(idx+1)
    else {
      // Finish lesson
      fetch('/api/progress/complete', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ lessonId: id, xp: xpEarned })})
      nav(`/quiz/${id}`)
    }
  }

  if (!data) return <div>Loading...</div>
  return (
    <div className="max-w-2xl mx-auto card">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-xl">{data.title}</h2>
        <div className="tag">{idx+1}/{data.cards.length}</div>
      </div>
      <div className="p-4 rounded-xl bg-stone-50">
        <p className="text-lg">{current?.prompt}</p>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type your answer…" className="flex-1 rounded-xl border px-3 py-2" />
        <button onClick={submit} className="btn-primary">Check</button>
      </div>
      {correct !== null && (
        <div className={"mt-3 p-3 rounded-xl " + (correct? "bg-emerald-50 text-emerald-800":"bg-rose-50 text-rose-800")}>
          {correct ? "Nice! That's correct." : `Not quite. Correct answer: "${current?.answer}"`}
        </div>
      )}
      <div className="mt-4 flex justify-end">
        <button onClick={next} className="btn-ghost">Next →</button>
      </div>
    </div>
  )
}
