import PortfolioHero          from '@/components/Portfolio/PortfolioHero'
import DesignSystemShowcase   from '@/components/DesignSystemShowcase/DesignSystemShowcase'
import TokensShowcase         from '@/components/TokensShowcase/TokensShowcase'
import StackSection from '@/components/StackSection/StackSection'
import Dashboard from '@/components/Dashboard/Dashboard'
import CrossPlatform from '@/components/CrossPlatform/CrossPlatform'
import ProjectsSection from '@/components/ProjectsSection/ProjectsSection'
import Contact from '@/components/Contact/Contact'
import Footer  from '@/components/Footer/Footer'

export const metadata = {
  title:       'Portfolio técnico — Juan Antonio Amate · Frontend Developer',
  description: 'Frontend developer con React, Next.js y TypeScript: design systems, productos mobile-first y proyectos en producción. KORE, starpoint y más.',
  openGraph: {
    title:       'KORE · Portfolio técnico — Juan Antonio Amate, Frontend Developer',
    description: 'Design system con 15 componentes, monorrepo Turborepo, animaciones GSAP y Firebase. React 19 + Next.js 16.',
    url:         'https://kore-juanan-amate.vercel.app/portfolio',
  },
  twitter: {
    title:       'KORE · Portfolio técnico — Juan Antonio Amate, Frontend Developer',
    description: 'Design system con 15 componentes, Turborepo, GSAP y Firebase.',
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
      <ProjectsSection />
      <Contact />
      <Footer surface="solid" />
    </main>
  )
}
