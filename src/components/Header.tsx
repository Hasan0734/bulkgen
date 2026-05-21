import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'
import { GithubIcon, XIcon } from './Icon'
import { AnimatedThemeToggler } from './ui/animated-theme-toggler'

export default function Header() {
  const navLink = [
    { title: 'Home', to: '/' },
    // { title: 'About', to: '/about' },
    // { title: 'Docs', to: '/docs' },
  ]
  return (
    <header className="sticky top-0 z-50  px-4 backdrop-blur-lg">
      <nav className=" flex flex-wrap items-center gap-x-5 gap-y-2 py-3 sm:py-3 container mx-auto">
        <h2 className="m-0 shrink-0 text-base font-semibold tracking-tight">
            <Link to="/" className="inline-flex items-center gap-2 text-xl">
              {/* <span className="h-2 w-2 rounded-full bg-red-500/80" /> */}
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-52-56H92a28,28,0,0,0,0,56h72a28,28,0,0,0,0-56Zm-24,16v24H116V152ZM80,164a12,12,0,0,1,12-12h8v24H92A12,12,0,0,1,80,164Zm84,12h-8V152h8a12,12,0,0,1,0,24ZM72,108a12,12,0,1,1,12,12A12,12,0,0,1,72,108Zm88,0a12,12,0,1,1,12,12A12,12,0,0,1,160,108Z"></path>
                </svg>
              </span>
              BulkGen
            </Link>
        </h2>

        {/* <div className="order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold sm:order-0 sm:w-auto sm:flex-nowrap sm:pb-0">
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
        </div> */}

        <div className="ml-auto flex items-center gap-2 sm:gap-4 ">
          <a
            href="https://x.com/jahid0734"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-xl  transition sm:block hover:text-red-500"
          >
            <span className="sr-only">Follow TanStack on X</span>
            <XIcon className="size-6" />
          </a>
          <a
            href="https://github.com/TanStack"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-xl transition sm:block hover:text-red-500 "
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
