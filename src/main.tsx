import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <Router>
    <StrictMode>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </StrictMode>,
  </Router>
)
