(function(){
const root=document.querySelector('[data-energy-finder]');if(!root)return;
const es=(document.documentElement.lang||'es').startsWith('es');const $=id=>document.getElementById(id);
const ids=['finderMonthly','monthlyBill','energyPrice','finderSolar','finderKm','finderBackup','finderPeak','sunHours','batteryDod','systemEff','solarLoss','finderBudget'];
function n(id,d){const v=Number($(id).value);return Number.isFinite(v)?v:d}
function fmt(v,dec=1){return v.toLocaleString(es?'es-ES':'en-US',{maximumFractionDigits:dec,minimumFractionDigits:dec})}
function calculate(){
 let monthly;
 if($('energyMode').value==='bill'){const euros=Math.max(0,n('monthlyBill',90));const price=Math.max(.05,n('energyPrice',.22));monthly=euros/price;}else monthly=Math.max(1,n('finderMonthly',350));
 const baseDaily=monthly/30; const solar=Math.max(0,n('finderSolar',0)); const ev=$('finderEV').checked; const km=ev?Math.max(0,n('finderKm',30)):0;
 const evDaily=km*0.18; const totalDaily=baseDaily+evDaily;
 const autonomy=Math.max(.5,n('finderBackup',1)); const usable=Math.max(.5,Math.min(.95,n('batteryDod',.9))); const eff=Math.max(.7,Math.min(.98,n('systemEff',.88)));
 const sun=Math.max(1,Math.min(8,n('sunHours',4.5))); const solarYield=Math.max(.65,Math.min(.98,n('solarLoss',.82)));
 const peak=Math.max(1,n('finderPeak',5));
 const batteryGross=(totalDaily*autonomy)/(usable*eff); const battery=Math.ceil(batteryGross/2)*2;
 const solarTotalRaw=(totalDaily/(sun*solarYield))*1.15; const solarTotal=Math.ceil(solarTotalRaw/.5)*.5; const solarAdditional=Math.max(0,solarTotal-solar);
 const inverter=Math.max(3,Math.ceil((peak*1.15)/.5)*.5); const wallbox=ev?(km>70?11:7.4):0;
 const annual=monthly*12+evDaily*365;
 const budget=$('finderBudget').value;
 const budgetText=budget==='low'?(es?'prioriza sistemas modulares y compara instalación':'prioritise modular systems and compare installation'):budget==='mid'?(es?'rango orientativo para soluciones domésticas medias':'indicative range for mid-size home systems'):(es?'permite estudiar sistemas de mayor capacidad':'allows larger-capacity systems to be considered');
 $('finderResult').innerHTML=`<div class="home-result-main"><div><span class="result-label">${es?'Consumo diario':'Daily energy use'}</span><strong>${fmt(totalDaily)} kWh</strong><small>${fmt(annual,0)} kWh/año / year</small></div><div><span class="result-label">${es?'Batería recomendada':'Recommended battery'}</span><strong>${fmt(battery,0)} kWh</strong><small>${es?'capacidad nominal aprox.':'approx. nominal capacity'}</small></div><div><span class="result-label">${es?'Solar total':'Total solar'}</span><strong>${fmt(solarTotal,1)} kWp</strong><small>${es?'objetivo de diseño':'design target'}</small></div></div><div class="home-result-grid"><div><span>${es?'Solar adicional':'Additional solar'}</span><b>${fmt(solarAdditional,1)} kWp</b></div><div><span>${es?'Inversor':'Inverter'}</span><b>${fmt(inverter,1)} kW</b></div><div><span>${es?'Wallbox':'Wallbox'}</span><b>${ev?fmt(wallbox,1)+' kW':(es?'No necesario':'Not required')}</b></div><div><span>${es?'Autonomía':'Backup autonomy'}</span><b>${fmt(autonomy,1)} ${es?'días':'days'}</b></div><div><span>${es?'Producción solar objetivo':'Target solar production'}</span><b>${fmt(totalDaily*1.15,1)} kWh/día</b></div><div><span>${es?'Presupuesto':'Budget'}</span><b>${budgetText}</b></div></div><div class="home-result-note"><strong>${es?'Siguiente paso':'Next step'}:</strong> ${es?'usa estos valores como filtro inicial y después compara baterías, inversores, paneles, wallboxes, garantías y opciones de instalación.':'use these values as an initial filter, then compare batteries, inverters, panels, wallboxes, warranties and installation options.'}</div>`;
}
function sync(){const billMode=$('energyMode').value==='bill';$('billBox').hidden=!billMode;$('kwhBox').hidden=billMode;$('finderKmBox').hidden=!$('finderEV').checked;calculate()}
$('energyMode').addEventListener('change',sync);$('finderEV').addEventListener('change',sync);ids.forEach(id=>$(id).addEventListener('input',calculate));$('homeEnergyReset').addEventListener('click',()=>{ $('energyMode').value='kwh';$('finderMonthly').value=350;$('monthlyBill').value=90;$('energyPrice').value=.22;$('finderSolar').value=0;$('finderEV').checked=false;$('finderKm').value=30;$('finderBackup').value=1;$('finderPeak').value=5;$('sunHours').value=4.5;$('batteryDod').value=.9;$('systemEff').value=.88;$('solarLoss').value=.82;$('finderBudget').value='mid';sync()});sync();
})();