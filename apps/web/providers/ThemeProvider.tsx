'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme:       Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme:       'light',
  toggleTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light')

  // Lee la preferencia guardada o el sistema al montar
  useEffect(() => {
    const saved  = localStorage.getItem('kore-theme') as Theme | null
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light'
    const initial = saved ?? system
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
    document.cookie = `kore-theme=${initial}; path=/; max-age=31536000; SameSite=Lax`
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('kore-theme', next)
    document.cookie = `kore-theme=${next}; path=/; max-age=31536000; SameSite=Lax`
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
