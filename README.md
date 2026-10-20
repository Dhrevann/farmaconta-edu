# FarmaConta EDU 2.0 — inicio de la migración a la nube

## ¿Qué entrega este paquete?

**Sí implementado (primera iteración):**
- Rediseño minimalista de la aplicación original, accesible por celular o PC.
- Mantiene los módulos existentes: farmacia, catálogo, ventas, gastos, contabilidad y reportes imprimibles en PDF.
- Inicio de sesión con Google a través de Supabase Auth, sin escribir contraseñas en GitHub Pages.
- Una farmacia independiente por cuenta autorizada, con los datos íntegros (inventario, logo, ventas, libros y reportes) guardados como JSON en PostgreSQL.
- Control de acceso en la BD (RLS), lista de correos permitidos y escritura transaccional con control de revisión.
- Indicación de estado de sincronización, manejo de errores básicos y exportación JSON desde la aplicación.

**Pendiente de validar / mejorar antes de uso real con 30 estudiantes:**
- Prueba real con un proyecto Supabase, dos cuentas distintas y dos dispositivos: necesita tus credenciales PÚBLICAS de configuración y OAuth habilitado.
- Prueba con 30 usuarios simultáneos, almacenamiento, límites del servicio, conexiones inestables y recuperación.
- Gestión docente de matrícula sin editar SQL; por ahora la matrícula se introduce manualmente en SQL Editor.
- Verificación de las fórmulas tributarias y contables en los escenarios didácticos.
- Normalizar tablas de ventas e inventario para crecer o realizar reportes docentes: este primer enfoque guarda un JSON entero por farmacia para acelerar la migración preservando el simulador.

## 1. Crea un proyecto en Supabase
1. En https://supabase.com/dashboard crea un proyecto nuevo.
2. Abre **SQL Editor**, pega `supabase_setup.sql` y ejecútalo **una sola vez**.
3. En **Authentication > Providers > Google**, habilita Google OAuth (requiere el proyecto Google Cloud, Client ID y Client Secret).
4. Registra en Google Cloud el callback que aparece en Supabase, por ejemplo `https://TU-PROYECTO.supabase.co/auth/v1/callback` (no se inventa el valor; cópialo del panel).
5. En **Authentication > URL Configuration**, añade tu URL final de GitHub Pages como Site URL y Redirect URL; mientras pruebas en local, agrega la URL localhost usada.
6. En SQL Editor, agrega los correos reales de los alumnos a `public.class_enrollments` con `lower(email)`.

## 2. Configura la parte pública
Abre `config.js`. Sustituye:
- `SUPABASE_URL` por la URL real de tu proyecto Supabase.
- `SUPABASE_PUBLISHABLE_KEY` por la clave **publishable** del proyecto.

**Nunca coloques la secret key, service_role, contraseñas, lista de alumnos ni tokens OAuth en GitHub.**
El Client Secret de Google se coloca SOLO en el dashboard privado de Supabase.

## 3. Publica en GitHub Pages
1. Crea un repositorio PÚBLICO (por ejemplo, `farmaconta-edu`).
2. Sube `index.html`, `cloud.js`, `config.js`, `.nojekyll` (archivos de la RAÍZ del ZIP).
3. Configura **Settings > Pages > Deploy from a branch**, rama `main`, carpeta `/root`.
4. Espera tu URL `https://TU-USUARIO.github.io/farmaconta-edu/`.
5. Añade esa URL exacta en Supabase Auth > URL Configuration, y en Google Cloud los orígenes autorizados, si corresponde.
6. Habilita Google como proveedor de Supabase y prueba con 2 correos permitidos.

## 4. Test mínimo de separación
- Con la cuenta A crea Botica A, emite una venta y comprueba stock.
- Con la cuenta B crea Farmacia B, verifica inventario base y que NO hay ventas A.
- Vuelve a entrar como A en otra computadora. Debes observar tus datos anteriores.
- Modifica una farmacia en dos dispositivos a la vez; la segunda versión desactualizada debe mostrar un conflicto en vez de sobrescribir silenciosamente.
- Confirma que la exportación JSON y la impresión de PDF funcionen en celulares.

## Detalles importantes
- El HTML original de la versión 1.0 se conserva en los archivos de la conversación anterior; este paquete contiene solo la aplicación nueva.
- La aplicación necesita Internet y NO tiene guardado offline confiable. El botón de guardar puede actualizar inmediatamente la pantalla, pero la persistencia solo está confirmada cuando el indicador indica **«Guardado correctamente en la nube»**.
- Supabase Free puede pausar proyectos por inactividad; puede tener límites de uso y no incluye respaldos automáticos. Exporta respaldos y establece una rutina externa antes de clases.
- Los PDF se generan con el diálogo de impresión del navegador: «Guardar como PDF».
- Las boletas y facturas son simuladas y carecen de validez tributaria. No ingresar datos reales de clientes.
- Este proyecto es un PROTOTIPO para que lo configuremos y probemos juntos; todavía no se ha publicado ni validado con 30 estudiantes.

## Referencias técnicas
- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://supabase.com/docs/guides/auth/social-login/auth-google
- https://supabase.com/docs/guides/auth/redirect-urls
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
