# Acta de cierre técnico · FarmaConta EDU 3.1.0

**Fecha de referencia:** 20 de octubre de 2026  
**Repositorio:** https://github.com/Dhrevann/farmaconta-edu  
**Aplicación:** https://dhrevann.github.io/farmaconta-edu/

## Dictamen

**Candidato estable para un piloto controlado; certificación operativa con 30 alumnos pendiente.**

La versión conserva la plataforma de simulación contable, el acceso por Google, la matrícula individual y masiva, el panel docente, evaluaciones, comprobantes ficticios, compras, Kardex simplificado, libros y reportes, y la persistencia en Supabase.

## Evidencias ya constatadas por revisión técnica

| Control | Resultado | Método |
|---|---|---|
| Código en repositorio y continuidad de módulos | Conforme | Inspección de archivos y CI |
| 100 reactivos, IDs únicos y alternativas válidas | Conforme | Prueba automatizada |
| Sin botón de solucionario completo para alumnos | Conforme | Revisión de `learning.js` |
| Integración contable: apertura, compra, venta, costo e IGV | Conforme en simulación local | `tests/accounting-integration.mjs` |
| Desafío financiero y salidas de caja por compras | Corregido | `learning.js` |
| Rol docente y denegación a cuenta no autorizada | Comprobado anteriormente | Pruebas controladas en Supabase |
| Matrícula masiva sin duplicados | Comprobado anteriormente | Función RPC y prueba transaccional |
| Copia preactualización de los workspaces existentes | Conforme | Tabla de snapshot protegida |
| RLS habilitado en datos privados y funciones sensibles | Revisado | Consultas de metadatos y Security Advisors |
| Índice sobre `farma_teacher_reviews.teacher_id` | Aplicado | Migración de optimización 07 |
| Pruebas 30 usuarios concurrentes, navegadores y móviles | **Pendiente** | Prueba real en clase |
| Calidad educativa, comprensión y dificultad del banco | **Pendiente de validación externa** | Revisión docente y piloto |
| Recuperación mediante JSON entre dispositivos | **Pendiente de ensayo de usuario** | Ensayo con cuentas de prueba |

## Riesgos y limitaciones reconocidos

- Los diagnósticos de Supabase detectan funciones `SECURITY DEFINER` ejecutables por usuarios autenticados: varias están expuestas intencionalmente para un RPC controlado por `auth.uid()` y `farma_is_teacher()`. Es **una señal de revisión**, no una demostración automática de acceso no autorizado; su autorización debe retestearse tras modificaciones futuras.
- Las tablas internas sin políticas RLS de lectura se mantienen cerradas a usuarios comunes por diseño.
- La alerta de protección de contraseñas filtradas se aplica a autenticación por contraseña; el flujo actual es acceso con Google OAuth. Si se habilitan contraseñas en el futuro, revisar esa configuración de Supabase Auth.
- Las advertencias de rendimiento en políticas de matrícula y espacios individuales se mantienen para revisión bajo carga real; con 30 usuarios aún no hay mediciones concluyentes.
- Los ejercicios contables suponen transacciones ficticias, compras al contado a costo fijo y ventas con hipótesis simplificadas de IGV; no equivalen a normativa tributaria completa.
- Sin FEFO real, segregación de lotes en ventas, control de psicotrópicos ni trazabilidad clínica: no es apto para operación real de boticas.
- No existe evidencia empírica suficiente para atribuir una mejora educativa a la plataforma, ni validación psicométrica del banco de preguntas.

## Protocolo de pilotaje (30 participantes)

1. Verificar inicio de sesión de 30 usuarios distintos previamente matriculados.
2. Comprobar que el espacio individual de cada estudiante conserva sus cambios al cerrar y reabrir.
3. Registrar simultáneamente ventas y gastos de demostración, con verificación de inventario.
4. Tomar una muestra de 10 asientos para comprobar igualdad Debe/Haber, total de ventas e IGV supuesto.
5. Probar una evaluación numérica segura por estudiante sin que se compartan respuestas.
6. Obtener al menos un PDF A4, un ticket y un PDF de entrega final por dispositivo empleado.
7. Verificar que el profesor consulte avances, registre comentarios y exporte CSV.
8. Ejecutar un ensayo de caída de red con un usuario de prueba y verificar reintento/retención.
9. Recoger incidentes por navegador, dispositivo, alumno anonimizado, hora, evidencia y severidad.
10. Registrar aprobación solo si no hay pérdidas de datos, cruces de cuentas, privilegios indebidos o errores contables relevantes.

## Versión y control de cambios

La rama de revisión `release/3-1-0-auditoria-final` concentra el cierre documental, pruebas nuevas y corrección contable puntual. **Crear la etiqueta Git `v3.1.0` únicamente cuando las pruebas automáticas y la revisión de integración estén aprobadas.** Esta acta no certifica el ensayo real con estudiantes ni reemplaza un informe de validación externa.

## Manuales

- [Manual del estudiante](MANUAL_ESTUDIANTE_3_1_0.md)
- [Manual del docente](MANUAL_DOCENTE_3_1_0.md)
