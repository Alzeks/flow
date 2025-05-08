import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.tsx'
import { ReduxProvider } from './store/provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider>
    <App />
    </ReduxProvider>
  </StrictMode>,
)
//https://flowup-pmnpsr2eo-alzeks-projects.vercel.app