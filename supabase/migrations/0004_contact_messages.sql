-- Contact form submissions.
-- Anyone (including anonymous visitors) can submit; only admins can read them.

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;

create policy "Anyone can submit a contact message" on contact_messages for insert
  with check (true);

create policy "Admins can view contact messages" on contact_messages for select
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()));

create policy "Admins can update contact messages" on contact_messages for update
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()))
  with check (exists (select 1 from admin_users where admin_users.id = auth.uid()));

create policy "Admins can delete contact messages" on contact_messages for delete
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()));

create index if not exists contact_messages_created_at_idx on contact_messages (created_at desc);
