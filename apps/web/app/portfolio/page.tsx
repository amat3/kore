import PortfolioHero          from '@/components/Portfolio/PortfolioHero'
import DesignSystemShowcase   from '@/components/DesignSystemShowcase/DesignSystemShowcase'
import TokensShowcase         from '@/components/TokensShowcase/TokensShowcase'
import StackSection from '@/components/StackSection/StackSection'
import Dashboard from '@/components/Dashboard/Dashboard'
import CrossPlatform from '@/components/CrossPlatform/CrossPlatform'
import Contact from '@/components/Contact/Contact'
import Footer  from '@/components/Footer/Footer'

export const metadata = {
  title:       'Portfolio técnico — Juan Antonio Amate · Frontend Developer',
  description: 'Especialista en UI, design systems y animaciones. React 19, Next.js 16, Turborepo, GSAP — construido desde cero.',
  openGraph: {
    title:       'Juan Antonio Amate — Mid Frontend Developer',
    description: 'Design system con 15 componentes, monorrepo Turborepo, animaciones GSAP y Firebase. React 19 + Next.js 16.',
    url:         'https://kore-juanan-amate.vercel.app/portfolio',
    images: [{
      url:    '/og-portfolio.png',
      width:  1200,
      height: 630,
      alt:    'Juan Antonio Amate — Mid Frontend Developer',
    }],
  },
  twitter: {
    title:       'Juan Antonio Amate — Mid Frontend Developer',
    description: 'Design system con 15 componentes, Turborepo, GSAP y Firebase.',
    images:      ['/og-portfolio.png'],
  },
}

export default function PortfolioPage() {
  return (
    <main>
      <PortfolioHero />
      <DesignSystemShowcase />
      <TokensShowcase />
      <CrossPlatform />
      <StackSection />
      <Dashboard />
      <Contact />
      <Footer surface="solid" />
    </main>
  )
}
