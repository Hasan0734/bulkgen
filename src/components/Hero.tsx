import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'

const Hero = () => {
  return (
    <section className="container mx-auto relative overflow-hidden rounded-4xl px-6 py-10 sm:px-10 sm:py-14 text-center">
      <p className="island-kicker mb-3">Stop waiting on real data.</p>
      <h1 className="mx-auto mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight  sm:text-6xl">
        Generate production-ready mock datasets in seconds.
      </h1>
      <p className="mb-8 max-w-2xl mx-auto text-base sm:text-lg">
        Formulate schema-perfect, realistic test data in JSON, CSV, SQL, or
        Excel. Simulate thousands of relational records and complex API
        responses so you can parallelize UI development and ship code faster.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button className="rounded-full h-11 px-5 font-semibold" asChild>
          <Link to="/playground">Grenerate Free</Link>
        </Button>
        {/* <Button
          variant={'outline'}
          className="h-11 rounded-full px-5 bg-card font-semibold"
          asChild
        >
          <Link to=".">API Docs</Link>
        </Button> */}
      </div>
    </section>
  )
}

export default Hero
