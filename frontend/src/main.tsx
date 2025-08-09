
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Home'
import Lesson from './pages/Lesson'
import Quiz from './pages/Quiz'
import RecipePlayer from './pages/RecipePlayer'
import Progress from './pages/Progress'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'lesson/:id', element: <Lesson /> },
      { path: 'quiz/:id', element: <Quiz /> },
      { path: 'cook/:id', element: <RecipePlayer /> },
      { path: 'progress', element: <Progress /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
