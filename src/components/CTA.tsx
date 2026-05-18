import { Wand2 } from 'lucide-react'
import { Button } from './ui/button'
import { GithubIcon } from './Icon'

const CTA = () => {
  return (
    <section className="container mx-auto px-6 pb-20">
      <div className="glass relative overflow-hidden rounded-3xl p-10 text-center shadow-soft sm:p-16">
        <div className="absolute inset-0 -z-10 " />
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Stop writing fixtures.{' '}
          <span className="text-gradient">Start shipping.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Scroll up, tweak your schema, and generate thousands of rows in one
          click.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <a href='#playground'>
            <Button className="h-11 rounded-full px-5 font-semibold">
              <Wand2 className="h-4 w-4" /> Try the generator
            </Button>
          </a>
          <Button
            variant={'outline'}
            asChild
            className="bg-card h-11 rounded-full px-5 font-semibold"
          >
            <a
              href="https://github.com/Hasan0734/bulkgen"
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon className="h-4 w-4" /> Star on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CTA
