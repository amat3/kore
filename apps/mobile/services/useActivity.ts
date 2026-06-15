import { useState, useEffect, useMemo } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isoWeek)

export interface Session {
  id:           string
  workoutTitle: string
  category:     string
  duration:     number          // minutos
  date:         Date
}

interface FirestoreSession {
  workoutTitle: string
  category:     string
  duration:     number
  date:         { toDate: () => Date } | Date
}

export interface ActivityStats {
  totalSessions: number
  totalMinutes:  number
  streak:        number         // días consecutivos con sesión
  weeklyMinutes: number[]       // [lun, mar, mie, jue, vie, sab, dom]
}

export const useActivity = (uid: string | undefined) => {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    if (!uid) { setLoading(false); return }

    getDocs(query(
      collection(db, 'users', uid, 'sessions'),
      orderBy('date', 'desc'),
    ))
      .then(snap => {
        const data = snap.docs.map(doc => {
          const d = doc.data() as FirestoreSession
          const raw = d.date
          const date = raw && typeof (raw as { toDate?: () => Date }).toDate === 'function'
            ? (raw as { toDate: () => Date }).toDate()
            : (raw as Date)
          return { id: doc.id, ...d, date }
        })
        setSessions(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [uid])

  const stats: ActivityStats = useMemo(() => {
    const totalSessions = sessions.length
    const totalMinutes  = sessions.reduce((acc, s) => acc + s.duration, 0)

    // Racha: días consecutivos hacia atrás desde hoy con al menos una sesión
    const activeDays = new Set(sessions.map(s => dayjs(s.date).format('YYYY-MM-DD')))
    let streak = 0
    let cursor = dayjs()
    while (activeDays.has(cursor.format('YYYY-MM-DD'))) {
      streak++
      cursor = cursor.subtract(1, 'day')
    }

    // Minutos por día de la semana ISO actual (lun=0 … dom=6)
    const weekStart    = dayjs().startOf('isoWeek')
    const weeklyMinutes = Array(7).fill(0) as number[]
    sessions.forEach(s => {
      const d = dayjs(s.date)
      if (d.isSame(weekStart, 'week')) {
        const idx = d.isoWeekday() - 1   // lun=0 … dom=6
        weeklyMinutes[idx] += s.duration
      }
    })

    return { totalSessions, totalMinutes, streak, weeklyMinutes }
  }, [sessions])

  // Sesiones agrupadas por mes para secciones del FlatList
  const grouped = useMemo(() => {
    const map = new Map<string, Session[]>()
    sessions.forEach(s => {
      const key = dayjs(s.date).format('MMMM YYYY')
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(s)
    })
    return Array.from(map.entries()).map(([month, items]) => ({ month, items }))
  }, [sessions])

  return { sessions, stats, grouped, loading }
}
