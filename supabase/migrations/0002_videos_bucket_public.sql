-- Make videos bucket publicly readable for stable hero/background URLs.
insert into storage.buckets (id, name, public)
values ('videos', 'videos', true)
on conflict (id) do update set public = true;

drop policy if exists "public read videos bucket" on storage.objects;

create policy "public read videos bucket"
  on storage.objects for select
  using (bucket_id = 'videos');
