-- FarmaConta EDU 3.0 · Evaluación corregida exclusivamente en PostgreSQL.
-- Ejecutar después de sql/03_docente.sql.
-- Las soluciones concretas de cada intento NO se envían al navegador.
-- Uso educativo; no constituye examen invulnerable frente a colaboración externa.
begin;
create table if not exists public.farma_secure_exams(
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id) on delete cascade,
 module text not null check(module in('finanzas','ventas','inventario','contabilidad','reportes')),
 questions jsonb not null,
 answer_key jsonb not null,
 submitted jsonb,
 correct_count integer,
 score integer,
 created_at timestamptz not null default now(),
 submitted_at timestamptz
);
create index if not exists farma_exam_owner_idx on public.farma_secure_exams(owner_id,module,created_at desc);
alter table public.farma_secure_exams enable row level security;
revoke all on public.farma_secure_exams from public,anon,authenticated;
create or replace function public.farma_start_exam(p_module text)
returns jsonb language plpgsql security definer set search_path=''
as $$
declare v_uid uuid:=auth.uid();v_id uuid;v_questions jsonb:='[]';v_answers jsonb:='[]';
 v_a integer;v_b integer;v_c integer;v_prompt text;v_answer numeric;i integer;
begin
 if v_uid is null or not exists(select 1 from public.class_enrollments
   where email=lower(coalesce(auth.jwt()->>'email',''))) then raise exception 'NOT_ENROLLED'; end if;
 if p_module not in ('finanzas','ventas','inventario','contabilidad','reportes') then raise exception 'INVALID_MODULE'; end if;
 if (select count(*) from public.farma_secure_exams where owner_id=v_uid and module=p_module
     and created_at >= now()-interval '24 hours')>=3 then raise exception 'DAILY_LIMIT_3';end if;
 for i in 1..10 loop
  v_a:=20+floor(random()*90)::int;
  v_b:=1+floor(random()*12)::int;
  v_c:=1+floor(random()*9)::int;
  if p_module='finanzas' then
   if i%2=0 then
    v_prompt:='Efectivo inicial S/ '||v_a*10||' e inventario inicial S/ '||v_b*10||'. ¿Capital inicial?';
    v_answer=v_a*10+v_b*10;
   else
    v_prompt:='Ingresos netos S/ '||v_a*10||', costo de ventas S/ '||v_b*10||' y gastos S/ '||v_c*5||'. ¿Resultado operativo?';
    v_answer=v_a*10-v_b*10-v_c*5;
   end if;
  elsif p_module='ventas' then
   if i%2=0 then
    v_prompt:='Precio con IGV incluido S/ '||v_a*1.18||'. Calcule el valor SIN IGV (18 %).';
    v_answer=v_a;
   else
    v_prompt:='Precio con IGV incluido S/ '||v_a*1.18||'. ¿Cuánto IGV está incluido (18 %)?';
    v_answer=v_a*0.18;
   end if;
  elsif p_module='inventario' then
   if i%2=0 then
    v_prompt:='Stock inicial '||v_a||', compra '||v_b||' y venta '||v_c||'. ¿Unidades finales?';
    v_answer=v_a+v_b-v_c;
   else
    v_prompt:='Stock final '||v_a||' unidades, costo unitario S/ '||v_b||'. ¿Valor al costo?';
    v_answer=v_a*v_b;
   end if;
  elsif p_module='contabilidad' then
   if i%2=0 then
    v_prompt:='Activo S/ '||v_a*10||' y pasivo S/ '||v_b*10||'. ¿Patrimonio?';
    v_answer=v_a*10-v_b*10;
   else
    v_prompt:='Venta al contado S/ '||v_a*1.18||' con IGV incluido. ¿Crédito a ingresos sin IGV?';
    v_answer=v_a;
   end if;
  else
   if i%2=0 then
    v_prompt:='Ingresos netos S/ '||v_a*10||', costo S/ '||v_b*10||', gastos S/ '||v_c*5||'. ¿Resultado operativo?';
    v_answer=v_a*10-v_b*10-v_c*5;
   else
    v_prompt:='Ingresos netos S/ '||v_a*10||' y costo S/ '||v_b*10||'. ¿Margen bruto en soles (sin otros gastos)?';
    v_answer=v_a*10-v_b*10;
   end if;
  end if;
  v_questions:=v_questions||jsonb_build_array(jsonb_build_object('number',i,'prompt',v_prompt));
  v_answers:=v_answers||jsonb_build_array(round(v_answer,2));
 end loop;
 insert into public.farma_secure_exams(owner_id,module,questions,answer_key)
 values(v_uid,p_module,v_questions,v_answers) returning id into v_id;
 return jsonb_build_object('id',v_id,'questions',v_questions,'module',p_module,'duration_minutes',60);
end;
$$;
revoke all on function public.farma_start_exam(text) from public,anon;
grant execute on function public.farma_start_exam(text) to authenticated;

create or replace function public.farma_submit_exam(p_exam uuid,p_answers jsonb)
returns jsonb language plpgsql security definer set search_path=''
as $$
declare v_row public.farma_secure_exams%rowtype;v_correct int:=0;i integer;v_str text;v_numeric numeric;v_expected numeric;
begin
 if auth.uid() is null then raise exception 'AUTH_REQUIRED';end if;
 select * into v_row from public.farma_secure_exams where id=p_exam and owner_id=auth.uid() for update;
 if not found then raise exception 'NOT_FOUND';end if;
 if v_row.submitted_at is not null then raise exception 'ALREADY_SUBMITTED';end if;
 if now()>v_row.created_at+interval '60 minutes' then raise exception 'EXAM_EXPIRED';end if;
 if p_answers is null or jsonb_typeof(p_answers)<>'array' or jsonb_array_length(p_answers)<>10 then raise exception 'INVALID_RESPONSES';end if;
 for i in 0..9 loop
  v_str:=trim(p_answers->>i);
  if v_str is not null and v_str ~ '^-?[0-9]+([.,][0-9]{1,4})?$' then
   v_numeric:=replace(v_str,',','.')::numeric;
   v_expected:=(v_row.answer_key->>i)::numeric;
   if abs(v_numeric-v_expected)<=0.02 then v_correct:=v_correct+1;end if;
  end if;
 end loop;
 update public.farma_secure_exams set submitted=p_answers,correct_count=v_correct,score=v_correct*2,submitted_at=now() where id=v_row.id;
 return jsonb_build_object('score',v_correct*2,'correct',v_correct,'total',10,'message','Evaluación corregida en servidor y registrada.');
end;
$$;
revoke all on function public.farma_submit_exam(uuid,jsonb) from public,anon;
grant execute on function public.farma_submit_exam(uuid,jsonb) to authenticated;

create or replace function public.farma_my_secure_exams()
returns jsonb language sql security definer set search_path=''
as $$
 select coalesce(jsonb_agg(jsonb_build_object('module',module,'score',score,'correct',correct_count,
 'created_at',created_at,'submitted_at',submitted_at) order by created_at desc),'[]'::jsonb)
 from public.farma_secure_exams where owner_id=(select auth.uid()) and submitted_at is not null;
$$;
revoke all on function public.farma_my_secure_exams() from public,anon;
grant execute on function public.farma_my_secure_exams() to authenticated;

create or replace function public.farma_teacher_secure_exams(p_student uuid)
returns jsonb language plpgsql security definer set search_path=''
as $$
declare v_result jsonb;
begin
 if not public.farma_is_teacher() then raise exception 'ACCESS_DENIED';end if;
 select coalesce(jsonb_agg(jsonb_build_object('module',module,'score',score,'correct',correct_count,
  'created_at',created_at,'submitted_at',submitted_at) order by created_at desc),'[]'::jsonb)
 into v_result from public.farma_secure_exams where owner_id=p_student and submitted_at is not null;
 return v_result;
end;
$$;
revoke all on function public.farma_teacher_secure_exams(uuid) from public,anon;
grant execute on function public.farma_teacher_secure_exams(uuid) to authenticated;
commit;
