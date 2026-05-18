import { Database, Download, Link2, Shuffle, Wand2 } from 'lucide-react'
import UICard from './UICard'

export const HowItWorks = () => {
  const steps = [
    {
      n: '01',
      icon: Database,
      title: 'Design your schema',
      desc: 'Add tables, name your columns, and pick a type for each field.',
    },
    {
      n: '02',
      icon: Link2,
      title: 'Wire up relations',
      desc: 'Point foreign keys at parent tables to keep references consistent.',
    },
    {
      n: '03',
      icon: Wand2,
      title: 'Generate & preview',
      desc: 'Hit generate and inspect rows live in JSON, CSV, or SQL.',
    },
    {
      n: '04',
      icon: Download,
      title: 'Export & ship',
      desc: 'Download or copy the output straight into your seed scripts.',
    },
  ]

  return (
    <section id="how-it-works" className="mx-auto container px-6 py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary px-3 py-1 text-xs text-muted-foreground">
          <Shuffle className="h-3 w-3" /> How it works
        </span>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          From empty schema to seeded DB in{' '}
          <span className="text-gradient">under a minute</span>
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <UICard key={i} data={s}  />
        ))}
      </div>
    </section>
  )
}
