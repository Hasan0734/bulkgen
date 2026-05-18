import { GithubIcon, XIcon } from './Icon'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-primary px-4 py-6 ">
      <div className="container mx-auto  flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="m-0 text-sm">
          &copy; {year} BulkGen. All rights reserved.
        </p>

        <div className="flex items-center gap-4 text-muted-foreground">
          <a href="#features" className="text-xs hover:text-foreground">
            Features
          </a>
          <a href="#how-it-works" className="text-xs hover:text-foreground">
            How it works
          </a>
          <a href="#faq" className="text-xs hover:text-foreground">
            FAQ
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:text-red-500"
          >
            <span className="sr-only">Star to GitHub</span>

            <GithubIcon className="size-6 " />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:text-red-500"
          >
            <span className="sr-only">Follow TanStack on X</span>
            <XIcon className="size-6 " />
          </a>
        </div>
      </div>
    </footer>
  )
}
