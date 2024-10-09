import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import router from "./pages/routing/routes"
import './index.scss'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import ToastConfig from './components/toasts/ToastConfig'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
          <RouterProvider router={router}/>
          {/* <ReactQueryDevtools/>  */}
          <ToastConfig/>
      </AuthContextProvider>
    </QueryClientProvider>

  </StrictMode>,
)
