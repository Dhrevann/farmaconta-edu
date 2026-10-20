/* FarmaConta EDU 2.1 · Aprendizaje interactivo por módulo; funciona sin servidor adicional. */
(function initializeFarmaLearning(){
'use strict';
const bank=window.FarmaQuestionBank;
if(!bank||!window.farmaLearningHost)return;
const host=window.farmaLearningHost;
const modules=bank.modules,questionBank=bank.questions;
const blocks=[['farmacia','finanzas'],['gastos','finanzas'],['ventas','ventas'],['inventario','inventario'],['contabilidad','contabilidad'],['reportes','reportes']];
const panels={};
const normal=t=>String(t||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const safe=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>new Intl.NumberFormat('es-PE',{maximumFractionDigits:2,minimumFractionDigits:2}).format(Number(n)||0);
const pen=n=>'S/ '+fmt(n);
const glossary={
 'capital inicial':['Recursos aportados al inicio de la simulación.','Capital = efectivo inicial + valor del inventario inicial.'],
 'efectivo inicial':['Dinero disponible en caja al comenzar el ejercicio.','Efectivo inicial + cobros − pagos = efectivo final (modelo simplificado).'],
 'inventario valorizado':['Valor de las existencias a su costo de adquisición simulado.','Valor = Σ (unidades disponibles × costo unitario).'],
 'costo unitario':['Importe de adquisición asignado a una unidad de producto.','Costo de ventas = Σ (unidades vendidas × costo unitario).'],
 'costo de ventas':['Costo asignado a las unidades que salieron por ventas.','Costo vendido = Σ (cantidad vendida × costo unitario).'],
 'gastos operativos':['Egresos por la operación del establecimiento; aquí se clasifican en fijos y variables.','Resultado operativo = ingresos netos − costo de ventas − gastos operativos.'],
 'costos fijos y variables':['Fijos: no varían directamente con las ventas en un periodo; variables: cambian según la actividad.','Costo total = componente fijo + componente variable del ejercicio.'],
 'margen bruto':['Proporción de diferencia entre ingreso de venta y costo, antes de los demás gastos.','Margen = (precio − costo) / precio × 100; para un análisis contable debe utilizarse una base comparable sin impuestos.'],
 'punto de equilibrio':['Volumen mínimo al que el margen de contribución cubre los gastos fijos.','Unidades = gastos fijos / (precio unitario − costo variable unitario), redondeadas hacia arriba.'],
 'descuento':['Reducción aplicada al subtotal de la operación.','Descuento = subtotal × porcentaje / 100.'],
 'igv incluido':['Impuesto General a las Ventas contenido dentro de un precio gravado en el supuesto docente de 18 %.','Valor sin IGV = total / 1.18; IGV = total − valor sin IGV.'],
 'valor de venta':['Importe de la operación antes del IGV en el supuesto gravado de clase.','Valor de venta = importe final / 1.18.'],
 'precio de venta':['Importe que se cobra por el producto; en el simulador se usa un supuesto general de 18 % incluido.','Importe línea = precio unitario × cantidad.'],
 'ruc ficticio':['Identificador de once dígitos usado solo para practicar; no representa un contribuyente real.','Se valida el formato de 11 dígitos, no la existencia ni la validez SUNAT.'],
 'dni / ruc ficticio':['Identificación de demostración para el cliente.','Se utiliza DNI ficticio de 8 dígitos o RUC ficticio de 11, según tipo de documento.'],
 'comprobante simulado':['Documento generado con fines formativos, sin autorización tributaria.','No se envía a SUNAT ni tiene validez fiscal.'],
 'factura simulada':['Documento de demostración para operaciones ficticias con clientes identificados mediante RUC.','En este laboratorio no constituye una factura electrónica emitida.'],
 'boleta simulada':['Documento de demostración para ventas ficticias a consumidores finales.','No se declara ni se comunica a SUNAT.'],
 'nota de venta':['Registro comercial interno ficticio que no reemplaza un comprobante tributario.','No habilita crédito fiscal ni tiene validez tributaria.'],
 'stock':['Número de unidades disponibles de un producto.','Stock final = stock inicial + entradas − salidas; en el modelo de clase no se registran compras como asientos nuevos.'],
 'stock final':['Cantidad disponible después de los movimientos simulados.','Stock = unidades iniciales − unidades vendidas + ajustes didácticos.'],
 'existencias actuales':['Unidades disponibles registradas para un producto.','Se decrementan al emitir ventas; el ajuste manual modifica el inventario inicial ficticio del ejercicio.'],
 'stock bajo':['Producto cuya existencia disponible alcanza el umbral de alerta configurado en la actividad.','En la versión actual se muestra alerta con stock entre 1 y 5 unidades.'],
 'libro diario':['Libro que presenta asientos contables de forma cronológica.','Cada asiento muestra cuentas, Debe y Haber.'],
 'libro mayor':['Libro que agrupa movimientos de cada cuenta del diario.','Saldo = acumulado Debe − acumulado Haber, según naturaleza de la cuenta.'],
 'debe y haber':['Dos columnas de la partida doble: no equivalen simplemente a entrada y salida de dinero.','En cada asiento, suma Debe = suma Haber.'],
 'partida doble':['Principio de registro por el que los débitos y créditos de un asiento deben cuadrar.','Σ Debe = Σ Haber.'],
 'asiento compuesto':['Registro que utiliza más de dos cuentas contables, por ejemplo caja contra ventas e IGV.','Una venta ficticia puede debitar Caja y acreditar Ingresos e IGV.'],
 'balance de comprobacion':['Resumen de saldos o movimientos por cuentas para comprobar igualdad de débitos y créditos.','Suma de todos los movimientos Debe = suma de movimientos Haber.'],
 'activo':['Recursos económicos como efectivo y mercaderías.','Activo = Pasivo + Patrimonio.'],
 'pasivo':['Obligaciones de la entidad; en la simulación se incluye IGV por pagar.','Activo = Pasivo + Patrimonio.'],
 'patrimonio':['Diferencia residual entre activos y pasivos.','Patrimonio = Activo − Pasivo.'],
 'resultado operativo':['Diferencia entre ingresos de ventas sin IGV y costos y gastos operativos del ejercicio.','Resultado = ingresos netos − costo de ventas − gastos.'],
 'ingresos netos':['Ingresos por ventas excluyendo el IGV trasladado en este modelo académico.','Ingresos netos = ventas con IGV − IGV simulado incluido.'],
 'toma de decisiones':['Análisis de indicadores para elegir acciones justificadas.','Compara stock, ventas, costos, gastos y resultado; explicita tus supuestos.'],
 'medio de pago':['Forma ficticia de cobro utilizada en la transacción.','Los medios de pago son de demostración y no procesan dinero real.']
};
const terms=Object.keys(glossary).sort((a,b)=>b.length-a.length);
let popup=null,activeHelp=null;
function findTerm(label){
 const text=normal(label);
 return terms.find(t=>text.includes(t))||null;
}
function helpButton(term){
 const t=term||'toma de decisiones';
 return '<button type="button" class="learn-help" data-help-term="'+safe(t)+'" aria-label="Definición y fórmula de '+safe(t)+'" aria-expanded="false">?</button>';
}
function getProgress(){
 const st=host.getState();
 if(!st.learning || typeof st.learning!=='object')st.learning={version:1,answers:{},attempts:[],written:{}};
 if(!st.learning.answers || typeof st.learning.answers!=='object')st.learning.answers={};
 if(!Array.isArray(st.learning.attempts))st.learning.attempts=[];
 if(!st.learning.written || typeof st.learning.written!=='object')st.learning.written={};
 return st.learning;
}
function persist(){ if(!host.save())alert('No se pudo enviar el avance a la nube. Comprueba tu sesión.'); }
function info(text){host.notify(text);}
function getQuestions(module){return questionBank.filter(q=>q.module===module);}
function stats(module){
 const p=getProgress(),set=getQuestions(module);
 const correct=set.filter(q=>p.answers[q.id]?.correct===true).length;
 const attempted=set.filter(q=>p.answers[q.id]).length;
 return {correct,attempted,total:set.length};
}
function choose(list,n){
 const a=[...list];
 for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
 return a.slice(0,n);
}
function actualAnswer(q,raw){
 if(q.type==='number'){
   const n=Number(String(raw).trim().replace(/\s/g,'').replace(',','.'));
   return String(raw).trim()!==''&&Number.isFinite(n)&&Math.abs(n-Number(q.answer))<=0.02;
 }
 return String(raw)===String(q.answer);
}
function currentQuestions(panel){
 if(panel.mode==='evaluation')return panel.exam.questions;
 if(panel.mode==='challenge')return challengeQuestions(panel.module);
 return getQuestions(panel.module);
}
function challengeQuestions(module){
 const s=host.getState(),sales=s.sales||[],expenses=s.expenses||[],stock=s.products||[];
 const st=Number(s.pharmacy?.initialCash)||0;
 const sum=(arr,fn)=>Math.round(arr.reduce((a,x)=>a+fn(x),0)*100)/100;
 const net=sum(sales,x=>Number(x.net)||0),cost=sum(sales,x=>Number(x.cost)||0),spent=sum(expenses,x=>Number(x.amount)||0);
 const stockVal=sum(stock,x=>x.stock*x.cost);
 const total=sum(sales,x=>Number(x.total)||0);
 const stockUnits=sum(stock,x=>Number(x.stock)||0);
 const baselines={
 finanzas:{prompt:'Según los registros ACTUALES, ¿cuánto es el efectivo final estimado de tu botica (S/)?',answer:Math.round((st+total-spent)*100)/100,explanation:'Efectivo final = efectivo inicial + ventas cobradas − gastos pagados = '+pen(st)+' + '+pen(total)+' − '+pen(spent)+' = '+pen(st+total-spent)+'.'},
 ventas:{prompt:'Con las operaciones ACTUALES, ¿cuánto es el total acumulado de ventas simuladas (S/)?',answer:total,explanation:'Suma de los importes totales de todas las ventas registradas = '+pen(total)+'.'},
 inventario:{prompt:'Según el catálogo ACTUAL, ¿cuál es el inventario valorizado al costo (S/)?',answer:stockVal,explanation:'Se suman las unidades disponibles × costo unitario de todos los productos, incluidos los inactivos = '+pen(stockVal)+'.'},
 contabilidad:{prompt:'Con tu configuración ACTUAL, ¿cuál es el capital inicial simplificado (S/)?',answer:Math.round((st+sum(stock,x=>x.initialStock*x.cost))*100)/100,explanation:'Efectivo inicial + inventario inicial valorizado = '+pen(st+sum(stock,x=>x.initialStock*x.cost))+'.'},
 reportes:{prompt:'Con tus operaciones ACTUALES, ¿cuál es el resultado operativo estimado (S/)?',answer:Math.round((net-cost-spent)*100)/100,explanation:'Ingresos netos − costo de ventas − gastos = '+pen(net)+' − '+pen(cost)+' − '+pen(spent)+' = '+pen(net-cost-spent)+'.'}
 };
 const b=baselines[module];
 return [
 {id:'DX-'+module,module,type:'number',prompt:b.prompt,answer:b.answer,explanation:b.explanation,term:'resultado operativo',level:'Caso personalizado'},
 {id:'DR-'+module,module,type:'written',prompt:'Analiza la situación de tu farmacia: ventas acumuladas '+pen(total)+', gastos '+pen(spent)+', '+stockUnits+' unidades en inventario y resultado '+pen(net-cost-spent)+'. Propón DOS decisiones razonadas y justifica cómo evaluarías su efecto.',answer:'Evaluación docente mediante rúbrica: uso de indicadores, relación causa-efecto, viabilidad y claridad.',explanation:'Rúbrica orientativa: 0–5 puntos por indicador correcto, argumentación, propuesta factible y criterio de seguimiento. La respuesta abierta NO se califica automáticamente.',term:'toma de decisiones',level:'Análisis abierto'}
 ];
}
function panelState(element){
 return panels[element.dataset.learningPanel];
}
function answerRow(q,panel,record){
 const prior=panel.mode==='evaluation'?panel.exam.responses[q.id]?.answer:record?.answer;
 const options=q.type==='choice'?(q.options||[]):[];
 const help=helpButton(q.term||'toma de decisiones');
 if(q.type==='written')return '<label class="learn-label">Justificación y propuesta '+help+'</label><textarea class="learn-response" rows="5" maxlength="3000" placeholder="Escribe tu análisis y las razones de tus decisiones...">'+safe(prior||'')+'</textarea>';
 if(q.type==='number')return '<label class="learn-label">Respuesta numérica (sin unidades) '+help+'</label><input class="learn-response" type="text" inputmode="decimal" autocomplete="off" placeholder="Ej.: 118,50" value="'+safe(prior??'')+'">';
 return '<fieldset class="learn-options"><legend>Elige una respuesta '+help+'</legend>'+options.map((option,i)=>'<label class="learn-option"><input type="radio" name="learning-'+safe(panel.section)+'" class="learn-choice" value="'+i+'" '+(prior===option?'checked':'')+'><span>'+safe(option)+'</span>'+helpButton(q.term||'toma de decisiones')+'</label>').join('')+'</fieldset>';
}
function feedback(q,panel,record){
 if(!record || panel.mode==='evaluation')return '';
 if(q.type==='written')return '<div class="learn-feedback"><strong>Respuesta registrada para revisión docente.</strong><p>Tu justificación se conservará en el PDF. Esta actividad no tiene calificación automática.</p></div>';
 return '<div class="learn-feedback '+(record.correct?'learn-ok':'learn-wrong')+'"><strong>'+(record.correct?'✓ Respuesta correcta':'Respuesta por revisar')+'</strong><p>Tu respuesta: '+safe(record.answer)+'</p><p><b>Solución:</b> '+safe(String(q.answer))+'</p><p>'+safe(q.explanation)+'</p></div>';
}
function renderPanel(section){
 const el=document.querySelector('[data-learning-panel="'+section+'"]'),panel=panels[section];if(!el||!panel)return;
 const stat=stats(panel.module),questions=currentQuestions(panel),n=Math.min(panel.index,questions.length-1),q=questions[n],p=getProgress();
 const saved=panel.mode==='challenge'?(q.type==='written'?p.written[q.id]:p.answers[q.id]):p.answers[q.id];
 const isExam=panel.mode==='evaluation';
 const showScore=isExam?panel.exam.responsesCount:stat.attempted;
 el.innerHTML='<div class="learn-head"><div><div class="learn-eyebrow">CENTRO DE APRENDIZAJE · '+safe(modules[panel.module])+'</div><h2>Aprende, calcula y toma decisiones '+helpButton('toma de decisiones')+'</h2><p>Banco formativo: '+stat.total+' actividades en este tema · '+stat.attempted+' realizadas · '+stat.correct+' correctas. Cada ejercicio incluye una explicación.</p></div><span class="learn-counter">'+safe(String(stat.correct))+'/'+stat.total+' aciertos</span></div>'+
 '<div class="learn-toolbar"><button type="button" data-learn-action="practice" class="learn-tab '+(panel.mode==='practice'?'selected':'')+'">Práctica</button><button type="button" data-learn-action="challenge" class="learn-tab '+(panel.mode==='challenge'?'selected':'')+'">Desafío de mi farmacia</button><button type="button" data-learn-action="evaluation" class="learn-tab '+(isExam?'selected':'')+'">Evaluación /20</button></div>'+
 (isExam?'<div class="learn-exam-note">Evaluación formativa: no se muestra la respuesta correcta hasta entregar las diez preguntas. Esta modalidad no sustituye una evaluación supervisada.</div>':'')+
 '<div class="learn-question"><div class="learn-question-top"><span>'+safe(q.level||'Básico')+'</span><span>Pregunta '+(n+1)+' de '+questions.length+'</span></div><h3>'+safe(q.prompt)+' '+helpButton(q.term)+'</h3>'+answerRow(q,panel,saved)+'</div>'+
 feedback(q,panel,saved)+
 '<div class="learn-actions"><button type="button" class="btn" data-learn-action="submit">'+(isExam?'Registrar respuesta':q.type==='written'?'Guardar análisis':'Comprobar y explicar')+'</button><button type="button" class="btn outline" data-learn-action="prev" '+(n<=0?'disabled':'')+'>Anterior</button><button type="button" class="btn outline" data-learn-action="next" '+(n>=questions.length-1?'disabled':'')+'>Siguiente</button><label class="learn-jump">Ir a <select class="learn-select">'+questions.map((item,i)=>'<option value="'+i+'" '+(i===n?'selected':'')+'>'+(i+1)+(p.answers[item.id]?' ✓':'')+'</option>').join('')+'</select></label></div>'+
 (isExam&&panel.exam.responsesCount>=questions.length?'<p class="learn-exam-note">Has registrado diez respuestas. Pulsa «Finalizar evaluación» para ver tu nota.</p><button type="button" class="btn" data-learn-action="finish">Finalizar evaluación /20</button>':'')+
 '<div class="learn-export"><button type="button" class="btn outline" data-learn-action="pdf-own">🖨️ Mis respuestas / PDF</button><button type="button" class="btn outline" data-learn-action="pdf-key" '+(isExam?'disabled title="Termina primero la evaluación"':'')+'>🖨️ Solucionario de 100 preguntas / PDF</button></div>';
}
function switchMode(section,mode){
 const p=panels[section];
 if(p.mode==='evaluation' && p.exam && p.exam.responsesCount<10 && !confirm('¿Salir de la evaluación sin terminar? Las respuestas de este intento no quedarán registradas.'))return;
 p.mode=mode;p.index=0;
 if(mode==='evaluation')p.exam={questions:choose(getQuestions(p.module),10),responses:{},responsesCount:0};
 renderPanel(section);
}
function readAnswer(panel,q,root){
 const input=q.type==='choice'?root.querySelector('.learn-choice:checked'):root.querySelector('.learn-response');
 if(!input)return null;
 const v=String(input.value).trim();
 if(!v)return null;
 return q.type==='choice'?q.options[Number(v)]||null:v;
}
function submit(section){
 const panel=panels[section],root=document.querySelector('[data-learning-panel="'+section+'"]'),q=currentQuestions(panel)[panel.index];
 const raw=readAnswer(panel,q,root);if(raw===null){info('Selecciona o escribe una respuesta antes de continuar.');return;}
 const p=getProgress(),correct=q.type==='written'?null:actualAnswer(q,raw);
 const record={answer:raw,correct,at:new Date().toISOString(),prompt:q.prompt,solution:q.answer,explanation:q.explanation,module:q.module,mode:panel.mode};
 if(panel.mode==='evaluation'){
   if(!panel.exam.responses[q.id])panel.exam.responsesCount++;
   panel.exam.responses[q.id]=record;
   if(panel.index<panel.exam.questions.length-1)panel.index++;
 }else if(q.type==='written'){p.written[q.id]=record;persist();info('Análisis guardado. Espera el indicador de sincronización con la nube.');}
 else{p.answers[q.id]=record;persist();info('Respuesta registrada. Consulta la explicación.');}
 renderPanel(section);
}
function finish(section){
 const panel=panels[section];
 if(panel.mode!=='evaluation'||panel.exam.responsesCount<panel.exam.questions.length){info('Responde las diez preguntas antes de finalizar.');return;}
 const p=getProgress(),values=Object.values(panel.exam.responses),correct=values.filter(r=>r.correct).length;
 p.attempts.unshift({module:panel.module,at:new Date().toISOString(),correct,total:values.length,score:correct*2,records:values});
 p.attempts=p.attempts.slice(0,20);
 values.forEach(r=>{const q=panel.exam.questions.find(x=>x.prompt===r.prompt);if(q)p.answers[q.id]=r;});
 persist();panel.mode='practice';panel.index=0;panel.exam=null;renderAll();
 info('Evaluación terminada: '+correct+'/10 correctas. Nota '+(correct*2)+'/20. Puedes consultar las explicaciones y el PDF.');
}
function pdfHeader(title,student){
 const p=host.getState().pharmacy||{};
 return '<h1>'+safe(title)+'</h1><p><b>FarmaConta EDU · III Unidad</b><br>Farmacia ficticia: '+safe(p.name||'Sin nombre')+'<br>Estudiante: '+safe(p.student||'No registrado')+'<br>Fecha: '+safe(new Date().toLocaleString('es-PE'))+'</p><div class="print-watermark">SIMULACIÓN ACADÉMICA · SIN VALIDEZ TRIBUTARIA</div>';
}
function pdfOwn(){
 const p=getProgress(),answered=questionBank.filter(q=>p.answers[q.id]).map(q=>({q,r:p.answers[q.id]}));
 const written=Object.values(p.written);
 const exam=p.attempts.map(e=>'<tr><td>'+safe(modules[e.module])+'</td><td>'+safe(new Date(e.at).toLocaleDateString('es-PE'))+'</td><td>'+e.correct+'/'+e.total+'</td><td>'+e.score+'/20</td></tr>').join('');
 let body=pdfHeader('Reporte de respuestas y aprendizaje')+'<h2>Resumen</h2><p>Preguntas respondidas: '+answered.length+' de '+questionBank.length+'. Respuestas abiertas: '+written.length+'. Evaluaciones concluidas: '+p.attempts.length+'.</p><h3>Calificaciones formativas</h3><table class="print-table"><thead><tr><th>Sesión</th><th>Fecha</th><th>Aciertos</th><th>Nota</th></tr></thead><tbody>'+ (exam||'<tr><td colspan="4">Sin evaluaciones terminadas</td></tr>')+'</tbody></table>';
 for(const m of Object.keys(modules)){
  const records=answered.filter(x=>x.q.module===m);if(!records.length)continue;
  body+='<h2>'+safe(modules[m])+'</h2>';
  records.forEach(({q,r},i)=>{body+='<div class="avoid-break"><p><b>'+(i+1)+'. '+safe(r.prompt||q.prompt)+'</b><br>Mi respuesta: '+safe(r.answer)+'<br>Resultado: '+(r.correct?'Correcta':'Por revisar')+'<br>Solución: '+safe(String(r.solution??q.answer))+'<br><i>Explicación:</i> '+safe(r.explanation||q.explanation)+'</p></div>';});
 }
 if(written.length){body+='<h2>Análisis y decisiones abiertos</h2>';written.forEach((r,i)=>{body+='<div class="avoid-break"><p><b>Actividad '+(i+1)+':</b> '+safe(r.prompt)+'<br><b>Mi respuesta:</b> '+safe(r.answer)+'<br><i>Actividad sujeta a revisión docente.</i></p></div>';});}
 host.print(body);
}
function pdfKey(){
 const title=pdfHeader('Guía de resolución del banco formativo');
 let body=title+'<p>Incluye las respuestas y explicaciones de las 100 preguntas. Es una guía de estudio; no un examen protegido. Las actividades reflejan un modelo didáctico de 18 % de IGV en operaciones gravadas.</p>';
 for(const m of Object.keys(modules)){
  body+='<h2>'+safe(modules[m])+'</h2>';
  getQuestions(m).forEach((q,i)=>{body+='<div class="avoid-break"><p><b>'+(i+1)+'. '+safe(q.prompt)+'</b><br>Respuesta: <strong>'+safe(String(q.answer))+'</strong><br>Justificación: '+safe(q.explanation)+'</p></div>';});
 }
 host.print(body);
}
function openHelp(button){
 const term=button.dataset.helpTerm,record=glossary[term]||glossary['toma de decisiones'];
 if(activeHelp)activeHelp.setAttribute('aria-expanded','false');
 activeHelp=button;button.setAttribute('aria-expanded','true');
 popup.innerHTML='<div class="learn-pop-title">'+safe(term)+'</div><p>'+safe(record[0])+'</p>'+(record[1]?'<p class="learn-formula"><strong>Cálculo o regla:</strong> '+safe(record[1])+'</p>':'');
 popup.hidden=false;positionHelp(button);
}
function positionHelp(button){
 if(!popup||popup.hidden)return;
 const b=button.getBoundingClientRect(),w=Math.min(320,window.innerWidth-24);
 popup.style.width=w+'px';popup.style.left=Math.max(12,Math.min(window.innerWidth-w-12,b.left))+'px';
 const h=popup.getBoundingClientRect().height, below=window.innerHeight-b.bottom;
 popup.style.top=(below>h+12?b.bottom+9:Math.max(8,b.top-h-9))+'px';
}
function closeHelp(){
 if(activeHelp)activeHelp.setAttribute('aria-expanded','false');
 activeHelp=null;if(popup)popup.hidden=true;
}
function annotateHelp(){
 document.querySelectorAll('.view label,.view h2,.view h3,.view th,.view .metric span,.view .breakdown span').forEach(el=>{
  if(el.closest('.learn-card')||el.querySelector('.learn-help'))return;
  const t=findTerm(el.textContent||'');if(!t)return;
  el.insertAdjacentHTML('beforeend',' '+helpButton(t));
 });
}
function renderAll(){blocks.forEach(([section])=>renderPanel(section));annotateHelp();}
function start(){
 const style=document.createElement('style');
 style.textContent='.learn-card{margin-top:22px;border:1px solid #dde7f1;border-radius:19px;padding:22px;background:#fff;box-shadow:0 6px 18px rgba(18,40,65,.06)}.learn-head{display:flex;justify-content:space-between;gap:18px}.learn-head h2{margin:6px 0 8px}.learn-head p{color:#68768a;font-size:.86rem}.learn-eyebrow{font-size:.72rem;font-weight:800;letter-spacing:.06em;color:#305bac}.learn-counter{white-space:nowrap;padding:8px 12px;background:#e9f3ef;border-radius:30px;font-size:.8rem;font-weight:800;color:#17715e;height:max-content}.learn-toolbar{display:flex;gap:8px;flex-wrap:wrap;margin:16px 0}.learn-tab{padding:10px 12px;background:#f2f5fa;border:1px solid #d9e2ee;border-radius:10px;font-weight:700;color:#263d60}.learn-tab.selected{background:#1d4c8e;color:white;border-color:#1d4c8e}.learn-question{padding:18px;border:1px solid #e4ebf3;border-radius:13px;background:#fafcff}.learn-question-top{display:flex;justify-content:space-between;color:#62748b;font-size:.75rem;margin-bottom:9px}.learn-question h3{font-size:1rem;line-height:1.5}.learn-options{border:0;padding:0;margin:14px 0 0}.learn-options legend{font-size:.85rem;color:#536782;font-weight:700}.learn-option{display:flex;gap:10px;align-items:center;padding:9px 12px;border:1px solid #dce5f0;border-radius:9px;margin:8px 0;background:white;cursor:pointer}.learn-option input{width:auto}.learn-option span{flex:1}.learn-option .learn-help{margin-left:auto}.learn-response{width:100%;margin-top:8px}.learn-help{display:inline-flex;vertical-align:middle;align-items:center;justify-content:center;width:21px;height:21px;border-radius:50%;background:#e4efff;border:1px solid #9fbee8;color:#164a8a;font-weight:800;font-size:.72rem;cursor:help;margin-left:4px;flex-shrink:0;padding:0}.learn-help:focus-visible{outline:3px solid #4e8ae9}.learn-popover{position:fixed;z-index:200;border:1px solid #d3ddea;border-radius:12px;background:white;box-shadow:0 13px 35px #162e4a35;padding:14px 16px;font-size:.86rem;line-height:1.5;color:#233650;overflow-wrap:anywhere;max-height:70vh;overflow:auto}.learn-popover[hidden]{display:none}.learn-pop-title{font-weight:800;text-transform:capitalize;color:#123b74;margin-bottom:6px}.learn-popover p{margin:6px 0}.learn-formula{background:#edf4ff;padding:8px;border-radius:8px}.learn-actions,.learn-export{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:14px}.learn-jump{display:flex;align-items:center;gap:7px;font-size:.82rem}.learn-jump select{width:auto;padding:8px}.learn-feedback{border:1px solid #bcd9c9;background:#f2fbf6;border-radius:12px;margin-top:12px;padding:12px;color:#21553e}.learn-feedback.learn-wrong{background:#fff7eb;border-color:#edd6b3;color:#67461c}.learn-feedback p{font-size:.86rem;margin:8px 0 0}.learn-exam-note{padding:12px;border-left:3px solid #7798d7;background:#eff4ff;margin:10px 0;color:#284368;font-size:.86rem}@media(max-width:700px){.learn-card{padding:14px}.learn-head{display:block}.learn-head .learn-counter{display:inline-flex;margin-top:7px}.learn-actions button,.learn-export button{flex:1}.learn-tab{flex:1}}@media print{.learn-card,.learn-popover{display:none!important}}';
 document.head.appendChild(style);
 popup=document.createElement('div');popup.id='learning-glossary-popup';popup.className='learn-popover';popup.hidden=true;popup.setAttribute('role','tooltip');document.body.appendChild(popup);
 blocks.forEach(([section,module])=>{
  const sectionEl=document.querySelector('#view-'+section);if(!sectionEl)return;
  const div=document.createElement('section');div.className='learn-card';div.dataset.learningPanel=section;
  sectionEl.appendChild(div);panels[section]={section,module,mode:'practice',index:0,exam:null};
 });
 document.addEventListener('click',ev=>{
  const help=ev.target.closest('.learn-help');
  if(help){ev.preventDefault();ev.stopPropagation();if(activeHelp===help&&!popup.hidden)closeHelp();else openHelp(help);return;}
  if(!ev.target.closest('.learn-popover'))closeHelp();
  const button=ev.target.closest('[data-learn-action]');if(!button)return;
  const root=button.closest('.learn-card');if(!root)return;
  const section=root.dataset.learningPanel,p=panels[section],action=button.dataset.learnAction;
  if(['practice','challenge','evaluation'].includes(action)){switchMode(section,action);return;}
  if(action==='next'||action==='prev'){p.index=Math.max(0,Math.min(currentQuestions(p).length-1,p.index+(action==='next'?1:-1)));renderPanel(section);return;}
  if(action==='submit'){submit(section);return;}
  if(action==='finish'){finish(section);return;}
  if(action==='pdf-own'){pdfOwn();return;}
  if(action==='pdf-key'){if(p.mode!=='evaluation')pdfKey();return;}
 });
 document.addEventListener('change',ev=>{
  if(ev.target.matches('.learn-select')){const root=ev.target.closest('.learn-card');const p=panelState(root);p.index=Number(ev.target.value)||0;renderPanel(p.section);}
 });
 document.addEventListener('mouseover',ev=>{const help=ev.target.closest('.learn-help');if(help&&window.matchMedia('(hover:hover)').matches)openHelp(help);});
 document.addEventListener('mouseout',ev=>{const help=ev.target.closest('.learn-help');if(help&&activeHelp===help&&!ev.relatedTarget?.closest?.('.learn-popover'))closeHelp();});
 document.addEventListener('keydown',ev=>{if(ev.key==='Escape')closeHelp();});
 window.addEventListener('scroll',closeHelp,{passive:true});
 window.addEventListener('resize',closeHelp);
 window.FarmaLearning={refresh(){renderAll()},questionCount:questionBank.length,glossaryCount:terms.length,exportPDF:pdfOwn};
 renderAll();
}
start();
})();
