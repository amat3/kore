import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface WorkoutsState {
  favorites:     string[]
  activeFilters: string[]
}

const loadFavorites = (): string[] => {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem('kore-favorites') ?? '[]')
  } catch {
    return []
  }
}

const initialState: WorkoutsState = {
  favorites:     loadFavorites(),
  activeFilters: [],
}

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
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

export const { toggleFavorite, setFilters, clearFilters } = workoutsSlice.actions
export default workoutsSlice.reducer
