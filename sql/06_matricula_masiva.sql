-- FarmaConta EDU 3.1 - Matrícula masiva protegida.
-- Acepta una lista de correos; NO crea cuentas Auth ni modifica farmacias existentes.
-- La operación se ejecuta de forma atómica; correos inválidos rechazan toda la solicitud.
create or replace function public.farma_teacher_bulk_enrollment(p_emails text[])
returns jsonb
language plpgsql security definer set search_path=''
as $$
declare
  v_new integer := 0;
  v_unique integer := 0;
  v_received integer := 0;
begin
  if not public.farma_is_teacher() then
    raise exception 'ACCESS_DENIED';
  end if;
  v_received := coalesce(cardinality(p_emails),0);
  if v_received < 1 or v_received > 500 then
    raise exception 'INVALID_BATCH_SIZE';
  end if;

  if exists (
    select 1
    from unnest(p_emails) as x(email)
    where x.email is null
       or length(btrim(x.email)) > 254
       or length(btrim(x.email)) < 6
       or lower(btrim(x.email)) !~ '^[a-z0-9._%+-]+@[a-z0-9-]+(\.[a-z0-9-]+)+$'
  ) then
    raise exception 'INVALID_EMAIL_LIST';
  end if;

  select count(*) into v_unique from (
    select distinct lower(btrim(x.email)) as email
    from unnest(p_emails) as x(email)
  ) distinct_emails;

  insert into public.class_enrollments(email)
  select distinct lower(btrim(x.email))
  from unnest(p_emails) as x(email)
  on conflict (email) do nothing;
  get diagnostics v_new = row_count;

  return jsonb_build_object(
    'received',v_received,
    'unique',v_unique,
    'inserted',v_new,
    'already_enrolled',v_unique-v_new
  );
end;
$$;

revoke all on function public.farma_teacher_bulk_enrollment(text[]) from public,anon,authenticated;
grant execute on function public.farma_teacher_bulk_enrollment(text[]) to authenticated;
