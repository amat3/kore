import Hero from '@/components/Hero/Hero'
import Features from '@/components/Features/Features'
import Catalog from '@/components/Catalog/Catalog'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <div id="catalog">
        <Catalog />
      </div>
    </main>
  )
}
