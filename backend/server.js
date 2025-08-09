
import express from 'express'
import cors from 'cors'
import fse from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(cors())
app.use(express.json())

const dbPath = path.join(__dirname, 'db')
const usersFile = path.join(dbPath, 'users.json')
const lessonsFile = path.join(dbPath, 'lessons.json')
const contentFile = path.join(dbPath, 'content.json')

await fse.ensureDir(dbPath)
// Seed default files if missing
if (!await fse.pathExists(usersFile)) await fse.writeJSON(usersFile, {})
if (!await fse.pathExists(lessonsFile)) await fse.writeJSON(lessonsFile, {})
if (!await fse.pathExists(contentFile)) await fse.writeJSON(contentFile, {})

function todayISO(){ return new Date().toISOString().slice(0,10) }

app.post('/api/bootstrap', async (req,res)=>{
  const users = await fse.readJSON(usersFile)
  if (!users['demo']) {
    users['demo'] = {
      id: 'demo',
      name: 'Demo Cook',
      xp: 0,
      streak: 0,
      lastActiveISO: null,
      lastActiveDay: null,
      completions: [],
      quizzes: []
    }
    await fse.writeJSON(usersFile, users, { spaces: 2 })
  }
  res.json(users['demo'])
})

app.get('/api/lessons', async (req,res)=>{
  const lessons = await fse.readJSON(lessonsFile)
  res.json(Object.values(lessons))
})

app.get('/api/lesson/:id', async (req,res)=>{
  const { id } = req.params
  const content = await fse.readJSON(contentFile)
  res.json(content[id].lesson)
})

app.get('/api/quiz/:id', async (req,res)=>{
  const { id } = req.params
  const content = await fse.readJSON(contentFile)
  res.json(content[id].quiz)
})

app.get('/api/recipe/:id', async (req,res)=>{
  const { id } = req.params
  const content = await fse.readJSON(contentFile)
  res.json(content[id].recipe)
})

app.get('/api/progress', async (req,res)=>{
  const users = await fse.readJSON(usersFile)
  res.json(users['demo'])
})

app.post('/api/progress/complete', async (req,res)=>{
  const { lessonId, xp } = req.body
  const users = await fse.readJSON(usersFile)
  const u = users['demo']

  // Streak logic
  const today = todayISO()
  if (u.lastActiveDay !== today) {
    // If yesterday was active day, continue streak, otherwise reset
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0,10)
    u.streak = (u.lastActiveDay === yesterday) ? (u.streak + 1) : 1
    u.lastActiveDay = today
  }
  u.lastActiveISO = new Date().toISOString()
  u.xp += (xp || 0)
  u.completions.push({ lessonId, dateISO: new Date().toISOString() })

  await fse.writeJSON(usersFile, users, { spaces: 2 })
  res.json({ ok:true, xp:u.xp, streak:u.streak })
})

app.post('/api/progress/quiz', async (req,res)=>{
  const { lessonId, correct, total, xp } = req.body
  const users = await fse.readJSON(usersFile)
  const u = users['demo']
  u.xp += (xp || 0)
  u.quizzes.push({ lessonId, correct, total, dateISO: new Date().toISOString() })
  await fse.writeJSON(usersFile, users, { spaces: 2 })
  res.json({ ok:true, xp:u.xp })
})

const port = process.env.PORT || 4000
app.listen(port, ()=> console.log('CookLingo API running on http://localhost:'+port))
