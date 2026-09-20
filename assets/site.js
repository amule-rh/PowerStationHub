(function(){
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  const lang=(document.documentElement.lang||'es').startsWith('es')?'es':'en';
  const nav=document.querySelector('.site-header .nav');
  if(nav){
    const menu=nav.querySelector('.menu');
    if(menu && !menu.querySelector('[data-solar-autonomy-link]')){ const a=document.createElement('a'); a.href=lang==='es'?'/es/guias/energia-domestica/':'/en/guides/home-energy/'; a.textContent=lang==='es'?'Energía doméstica':'Home energy'; a.dataset.solarAutonomyLink='1'; menu.insertBefore(a, menu.querySelector('.lang')||null); }
    if(menu && !nav.querySelector('.mobile-menu-btn')){
      const btn=document.createElement('button');
      btn.className='mobile-menu-btn'; btn.type='button';
      btn.setAttribute('aria-label',lang==='es'?'Abrir menú':'Open menu');
      btn.setAttribute('aria-expanded','false'); btn.textContent='☰';
      const drawer=document.createElement('div'); drawer.className='mobile-drawer';
      drawer.innerHTML=menu.innerHTML; nav.append(btn,drawer);
      btn.addEventListener('click',()=>{const open=drawer.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));btn.textContent=open?'×':'☰';});
      drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{drawer.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.textContent='☰';}));
    }
  }
  document.querySelectorAll('.footer').forEach(footer=>{
    if(footer.dataset.proBuilt)return;
    footer.dataset.proBuilt='1';
    const p=lang==='es'?{
      root:'/es/',about:'/es/about/',method:'/es/metodologia/',contact:'/es/contact/',products:'/es/productos/',compare:'/es/comparador/',calc:'/es/calculadora-potencia/',comparisons:'/es/comparativas/',best:'/es/mejores-2026/',guides:'/es/guias/',homeEnergy:'/es/guias/energia-domestica/',finder:'/es/home-energy-finder/',affiliate:'/es/afiliados/',privacy:'/es/privacy/',cookies:'/es/cookies/',disclosure:'/es/afiliados/',
      aboutTitle:'Sobre PowerStationHub',aboutText:'Sobre nosotros',methodText:'Metodología',contactText:'Contacto',exploreTitle:'Explorar',infoTitle:'Información',affiliateText:'Programa de afiliados',privacyText:'Privacidad',cookiesText:'Cookies',disclosureText:'Divulgación de afiliación',desc:'Guías, comparativas y herramientas para elegir estaciones de energía, baterías y soluciones solares con datos claros.',notice:'Información técnica orientativa; comprueba siempre la fuente del fabricante.',status:'Actualizado y mantenido',home:'Inicio'
    }:{
      root:'/en/',about:'/en/about/',method:'/en/methodology/',contact:'/en/contact/',products:'/en/products/',compare:'/en/comparator/',calc:'/en/power-calculator/',comparisons:'/en/comparisons/',best:'/en/best-2026/',guides:'/en/guides/',homeEnergy:'/en/guides/home-energy/',finder:'/en/home-energy-finder/',affiliate:'/en/affiliate-disclosure/',privacy:'/en/privacy/',cookies:'/en/cookies/',disclosure:'/en/affiliate-disclosure/',
      aboutTitle:'About PowerStationHub',aboutText:'About us',methodText:'Methodology',contactText:'Contact',exploreTitle:'Explore',infoTitle:'Information',affiliateText:'Affiliate program',privacyText:'Privacy',cookiesText:'Cookies',disclosureText:'Affiliate disclosure',desc:'Guides, comparisons and tools to help you choose portable power stations, batteries and solar solutions with clear data.',notice:'Technical information is indicative; always verify the manufacturer source.',status:'Updated and maintained',home:'Home'
    };
    const root=document.createElement('div'); root.className='container';
    root.innerHTML=`<div class="footer-grid-pro">
      <div class="footer-brand-copy"><a class="brand" href="${p.root}"><img src="/assets/logo.png" alt="PowerStationHub logo"><span>PowerStation<b>Hub</b></span></a><p>${p.desc}</p></div>
      <div><div class="footer-title">${p.aboutTitle}</div><div class="footer-links"><a href="${p.about}">${p.aboutText}</a><a href="${p.method}">${p.methodText}</a><a href="${p.contact}">${p.contactText}</a></div></div>
      <div><div class="footer-title">${p.exploreTitle}</div><div class="footer-links"><a href="${p.products}">${lang==='es'?'Productos':'Products'}</a><a href="${p.compare}">${lang==='es'?'Comparador':'Comparator'}</a><a href="${p.calc}">${lang==='es'?'Calculadora':'Power calculator'}</a><a href="${p.comparisons}">${lang==='es'?'Comparativas':'Comparisons'}</a><a href="${p.best}">${lang==='es'?'Mejores 2026':'Best 2026'}</a><a href="${p.guides}">${lang==='es'?'Guías':'Guides'}</a><a href="${p.homeEnergy}">${lang==='es'?'Energía doméstica':'Home energy'}</a><a href="${p.finder}">${lang==='es'?'Home Energy Finder':'Home Energy Finder'}</a></div></div>
      <div><div class="footer-title">${p.infoTitle}</div><div class="footer-links"><a href="${p.affiliate}">${p.affiliateText}</a><a href="${p.privacy}">${p.privacyText}</a><a href="${p.cookies}">${p.cookiesText}</a><a href="${p.disclosure}">${p.disclosureText}</a></div></div>
    </div><div class="footer-bottom-pro"><div class="fine">© <span data-year></span> PowerStationHub · ${p.notice}</div><span class="footer-badge"><i></i> ${p.status}</span></div>`;
    footer.replaceChildren(root); root.querySelector('[data-year]').textContent=new Date().getFullYear();
  });
})();
