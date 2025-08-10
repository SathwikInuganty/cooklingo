import { api } from '../lib/api'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Lesson = {
  id: string
  title: string
  difficulty: 'Beginner'|'Intermediate'|'Advanced'
  timeMinutes: number
  tags: string[]
  xp: number
  thumbnail?: string
}

export default function Home() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  useEffect(() => {
   fetch(api('/lessons')).then(r => r.json()).then(setLessons)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold">Today’s Path</h1>
          <p className="text-stone-600">Bite-sized lessons. Earn XP. Unlock recipes.</p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {lessons.map(l => (
          <article key={l.id} className="card flex flex-col gap-3">
            <img src={l.thumbnail || 'https://picsum.photos/seed/'+l.id+'/600/400'} className="w-full h-40 object-cover rounded-xl" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{l.title}</h3>
              <div className="flex gap-2 mt-2">
                <span className="tag">{l.difficulty}</span>
                <span className="tag">{l.timeMinutes} min</span>
                <span className="tag">{l.xp} XP</span>
              </div>
              <div className="mt-2 text-sm text-stone-600">{l.tags.join(' • ')}</div>
            </div>
            <div className="flex gap-2">
              <Link to={`/lesson/${l.id}`} className="btn-primary w-full">Start</Link>
              <Link to={`/cook/${l.id}`} className="btn-ghost">Cook</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
