# Informe de auditoría · FarmaConta EDU 3.0 (20 octubre 2026)

## Resultado actual
**Candidato técnico en rama de desarrollo — NO APROBADO PARA PUBLICACIÓN MASIVA.**

Repositorio: Dhrevann/farmaconta-edu.
Propuesta de integración: https://github.com/Dhrevann/farmaconta-edu/pull/4

### Verificado por GitHub Actions
- Ejecución de Node.js con resultados satisfactorios de `tests/smoke.mjs`.
- Banco de 100 preguntas con identificadores únicos y respuestas de opciones presentes.
- Compilación de JavaScript principal y módulos nuevos.
- Presencia de funciones SQL con restricción docente, notas, exámenes y respaldos.
- No se añadió ninguna clave secreta a `config.js`; este archivo ni siquiera se modifica en esta rama.
- No se añadió acceso al solucionario completo de estudiantes.

### Implementado, pendiente de ensayo real
- Panel docente y revisión protegida por autenticación y funciones de PostgreSQL.
- Corrección en servidor de preguntas numéricas, con registro de intentos.
- Compra ficticia al contado, registro de lote/vencimiento, Kardex y efecto sobre caja/inventario.
- Respaldo automático del workspace anterior (una captura diaria por cuenta, retención 14 días).
- PDF consolidado de entrega y retroalimentación docente visible al estudiante.
- Reintentos automáticos de sincronización al reconectar.

### Bloqueadores para certificación
1. Aplicar 03, 04 y 05 sobre Supabase real; SQL público en el repositorio no implica ejecución.
2. Asignar rol docente desde SQL Editor autorizado.
3. Probar denegaciones RLS/RPC con usuario no matriculado y dos estudiantes inscritos distintos.
4. Pruebas móviles de los formularios, glosario (?) y ticket térmico.
5. Verificar compra + venta + ajuste de stock + costos + capital + balance en datos reales.
6. Prueba de carga con 30 estudiantes y reporte de errores y latencia.
7. Prueba de recuperación desde JSON de respaldos.
8. Comprobar la entrega PDF con venta, respuestas y nota de servidor.

### Decisiones de alcance explícitas
- Se conserva el modelo académico de IGV incluido (18 %) para los ejercicios gravados, sin pretender cubrir exenciones y regímenes reales de todos los medicamentos.
- No existe transmisión a SUNAT, facturación electrónica real ni emisión válida.
- El Kardex es al costo fijo del artículo: lotes y vencimientos identifican entradas, **NO** descuentan automáticamente por lote ni aplican FEFO.
- La evaluación numérica en servidor disminuye la exposición de respuestas concretas, pero no evita toda colaboración ni sustituye supervisión.
- No se han cuantificado rendimientos ni validado el banco de preguntas mediante expertos externos.

**Criterio de liberación:** pruebas reales aprobadas + visto bueno del docente → integrar la PR en main y verificar GitHub Pages.
