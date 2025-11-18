import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RoutePath from './routes/RoutePath.jsx'
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
  <GoogleOAuthProvider clientId="383931139069-842pvm4ep3j6rt9suik76a82ub5fq6ko.apps.googleusercontent.com">
    <RoutePath />

  </GoogleOAuthProvider>
<Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "0.75rem",
            padding: "12px 16px",
            fontSize: "14px",
          },
        }}
      />
  </StrictMode>,
)
