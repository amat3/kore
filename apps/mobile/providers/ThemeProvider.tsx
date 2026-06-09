import React, { createContext, useContext, useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'
import AsyncStorage       from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@kore/theme'

interface ThemeContextValue {
  isDark: boolean
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue>({ isDark: false, toggle: () => {} })

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const system              = useColorScheme()
  const [override, setOverride] = useState<'dark' | 'light' | null>(null)

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(val => {
      if (val === 'dark' || val === 'light') setOverride(val)
    })
  }, [])

  const isDark = override !== null ? override === 'dark' : system === 'dark'

  const toggle = () => {
    const next = isDark ? 'light' : 'dark'
    setOverride(next)
    AsyncStorage.setItem(STORAGE_KEY, next)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
