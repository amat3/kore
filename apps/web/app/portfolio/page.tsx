import PortfolioHero          from '@/components/Portfolio/PortfolioHero'
import DesignSystemShowcase   from '@/components/DesignSystemShowcase/DesignSystemShowcase'
import StackSection from '@/components/StackSection/StackSection'

export const metadata = {
  title:       'Portfolio técnico — Juan Antonio Amate · Frontend Developer',
  description: 'Design system, stack técnico y demos en vivo. React, Next.js, React Native, TypeScript, GSAP, Firebase.',
}

export default function PortfolioPage() {
  return (
    <main>
      <PortfolioHero />
      <DesignSystemShowcase />
      <StackSection />
    </main>
  )
}
