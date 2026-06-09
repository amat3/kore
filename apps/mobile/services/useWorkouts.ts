import { useState, useEffect, useMemo } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export interface Workout {
  id:           string
  title:        string
  category:     string
  duration:     number
  level:        'beginner' | 'intermediate' | 'advanced'
  imageSrc?:    string
  description?: string
  videoUrl?:    string
  featured?:    boolean
  order?:       number
}

export interface UseWorkoutsFilters {
  search?:     string
  categories?: string[]
}

export const useWorkouts = (filters?: UseWorkoutsFilters) => {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<Error | null>(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const q    = query(collection(db, 'workouts'), orderBy('order'))
        const snap = await getDocs(q)
        setWorkouts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Workout[])
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const filtered = useMemo(() => {
    let result = workouts

    if (filters?.categories?.length) {
      result = result.filter(w => filters.categories!.includes(w.category))
    }

    if (filters?.search?.trim()) {
      const q = filters.search.toLowerCase()
      result  = result.filter(w =>
        w.title.toLowerCase().includes(q) || w.category.toLowerCase().includes(q)
      )
    }

    return result
  }, [workouts, filters?.search, filters?.categories])

  const categories = useMemo(
    () => [...new Set(workouts.map(w => w.category))].sort(),
    [workouts]
  )

  return { workouts: filtered, loading, error, categories, total: workouts.length }
}
