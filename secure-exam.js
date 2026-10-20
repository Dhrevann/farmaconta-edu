(function ServerExam(){
'use strict';
const $=s=>document.querySelector(s);
let exam=null,db=null;
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const msg=t=>{$('#server-exam-status').textContent=t;};
function make(){
 if($('#server-exam'))return;
 const view=$('#view-reportes'),section=document.createElement('article');section.className='card';section.id='server-exam';section.style.marginTop='18px';
 section.innerHTML=`<h2>Evaluación con corrección en Supabase</h2><p>Diez cálculos aleatorios; las respuestas se validan en el servidor. Hasta 3 intentos por módulo cada 24 horas, tiempo máximo de 60 minutos desde el inicio.</p><div class="formrow"><div class="field"><label for="server-exam-module">Tema</label><select id="server-exam-module"><option value="finanzas">Finanzas</option><option value="ventas">Ventas</option><option value="inventario">Inventario</option><option value="contabilidad">Contabilidad</option><option value="reportes">Reportes</option></select></div><div class="field"><label>Evaluación</label><button type="button" id="server-exam-start" class="btn">Comenzar</button></div></div><p id="server-exam-status" role="status" class="tiny">Disponible para alumnos inscritos.</p><form id="server-exam-form" hidden><div id="server-exam-questions"></div><button class="btn" type="submit">Entregar y calificar</button></form><h3>Calificaciones registradas</h3><div id="server-exam-history"></div>`;
 view.append(section);
 $('#server-exam-start').addEventListener('click',()=>void start());
 $('#server-exam-form').addEventListener('submit',ev=>{ev.preventDefault();void submit();});
 void history();
}
async function history(){
 if(!db)return;
 const {data,error}=await db.rpc('farma_my_secure_exams');
 if(error){$('#server-exam-history').textContent='Disponible tras ejecutar sql/04_evaluacion_servidor.sql.';return;}
 window.farmaServerExamResults=Array.isArray(data)?data:[];
 $('#server-exam-history').innerHTML=Array.isArray(data)&&data.length?data.map(x=>`<div class="note">${esc(x.module)} · ${x.score}/20 · ${esc(String(x.submitted_at).slice(0,10))}</div>`).join(''):'<p>Aún no se han entregado evaluaciones de servidor.</p>';
}
async function start(){
 if(!db||exam){msg('Termina el intento actual antes de iniciar otro.');return;}
 const module=$('#server-exam-module').value;
 msg('Preparando diez ejercicios individuales…');
 const {data,error}=await db.rpc('farma_start_exam',{p_module:module});
 if(error){msg('No se pudo iniciar: '+error.message);return;}
 exam=data;
 $('#server-exam-questions').innerHTML=data.questions.map((q,i)=>`<div class="field" style="border-bottom:1px solid #dbe5ed;padding:10px 0"><label for="secure-q-${i}">${i+1}. ${esc(q.prompt)}</label><input required id="secure-q-${i}" inputmode="decimal" placeholder="Respuesta numérica" autocomplete="off"></div>`).join('');
 $('#server-exam-form').hidden=false;$('#server-exam-start').disabled=true;
 msg('La evaluación está activa. Responde las diez preguntas y entrega antes de 60 minutos.');
}
async function submit(){
 if(!exam)return;
 const answers=exam.questions.map((_,i)=>$('#secure-q-'+i).value.trim().replace(',','.'));
 if(answers.some(x=>!x||!Number.isFinite(Number(x)))){msg('Todas las respuestas deben ser números válidos.');return;}
 msg('Calificando de forma segura en Supabase…');
 const {data,error}=await db.rpc('farma_submit_exam',{p_exam:exam.id,p_answers:answers});
 if(error){msg('No se pudo entregar: '+error.message);return;}
 msg('Entrega confirmada: '+data.correct+'/10 correctas · nota '+data.score+'/20.');
 exam=null;$('#server-exam-form').hidden=true;$('#server-exam-start').disabled=false;await history();
}
async function probe(){
 if(!window.farmaSupabaseClient||!document.body.classList.contains('app-ready'))return;
 db=window.farmaSupabaseClient;make();
}
window.addEventListener('farma:ready',probe);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',probe);else void probe();
})();