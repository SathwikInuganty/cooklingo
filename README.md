
# CookLingo — Duolingo for Cooking (MVP)

A minimal full‑stack app to practice cooking skills in bite‑sized lessons, 
take quizzes, and "play" recipes step-by-step with timers. Includes XP, streaks,
and progress tracking.

## Tech
- Frontend: React + TypeScript + Vite + Tailwind (utility classes baked in)
- Backend: Node + Express with JSON file datastore
- No auth yet — auto-bootstraps a demo user

## Quick Start

Open two terminals:

**1) Backend**
```bash
cd backend
npm install
npm run dev
```
API runs at http://localhost:4000

**2) Frontend**
```bash
cd frontend
npm install
npm run dev
```
App opens at http://localhost:5173

## Features in this MVP
- Home: browse lessons (Knife Skills, Eggs 101, Pasta timing).
- Lesson: flashcard-like prompts with free‑form answers → earns partial XP.
- Quiz: multiple‑choice questions → adds XP and records score.
- Recipe Player: step-by-step player with per‑step timer and ingredient list.
- Progress: XP total, streak logic, completions and quiz results history.

## Extend It
- Add spaced repetition (SM‑2 scheduling) by storing per-card easiness.
- Replace JSON with a real DB (SQLite/Prisma or Postgres).
- Add OAuth (Clerk/Auth0) and per-user profiles.
- Badges & daily quests; lesson maps; audio TTS guidance and voice input.
- Rich media: images/video per step; safety mini‑games.
- Internationalization for multi‑language instructions.

## Project Structure
- frontend/ — Vite app with routes in src/pages/
- backend/ — Express server with JSON db in backend/db/

## Content Model
Each lesson has:
- lesson: cards[] with (prompt, answer), xp
- quiz: questions[] with (q, options[], answer), xp
- recipe: steps[] with optional minutes, ingredients[]

See `backend/db/content.json` for examples.
