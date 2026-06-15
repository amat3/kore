import { initializeApp, getApps }                                  from 'firebase/app'
import { initializeAuth, getAuth, getReactNativePersistence }      from 'firebase/auth'
import { createAsyncStorage }                                      from '@react-native-async-storage/async-storage'
import { getFirestore }                                            from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

// initializeAuth solo puede llamarse una vez por app — con Fast Refresh,
// si el módulo se re-evalúa sobre una app ya inicializada, caemos a getAuth
let authInstance
try {
  authInstance = initializeAuth(app, {
    persistence: getReactNativePersistence(createAsyncStorage('firebase-auth')),
  })
} catch {
  authInstance = getAuth(app)
}

export const auth = authInstance
export const db   = getFirestore(app)
