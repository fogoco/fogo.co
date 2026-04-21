# BlockBuilder — Fogo & Co

A premium, block-based landing page builder built with **Next.js 14, Supabase, Tailwind, shadcn/ui, dnd-kit**.
First tenant: **Fogo & Co** — premium Brazilian BBQ catering for Australian clients.

## Features

- Controlled block-based builder (not a freeform Wix clone)
- Live preview canvas + left sections list + right inspector
- Drag to reorder, hide/show, duplicate, delete, add-from-library
- Autosaving draft + "Publish" workflow (draft ⇢ page_version ⇢ live)
- Public homepage rendered from published content (SSR)
- Booking enquiry form (React Hook Form + Zod) stored in Supabase
- Admin dashboard: Overview, Builder, Enquiries pipeline, Media library, Settings
- Supabase Auth (email/password) + Supabase Storage for media
- Multi-site ready DB schema with RLS

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Create your Supabase project

- Go to https://supabase.com, create a new project.
- In `SQL Editor`, run:
  1. `supabase/migrations/0001_init.sql`
  2. `supabase/seed.sql`
- In `Authentication > Providers`, enable **Email** (disable "Confirm email" while developing if you want fast testing).
- In `Authentication > Users`, click **Add user** to create your first admin (email + password).

### 3. Configure env

```bash
cp .env.example .env.local
```

Fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR-SERVICE-ROLE-KEY
NEXT_PUBLIC_SITE_SLUG=fogo-co
```

### 4. Run locally

```bash
npm run dev
```

- Public site: http://localhost:3000
- Admin login: http://localhost:3000/login
- After login: http://localhost:3000/admin

On first run the homepage renders from in-code demo blocks. Open the Builder, tweak blocks, then click **Publish** to persist and serve from Supabase.

## Deploy to Netlify

1. Push to GitHub.
2. On Netlify: `Add new site > Import from Git`.
3. Set build command `npm run build`, publish dir `.next`.
4. Add env vars (same as `.env.local`).
5. Netlify auto-detects `netlify.toml` and the Next.js plugin.

## Architecture

```
src/
  app/
    page.tsx              # Public homepage (SSR from published version)
    login/                # Auth (email/password)
    admin/
      page.tsx            # Dashboard overview
      builder/            # Block builder (client + server action)
      enquiries/          # Booking pipeline
      media/              # Supabase Storage gallery
      settings/           # Brand + SEO
  components/
    blocks/               # Public block components + Renderer
    booking/BookingForm   # Public enquiry form
    admin/                # Builder, Inspector, Uploader, etc.
  lib/
    blocks/               # Block types + registry (source of truth)
    supabase/             # Browser + server clients
    data/                 # Server-side data fetchers
supabase/
  migrations/0001_init.sql
  seed.sql
```

### Block system

Each block is `{ id, type, visible, position, data }` stored as JSON inside `pages.draft_blocks` and `page_versions.blocks`. Add a new block type by:

1. Add the `BlockType` + data interface in `src/lib/blocks/types.ts`.
2. Add its definition + default data in `src/lib/blocks/registry.ts`.
3. Create the component in `src/components/blocks/` and add a case in `Renderer.tsx`.

The `Inspector` auto-generates edit fields from the block's data shape (strings, numbers, booleans, CTA `{label,href}`, and arrays of strings/objects).

### Publishing

- `draft_blocks` on `pages` = live editing state (autosaved from Builder).
- Clicking **Publish** creates a new `page_versions` row, points `pages.published_version_id` at it, and revalidates `/`.
- Public homepage reads the `published_version_id` version — never the draft.

## Roadmap (next steps for a premium delivery)

- Theme token editor that rewrites CSS variables at runtime.
- Rich-text fields via Tiptap on selected block fields.
- Per-site custom domain via Netlify.
- Email notifications on new enquiry (Supabase Edge Function + Resend).
- Role-based access via `site_users` with tighter RLS.
- Image optimization through Supabase Image Transform.
