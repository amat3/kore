import Hero     from '@/components/Hero/Hero'
import Features from '@/components/Features/Features'
import Catalog  from '@/components/Catalog/Catalog'
import Footer   from '@/components/Footer/Footer'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <Catalog />
      <Footer />
    </main>
  )
}
