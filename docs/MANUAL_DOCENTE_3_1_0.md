# FarmaConta EDU 3.1.0 · Manual operativo del docente

**Finalidad:** seguimiento y evaluación de experiencias simuladas de la III Unidad «Documentos Contables en una Oficina Farmacéutica».  
**Acceso:** https://dhrevann.github.io/farmaconta-edu/ · Panel docente visible únicamente al Google autorizado.

## Preparación de la sección (antes de clase)

1. Entra con la cuenta Google **docente autorizada en Supabase**.
2. Abre **Panel docente** y comprueba que el listado de matrículas está disponible.
3. Para una cuenta nueva, utiliza **Matricular** con su correo exacto.
4. Para varias cuentas, selecciona **Importar estudiantes por correo** y carga **CSV/TXT** con una columna «Correo» o «Correo electrónico», o pega una lista. Si el origen es Excel, **guardar como CSV**. Máximo **300** correos únicos por lote.
5. Pulsa **Revisar correos** y verifica nuevos, ya inscritos, repetidos e inválidos. Solo después confirma las matrículas.
6. Comparte el enlace a los estudiantes por tus medios habituales. **La plataforma no manda invitaciones ni crea contraseñas.**
7. Comprueba desde una cuenta estudiantil de prueba que un alumno matriculado puede entrar sin ver el panel docente.

## Durante la III Unidad

| Sesión | Actividad | Evidencia mínima |
|---|---|---|
| 09 · Finanzas | Configurar farmacia; gastos fijos y variables; práctica de conceptos | Registro de gastos, resumen financiero, ejercicios |
| 10 · Facturación | Venta al contado; boleta/factura/nota de venta simulada | Historial de operaciones; dos comprobantes ficticios en PDF |
| 11 · Contabilidad | Compra, venta, Kardex, diario, mayor y partida doble | Kardex y sumas Debe/Haber |
| 12 · Reportes | Diagnóstico, propuestas, ejercicios, evaluación | Informe integral y respuestas abiertas |

Las cifras y documentos son ficticios. El IGV didáctico asumido **no sustituye la normativa tributaria aplicable a cada medicamento**; no se emiten comprobantes SUNAT.

## Calificar y hacer seguimiento

1. En **Panel docente**, selecciona **Actualizar**. Las columnas resumen farmacias, ventas, preguntas respondidas y evaluaciones.
2. Pulsa **Revisar** en un estudiante. Observa su análisis final, respuestas a casos abiertos y notas de evaluación.
3. Introduce el **módulo**, la **nota /20** y una retroalimentación constructiva, y pulsa **Guardar calificación**.
4. El estudiante podrá consultar los comentarios en **Reportes → Observaciones y calificaciones del docente**.
5. Si necesitas consolidar la sección, pulsa **Exportar CSV** y ábrelo en Excel.

### Rúbrica orientativa del análisis abierto (20 puntos)

| Criterio | Puntos |
|---|---:|
| Utiliza información verificable de su propia farmacia | 5 |
| Relaciona correctamente ingresos, costos, gastos y existencias | 5 |
| Propone medidas factibles para su caso | 5 |
| Explica el razonamiento con claridad y terminología adecuada | 5 |

**Precaución:** las evaluaciones del banco de preguntas en navegador son **formativas** y sus claves están en JavaScript; las evaluaciones numéricas específicas de servidor validan las respuestas en Supabase. No confundas ambos modos.

## Gestión segura de datos

- No compartas enlaces de acceso privado, secretos de Supabase ni contraseñas de Google.
- **Revocar matrícula** bloquea el acceso del correo sin eliminar el workspace ni las evidencias anteriores.
- El docente ve únicamente los espacios de alumnos matriculados por el servicio de autorización.
- Cada alumno controla y debe respaldar su información. La aplicación dispone de JSON local y copias internas diarias con retención; esas copias **no reemplazan un backup externo** del proyecto Supabase.
- El informe debe mencionar **SIMULACIÓN ACADÉMICA, SIN VALIDEZ TRIBUTARIA**.
- Ante un conflicto entre dispositivos, no sobrescribas datos sin examinar primero el respaldo y la revisión de la nube.

## Ensayo obligatorio antes de la primera sesión oficial

Marca cada elemento y documenta las evidencias:

- [ ] Entró un estudiante con correo autorizado.
- [ ] Se rechazó un correo no matriculado.
- [ ] Un alumno no vio ni pudo usar las funciones administrativas.
- [ ] Dos alumnos no vieron sus productos, respuestas o operaciones cruzadas.
- [ ] Una compra ficticia redujo Caja e incrementó Mercaderías, conservando Debe = Haber.
- [ ] Una venta redujo existencias y reconoció costo de ventas.
- [ ] Los recibos A4 y tickets 58/80 mm se guardaron como PDF sin cortes.
- [ ] Cada alumno consultó sus avances después de salir y reingresar.
- [ ] Se guardó y leyó una calificación docente.
- [ ] Se probó recuperación desde JSON usando un ambiente o usuario de prueba.
- [ ] **30 estudiantes simultáneos** pudieron guardar sin pérdidas ni cruces (se requiere evidencia real, no simulación).

### Resultado del piloto
Registrar fecha, número de estudiantes, dispositivos, navegadores, incidentes, tiempos de respuesta y enlaces a capturas o evidencias. Si alguna prueba falla, mantener la versión como **piloto** y corregir antes de certificar la operación masiva.

## Alcance de la versión 3.1.0
FarmaConta EDU es un **laboratorio contable educativo**, no un sistema de farmacia clínica, gestión de dispensación por lotes, facturación electrónica real ni un ERP comercial completo. La lista de 100 preguntas tiene correcciones programadas, pero no validación psicométrica externa.
