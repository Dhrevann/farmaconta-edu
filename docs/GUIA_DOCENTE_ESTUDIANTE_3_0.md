# FarmaConta EDU 3.0 · Guía de implementación y cierre

## Estado real
Rama de desarrollo `release/3-0-consolidacion`. Los archivos ya están escritos; **no se considera apto para uso masivo hasta ejecutar las tres migraciones, verificar permisos y superar el piloto**. La rama `main` continúa como referencia estable hasta integrar el cambio.

## Activación obligatoria en Supabase
1. En Supabase Dashboard → SQL Editor, ejecutar en este orden:
   - `sql/03_docente.sql` (permisos docentes, matrículas y notas)
   - `sql/04_evaluacion_servidor.sql` (examen con calificación en servidor)
   - `sql/05_backups.sql` (respaldos diarios por estudiante)
2. Para asignarte el rol de docente **después de iniciar sesión con Google al menos una vez**, reemplaza **TU_CORREO_DOCENTE** en el siguiente SQL y ejecútalo solo en SQL Editor privado (no en GitHub):

```sql
insert into public.farma_teachers(user_id)
select id from auth.users
where lower(email)=lower('TU_CORREO_DOCENTE')
on conflict (user_id) do update set enabled=true;

insert into public.class_enrollments(email)
values (lower('TU_CORREO_DOCENTE'))
on conflict (email) do nothing;
```

3. Cierra sesión y vuelve a entrar. Debe mostrarse el botón **Panel docente** en el menú. Solo la presencia del botón no certifica la seguridad: **prueba las RPC desde dos cuentas que NO sean docentes**.
4. Verifica que el indicador señale «Guardado correctamente en la nube» antes de cerrar.

## Recorrido docente
- **Panel docente → Matricular:** registra el correo Google del alumno; las contraseñas no se solicitan.
- **Revocar:** impide entrar al trabajo, pero **no borra el workspace**, lo que permite recuperar la matrícula.
- **Revisar:** carga solo lectura del avance y análisis del alumno elegido.
- **Nota y retroalimentación:** guarda una evaluación del profesor separada del trabajo del alumno.
- **CSV:** exporta una lista de estudiantes y avances para su tratamiento en hojas de cálculo.
- **No mostrar datos privados en clase** desde el panel del profesor.

## Recorrido estudiante
1. **Mi farmacia:** registrar botica ficticia, datos inventados y logotipo PNG.
2. **Inventario:** agregar productos, consultar precios y existencias; **Compras ficticias** registra al contado cantidades, lote y vencimiento.
3. **Kardex simplificado:** consultar entradas, salidas y saldo a costo fijo; las ventas disminuyen el total por producto, no el stock por lote individual.
4. **Punto de venta:** emitir boleta/factura/nota de venta **SIMULADA**; imprimir comprobante A4 o ticket 58/80 mm.
5. **Gastos y contabilidad:** consultar Caja, Mercaderías, costos, gastos y partida doble. Las compras ficticias generan asiento Debe Mercaderías / Haber Caja.
6. **Aprendizaje:** practicar con 100 preguntas y casos abiertos; la evaluación habitual es *formativa*.
7. **Evaluación con servidor en Reportes:** hasta 3 intentos por módulo en 24 h, 60 minutos por intento; 10 cálculos únicos y nota sobre 20. Las respuestas concretas se guardan solo en PostgreSQL, no en el JavaScript de la prueba. No es un sistema antifraude invulnerable.
8. **Reportes → Entrega final integral / PDF:** incluye resúmenes, inventario, libros y actividades, y notas de evaluación del servidor cargadas en la sesión.
9. **Reportes → Copias diarias:** descargar JSON de una fecha anterior; si necesitas restaurar, utiliza la función de importación de respaldos ya existente después de verificar el archivo.

## Rúbrica para respuestas abiertas (20 puntos)
| Criterio | Puntaje |
|---|---:|
| Utiliza indicadores de la propia farmacia sin inventar resultados | 5 |
| Interpreta relaciones entre ventas, costo, gasto e inventario | 5 |
| Propone decisiones viables para el caso | 5 |
| Justifica con claridad y lenguaje contable apropiado | 5 |

La calificación automática **no** debe utilizarse para juzgar razonamientos abiertos.

## Prueba de aceptación con 30 estudiantes

| ID | Qué comprobar | Criterio de aprobación |
|---|---|---|
| T01 | Acceso con 2 cuentas distintas | Farmacias e inventarios no se mezclan |
| T02 | Alumno no matriculado | No accede al workspace |
| T03 | Alumno llama `farma_teacher_dashboard` | La RPC responde con denegación |
| T04 | Alumno llama `farma_teacher_student` con otro UUID | Denegación |
| T05 | Alumno A crea producto; alumno B vuelve a abrir | No aparece en B |
| T06 | Compra ficticia de 10 unidades | Sube stock 10, baja caja por costo×10 |
| T07 | Venta ficticia posterior | Baja stock y genera costo de ventas |
| T08 | Libro diario con compras y gastos | Debe = Haber en cada asiento y totales |
| T09 | Modificación de costos con movimientos | Bloqueada |
| T10 | Borrar artículo con compras/ventas | Desactivación sin desaparición del historial |
| T11 | Examen en servidor | No revela soluciones en la API cliente y registra nota |
| T12 | Examen más de 3 veces al día/módulo | Se rechaza el cuarto intento |
| T13 | Profesor revisa y califica | Alumno distinto no accede a la revisión |
| T14 | Desconectar internet durante una venta | Se avisa guardado pendiente y se reintenta al reconectar |
| T15 | Abrir dos dispositivos con cuenta A | Conflicto evita sobrescritura silenciosa |
| T16 | PDF integral y tickets térmicos | Importes visibles, aviso tributario, páginas sin cortes |
| T17 | Respaldos diarios | Solo dueño consulta o descarga los suyos |
| T18 | 30 usuarios simultáneos | Sin errores de autenticación, guardados perdidos ni cruces |
| T19 | Sesión en móvil y escritorio | Formularios y (?) accesibles al toque/teclado |
| T20 | Nueva promoción | Revocar y matricular sin perder registros antiguos |

**Evidencias del piloto:** capturas, hora de inicio/fin, navegadores, tamaño de sección, errores, estadísticas Supabase, resultados por alumno y capturas de PDF. No afirmar T18 superada sin una sesión real con 30 estudiantes.

## Límites didácticos y regulatorios
- No son documentos tributarios válidos; no se integra SUNAT.
- Aplicación de supuestos generales de IGV en casos didácticos: **no reproduzca obligaciones tributarias reales para cualquier producto farmacéutico**.
- Las compras se registran al costo fijo del catálogo y se pagan solo al contado; no hay crédito, descuentos de compra, devoluciones, impuestos de adquisición desglosados ni asientos de diferencias.
- Los lotes y vencimientos son **etiquetas de entradas**. Todavía no existe asignación automática de cada venta a un lote, FEFO, trazabilidad ni cadena de frío: no usar para gestión sanitaria real.
- Respaldo interno de 14 días no sustituye exportaciones externas ni un plan de recuperación completo.
- El banco de 100 reactivos necesita revisión metodológica/validación académica antes de generar calificaciones oficiales.
- Las preguntas de práctica tienen respuestas visibles en el código público; para notas use la evaluación específica validada en servidor y supervisión pedagógica.
- El panel docente puede consultar datos de los inscritos, por lo que el permiso se debe conceder solo a profesores autorizados.
