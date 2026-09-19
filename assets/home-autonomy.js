(function(){
  const root=document.querySelector('[data-home-autonomy]');
  if(!root)return;
  const es=(document.documentElement.lang||'es').startsWith('es');
  const $=id=>document.getElementById(id);
  const mode=$('energyMode'), kwh=$('monthlyKwh'), bill=$('monthlyBill'), price=$('energyPrice'), days=$('backupDays'), sun=$('sunHours'), peak=$('peakLoad'), dod=$('batteryDod'), eff=$('systemEff'), solarLoss=$('solarLoss'), result=$('homeEnergyResult');
  const billBox=$('billBox'), kwhBox=$('kwhBox');
  function n(v,d){const x=Number(v);return Number.isFinite(x)?x:d}
  function fmt(v,dec=1){return v.toLocaleString(es?'es-ES':'en-US',{maximumFractionDigits:dec,minimumFractionDigits:dec})}
  function calculate(){
    let monthly;
    if(mode.value==='bill'){
      const euros=Math.max(0,n(bill.value,0)); const eurKwh=Math.max(.05,n(price.value,.22));
      monthly=euros/eurKwh;
    }else monthly=Math.max(0,n(kwh.value,0));
    const daily=monthly/30;
    const autonomy=Math.max(.5,n(days.value,1));
    const usable=Math.max(.5,Math.min(.95,n(dod.value,.9)));
    const systemEfficiency=Math.max(.7,Math.min(.98,n(eff.value,.88)));
    const solarEfficiency=Math.max(.65,Math.min(.98,n(solarLoss.value,.82)));
    const peakLoad=Math.max(0,n(peak.value,5000));
    const sunHours=Math.max(1,Math.min(8,n(sun.value,4.5)));
    const batteryGross=(daily*autonomy)/(usable*systemEfficiency);
    const solarKw=(daily/(sunHours*solarEfficiency))*1.15/1000;
    const inverter=Math.max(3000,Math.ceil((peakLoad*1.15)/500)*500);
    const batteryRounded=Math.ceil(batteryGross/2)*2;
    const solarRounded=Math.ceil(solarKw/.5)*.5;
    const annual=monthly*12;
    const selfSuff=Math.min(100,Math.max(0,solarKw>0?(solarKw*sunHours*solarEfficiency*30/monthly)*100:0));
    result.innerHTML=`<div class="home-result-main"><div><span class="result-label">${es?'Consumo estimado':'Estimated consumption'}</span><strong>${fmt(daily)} kWh/día</strong><small>${fmt(annual,0)} kWh/año</small></div><div><span class="result-label">${es?'Batería recomendada':'Recommended battery'}</span><strong>${fmt(batteryRounded,0)} kWh</strong><small>${es?'capacidad nominal aproximada':'approx. nominal capacity'}</small></div><div><span class="result-label">${es?'Solar recomendado':'Recommended solar'}</span><strong>${fmt(solarRounded,1)} kWp</strong><small>${es?'potencia fotovoltaica':'PV array size'}</small></div></div><div class="home-result-grid"><div><span>${es?'Autonomía sin red':'Off-grid autonomy'}</span><b>${fmt(autonomy,1)} días</b></div><div><span>${es?'Inversor orientativo':'Indicative inverter'}</span><b>${fmt(inverter,0)} W</b></div><div><span>${es?'Horas solares de diseño':'Design peak-sun hours'}</span><b>${fmt(sunHours,1)} h</b></div><div><span>${es?'Producción solar objetivo':'Target solar production'}</span><b>${fmt(daily*1.15,1)} kWh/día</b></div></div><div class="home-result-note"><strong>${es?'Cómo leerlo':'How to read it'}:</strong> ${es?'la batería cubre el periodo de autonomía elegido y la instalación solar se dimensiona para reponer el consumo diario con margen. La red puede seguir siendo necesaria durante varios días de baja radiación.':'the battery covers the selected autonomy period and the PV array is sized to replace daily consumption with a margin. The grid may still be needed during prolonged low-solar periods.'}</div>`;
  }
  function sync(){const billMode=mode.value==='bill'; billBox.hidden=!billMode; kwhBox.hidden=billMode; calculate()}
  mode.addEventListener('change',sync); [kwh,bill,price,days,sun,peak,dod,eff,solarLoss].forEach(x=>x.addEventListener('input',calculate)); $('homeEnergyReset').addEventListener('click',()=>{mode.value='kwh';kwh.value=350;bill.value=90;price.value=.22;days.value=1;sun.value=4.5;peak.value=5000;dod.value=.9;eff.value=.88;solarLoss.value=.82;sync()}); sync();
})();
