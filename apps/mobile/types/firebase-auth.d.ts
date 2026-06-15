// Los tipos públicos de 'firebase/auth' resuelven a la build web y omiten
// `getReactNativePersistence`, aunque Metro sí carga la build RN en runtime.
export {}

declare module 'firebase/auth' {
  interface ReactNativeAsyncStorage {
    setItem(key: string, value: string): Promise<void>
    getItem(key: string): Promise<string | null>
    removeItem(key: string): Promise<void>
  }

  export function getReactNativePersistence(storage: ReactNativeAsyncStorage): Persistence
}
