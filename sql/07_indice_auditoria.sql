-- FarmaConta EDU 3.1.0 - Optimización no destructiva de auditoría.
-- Índice de soporte para FK teacher_id y consultas de revisiones.
-- No elimina ni modifica datos, políticas RLS, roles o credenciales.
create index if not exists farma_teacher_reviews_teacher_id_idx
  on public.farma_teacher_reviews (teacher_id);
