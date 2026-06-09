import './kore.css'
import './globals.css'
import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { ThemeProvider }  from '@/providers/ThemeProvider'
import { AuthProvider }   from '@/providers/AuthProvider'
import ReduxProvider      from '@/providers/ReduxProvider'

// ── Fuentes KORE ──────────────────────────────────────────────────────────
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
})

// ── Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://kore-juanan-amate.vercel.app'),
  title: {
    default: 'KORE — Entrena sin límites',
    template: '%s · KORE',
  },
  description: 'App de fitness para mujeres que entrenan con intención. Fuerza, hábitos, nutrición y comunidad.',
  openGraph: {
    siteName: 'KORE',
    locale:   'es_ES',
    type:     'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

// ── Layout ────────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ReduxProvider>
          <ThemeProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
