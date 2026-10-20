/* FarmaConta EDU 3.1 · matrícula masiva con vista previa (docente). */
(function FarmaBulkEmailImport(){
'use strict';
const maxEmails=300;
const $=q=>document.querySelector(q);
const escape=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const emailValid=email=>email.length>=6&&email.length<=254&&/^[a-z0-9._%+-]+@[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(email);
const simplify=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z]/g,'');
function csvRows(text,sep){
 let rows=[],row=[],value='',quoted=false;
 for(let i=0;i<text.length;i++){
  const ch=text[i];
  if(ch==='"'){
   if(quoted&&text[i+1]==='"'){value+='"';i++;}
   else if(!value.trim()||quoted)quoted=!quoted;
   else value+=ch;
  }else if(ch===sep&&!quoted){row.push(value.trim());value='';}
  else if((ch==='\n'||ch==='\r')&&!quoted){
   if(ch==='\r'&&text[i+1]==='\n')i++;
   row.push(value.trim());value='';
   if(row.some(x=>x))rows.push(row);
   row=[];
  }else{value+=ch;}
 }
 row.push(value.trim());if(row.some(x=>x))rows.push(row);
 if(quoted)throw new Error('El CSV contiene comillas sin cerrar.');
 return rows;
}
function sepOf(input){
 const first=input.split(/\r?\n/).find(line=>line.trim())||'';
 const count=(delimiter)=>{
  let inside=false,num=0;
  for(let i=0;i<first.length;i++){
   if(first[i]==='"'){if(inside&&first[i+1]==='"'){i++;}else inside=!inside;}
   else if(first[i]===delimiter&&!inside)num++;
  }
  return num;
 };
 const candidates=[',',';','\t'].map(sep=>({sep,n:count(sep)})).sort((a,b)=>b.n-a.n);
 return candidates[0].n?candidates[0].sep:'\t';
}
function parseEmails(source, enrolled=[]){
 const input=String(source||'').replace(/^\uFEFF/,'').trim();
 if(!input)return {error:'Pega correos o selecciona un archivo CSV/TXT.',entries:[],stats:{}};
 if(input.length>256*1024)return {error:'El archivo supera 256 KB.',entries:[],stats:{}};
 const sep=sepOf(input),matrix=csvRows(input,sep);
 if(matrix.length>3000)return {error:'Demasiadas filas en el archivo (máximo 3000).',entries:[],stats:{}};
 const first=matrix[0]||[],labels=first.map(simplify);
 const col=labels.findIndex(x=>['correo','correoelectronico','email','mail','emailaddress','eemail','correoinstitucional'].includes(x));
 let cells=[];
 if(col>=0){
  matrix.slice(1).forEach((r,i)=>cells.push({raw:r[col]||'',line:i+2}));
 }else if(matrix.every(row=>row.every(x=>!x||emailValid(x.trim().toLowerCase())))){
  matrix.forEach((row,i)=>row.forEach(v=>cells.push({raw:v,line:i+1})));
 }else{
  // Without recognized headers, detect which column most frequently contains email values.
  const n=Math.max(...matrix.map(row=>row.length));
  const counts=Array.from({length:n},(_,i)=>matrix.reduce((sum,row)=>sum+Number(emailValid((row[i]||'').trim().toLowerCase())),0));
  const best=counts.indexOf(Math.max(...counts));
  if(counts[best]===0)return {error:'No se encontraron correos reconocibles. Usa una columna llamada Correo o Email.',entries:[],stats:{}};
  matrix.forEach((r,i)=>cells.push({raw:r[best]||'',line:i+1}));
 }
 const already=new Set(enrolled.map(s=>String(s||'').trim().toLowerCase()));
 const seen=new Set(),entries=[];
 let duplicates=0,invalid=0,present=0,news=0;
 for(const c of cells){
  const email=String(c.raw||'').trim().toLowerCase();
  if(!email)continue;
  let status;
  if(!emailValid(email)){status='Inválido';invalid++;}
  else if(seen.has(email)){status='Duplicado';duplicates++;}
  else if(already.has(email)){status='Ya matriculado';present++;seen.add(email);}
  else{status='Nuevo';news++;seen.add(email);}
  entries.push({email,line:c.line,status});
 }
 if(entries.length===0)return {error:'No se encontraron correos para procesar.',entries:[],stats:{}};
 const unique=entries.filter(e=>e.status==='Nuevo'||e.status==='Ya matriculado').map(e=>e.email);
 return {entries,unique,stats:{total:entries.length,new:news,existing:present,duplicates,invalid},error:unique.length>maxEmails?'Se permiten como máximo '+maxEmails+' correos únicos por importación. Divide el archivo en lotes.':null};
}
window.FarmaBulkEmailParser={parse:parseEmails,csvRows,sepOf};
let preview=null,loading=false;
function notice(message,error=false){
 const node=$('#teacher-bulk-status');if(node){node.textContent=message;node.style.color=error?'#9f293b':'#1d6f50';}
}
function review(){
 const bulk=$('#teacher-bulk-card'),source=$('#teacher-bulk-paste').value;
 const existing=(window.FarmaTeacherGetRows?.()||[]).map(r=>r.email);
 try{preview=parseEmails(source,existing);}catch(e){preview={error:e.message,entries:[],stats:{}};}
 const submit=$('#teacher-bulk-submit');
 const body=$('#teacher-bulk-preview-body');
 const summary=$('#teacher-bulk-summary');
 submit.disabled=loading||!!preview.error||!(preview.stats.new>0);
 bulk.querySelector('#teacher-bulk-preview').hidden=false;
 if(preview.error){summary.textContent=preview.error;body.innerHTML='';notice(preview.error,true);return;}
 summary.textContent=preview.stats.new+' nuevos · '+preview.stats.existing+' ya matriculados · '+preview.stats.duplicates+' duplicados · '+preview.stats.invalid+' inválidos. Se importarán solo los correos válidos no inscritos.';
 body.innerHTML=preview.entries.slice(0,30).map((e,i)=>`<tr><td>${i+1}</td><td>${escape(e.email)}</td><td>${escape(e.status)}</td></tr>`).join('');
 if(preview.entries.length>30)summary.textContent+=' Vista previa: primeras 30 filas de '+preview.entries.length+'.';
 notice(preview.stats.invalid>0?'Revisa las direcciones inválidas: se omitirán.':'Vista previa lista. Confirma cuando estés conforme.');
}
async function fileChosen(){
 const file=$('#teacher-bulk-file').files?.[0];if(!file)return;
 if(!/\.(csv|txt)$/i.test(file.name)){notice('El archivo debe ser CSV o TXT.',true);return;}
 if(file.size>256*1024){notice('El archivo supera 256 KB.',true);return;}
 try{
  $('#teacher-bulk-paste').value=await file.text();
  preview=null;review();
 }catch(e){notice('No se pudo abrir el archivo: '+e.message,true);}
}
async function submitBatch(){
 if(loading||!preview||preview.error||!(preview.stats.new>0))return;
 // Recheck the edited text; never submit an old preview.
 const checked=parseEmails($('#teacher-bulk-paste').value,(window.FarmaTeacherGetRows?.()||[]).map(r=>r.email));
 if(checked.error||checked.unique.join('\n')!==preview.unique.join('\n')){review();notice('La lista cambió. Verifica nuevamente antes de confirmar.',true);return;}
 if(!confirm(`¿Matricular ${preview.stats.new} estudiantes nuevos en FarmaConta EDU?\n\n${preview.stats.invalid} correos inválidos se omitirán.\nLos estudiantes deberán iniciar sesión con Google para crear su propia farmacia. No se enviarán invitaciones automáticas.`))return;
 const client=window.farmaSupabaseClient;if(!client){notice('La sesión con Supabase no está disponible.',true);return;}
 loading=true;$('#teacher-bulk-submit').disabled=true;
 notice('Registrando correos en Supabase…');
 try{
  const {data,error}=await client.rpc('farma_teacher_bulk_enrollment',{p_emails:checked.unique});
  if(error)throw error;
  if(window.FarmaTeacherRefresh)await window.FarmaTeacherRefresh();
  $('#teacher-bulk-file').value='';
  $('#teacher-bulk-paste').value='';
  $('#teacher-bulk-preview').hidden=true;
  preview=null;
  notice(`Importación terminada: ${Number(data?.inserted)||0} matrícula(s) nueva(s), ${Number(data?.already_enrolled)||0} correo(s) ya matriculado(s). No se alteraron farmacias existentes.`);
 }catch(e){notice('No se pudo importar: '+(e?.message||String(e)),true);}
 finally{loading=false;$('#teacher-bulk-submit').disabled=true;}
}
function template(){
 const content='\uFEFFCorreo\nalumno01@ejemplo.edu.pe\nalumno02@ejemplo.edu.pe\n';
 const blob=new Blob([content],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
 a.download='FarmaConta_plantilla_matricula.csv';a.href=url;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);
}
function install(){
 if($('#teacher-bulk-card'))return;
 const panel=$('#view-docente');if(!panel)return;
 const section=document.createElement('article');
 section.id='teacher-bulk-card';section.className='card';section.style.marginTop='16px';
 section.innerHTML=`<h2><span aria-hidden="true">📥</span> Importar estudiantes por correo</h2>
 <p>Sube un <strong>CSV o TXT</strong> con una columna «Correo» o «Email», o pega direcciones. Puedes exportar la columna de Excel a CSV. El sistema verifica duplicados antes de matricular.</p>
 <p class="tiny muted">Máximo 300 correos únicos por lote. No crea contraseñas, no envía correos automáticos ni modifica las farmacias existentes. Cada alumno debe ingresar con su propia cuenta Google.</p>
 <div class="field"><label for="teacher-bulk-file">Seleccionar archivo CSV/TXT</label><input id="teacher-bulk-file" type="file" accept=".csv,.txt,text/csv,text/plain"></div>
 <div class="field"><label for="teacher-bulk-paste">O pegar correos (uno por línea, separados por coma, o tabla CSV)</label><textarea id="teacher-bulk-paste" rows="5" placeholder="Correo&#10;alumno01@ejemplo.edu.pe&#10;alumno02@ejemplo.edu.pe"></textarea></div>
 <div class="actions"><button type="button" class="btn outline" id="teacher-bulk-template">Descargar plantilla CSV</button><button type="button" class="btn outline" id="teacher-bulk-check">Revisar correos</button><button type="button" class="btn" id="teacher-bulk-submit" disabled>Confirmar matrículas</button></div>
 <div id="teacher-bulk-preview" hidden><p id="teacher-bulk-summary" class="tiny"></p><div class="table-wrap"><table><thead><tr><th>#</th><th>Correo</th><th>Estado</th></tr></thead><tbody id="teacher-bulk-preview-body"></tbody></table></div></div>
 <p id="teacher-bulk-status" class="tiny" role="status" aria-live="polite"></p>`;
 const details=$('#teacher-detail');panel.insertBefore(section,details);
 $('#teacher-bulk-file').addEventListener('change',fileChosen);
 $('#teacher-bulk-paste').addEventListener('input',()=>{
  preview=null;$('#teacher-bulk-submit').disabled=true;$('#teacher-bulk-preview').hidden=true;
 });
 $('#teacher-bulk-check').addEventListener('click',review);
 $('#teacher-bulk-submit').addEventListener('click',submitBatch);
 $('#teacher-bulk-template').addEventListener('click',template);
}
window.FarmaTeacherImport={install};
})();
