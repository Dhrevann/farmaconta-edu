import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const inline=html.match(/<script>\s*([\s\S]*?)\s*<\/script>/)?.[1];
assert.ok(inline,'Debe existir el núcleo contable del simulador');

function between(a,b){
 const start=inline.indexOf(a),end=inline.indexOf(b,start+a.length);
 assert.ok(start>=0&&end>start,'No se encontró '+a);
 return inline.slice(start,end);
}
const nucleus=[
 between('const TAX=','function isValid('),
 between('function openingInventory()','function metric('),
 between('function saleCode(s)','function renderPOS()'),
 between('function journal()','function renderBooks()')
].join('\n');

function simulate(operations){
 const program=nucleus+'\n'+operations;
 return vm.runInNewContext('(function(){'+program+'})()', {Intl,Date,Math});
}
function opening(){
 return simulate('return {cash:cashBalance(),inventory:stockValue(),capital:capital(),balanced:journal().every(e=>e.lines.reduce((a,l)=>a+l.debit-l.credit,0)===0)};');
}

test('Apertura: activo equivale a capital y Debe es igual a Haber',()=>{
 const x=opening();
 assert.equal(x.cash+x.inventory,x.capital);
 assert.ok(x.balanced);
});

test('Compra al contado: baja Caja, aumenta Mercaderías y cuadran todos los asientos',()=>{
 const x=simulate(`
 const initial=cashBalance()+stockValue();
 const p=state.products[0],cost=p.cost,qty=8;
 state.purchases.push({id:'BUY-01',date:'2026-10-20T10:00:00Z',productId:p.id,qty,unitCost:cost,amount:dec(cost*qty),batch:'TEST-001',expiry:'2027-10-20'});
 p.stock+=qty;
 const entries=journal();
 return {initial,after:cashBalance()+stockValue(),deltaCash:cashBalance()-state.pharmacy.initialCash,qty:p.stock,
 balanced:entries.every(e=>Math.abs(e.lines.reduce((a,l)=>a+l.debit-l.credit,0))<.001),
 entry:entries.at(-1).lines.map(l=>({name:l.account,debit:l.debit,credit:l.credit}))};
 `);
 assert.equal(x.after,x.initial);
 assert.equal(x.deltaCash,-24);
 assert.ok(x.balanced);
 assert.equal(x.entry[0].name,'stock');
 assert.equal(x.entry[1].name,'cash');
 assert.equal(x.entry[0].debit,x.entry[1].credit);
});

test('Venta después de compra: balances, IGV, resultado y stock cierran sin diferencias',()=>{
 const x=simulate(`
 const item=state.products[0],initial=capital(),sold=2;
 state.purchases.push({id:'B01',date:'2026-10-20T10:00:00Z',productId:item.id,qty:5,unitCost:item.cost,amount:dec(item.cost*5),batch:'TEST-001',expiry:'2027-10-20'});
 item.stock+=5;
 const total=dec(item.price*sold),net=dec(total/1.18);
 state.sales.push({id:'S01',type:'boleta',number:1,date:'2026-10-20T11:00:00Z',customer:'Alumno ficticio',items:[{id:item.id,qty:sold,price:item.price,cost:item.cost}],total,net,tax:dec(total-net),cost:dec(sold*item.cost)});
 item.stock-=sold;
 const balance=dec(cashBalance()+stockValue()-outputTax()-initial-result());
 return {balance,entries:journal().length, balanced:journal().every(e=>Math.abs(e.lines.reduce((a,l)=>a+l.debit-l.credit,0))<.001),
 tax:outputTax(),net:income(),profit:result(),stock:item.stock};
 `);
 assert.equal(x.balance,0);
 assert.ok(x.balanced);
 assert.equal(x.entries,4);
 assert.equal(x.stock,48);
 assert.ok(x.tax>0&&x.net>0&&x.profit>0);
});

test('Corrección al desafío financiero: el efectivo incluye las compras pagadas',()=>{
 const source=readFileSync(new URL('../learning.js',import.meta.url),'utf8');
 assert.ok(source.includes('spentOnPurchases=sum(s.purchases||[]'));
 assert.ok(source.includes('st+total-spent-spentOnPurchases'));
});
