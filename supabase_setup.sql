-- FarmaConta EDU 2.0 · Primera migración (piloto con 30 estudiantes)
-- Ejecutar una sola vez en Supabase > SQL Editor, en un proyecto nuevo.
-- Todas las cuentas inician por Google OAuth. NO colocar claves secretas en GitHub.

create table if not exists public.class_enrollments (
  email text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);
alter table public.class_enrollments enable row level security;
revoke all on public.class_enrollments from anon, authenticated;
grant select on public.class_enrollments to authenticated;
create policy "student sees only own enrollment"
  on public.class_enrollments for select to authenticated
  using (email = lower(coalesce((select auth.jwt()->>'email'),'')));

create table if not exists public.workspaces (
  owner_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null check (jsonb_typeof(data) = 'object'),
  revision bigint not null default 1 check (revision > 0),
  updated_at timestamptz not null default now()
);
alter table public.workspaces enable row level security;
revoke all on public.workspaces from anon, authenticated;
grant select on public.workspaces to authenticated;
create policy "student reads own workspace when enrolled"
  on public.workspaces for select to authenticated
  using (
    owner_id = (select auth.uid())
    and exists (
      select 1 from public.class_enrollments e
      where e.email = lower(coalesce((select auth.jwt()->>'email'),''))
    )
  );

-- Versioned atomic writes prevent one open device from silently overwriting another.
-- SECURITY DEFINER may only write the workspace of auth.uid() and only for enrolled emails.
create or replace function public.save_workspace(
  p_data jsonb, p_expected_revision bigint
)
returns table(new_revision bigint, saved_at timestamptz)
language plpgsql security definer
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_email text := lower(coalesce(auth.jwt()->>'email',''));
  v_existing bigint;
begin
  if v_uid is null then raise exception 'AUTH_REQUIRED'; end if;
  if not exists (select 1 from public.class_enrollments where email=v_email) then
    raise exception 'NOT_ENROLLED';
  end if;
  if p_data is null or jsonb_typeof(p_data) <> 'object' or p_data->>'version' <> '1'
    or jsonb_typeof(p_data->'products') <> 'array'
    or jsonb_typeof(p_data->'pharmacy') <> 'object' then
    raise exception 'INVALID_WORKSPACE';
  end if;
  if pg_catalog.pg_column_size(p_data) > 3000000 then
    raise exception 'WORKSPACE_TOO_LARGE';
  end if;
  select w.revision into v_existing from public.workspaces w
    where w.owner_id = v_uid for update;
  if found then
    if v_existing <> p_expected_revision then raise exception 'VERSION_CONFLICT'; end if;
    update public.workspaces w set data=p_data, revision=w.revision+1, updated_at=now()
      where w.owner_id=v_uid returning w.revision,w.updated_at into new_revision,saved_at;
  else
    if p_expected_revision <> 0 then raise exception 'VERSION_CONFLICT'; end if;
    insert into public.workspaces(owner_id,data,revision) values(v_uid,p_data,1)
      returning revision,updated_at into new_revision,saved_at;
  end if;
  return next;
end;
$$;
revoke all on function public.save_workspace(jsonb,bigint) from public, anon;
grant execute on function public.save_workspace(jsonb,bigint) to authenticated;

-- Agrega manualmente los correos institucionales o personales AUTORIZADOS.
-- Nunca publiques los correos reales de estudiantes en un repositorio público.
-- Ejemplo (reemplazar con direcciones auténticas desde el SQL Editor privado):
-- insert into public.class_enrollments(email) values
--   ('alumno01@ejemplo.edu.pe'), ('alumno02@ejemplo.edu.pe');
