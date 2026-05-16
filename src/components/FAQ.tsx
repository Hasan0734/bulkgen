
const FAQ = () => {
  const faqs = [
    {
      q: 'Is the data really random?',
      a: 'Yes — each generation uses Faker under the hood, so values change every run. Relations stay consistent within a single generation.',
    },
    {
      q: 'Can I use this for production seeds?',
      a: 'Absolutely. The SQL export produces standard INSERT statements that work with Postgres, MySQL, and SQLite with minor tweaks.',
    },
    {
      q: 'How many rows can I generate?',
      a: 'Up to 5,000 rows per table. Generation is instant for typical workloads since it runs locally.',
    },
    {
      q: 'Do you store my schema?',
      a: "No. Everything lives in your browser tab. Refresh and it's gone.",
    },
  ]
  return (
    <section id="faq" className="max-w-2xl mx-auto px-6 py-20">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Frequently asked <span className="text-gradient">questions</span>
        </h2>
      </div>
      <div className="space-y-3">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="glass group rounded-xl p-5 bg-card transition-all open:border-primary/40"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
              {f.q}
              <span className="text-primary transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}

export default FAQ
