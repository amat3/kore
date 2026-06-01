'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db }            from '@/lib/firebase'

// ── Tipos ─────────────────────────────────────────────────────────────────
interface AuthContextValue {
  user:         User | null
  loading:      boolean
  login:        (email: string, password: string) => Promise<void>
  register:     (name: string, email: string, password: string) => Promise<void>
  loginGoogle:  () => Promise<void>
  logout:       () => Promise<void>
}

// ── Context ───────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue>({
  user:        null,
  loading:     true,
  login:       async () => {},
  register:    async () => {},
  loginGoogle: async () => {},
  logout:      async () => {},
})

export const useAuth = () => useContext(AuthContext)

// ── Helper — guarda el usuario en Firestore ───────────────────────────────
const saveUserToFirestore = async (user: User, name?: string) => {
  const ref = doc(db, 'users', user.uid)
  const snap = await getDoc(ref)
  if (!snap.exists()) {
    await setDoc(ref, {
      name:      name ?? user.displayName ?? 'Usuario KORE',
      email:     user.email,
      createdAt: new Date().toISOString(),
    })
  }
}

// ── Provider ──────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user,    setUser]    = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Escucha cambios de sesión
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setUser(user)
      setLoading(false)
    })
    return unsub
  }, [])

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const register = async (name: string, email: string, password: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(user, { displayName: name })
    await saveUserToFirestore(user, name)
  }

  const loginGoogle = async () => {
    const provider  = new GoogleAuthProvider()
    const { user }  = await signInWithPopup(auth, provider)
    await saveUserToFirestore(user)
  }

  const logout = async () => {
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
