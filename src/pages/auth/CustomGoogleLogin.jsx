// Install:
// npm install @react-oauth/google jwt-decode
// or
// yarn add @react-oauth/google jwt-decode

// Usage:
// In your app root (e.g. src/main.jsx or src/index.jsx):
// import { GoogleOAuthProvider } from '@react-oauth/google'
// import App from './App'
//
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//     <App />
//   </GoogleOAuthProvider>
// )

// Example component: CustomGoogleButton.jsx

import React, { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'

export default function CustomGoogleButton({ onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // useGoogleLogin gives you a function to call when you want to start login
  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        setLoading(true)
        setError(null)
        // tokenResponse has access_token (implicit flow)
        // We can call Google userinfo endpoint, or decode ID token if present.
        // For a quick client-side profile, fetch the Google profile:
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        })
        const profile = await res.json()

        // optional: decode id_token if returned
        // const idData = tokenResponse.id_token ? jwt_decode(tokenResponse.id_token) : null

        // pass profile to parent
        onSuccess && onSuccess({ tokenResponse, profile })
      } catch (err) {
        console.error(err)
        setError('Failed to fetch Google profile')
      } finally {
        setLoading(false)
      }
    },
    onError: err => {
      console.error('login-error', err)
      setError('Google login failed')
    },
    // optional: use "flow: 'auth-code'" to get an authorization code for server-side exchange
    // flow: 'auth-code'
  })

  return (
    <div className="w-full max-w-xs mx-auto">
      <button
        onClick={() => {
          setError(null)
          login()
        }}
        disabled={loading}
        className={`flex items-center justify-center gap-3 w-full px-4 py-2 rounded-lg shadow-md transition transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          ${loading ? 'bg-gray-200 text-gray-600' : 'bg-white text-gray-800 hover:shadow-lg'}`}
      >
        {/* Google G icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.33 1.53 8.23 2.8l6-5.8C35.86 3.2 30.4 1 24 1 14.8 1 6.9 6.2 3.4 13.8l6.99 5.4C12.9 14.2 18.87 9.5 24 9.5z" />
          <path fill="#4285F4" d="M46.5 24.5c0-1.64-.15-3.22-.42-4.75H24v9.02h12.72c-.55 3-2.36 5.54-5.04 7.26l7.76 6.02C43.56 37.06 46.5 31.17 46.5 24.5z" />
          <path fill="#FBBC05" d="M10.39 28.2A14.83 14.83 0 0 1 9.5 24c0-1.5.27-2.95.77-4.3L3.4 14.8C1.24 18.98 0 23.34 0 28c0 4.6 1.16 8.91 3.18 12.66l7.21-5.72z" />
          <path fill="#34A853" d="M24 46.9c6.1 0 11.6-2 15.45-5.44l-7.76-6.02C30.9 35.9 27.66 37 24 37c-5.12 0-10.09-4.7-13.11-11.4l-6.99 5.4C6.9 41.8 14.8 46.9 24 46.9z" />
        </svg>

        <span className="font-medium">{loading ? 'Signing in...' : 'Sign in with Google'}</span>
      </button>

      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

      {/* Optional: small caption */}
      <p className="text-xs text-gray-500 mt-2 text-center">Use your Google account to sign in</p>
    </div>
  )
}

/* Notes:
 - For production, prefer server-side exchange (flow: 'auth-code') to keep client secrets secure.
 - Add the Google OAuth client ID to your environment (Vite: VITE_GOOGLE_CLIENT_ID).
 - Tailwind v3 classes above create a minimal, clean custom button. Tweak sizes/colors as needed.
 - If you want a fully-brand-compliant button, follow Google's branding guidelines:
   https://developers.google.com/identity/branding-guidelin