import '@kore/tokens/css'
import type { Metadata }    from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { ThemeProvider }    from '@/providers/ThemeProvider'
import Header from '@/components/Header/Header'
import { AuthProvider } from '@/providers/AuthProvider'

// ── Fuentes KORE ──────────────────────────────────────────────────────────
const cormorant = Cormorant_Garamond({
  subsets:  ['latin'],
  weight:   ['300', '400', '600'],
  variable: '--font-cormorant',
})

const dmSans = DM_Sans({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
})

// ── Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title:       'KORE — Entrena sin límites',
  description: 'App de fitness para mujeres que entrenan con intención. Fuerza, hábitos, nutrición y comunidad.',
}

// ── Script anti-flash — se ejecuta antes de que React hidrate ─────────────
const themeScript = `
  (function() {
    try {
      var saved  = localStorage.getItem('kore-theme');
      var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      var theme  = saved || system;
      document.documentElement.setAttribute('data-theme', theme);
    } catch(e) {}
  })();
`

// ── Layout ────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Anti-flash: aplica el tema antes de pintar */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
        <Header />
          {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
