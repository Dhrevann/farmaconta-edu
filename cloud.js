import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from './config.js';

// GitHub Pages + OAuth Google + Supabase; no passwords pass through GitHub Pages.
const loginButton = document.querySelector('#google-login');
const authStatus = document.querySelector('#auth-status');
const syncBanner = document.querySelector('#sync-banner');
const syncMessage = document.querySelector('#sync-message');
const retryButton = document.querySelector('#sync-retry');
const ready = () => document.body.classList.contains('app-ready');
let client = null;
let currentUserId = null;
let revision = 0;
let pending = null;
let writing = false;
let cloudBlocked = false;
let accountControls = null;
let started = false;

function setAuth(text) { authStatus.textContent = text; }
function setSync(text, kind = '') {
  syncBanner.classList.remove('warning','error');
  if(kind) syncBanner.classList.add(kind);
  syncMessage.textContent = text;
}
function message(e) {return e?.message || String(e || 'Error inesperado');}
function isConfigValid() {
  return SUPABASE_URL.startsWith('https://') && !SUPABASE_URL.includes('REEMPLAZA') &&
    SUPABASE_PUBLISHABLE_KEY && !SUPABASE_PUBLISHABLE_KEY.includes('REEMPLAZA');
}
function goLocked(note) {
  document.body.classList.remove('app-ready');
  window.farmaCloudSave = undefined;
  currentUserId = null;
  if(accountControls) accountControls.remove();
  accountControls = null;
  setAuth(note || 'Inicia sesión con tu cuenta autorizada.');
}
function setAccountUi(user) {
  if(accountControls) accountControls.remove();
  accountControls = document.createElement('div');
  accountControls.id = 'account-controls';
  const email = document.createElement('span');
  email.id = 'account-email';
  email.textContent = user.email || 'Estudiante';
  const logout = document.createElement('button');
  logout.id='logout-btn'; logout.type='button'; logout.textContent='Cerrar sesión';
  logout.addEventListener('click',async()=>{
    if(pending || writing) {
      const proceed=confirm('Hay cambios sin confirmar en la nube. ¿Deseas cerrar sesión de todos modos?');
      if(!proceed)return;
    }
    await client.auth.signOut();
    location.reload();
  });
  accountControls.append(email,logout);
  document.querySelector('.topbar').appendChild(accountControls);
}
async function openWorkspace(user) {
  goLocked('Verificando matrícula y recuperando tu farmacia…');
  const {data:allowed,error:allowError} = await client.from('class_enrollments').select('email').eq('email',user.email.toLowerCase()).maybeSingle();
  if(allowError) throw allowError;
  if(!allowed){setAuth('Esta cuenta todavía no está matriculada. Comunícate con el docente.'); return;}
  const {data:workspace,error:readError} = await client.from('workspaces').select('data,revision').eq('owner_id',user.id).maybeSingle();
  if(readError) throw readError;
  currentUserId=user.id;
  revision=workspace?.revision ?? 0;
  pending=null; writing=false; cloudBlocked=false;
  window.farmaRestoreFromCloud(workspace?.data ?? null);
  window.farmaCloudSave = queueSnapshot;
  document.body.classList.add('app-ready');
  setAccountUi(user);
  setSync(workspace?'Todos tus datos están cargados desde la nube.':'Tu farmacia está lista; personalízala y guarda para crear tu espacio.');
  setAuth('Acceso correcto.');
}
function queueSnapshot(snapshot) {
  if(!currentUserId) {setSync('No hay una sesión válida.','error'); return;}
  pending=snapshot;
  if(cloudBlocked){setSync('Otro dispositivo modificó la farmacia. Descarga el respaldo JSON antes de actualizar esta página.','error');return;}
  setSync('Cambios pendientes de sincronizar…','warning');
  void flush();
}
async function flush() {
  if(writing || !pending || cloudBlocked || !currentUserId) return;
  writing=true;
  while(pending && !cloudBlocked) {
    const snapshot=pending;
    pending=null;
    setSync('Guardando en la nube…','warning');
    const {data,error}=await client.rpc('save_workspace',{p_data:snapshot,p_expected_revision:revision});
    if(error){
      pending=pending||snapshot;
      const conflict = error.message?.includes('VERSION_CONFLICT');
      if(conflict){
        cloudBlocked=true;
        setSync('Conflicto entre dispositivos. Exporta JSON y vuelve a entrar; no sobrescribiremos el trabajo remoto.','error');
      } else {
        setSync('No se pudo sincronizar. Verifica internet y pulsa «Reintentar».','warning');
      }
      break;
    }
    const result=Array.isArray(data)?data[0]:data;
    revision=Number(result?.new_revision ?? revision+1);
    setSync(pending?'Hay más cambios por sincronizar…':'Guardado correctamente en la nube.');
  }
  writing=false;
}
retryButton.addEventListener('click',()=>{if(pending&&!cloudBlocked)void flush();});
loginButton.addEventListener('click',async()=>{
  if(!client)return;
  loginButton.disabled=true;
  setAuth('Redirigiendo a Google…');
  const redirectTo=window.location.origin+window.location.pathname;
  const {error}=await client.auth.signInWithOAuth({provider:'google',options:{redirectTo}});
  if(error){setAuth('No fue posible iniciar sesión: '+message(error));loginButton.disabled=false;}
});
if(!isConfigValid()) {
  setAuth('Primero configura config.js con la URL y la clave pública de Supabase. Consulta README.md.');
  loginButton.disabled=true;
} else {
  let createClient;
  try {
    ({createClient} = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'));
  } catch(e) {
    setAuth('No se pudo cargar Supabase. Revisa tu conexión a internet.');
    loginButton.disabled=true;
    throw e;
  }
  client=createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  async function bootstrap() {
    if(started)return;
    started=true;
    try {
      const {data,error}=await client.auth.getUser();
      if(error && error.name !== 'AuthSessionMissingError') throw error;
      if(data.user)await openWorkspace(data.user);
      else goLocked('Ingresa con tu cuenta de Google autorizada por tu docente.');
    } catch(e){goLocked('Error de conexión o configuración: '+message(e));}
  }
  client.auth.onAuthStateChange((event,session)=>{
    if(event==='SIGNED_OUT')goLocked('Sesión cerrada. Puedes volver a ingresar.');
    // On first load, bootstrap handles the session. On OAuth return, the client already
    // detects the URL session; getUser will verify it before any reads.
  });
  await bootstrap();
}
