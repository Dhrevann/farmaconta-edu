(function BackupUI(){
'use strict';
const $=s=>document.querySelector(s);let db;
function note(t){$('#backup-cloud-status').textContent=t;}
async function refresh(){
 if(!db)return;
 const {data,error}=await db.rpc('farma_backup_manifest');
 if(error){note('Las copias diarias requieren la migración SQL 05.');return;}
 const select=$('#backup-cloud-list');
 select.innerHTML=Array.isArray(data)&&data.length?data.map(r=>`<option value="${r.day}">${r.day} · revisión ${r.revision}</option>`).join(''):'<option value="">Aún no hay respaldo diario</option>';
 note((data?.length||0)+' copias diarias disponibles. Se crea una copia del estado anterior al primer cambio de cada día.');
}
async function download(){
 const day=$('#backup-cloud-list').value;if(!day)return;
 const {data,error}=await db.rpc('farma_download_backup',{p_day:day});
 if(error||!data){note('No se pudo recuperar: '+(error?.message||'Sin datos'));return;}
 const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='FarmaConta_respaldo_nube_'+day+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);
 note('Archivo descargado. Puedes importarlo desde Reportes > Restaurar respaldo JSON tras revisar los datos.');
}
function init(){
 if($('#backup-cloud-card'))return;
 const root=document.createElement('article');root.className='card';root.id='backup-cloud-card';root.style.marginTop='18px';
 root.innerHTML='<h2>Copias de seguridad diarias</h2><p>Las versiones anteriores quedan protegidas por tu cuenta. Se conservan hasta 14 días. También descarga el JSON manual para mantener una copia externa.</p><div class="actions"><select id="backup-cloud-list" aria-label="Versiones anteriores"><option value="">Cargando…</option></select><button type="button" id="backup-cloud-refresh" class="btn outline">Actualizar lista</button><button type="button" id="backup-cloud-get" class="btn outline">Descargar versión</button></div><p id="backup-cloud-status" role="status" class="tiny"></p>';
 $('#view-reportes').append(root);
 $('#backup-cloud-refresh').addEventListener('click',refresh);
 $('#backup-cloud-get').addEventListener('click',download);
 void refresh();
}
function ready(){
 if(!window.farmaSupabaseClient||!document.body.classList.contains('app-ready'))return;db=window.farmaSupabaseClient;init();
}
window.addEventListener('farma:ready',ready);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();