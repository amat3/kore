import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Hooks tipados — usar siempre estos en lugar de los genéricos
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector)
