import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BloodBankProvider } from './context/BloodBankContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BloodBankProvider>
      <App />
    </BloodBankProvider>
  </StrictMode>,
)
