import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'
import { GithubIcon, XIcon } from './Icon'
import { AnimatedThemeToggler } from './ui/animated-theme-toggler'

export default function Header() {
  const navLink = [
    { title: 'Home', to: '/' },
    { title: 'About', to: '/about' },
    { title: 'Docs', to: '/docs' },
  ]
  return (
    <header className="sticky top-0 z-50  px-4 backdrop-blur-lg ">
      <nav className=" flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-3 container mx-auto">
        <h2 className="m-0 shrink-0 text-base font-semibold tracking-tight">
          <Button variant={'ghost'} asChild>
            <Link to="/" className="inline-flex items-center gap-2 text-xl">
              <span className="h-2 w-2 rounded-full bg-green-600" />
              BulkGen
            </Link>
          </Button>
        </h2>

        <div className="order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold sm:order-0 sm:w-auto sm:flex-nowrap sm:pb-0">
          {navLink.map((nav) => (
            <Link
              key={nav.title}
              to={nav.to}
              activeOptions={{ exact: true }}
              className="group relative"
              // activeProps={{ className: '' }}
            >
              {nav.title}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-bottom-left transition-transform duration-300 ease-out group-hover:scale-x-100 group-[.active]:scale-x-100 group-[.active]:origin-bottom-left"></span>
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-4 ">
          <a
            href="https://x.com/jahid0734"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-xl  transition sm:block hover:text-active"
          >
            <span className="sr-only">Follow TanStack on X</span>
            <XIcon className="size-6" />
          </a>
          <a
            href="https://github.com/TanStack"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-xl transition sm:block hover:text-active "
          >
            <span className="sr-only">Go to TanStack GitHub</span>
            <GithubIcon className="size-6" />
          </a>

          <AnimatedThemeToggler />
          <Button asChild className="h-9 rounded-full px-5">
            <Link to="/playground">Playground</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
