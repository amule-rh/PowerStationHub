(function(){
  const links=window.PSH_AFFILIATES||{};
  document.querySelectorAll('[data-affiliate-product]').forEach(el=>{
    const slug=el.getAttribute('data-affiliate-product');
    const href=links[slug];
    if(href){
      el.href=href;
      el.target='_blank';
      el.rel='sponsored noopener noreferrer';
    }
  });
})();
