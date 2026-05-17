import CTA from '#/components/CTA'
import Playground from '#/components/Playground'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/playground')({ component: App })

function App() {
  return (
    <main className=" px-4 py-12">
      <section className="py-20">
        <Playground />
      </section>
      <CTA />
    </main>
  )
}
