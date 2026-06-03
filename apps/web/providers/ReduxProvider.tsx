'use client'

import { useEffect }        from 'react'
import { Provider }          from 'react-redux'
import { store }             from '@/store/store'
import { loadFromStorage }   from '@/store/workoutsSlice'

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  // Cargar favoritos desde localStorage DESPUÉS de la hidratación
  // para evitar hydration mismatch entre servidor (favorites:[]) y cliente
  useEffect(() => {
    store.dispatch(loadFromStorage())
  }, [])

  return <Provider store={store}>{children}</Provider>
}
