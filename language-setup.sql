-- CineVerse audio languages. Run once in Supabase > SQL Editor.
alter table public.cv_video_assets
  add column if not exists language text not null default 'Original';

-- replace the old rule 'one video per quality' with 'one video per quality per language'
do $$
declare r record;
begin
  for r in
    select c.conname from pg_constraint c
    where c.conrelid = 'public.cv_video_assets'::regclass and c.contype = 'u'
      and (select array_agg(a.attname::text order by a.attname::text) from pg_attribute a
           where a.attrelid = c.conrelid and a.attnum = any (c.conkey)) = array['episode_id','quality']
  loop
    execute format('alter table public.cv_video_assets drop constraint %I', r.conname);
  end loop;
  for r in
    select i.indexrelid::regclass::text as idx from pg_index i
    where i.indrelid = 'public.cv_video_assets'::regclass and i.indisunique and not i.indisprimary
      and not exists (select 1 from pg_constraint c where c.conindid = i.indexrelid)
      and (select array_agg(a.attname::text order by a.attname::text) from pg_attribute a
           where a.attrelid = i.indrelid and a.attnum = any (i.indkey)) = array['episode_id','quality']
  loop
    execute 'drop index ' || r.idx;
  end loop;
end $$;

create unique index if not exists cv_video_assets_episode_quality_language_key
  on public.cv_video_assets (episode_id, quality, language);