import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import { Analytics } from '@vercel/analytics/react'
// import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
// import { TanStackDevtools } from '@tanstack/react-devtools'
import Footer from '../components/Footer'
import Header from '../components/Header'
import appCss from '../styles.css?url'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        title: 'BulkGen — Generate Realistic Bulk Database Data Instantly',
      },
      {
        name: 'description',
        content:
          'BulkGen helps developers generate realistic bulk database data with foreign keys, enums, statuses, and 148 data generation methods. Export to JSON, CSV, and SQL in seconds.',
      },

      {
        name: 'keywords',
        content:
          'bulk data generator, database seed generator, mock data generator, faker alternative, test data generator, sql seed data, csv generator, json generator, database seeding, fake database data, prisma seed, developer tools, BulkGen',
      },

      {
        property: 'og:title',
        content: 'BulkGen — Production-Grade Bulk Data Generator',
      },

      {
        property: 'og:description',
        content:
          'Generate realistic database datasets with relationships, foreign keys, enums, statuses, and export to JSON, CSV, SQL.',
      },

      {
        property: 'og:type',
        content: 'website',
      },

      {
        property: 'twitter:card',
        content: 'summary_large_image',
      },

      {
        property: 'twitter:title',
        content: 'BulkGen — Generate Realistic Bulk Database Data',
      },

      {
        property: 'twitter:description',
        content:
          '148 data generation methods, foreign keys, relationships, JSON/CSV/SQL export and realistic datasets.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/svg',
        href: '/logo.svg',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased wrap-anywhere selection:bg-[rgba(79,184,178,0.24)]">
        <Analytics />
        <Header />
        {children}
        <Footer />
        {/* <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        /> */}
        <Scripts />
      </body>
    </html>
  )
}
