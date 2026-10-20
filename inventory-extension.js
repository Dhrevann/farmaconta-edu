(function InventoryModule(){
'use strict';
const $=s=>document.querySelector(s),host=window.farmaManagementHost;
if(!host)return;
const money=x=>new Intl.NumberFormat('es-PE',{style:'currency',currency:'PEN'}).format(Number(x)||0);
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const round=x=>Math.round(x*100)/100;
function purchases(){return host.getState().purchases||[];}
function render(){
 const s=host.getState();
 const prod=$('#purchase-product'),old=prod.value;
 prod.innerHTML=s.products.filter(p=>p.active!==false).map(p=>`<option value="${esc(p.id)}">${esc(p.id)} · ${esc(p.name)} · ${money(p.cost)}</option>`).join('');
 if(s.products.some(p=>p.id===old&&p.active!==false))prod.value=old;
 const total=purchases().reduce((a,p)=>a+p.amount,0);
 $('#purchase-overview').textContent=purchases().length+' compras simuladas · '+money(total)+' pagados al contado.';
 const entries=[...purchases()].reverse();
 $('#purchase-body').innerHTML=entries.map(p=>`<tr><td>${esc(p.date?.slice(0,10))}</td><td>${esc(p.productId)}</td><td>${p.qty}</td><td>${money(p.unitCost)}</td><td>${money(p.amount)}</td><td>${esc(p.batch)}</td><td>${esc(p.expiry)}</td></tr>`).join('')||'<tr><td colspan="7">Todavía no registraste compras.</td></tr>';
 const labels=s.products.map(p=>{
  const expiry=purchases().filter(x=>x.productId===p.id&&x.expiry).map(x=>x.expiry).sort()[0]||'—';
  return `<option value="${esc(p.id)}">${esc(p.name)} · Stock ${p.stock} · Venc. registrado ${esc(expiry)}</option>`;
 });
 $('#kardex-product').innerHTML=labels.join('');
 const prev=$('#kardex-product').dataset.selected;
 if(s.products.some(p=>p.id===prev))$('#kardex-product').value=prev;
 renderKardex();
}
function renderKardex(){
 const id=$('#kardex-product').value,p=host.getState().products.find(x=>x.id===id);
 if(!p){$('#kardex-body').innerHTML='';return;}
 $('#kardex-product').dataset.selected=id;
 const st=host.getState();
 const flows=[
 ...(st.purchases||[]).filter(x=>x.productId===id).map(x=>({date:x.date,qty:x.qty,concept:'Compra ficticia · '+(x.batch||'sin lote')})),
 ...st.sales.flatMap(s=>(s.items||[]).filter(i=>i.id===id).map(i=>({date:s.date,qty:-i.qty,concept:'Venta '+s.type+' '+s.number})))
 ].sort((a,b)=>String(a.date).localeCompare(String(b.date)));
 let qty=p.initialStock;
 let lines=`<tr><td>Inicio</td><td>Existencias iniciales didácticas</td><td>+${qty}</td><td>${qty}</td><td>${money(qty*p.cost)}</td></tr>`;
 for(const f of flows){qty+=f.qty;lines+=`<tr><td>${esc(String(f.date).slice(0,10))}</td><td>${esc(f.concept)}</td><td>${f.qty>0?'+':''}${f.qty}</td><td>${qty}</td><td>${money(qty*p.cost)}</td></tr>`;}
 $('#kardex-body').innerHTML=lines;
 $('#kardex-note').textContent='Kardex didáctico a costo fijo. Stock calculado: '+qty+'; stock del catálogo: '+p.stock+(qty===p.stock?' ✓':' ⚠ DIFERENCIA. Revisar ajustes manuales.');
}
function handlePurchase(ev){
 ev.preventDefault();const state=host.getState();
 const id=$('#purchase-product').value,p=state.products.find(x=>x.id===id);
 const qty=Number($('#purchase-qty').value),batch=$('#purchase-batch').value.trim().toUpperCase(),expiry=$('#purchase-expiry').value;
 if(!p||p.active===false){host.notify('Selecciona un producto activo.');return;}
 if(!Number.isSafeInteger(qty)||qty<1||qty>99999||p.stock+qty>99999){host.notify('Cantidad inválida o fuera del límite de stock.');return;}
 if(!/^[A-Z0-9_-]{1,30}$/.test(batch)){host.notify('Escribe un lote ficticio alfanumérico (hasta 30 caracteres).');return;}
 if(!/^\d{4}-\d\d-\d\d$/.test(expiry)||!Number.isFinite(Date.parse(expiry))){host.notify('Registra una fecha de vencimiento válida.');return;}
 if(expiry<new Date().toISOString().slice(0,10)){host.notify('No se permite comprar unidades ficticias ya vencidas.');return;}
 const amount=round(qty*p.cost);
 if(host.cash()<amount){host.notify('Efectivo ficticio insuficiente para pagar esta compra.');return;}
 const record={id:'C'+Date.now()+'-'+Math.random().toString(36).slice(2,7),date:new Date().toISOString(),productId:id,qty,unitCost:p.cost,amount,batch,expiry};
 state.purchases=state.purchases||[];
 state.purchases.push(record);p.stock+=qty;
 if(!host.save()){state.purchases.pop();p.stock-=qty;host.notify('No se pudo poner en cola la compra.');return;}
 render();host.render();$('#purchase-qty').value='1';host.notify('Compra registrada en la práctica; espera confirmación de guardado en la nube.');
}
function install(){
 const view=$('#view-inventario');
 const wrapper=document.createElement('article');wrapper.className='card';wrapper.style.marginTop='18px';
 wrapper.innerHTML=`<h2>Compras ficticias, lotes y Kardex</h2><p class="tiny">Registrar una compra al contado aumenta mercaderías y reduce caja. Se utiliza el costo unitario fijo del producto: no admite compras con costo distinto.</p>
 <form id="purchase-form"><div class="formrow"><div class="field"><label for="purchase-product">Producto a reponer</label><select id="purchase-product"></select></div><div class="field"><label for="purchase-qty">Unidades compradas</label><input id="purchase-qty" type="number" min="1" max="99999" value="1" required></div></div>
 <div class="formrow"><div class="field"><label for="purchase-batch">Lote ficticio</label><input id="purchase-batch" maxlength="30" placeholder="LOTE-001" required></div><div class="field"><label for="purchase-expiry">Vencimiento</label><input id="purchase-expiry" type="date" required></div></div><button type="submit" class="btn">Registrar compra al contado</button></form>
 <p id="purchase-overview" class="tiny"></p><div class="table-wrap"><table><thead><tr><th>Fecha</th><th>Producto</th><th>Cant.</th><th>Costo</th><th>Importe</th><th>Lote</th><th>Vence</th></tr></thead><tbody id="purchase-body"></tbody></table></div>
 <h3>Kardex simplificado</h3><label for="kardex-product">Consultar movimientos</label><select id="kardex-product"></select>
 <div class="table-wrap"><table><thead><tr><th>Fecha</th><th>Movimiento</th><th>Variación</th><th>Saldo unid.</th><th>Saldo al costo</th></tr></thead><tbody id="kardex-body"></tbody></table></div><p id="kardex-note" class="tiny" role="status"></p>
 <p class="tiny">**Alcance:** registra lote y vencimiento de las entradas, pero todavía NO distribuye las ventas por lote ni aplica FEFO de manera automática; el stock es agregado por producto. Nunca usar para dispensación real.</p>`;
 view.appendChild(wrapper);
 $('#purchase-form').addEventListener('submit',handlePurchase);
 $('#kardex-product').addEventListener('change',renderKardex);
 window.FarmaInventoryExtension={refresh:render};
 render();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();