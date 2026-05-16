import CTA from '#/components/CTA'
import Playground from '#/components/Playground'
import { DotPattern } from '#/components/ui/dot-pattern'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/playground')({ component: App })

function App() {
  return (
    <main className=" px-4 pb-8 pt-14">
      <section className="relative py-20">
        <Playground />
        <DotPattern glow />
      </section>
      <CTA />
    </main>
  )
}
