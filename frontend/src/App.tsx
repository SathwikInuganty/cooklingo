
import { Outlet, Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function App() {
  const [user, setUser] = useState<{id:string, name:string} | null>(null)
  useEffect(() => {
    // Fake login bootstrap
    fetch('/api/bootstrap', { method: 'POST'}).then(r => r.json()).then(setUser)
  }, [])

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-stone-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.svg" className="w-8 h-8" />
            <span className="font-bold text-lg">CookLingo</span>
          </Link>
          <nav className="ml-auto flex items-center gap-1">
            <NavLink to="/" className={({isActive})=>`btn-ghost ${isActive?'bg-stone-200':''}`}>Home</NavLink>
            <NavLink to="/progress" className={({isActive})=>`btn-ghost ${isActive?'bg-stone-200':''}`}>Progress</NavLink>
            <a className="tag ml-2">Signed in as {user?.name ?? '...'}</a>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
      <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-stone-500">
        Built with ❤️ for home cooks — practice, cook, and level up.
      </footer>
    </div>
  )
}
