import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface WorkoutsState {
  favorites:     string[]
  activeFilters: string[]
}

// Inicializar siempre vacío — se carga desde localStorage en ReduxProvider
// después de la hidratación para evitar hydration mismatch (React error #418)
const initialState: WorkoutsState = {
  favorites:     [],
  activeFilters: [],
}

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    loadFromStorage(state) {
      try {
        const saved = localStorage.getItem('kore-favorites')
        state.favorites = saved ? JSON.parse(saved) : []
      } catch {
        state.favorites = []
      }
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const id  = action.payload
      const idx = state.favorites.indexOf(id)
      if (idx === -1) {
        state.favorites.push(id)
      } else {
        state.favorites.splice(idx, 1)
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('kore-favorites', JSON.stringify(state.favorites))
      }
    },
    setFilters(state, action: PayloadAction<string[]>) {
      state.activeFilters = action.payload
    },
    clearFilters(state) {
      state.activeFilters = []
    },
  },
})

export const { loadFromStorage, toggleFavorite, setFilters, clearFilters } = workoutsSlice.actions
export default workoutsSlice.reducer
