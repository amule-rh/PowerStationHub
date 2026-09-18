(function(){
const P=window.PSH_PRODUCTS||[];
const lang=window.PSH_LANG||'es';
const root=document.getElementById('compare-result');
const q=new URLSearchParams(location.search).get('p')||'';
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
let items=q.split(',').map(s=>P.find(x=>x.slug===s)).filter(Boolean).slice(0,3);
const es=lang==='es';
const catalog='/'+(es?'es/productos/':'en/products/');
function img(x){
  return x.image ? `<img src="${x.image}" alt="${esc(x.name)} — imagen oficial" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='/assets/logo.png';this.classList.add('image-fallback')">` : '';
}
if(!items.length){
  root.innerHTML=`<div class="empty"><strong>${es?'Selecciona productos desde el catálogo para compararlos.':'Select products from the database to compare them.'}</strong><p><a class="btn green" href="${catalog}">${es?'Abrir catálogo':'Open database'}</a></p></div>`;
  return;
}
if(items.length===1){
  const x=items[0];
  root.innerHTML=`<div class="card" style="margin:20px 0"><div class="compare-product-head">${img(x)}</div><div class="eyebrow">${esc(x.brand)}</div><h2>${esc(x.name)}</h2><p>${es?'Has seleccionado un modelo. Añade otro desde el catálogo para ver la comparación técnica.':'You selected one model. Add another from the database to see the technical comparison.'}</p><div class="product-specs"><div><span>Wh</span><b>${x.capacity??'—'}</b></div><div><span>W</span><b>${x.output??'—'}</b></div><div><span>${es?'Pico':'Peak'}</span><b>${x.peak??'—'}</b></div><div><span>Solar</span><b>${x.solar??'—'}</b></div></div><p><a class="btn green" href="${catalog}">${es?'Elegir otro modelo':'Choose another model'}</a></p></div>`;
  return;
}
const rows=[
 [es?'Score PowerStationHub':'PowerStationHub Score',x=>x.score+'/100'],
 [es?'Capacidad':'Capacity',x=>x.capacity?x.capacity+' Wh':'—'],
 [es?'Salida continua':'Continuous output',x=>x.output?x.output+' W':'—'],
 [es?'Pico':'Peak',x=>x.peak?x.peak+' W':'—'],
 [es?'Entrada solar':'Solar input',x=>x.solar?x.solar+' W':'—'],
 [es?'Batería':'Battery',x=>x.battery||'—'],
 [es?'Peso':'Weight',x=>x.weight?x.weight+' kg':'—'],
 [es?'Mejor para':'Best for',x=>x.bestFor||'—']
];
root.innerHTML=`<div class="table-wrap"><table class="compare-table"><thead><tr><th class="metric">${es?'Especificación':'Specification'}</th>${items.map(x=>`<th><div class="compare-product-head">${img(x)}</div><div class="eyebrow">${esc(x.brand)}</div><a href="${catalog}${x.slug}/">${esc(x.name)}</a></th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr><td class="metric">${r[0]}</td>${items.map(x=>`<td>${esc(r[1](x))}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="source-note">${es?'El score es un indicador editorial calculado a partir de capacidad, potencia, entrada solar, portabilidad y completitud de datos; no es una prueba de laboratorio.':'The score is an editorial indicator based on capacity, output, solar input, portability and data completeness; it is not a laboratory test.'}</p><p><a class="btn light" href="${catalog}">${es?'Volver al catálogo':'Back to database'}</a></p>`;
})();
