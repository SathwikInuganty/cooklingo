
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

type Q = { q:string, options:string[], answer:number }
type QuizData = { id:string, title:string, questions:Q[], xp:number }

export default function Quiz() {
  const { id } = useParams()
  const nav = useNavigate()
  const [data, setData] = useState<QuizData | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)

  useEffect(()=>{
    fetch(`/api/quiz/${id}`).then(r=>r.json()).then(setData)
  },[id])

  if (!data) return <div>Loading...</div>
  const q = data.questions[idx]

  function submit(){
    if (selected === null) return
    if (selected === q.answer) setScore(s => s+1)
    if (idx + 1 < data.questions.length) {
      setIdx(i=>i+1); setSelected(null)
    } else {
      fetch('/api/progress/quiz', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ lessonId:id, correct: score+ (selected===q.answer?1:0), total: data.questions.length, xp: data.xp })})
      nav('/progress')
    }
  }

  return (
    <div className="max-w-2xl mx-auto card">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">{data.title} — Quiz</h2>
        <div className="tag">{idx+1}/{data.questions.length}</div>
      </div>
      <p className="mt-2 text-lg">{q.q}</p>
      <div className="mt-4 grid gap-2">
        {q.options.map((opt,i)=>(
          <button key={i} onClick={()=>setSelected(i)} className={"btn " + (selected===i ? "bg-stone-200":"bg-stone-100 hover:bg-stone-200")}>{opt}</button>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <button onClick={submit} className="btn-primary">Submit</button>
      </div>
    </div>
  )
}
