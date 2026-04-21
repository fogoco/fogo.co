-- Seed data for Fogo & Co demo site
-- Creates an account, a site, and a "home" page.
-- Run AFTER 0001_init.sql.

insert into accounts (id, name)
values ('00000000-0000-0000-0000-000000000001', 'Fogo & Co')
on conflict (id) do nothing;

insert into sites (id, account_id, slug, name)
values (
  '00000000-0000-0000-0000-000000000010',
  '00000000-0000-0000-0000-000000000001',
  'fogo-co',
  'Fogo & Co'
)
on conflict (id) do nothing;

insert into seo_settings (site_id, title, description)
values (
  '00000000-0000-0000-0000-000000000010',
  'Fogo & Co — Brazilian Fire. Premium Events.',
  'Premium Brazilian BBQ catering for weddings, corporate and private events across Australia.'
)
on conflict (site_id) do nothing;

insert into theme_settings (site_id, tokens)
values (
  '00000000-0000-0000-0000-000000000010',
  jsonb_build_object(
    'primary', '#d94122',
    'accent', '#d4b36a',
    'background', '#0d0d0d'
  )
)
on conflict (site_id) do nothing;

-- Home page with empty draft_blocks; your Builder UI will populate it.
insert into pages (id, site_id, slug, title, draft_blocks)
values (
  '00000000-0000-0000-0000-000000000100',
  '00000000-0000-0000-0000-000000000010',
  'home',
  'Home',
  '[]'::jsonb
)
on conflict (site_id, slug) do nothing;
