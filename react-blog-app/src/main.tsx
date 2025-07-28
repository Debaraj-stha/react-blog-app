import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './Provider/AuthProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import MessageProvider from './Provider/MessageProviders.tsx'
import ThemeProvider from './Provider/ThemeProvider.tsx'




createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <MessageProvider>
      <AuthProvider>
        <MessageProvider>
          <BrowserRouter>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </BrowserRouter>
        </MessageProvider>
      </AuthProvider >
    </MessageProvider>

  </StrictMode>,
)
