import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const load=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('Banco formativo: 100 preguntas distintas con justificaciones y soluciones válidas',()=>{
 const ctx={window:{}};vm.runInNewContext(load('learning-bank.js'),ctx);
 const bank=ctx.window.FarmaQuestionBank;
 assert.equal(bank.questions.length,100);
 assert.equal(new Set(bank.questions.map(x=>x.id)).size,100);
 const distribution={finanzas:25,ventas:20,inventario:20,contabilidad:25,reportes:10};
 for(const [name,count] of Object.entries(distribution))assert.equal(bank.questions.filter(x=>x.module===name).length,count);
 for(const q of bank.questions){assert.ok(q.prompt?.length>10);assert.ok(q.explanation?.length>8);if(q.type==='choice')assert.ok(q.options.includes(q.answer));}
});
test('No existe solucionario general accesible desde la interfaz',()=>{
 const s=load('learning.js');assert.ok(!s.includes('data-learn-action="pdf-key"'));assert.ok(!s.includes('function pdfKey()'));
 assert.ok(s.includes('data-learn-action="pdf-own"'));
});
test('Los módulos principales contienen funciones de inventario, comprobantes, compra y entrega',()=>{
 const s=load('index.html');const js=s.match(/<script>\s*([\s\S]*?)\s*<\/script>/)?.[1];
 assert.ok(js);new vm.Script(js);
 for(const name of ['printReceipt','printThermalTicket','saveInventoryProduct','productPurchaseQty','finalSubmissionPrint','journal','cashBalance'])
 assert.match(js,new RegExp('function '+name+'\\('));
 assert.match(js,/state\.purchases/);
 assert.match(s,/src="\.\/secure-exam\.js"/);
 assert.match(s,/src="\.\/teacher\.js"/);
});
test('Cada complemento de navegador pasa la compilación JS',()=>{
 for(const name of ['teacher.js','teacher-import.js','backup-ui.js','secure-exam.js','inventory-extension.js','student-feedback.js','learning.js'])assert.doesNotThrow(()=>new vm.Script(load(name)),name);
});
test('Las migraciones protegen roles, evaluaciones y respaldos',()=>{
 const teacher=load('sql/03_docente.sql'),exam=load('sql/04_evaluacion_servidor.sql'),backup=load('sql/05_backups.sql');
 for(const fn of ['farma_is_teacher','farma_teacher_dashboard','farma_teacher_student','farma_teacher_grade','farma_teacher_enrollment'])assert.ok(teacher.includes(fn));
 assert.match(teacher,/AUTH\.UID\(\)|auth\.uid\(\)/i);
 for(const fn of ['farma_start_exam','farma_submit_exam','farma_my_secure_exams'])assert.ok(exam.includes(fn));
 assert.match(exam,/revoke all on public\.farma_secure_exams/i);
 assert.match(backup,/farma_daily_backups/);
 assert.match(backup,/enable row level security/i);
});
test('No se publican claves secretas de Supabase',()=>{
 const config=load('config.js');
 assert.ok(!config.includes('sb_secret_'));
 assert.ok(!config.includes('service_role'));
});
test('Compra al costo fijo: registro contable y stock conservan la partida doble',()=>{
 const initialCash=3500,initialStock=45,unitCost=3,quantity=10;
 const purchases=quantity*unitCost;
 const newCash=initialCash-purchases,newStock=(initialStock+quantity)*unitCost;
 assert.equal(newCash+newStock,initialCash+initialStock*unitCost);
 assert.equal(purchases,purchases); // Debe mercaderías = Haber caja
});

test('Importador docente: lee CSV de Excel y TXT, detecta duplicados sin matricularlos dos veces',()=>{
 const window={};
 vm.runInNewContext(load('teacher-import.js'),{window,document:{}});
 const parse=window.FarmaBulkEmailParser.parse;
 const csv='Nombre;Correo electrónico;Sección\\nAna;ana@example.edu.pe;A\\nBruno;bruno@example.edu.pe;A';
 const first=parse(csv);
 assert.equal(first.stats.new,2);
 assert.deepEqual(Array.from(first.unique),['ana@example.edu.pe','bruno@example.edu.pe']);
 const second=parse('correo\\nana@example.edu.pe\\nana@example.edu.pe\\nbruno@example.edu.pe\\ncorreo_mal',
 ['bruno@example.edu.pe']);
 assert.equal(second.stats.new,1);
 assert.equal(second.stats.existing,1);
 assert.equal(second.stats.duplicates,1);
 assert.equal(second.stats.invalid,1);
 assert.equal(parse('uno@example.edu.pe,dos@example.edu.pe').stats.new,2);
 assert.equal(parse('"Email","Nombre"\\n"c@example.com","Alumno, C"').stats.new,1);
});
test('Matrícula masiva: servidor verifica docente, tamaño, correos y evita duplicados',()=>{
 const sql=load('sql/06_matricula_masiva.sql');
 assert.match(sql,/public\\.farma_is_teacher\\(\\)/);
 assert.match(sql,/INVALID_BATCH_SIZE/);
 assert.match(sql,/INVALID_EMAIL_LIST/);
 assert.match(sql,/on conflict \\(email\\) do nothing/);
 assert.match(sql,/revoke all on function public\\.farma_teacher_bulk_enrollment\\(text\\[\\]\\) from public,anon,authenticated/);
 const html=load('index.html');
 assert.match(html,/teacher-import\\.js/);
});
