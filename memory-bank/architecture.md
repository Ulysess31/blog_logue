# Architecture

## Project overview

`blog_logue` is a Next.js App Router application for composing a Markdown blog introduction and previewing its rendered presentation. The editor is available at `/`; a standalone public-facing preview is available at `/preview`. Markdown input is parsed in the browser; the current project does not include a server API, database, or persistent content store.

## Technology

- Next.js 16 with the App Router
- React 19 and TypeScript (strict mode enabled in `tsconfig.json`)
- Tailwind CSS 4, `tw-animate-css`, and shadcn styling configuration
- Base UI React, Lucide icons, `class-variance-authority`, `clsx`, and `tailwind-merge`
- Vercel Analytics, rendered by the root layout in production
- pnpm workspace/package manager

## Directory structure

```text
blog_logue/
├── app/
│   ├── globals.css       # Tailwind imports, theme tokens, and global styles
│   ├── layout.tsx        # Root HTML shell, metadata, viewport, analytics
│   ├── page.tsx          # Client-side Markdown editor and live preview controls
│   └── preview/
│       └── page.tsx      # Standalone public preview at /preview
├── components/
│   ├── blog-preview.tsx  # Shared blog introduction preview UI
│   └── ui/
│       └── button.tsx    # Reusable Base UI button with CVA variants
├── lib/
│   ├── blog.ts           # Blog data type, sample Markdown, and parser
│   └── utils.ts          # cn() class name merge helper
├── public/               # Static icons, placeholder images, and logos
├── memory-bank/          # Project architecture and future working memory
├── components.json       # shadcn component generator configuration
├── next.config.mjs       # Next.js configuration
├── package.json          # Scripts and dependencies
├── pnpm-lock.yaml        # Locked dependency graph
├── pnpm-workspace.yaml   # pnpm workspace configuration
├── postcss.config.mjs    # Tailwind/PostCSS integration
└── tsconfig.json         # TypeScript settings and @/* root alias
```

## Application flow

1. `app/layout.tsx` provides Korean document language, global CSS, site metadata, viewport settings, and production-only Vercel Analytics.
2. `app/page.tsx` initializes the editor with an embedded Markdown example. A `content` query parameter can supply shared Markdown content.
3. `lib/blog.ts` parses YAML-like frontmatter fields (`blog_name`, `tagline`, `description`, `author`, `topics`, `hero_image`, `highlight`, `button_text`, and `button_url`) and the remaining body text. It reports missing required fields (`blog_name` and `tagline`). This is a lightweight line parser, not a general YAML or Markdown parser.
4. `components/blog-preview.tsx` renders the blog introduction. The editor supports desktop and mobile preview widths; `/preview` renders the standalone public view, preferring Markdown in its `content` query parameter and otherwise using the latest editor content saved to browser `localStorage` before falling back to the sample.
5. Browser-side editor actions support loading `.md` files, downloading the sample template, saving edits in browser `localStorage`, and copying a public `/preview?content=...` URL to the clipboard when permitted.

`components/blog-preview.tsx` renders the shared blog presentation. `/preview` reads Markdown from its `content` query parameter and shows the sample when no content is supplied.

## Styling and shared UI

Global Tailwind and shadcn CSS setup lives in `app/globals.css`. The page mostly uses utility classes and inline design tokens for its warm, editorial color palette. `lib/utils.ts` exports `cn()` to combine conditional classes and resolve Tailwind conflicts. `components/ui/button.tsx` defines a reusable Base UI button with CVA variants; the current page primarily uses local button markup.

## Configuration notes

- The TypeScript alias `@/*` maps to the project root.
- `next.config.mjs` currently disables build-time TypeScript error checks and configures images as unoptimized. Treat these settings as existing behavior when changing build or image handling.
- The repository currently has no test script or test files in the inspected tree.
- Package scripts are `dev`, `build`, and `start`.







