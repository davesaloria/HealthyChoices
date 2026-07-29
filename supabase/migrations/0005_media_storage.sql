-- Storage bucket for admin-uploaded product/recipe photos, so new items
-- don't require dropping a file into the repo and redeploying.

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- storage.objects already has RLS enabled by default in every Supabase
-- project, and the SQL Editor's role doesn't own that table (only
-- Supabase's internal storage role does), so re-toggling it here would
-- fail with "must be owner of table objects." Only policies are added.

create policy "Public can view media" on storage.objects for select
  using (bucket_id = 'media');

create policy "Admins can upload media" on storage.objects for insert
  with check (
    bucket_id = 'media'
    and exists (select 1 from admin_users where admin_users.id = auth.uid())
  );

create policy "Admins can update media" on storage.objects for update
  using (
    bucket_id = 'media'
    and exists (select 1 from admin_users where admin_users.id = auth.uid())
  );

create policy "Admins can delete media" on storage.objects for delete
  using (
    bucket_id = 'media'
    and exists (select 1 from admin_users where admin_users.id = auth.uid())
  );
