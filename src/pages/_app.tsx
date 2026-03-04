import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import '../style/global.css'

export default function App({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage or system preference
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (saved === 'dark' || (!saved && prefersDark)) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('theme', newMode ? 'dark' : 'light')
    
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}><Component {...pageProps} /></div>
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Component {...pageProps} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  )
}
