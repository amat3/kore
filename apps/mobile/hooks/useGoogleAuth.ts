import { useState } from 'react'
import type {
  GoogleSignin as GoogleSigninType,
  isSuccessResponse as isSuccessResponseType,
  isErrorWithCode as isErrorWithCodeType,
  statusCodes as statusCodesType,
} from '@react-native-google-signin/google-signin'

interface GoogleSigninModule {
  GoogleSignin:       typeof GoogleSigninType
  isSuccessResponse:  typeof isSuccessResponseType
  isErrorWithCode:    typeof isErrorWithCodeType
  statusCodes:        typeof statusCodesType
}

let googleSignin: GoogleSigninModule | null = null
try {
  // require (no import estático) — el módulo nativo no existe en Expo Go y
  // el import estático lanza al evaluar el módulo, antes de poder capturarlo
  googleSignin = require('@react-native-google-signin/google-signin')
  googleSignin!.GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  })
} catch {
  // Módulo nativo no disponible (p.ej. Expo Go) — requiere development build
  googleSignin = null
}

export const useGoogleAuth = (onIdToken: (idToken: string) => void) => {
  const [loading, setLoading] = useState(false)

  const signIn = async () => {
    if (!googleSignin) {
      throw new Error('Google Sign-In requiere un development build (no disponible en Expo Go)')
    }
    const { GoogleSignin, isSuccessResponse, isErrorWithCode, statusCodes } = googleSignin
    setLoading(true)
    try {
      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()
      if (isSuccessResponse(response) && response.data.idToken) {
        onIdToken(response.data.idToken)
      }
    } catch (err) {
      if (isErrorWithCode(err) && err.code === statusCodes.SIGN_IN_CANCELLED) {
        return
      }
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { loading, signIn, isAvailable: googleSignin !== null }
}
