(function TeacherModule(){
'use strict';
let db=null, rows=[], student=null, enabled=false;
const $=s=>document.querySelector(s);
const h=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function status(t){const node=$('#teacher-status');if(node)node.textContent=t;}
function csv(){
const data=[['Correo','Estudiante','Farmacia','Ventas','Gastos','Preguntas','Evaluaciones'],...rows.map(r=>[r.email,r.display_name,r.pharmacy,r.sales,r.expenses,r.exercises,r.evaluations])];
const text='\uFEFF'+data.map(r=>r.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\r\n');
const url=URL.createObjectURL(new Blob([text],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='FarmaConta_avances.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);
}
async function refresh(){
status('Consultando estudiantes…');
const {data,error}=await db.rpc('farma_teacher_dashboard');
if(error){status('Error: '+error.message);return;}
rows=Array.isArray(data)?data:[];
$('#teacher-rows').innerHTML=rows.map(r=>`<tr><td>${h(r.display_name||'Pendiente')}<br><small>${h(r.email)}</small></td><td>${h(r.pharmacy)}</td><td>${Number(r.sales)||0}</td><td>${Number(r.exercises)||0}</td><td>${Number(r.evaluations)||0}</td><td>${r.user_id?`<button type="button" data-id="${h(r.user_id)}" class="btn mini outline">Revisar</button>`:'Sin ingreso'}</td></tr>`).join('')||'<tr><td colspan="6">No hay matrículas</td></tr>';
status(rows.length+' estudiantes matriculados. Los datos solo son accesibles para el docente autorizado.');
}
async function enroll(add){
const email=$('#teacher-email').value.trim().toLowerCase();
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){status('Introduce un correo válido.');return;}
if(!add&&!confirm('¿Revocar matrícula sin borrar los trabajos?'))return;
const {error}=await db.rpc('farma_teacher_enrollment',{p_email:email,p_enabled:add});
if(error){status('Error: '+error.message);return;}$('#teacher-email').value='';await refresh();
}
async function inspect(id){
const [{data,error},{data:secureGrades,error:secureError}]=await Promise.all([
 db.rpc('farma_teacher_student',{p_student:id}),
 db.rpc('farma_teacher_secure_exams',{p_student:id})
]);
if(error){status('Error: '+error.message);return;}student=id;
const st=data||{},analysis=st.learning||{};
$('#teacher-detail').hidden=false;
$('#teacher-student-title').textContent='Revisión de '+(st.pharmacy?.student||rows.find(r=>r.user_id===id)?.email||'estudiante');
$('#teacher-detail-body').innerHTML=`<p><b>Farmacia:</b> ${h(st.pharmacy?.name)} · <b>Ventas:</b> ${(st.sales||[]).length} · <b>Gastos:</b> ${(st.expenses||[]).length}</p><h3>Análisis final</h3><p>${h(st.analysis||'Pendiente')}</p><h3>Casos abiertos</h3>${Object.values(analysis.written||{}).map(x=>`<blockquote><b>${h(x.prompt)}</b><p>${h(x.answer)}</p></blockquote>`).join('')||'<p>Pendientes</p>'}<h3>Evaluaciones formativas</h3><p>${(analysis.attempts||[]).map(x=>h(x.module)+': '+Number(x.score)+'/20').join(' · ')||'Sin evaluaciones'}</p><h3>Evaluaciones de servidor</h3><p>${Array.isArray(secureGrades)&&secureGrades.length?secureGrades.map(x=>h(x.module)+': '+Number(x.score)+'/20').join(' · '):(secureError?'Migración 04 pendiente':'Sin exámenes entregados')}</p>`;
$('#teacher-detail').scrollIntoView({behavior:'smooth'});
}
async function grade(ev){ev.preventDefault();if(!student)return;
const score=Number($('#teacher-score').value);
if(!Number.isFinite(score)||score<0||score>20){status('Nota fuera de rango.');return;}
const {error}=await db.rpc('farma_teacher_grade',{p_student:student,p_module:$('#teacher-module').value,p_score:score,p_feedback:$('#teacher-feedback').value.trim()});
status(error?'No se pudo guardar: '+error.message:'Nota y comentario guardados en Supabase.');
}
function install(){
const nav=document.createElement('button');nav.className='teacher-nav';nav.type='button';nav.textContent='👩‍🏫 Panel docente';
nav.style.cssText='width:100%;border-radius:12px;padding:11px;background:#26548a;color:#fff;border:1px solid #83a8d8;cursor:pointer;text-align:left;font-weight:750';
$('.navigation').appendChild(nav);
const panel=document.createElement('section');panel.className='view';panel.id='view-docente';
panel.innerHTML=`<div class="heading"><h1>Panel docente · III Unidad</h1></div><article class="card"><h2>Estudiantes matriculados</h2><p>Las consultas y las calificaciones se autorizan desde Supabase.</p><div class="actions"><input id="teacher-email" type="email" placeholder="correo@institucion.edu.pe" aria-label="Correo del alumno"><button type="button" id="teacher-add" class="btn">Matricular</button><button type="button" id="teacher-remove" class="btn outline">Revocar</button><button type="button" id="teacher-refresh" class="btn outline">Actualizar</button><button type="button" id="teacher-export" class="btn outline">Exportar CSV</button></div><p id="teacher-status" role="status"></p><div class="table-wrap"><table><thead><tr><th>Alumno</th><th>Farmacia</th><th>Ventas</th><th>Preguntas</th><th>Evaluaciones</th><th>Acción</th></tr></thead><tbody id="teacher-rows"></tbody></table></div></article><article id="teacher-detail" class="card" style="margin-top:18px" hidden><h2 id="teacher-student-title">Revisión</h2><div id="teacher-detail-body"></div><form id="teacher-form"><label for="teacher-module">Módulo</label><select id="teacher-module"><option value="general">III Unidad</option><option value="finanzas">Finanzas</option><option value="ventas">Ventas</option><option value="inventario">Inventario</option><option value="contabilidad">Contabilidad</option><option value="reportes">Reportes</option></select><label for="teacher-score">Nota sobre 20</label><input id="teacher-score" type="number" min="0" max="20" step=".5" required><label for="teacher-feedback">Retroalimentación</label><textarea id="teacher-feedback" maxlength="2000" rows="4"></textarea><button type="submit" class="btn">Guardar calificación</button></form></article>`;
$('.workspace').appendChild(panel);
nav.addEventListener('click',()=>{document.querySelectorAll('.view').forEach(e=>e.classList.remove('active'));panel.classList.add('active');document.querySelectorAll('.nav-btn').forEach(e=>e.classList.remove('active'));$('#page-title').textContent='Panel docente';$('#page-subtitle').textContent='Matrícula, revisión y calificación';void refresh();});
$('#teacher-refresh').addEventListener('click',refresh);
$('#teacher-add').addEventListener('click',()=>enroll(true));
$('#teacher-remove').addEventListener('click',()=>enroll(false));
$('#teacher-export').addEventListener('click',csv);
$('#teacher-rows').addEventListener('click',ev=>{const a=ev.target.closest('[data-id]');if(a)inspect(a.dataset.id);});
$('#teacher-form').addEventListener('submit',grade);
}
async function probe(){
if(enabled||!window.farmaSupabaseClient||!document.body.classList.contains('app-ready'))return;
const {data,error}=await window.farmaSupabaseClient.rpc('farma_is_teacher');
if(error||data!==true)return;
enabled=true;db=window.farmaSupabaseClient;install();await refresh();
}
window.addEventListener('farma:ready',probe);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',probe);else void probe();
})();
