-- Requests & problem reports (used by "Request / report" and the admin Inbox). Safe to run more than once.
create table if not exists public.cv_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  kind text not null check (kind in ('request','report')),
  title text check (char_length(title) <= 200),
  title_id text,
  details text check (char_length(details) <= 1000),
  status text not null default 'open' check (status in ('open','done')),
  created_at timestamptz not null default now()
);
alter table public.cv_feedback enable row level security;
drop policy if exists "fb insert own" on public.cv_feedback;
drop policy if exists "fb read own or admin" on public.cv_feedback;
drop policy if exists "fb admin update" on public.cv_feedback;
drop policy if exists "fb admin delete" on public.cv_feedback;
create policy "fb insert own" on public.cv_feedback for insert to authenticated with check (user_id = auth.uid());
create policy "fb read own or admin" on public.cv_feedback for select to authenticated using (user_id = auth.uid() or public.cv_is_admin());
create policy "fb admin update" on public.cv_feedback for update to authenticated using (public.cv_is_admin());
create policy "fb admin delete" on public.cv_feedback for delete to authenticated using (public.cv_is_admin());
