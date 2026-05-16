import CTA from '#/components/CTA'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/playground')({ component: App })

function App() {
  return (
    <main className=" px-4 pb-8 pt-14">
      
      <CTA />
    </main>
  )
}
