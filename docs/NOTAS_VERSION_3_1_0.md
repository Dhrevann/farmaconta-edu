# FarmaConta EDU 3.1.0 · Notas de la versión

**Fecha:** 20 de octubre de 2026  
**Estado:** candidato estable para piloto de aula.

## Incluye

- Acceso individual por Google y matrícula individual/masiva desde panel docente.
- Simulador de farmacia ficticia: inventario, compras al contado, Kardex simplificado, ventas, comprobantes y tickets PDF, gastos, diario/mayor y reportes.
- Banco de 100 ejercicios explicados, casos abiertos, ayudas (?) y evaluaciones numéricas adicionales con corrección en Supabase.
- Seguimiento docente y retroalimentación; PDF de evidencia integral y CSV de avances.
- Persistencia de datos en Supabase y respaldos de estados anteriores.

## Cambios de cierre de auditoría

1. Corregido el desafío de **efectivo final** para descontar compras al contado, en coherencia con el libro diario y el saldo de caja.
2. Añadidas pruebas de integración contable (apertura, compra, venta, IGV y Debe = Haber).
3. Integradas las nuevas pruebas en GitHub Actions.
4. Aplicado índice de rendimiento a las revisiones docentes, sin cambios de datos.
5. Redactados [Manual docente](MANUAL_DOCENTE_3_1_0.md), [Manual estudiante](MANUAL_ESTUDIANTE_3_1_0.md) y [Acta de aceptación](ACTA_CIERRE_3_1_0.md).

## Seguridad

- Mantener cuentas docentes autorizadas por Supabase.
- No introducir correos de estudiantes en el repositorio ni datos reales de clientes.
- El linter de Supabase sigue mostrando advertencias informativas sobre funciones `SECURITY DEFINER` autorizadas a usuarios autenticados, funciones internas con RLS sin políticas de lectura, y configuración de contraseñas filtradas si se habilita ese proveedor. No afirmar ausencia universal de riesgos.
- La capacidad concurrente para 30 estudiantes y la validación académica externa deben comprobarse en un piloto real.

## Publicación y etiquetado

La versión puede integrarse en `main` tras éxito del CI. La etiqueta Git **`v3.1.0`** debe apuntar al commit de publicación que supere la revisión. No crear una etiqueta ficticia ni declarar el ensayo con 30 estudiantes como realizado.

Los PDFs A4 de manuales se han preparado para entregar al docente fuera del repositorio; sus fuentes mantenibles están en `docs/`.
