(function ReviewFeedback(){
'use strict';
const $=s=>document.querySelector(s);
const safe=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function load(){
 const client=window.farmaSupabaseClient;if(!client)return;
 const {data,error}=await client.from('farma_teacher_reviews')
  .select('module,score,feedback,created_at').order('created_at',{ascending:false}).limit(30);
 if(error){$('#review-feedback-list').textContent='Las revisiones docentes aparecerán cuando el docente active el módulo y guarde una calificación.';return;}
 $('#review-feedback-list').innerHTML=Array.isArray(data)&&data.length?data.map(r=>`<div class="note" style="margin:8px 0"><strong>${safe(r.module)} · ${Number(r.score)}/20</strong><br><small>${safe(new Date(r.created_at).toLocaleDateString('es-PE'))}</small><p>${safe(r.feedback)}</p></div>`).join(''):'<p>Aún no hay observaciones del docente.</p>';
}
function start(){
 if($('#review-feedback-list'))return;
 const section=document.createElement('article');section.className='card';section.style.marginTop='18px';
 section.innerHTML='<div class="flex-between"><h2>Observaciones y calificaciones del docente</h2><button type="button" class="btn outline" id="feedback-refresh">Actualizar</button></div><div id="review-feedback-list" role="status">Cargando revisiones…</div>';
 $('#view-reportes').append(section);
 $('#feedback-refresh').addEventListener('click',load);void load();
}
function ready(){if(window.farmaSupabaseClient&&document.body.classList.contains('app-ready'))start();}
window.addEventListener('farma:ready',ready);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();