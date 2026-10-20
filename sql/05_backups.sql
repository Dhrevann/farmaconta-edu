-- FarmaConta EDU 3.0 · Respaldos diarios de workspaces individuales.
-- Ejecutar DESPUÉS de 03_docente y 04_evaluacion_servidor.
-- Conserva como máximo la primera versión anterior de cada día de los últimos 14 días.
-- No ejecuta cron: registra automáticamente el estado previo a las escrituras del alumno.
begin;
create table if not exists public.farma_daily_backups(
  owner_id uuid not null references auth.users(id) on delete cascade,
  day date not null,
  data jsonb not null,
  revision bigint not null,
  created_at timestamptz not null default now(),
  primary key(owner_id,day)
);
alter table public.farma_daily_backups enable row level security;
revoke all on public.farma_daily_backups from public,anon,authenticated;
grant select on public.farma_daily_backups to authenticated;
drop policy if exists "owner may read backups" on public.farma_daily_backups;
create policy "owner may read backups" on public.farma_daily_backups
 for select to authenticated using(owner_id=(select auth.uid()));

create or replace function public.farma_archive_workspace_before_write()
returns trigger language plpgsql security definer set search_path=''
as $$
begin
 if old.data is distinct from new.data then
   insert into public.farma_daily_backups(owner_id,day,data,revision)
   values(old.owner_id,(now() at time zone 'UTC')::date,old.data,old.revision)
   on conflict(owner_id,day) do nothing;
   delete from public.farma_daily_backups b where b.owner_id=old.owner_id
      and b.day < ((now() at time zone 'UTC')::date - 14);
 end if;
 return new;
end;
$$;
drop trigger if exists farma_archive_before_workspace_update on public.workspaces;
create trigger farma_archive_before_workspace_update before update on public.workspaces
for each row execute function public.farma_archive_workspace_before_write();

create or replace function public.farma_backup_manifest()
returns jsonb language sql security definer set search_path=''
as $$
 select coalesce(jsonb_agg(jsonb_build_object('day',day,'revision',revision)
   order by day desc),'[]'::jsonb)
 from public.farma_daily_backups where owner_id=(select auth.uid());
$$;
revoke all on function public.farma_backup_manifest() from public,anon;
grant execute on function public.farma_backup_manifest() to authenticated;

-- No permite descargar respaldos ajenos: auth.uid() se impone en la consulta.
create or replace function public.farma_download_backup(p_day date)
returns jsonb language sql security definer set search_path=''
as $$
 select data from public.farma_daily_backups
 where owner_id=(select auth.uid()) and day=p_day;
$$;
revoke all on function public.farma_download_backup(date) from public,anon;
grant execute on function public.farma_download_backup(date) to authenticated;
commit;

-- IMPORTANTE: los respaldos del mismo servidor no sustituyen una copia fuera de Supabase.
-- Programa/exporta respaldos externos periódicos de la base de datos.
