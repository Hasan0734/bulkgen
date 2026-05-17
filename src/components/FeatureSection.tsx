import {
  Wand2,
  Link2,
  Database,
  Download,
  Lock,
  Settings2,
  Sparkles,
} from 'lucide-react'
import UICard from './UICard'

const FeatureSection = () => {
  const features = [
    {
      icon: Wand2,
      title: '18+ smart field types',
      desc: 'Names, emails, addresses, prices, dates, UUIDs — realistic data powered by Faker.',
    },
    {
      icon: Link2,
      title: 'Relational integrity',
      desc: 'Define foreign keys between tables. Orders reference real users, every time.',
    },
    {
      icon: Settings2,
      title: 'Custom field control',
      desc: 'Static values, enums, min/max ranges, and custom column names per field.',
    },
    {
      icon: Database,
      title: 'Multiple tables',
      desc: 'Model your whole schema. Add as many tables and rows as you need.',
    },
    {
      icon: Download,
      title: 'Export anywhere',
      desc: 'Copy or download as JSON, CSV, or ready-to-run SQL INSERT statements.',
    },
    {
      icon: Lock,
      title: '100% client-side',
      desc: 'Nothing is uploaded. Generation runs entirely in your browser.',
    },
  ]

  return (
    <section id='features' className="container mx-auto mt-8 ">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="h-3 w-3 text-primary" /> Features
        </span>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything you need to seed a{' '}
          <span className="text-gradient">real database</span>
        </h2>
        <p className="mt-3 text-muted-foreground">
          Built for developers who are tired of writing fixture scripts by hand.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <UICard key={feature.title} data={feature}/>
        ))}
      </div>
    </section>
  )
}

export default FeatureSection
