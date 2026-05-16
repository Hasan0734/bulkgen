import CTA from '#/components/CTA'
import Playground from '#/components/Playground'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/playground')({ component: App })

function App() {
  return (
    <main className=" px-4 pb-8 pt-14">
      <section className="max-w-6xl mx-auto py-20">
        <Playground />
      </section>
      <CTA />
    </main>
  )
}
