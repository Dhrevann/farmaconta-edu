# FarmaConta EDU 2.0

Simulador académico de gestión, inventario, facturación **ficticia** y contabilidad para la III Unidad de Documentos Contables en una Oficina Farmacéutica.

> **Estado:** en desarrollo. No usar aún con los 30 estudiantes. Los comprobantes son simulaciones **SIN VALIDEZ TRIBUTARIA** y no se envían a SUNAT.

## Arquitectura

- **Interfaz:** HTML, CSS y JavaScript; alojamiento previsto en GitHub Pages.
- **Acceso:** Supabase Auth con Google OAuth.
- **Datos independientes:** Supabase PostgreSQL, tabla `workspaces`, `class_enrollments` y políticas RLS.
- **Cada estudiante:** personaliza su farmacia, guarda inventario, ventas, gastos, comprobantes y reportes.
- **Aislamiento:** cada persona autenticada solo puede operar sobre su propio espacio de trabajo.

## Archivos que vamos a incorporar

- `index.html`: interfaz minimalista y simulador de las sesiones 09–12.
- `cloud.js`: autenticación y sincronización con Supabase.
- `config.js`: URL de Supabase y **clave publicable** (nunca una clave secreta).
- `supabase_setup.sql`: estructura inicial de matrícula, datos y permisos.
- `.nojekyll`: publicación estática.
- `README.md`: esta guía.

## Configuración previa

1. En Supabase, ejecutar el script SQL del paquete inicial en **SQL Editor**.
2. Habilitar Google OAuth, configurando el Client ID y **Client Secret únicamente en Supabase**.
3. Autorizar la URL de retorno del proyecto en Supabase > Authentication > URL Configuration.
4. Matricular correos de prueba en `public.class_enrollments` desde SQL Editor; **nunca subir la lista de alumnos al repositorio**.
5. Configurar en `config.js` la URL del proyecto y su clave **publishable**.
6. Subir los archivos del paquete de FarmaConta EDU 2.0 a la raíz del repositorio y probar con dos cuentas diferentes antes de activar Pages.

## Publicación

La ubicación prevista con GitHub Pages es:
https://dhrevann.github.io/farmaconta-edu/

⚠️ **El repositorio se creó privado.** GitHub Pages en el plan GitHub Free exige repositorio público. Debes cambiar su visibilidad a público, contar con un plan compatible o alojar el mismo frontend en Cloudflare Pages. **No cambies la visibilidad hasta verificar que el código no contenga credenciales, datos reales de estudiantes ni otros secretos**.

En GitHub: **Settings → Pages → Deploy from a branch → main → /(root)**.

## Seguridad y pruebas obligatorias

- Nunca publicar Supabase `service_role`, secret key, OAuth Client Secret ni contraseñas.
- Verificar políticas RLS de las tablas y ausencia de lectura/escritura cruzada.
- Cuenta A: Botica A y venta A. Cuenta B: Farmacia B; no ve inventario ni ventas de A.
- Recuperar la sesión de A en otro dispositivo y confirmar que conserva sus datos.
- Simular dos pestañas con cambios simultáneos y comprobar el control de versiones.
- Comprobar impresión PDF, stock, cálculos y recuperación ante errores de red.
- Probar 30 sesiones concurrentes antes de realizar la práctica con la sección.

## Nota pedagógica

Cubre cuatro sesiones: **09 (costos), 10 (ventas y comprobantes ficticios), 11 (libros contables y balance), 12 (análisis financiero)**. Los registros contables y tributarios son ejemplos simplificados con fines docentes.
