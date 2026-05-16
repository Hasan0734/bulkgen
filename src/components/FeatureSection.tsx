import { Wand2, Link2, Database, Download, Lock, Settings2 } from 'lucide-react'

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
    <section className="container mx-auto mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <article key={feature.title} className="bg-card rounded-2xl p-5">
          <h2 className="mb-2 text-base font-semibold">
            {feature.title}
          </h2>
          <p className="m-0 text-sm text-muted-foreground">{feature.desc}</p>
        </article>
      ))}
    </section>
  )
}

export default FeatureSection
