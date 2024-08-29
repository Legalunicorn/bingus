import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import router from "./pages/routing/routes"
import './index.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
        <RouterProvider router={router}/>
    </AuthContextProvider>
  </StrictMode>,
)
