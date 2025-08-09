
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type Step = { text:string, minutes?:number }
type Recipe = { id:string, title:string, steps:Step[], ingredients:string[] }

export default function RecipePlayer(){
  const { id } = useParams()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [idx, setIdx] = useState(0)
  const [timer, setTimer] = useState<number | null>(null)

  useEffect(()=>{
    fetch(`/api/recipe/${id}`).then(r=>r.json()).then(setRecipe)
  },[id])

  useEffect(()=>{
    if (!recipe) return
    const m = recipe.steps[idx]?.minutes
    setTimer(m ? m*60 : null)
  },[recipe, idx])

  useEffect(()=>{
    if (timer === null) return
    const t = setInterval(()=>{
      setTimer(s => (s!==null && s>0) ? s-1 : s)
    },1000)
    return () => clearInterval(t)
  },[timer])

  if (!recipe) return <div>Loading...</div>
  const step = recipe.steps[idx]
  const mm = timer!==null? Math.floor(timer/60).toString().padStart(2,'0') : '--'
  const ss = timer!==null? (timer%60).toString().padStart(2,'0') : '--'

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <section className="md:col-span-2 card">
        <h2 className="font-bold text-xl">{recipe.title}</h2>
        <div className="mt-3 p-4 rounded-xl bg-stone-50 min-h-[140px]">
          <p className="text-lg">{step.text}</p>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button className="btn-ghost" onClick={()=>setIdx(i=>Math.max(0,i-1))}>← Prev</button>
          <button className="btn-primary" onClick={()=>setIdx(i=>Math.min(recipe.steps.length-1,i+1))}>Next →</button>
          <span className="ml-auto tag">Step {idx+1}/{recipe.steps.length}</span>
        </div>
        <div className="mt-4 card bg-stone-50">
          <div className="text-sm text-stone-500">Timer</div>
          <div className="text-3xl font-mono">{mm}:{ss}</div>
        </div>
      </section>
      <aside className="card">
        <h3 className="font-semibold">Ingredients</h3>
        <ul className="mt-2 list-disc pl-6 space-y-1">
          {recipe.ingredients.map((it,i)=>(<li key={i}>{it}</li>))}
        </ul>
      </aside>
    </div>
  )
}
