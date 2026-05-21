import CTA from '#/components/CTA'
import FAQ from '#/components/FAQ'
import FeatureSection from '#/components/FeatureSection'
import Hero from '#/components/Hero'
import { HowItWorks } from '#/components/HowItWorks'
import Playground from '#/components/Playground'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className=" px-4 pb-8 pt-14">
      <Hero />
      <Playground />
      <FeatureSection />
      <HowItWorks />
      <FAQ />
      <CTA />
    </main>
  )
}
