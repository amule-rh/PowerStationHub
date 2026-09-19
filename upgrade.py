from pathlib import Path
import re, json, zipfile, shutil
root=Path('/mnt/data/psh_v13')

# CSS additions
css=root/'assets/style.css'
css.write_text(css.read_text() + '''\n/* v13 conversion + editorial depth */\n.score-badge{display:inline-flex;align-items:baseline;gap:5px;padding:9px 13px;border:1px solid #cfe8d7;background:#f5fbf7;border-radius:999px;color:#164e2a;margin:8px 0}.score-badge strong{font-size:1.35rem}.score-badge span{font-size:.75rem;color:#5c6870}.affiliate-disclosure{font-size:.8rem;color:#536069;background:#f8faf9;border:1px solid var(--line);padding:11px 13px;border-radius:10px;margin-top:12px}.buy-box{border:1px solid #bfe3ca;background:#f3fbf6;border-radius:16px;padding:18px}.buy-box .price{font-size:1.8rem}.price-update{font-size:.75rem;color:#65727a;margin:4px 0 12px}.case-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.case-grid .card{padding:16px}.case-grid strong{display:block;margin-bottom:5px}.method-box{border:1px solid var(--line);background:#fbfcfc;border-radius:16px;padding:18px;margin:20px 0}.diff-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.diff-grid .card{padding:18px}.money-score{font-weight:900;color:var(--green-dark)}@media(max-width:700px){.case-grid,.diff-grid{grid-template-columns:1fr}}\n''')

products = {}
text=(root/'assets/products.js').read_text()
# crude parse JS JSON-ish array
m=re.search(r'window\.PSH_PRODUCTS=(\[.*?\]);',text,re.S)
arr=json.loads(m.group(1))
for p in arr: products[p['slug']]=p

money_slugs=['ecoflow-delta-2','ecoflow-delta-2-max','bluetti-ac180','anker-solix-c1000','jackery-explorer-1000-v2']

def runtime(p, watts):
    return p['capacity']*0.85/watts

def money_content(p):
    slug=p['slug']; name=p['name']; cap=p['capacity']; out=p['output']; solar=p.get('solar'); weight=p.get('weight'); score=p['score']; price=p.get('observedPriceEUR')
    best=p['bestFor']
    cases=[]
    for watts,label in [(100,'cargas ligeras'),(300,'cargas medias'),(500,'cargas exigentes')]:
        if cap*0.85/watts >= 1:
            cases.append((watts,label,runtime(p,watts)))
    if slug=='ecoflow-delta-2':
        pros=['1.024 Wh y 1.800 W continuos en un formato de 12 kg.','Batería LFP y 500 W de entrada solar verificada.','Punto de equilibrio interesante para backup ligero, camper y herramientas.']
        cons=['1.024 Wh pueden quedarse cortos para varios días de cargas domésticas continuas.','No es la opción más ligera para camping frecuente.']
        audience='Usuarios que necesitan una estación de alrededor de 1 kWh con potencia AC alta para backup, camper o herramientas.'
        no='Quien necesita alimentar cargas domésticas durante varios días sin recarga o busca el mínimo peso posible.'
        alt=['BLUETTI AC180','Jackery Explorer 1000 v2']
    elif slug=='ecoflow-delta-2-max':
        pros=['2.048 Wh y 2.400 W continuos: orientada a mayor autonomía y cargas simultáneas.','1.000 W de entrada solar verificada.','LFP y 23 kg para una estación de esta capacidad.']
        cons=['23 kg reduce la portabilidad frente a modelos de 1 kWh.','Para consumos pequeños puede ser más capacidad de la necesaria.']
        audience='Backup doméstico, camper con varios consumidores y usuarios que quieren superar claramente 1 kWh de capacidad.'
        no='Quien prioriza llevar la estación a pie con frecuencia o solo necesita alimentar electrónica ligera.'
        alt=['BLUETTI Elite 200 V2','EcoFlow DELTA 2']
    elif slug=='bluetti-ac180':
        pros=['1.152 Wh y 1.800 W continuos.','500 W de entrada solar.','16 kg y formato orientado a camper, backup y herramientas.']
        cons=['Pesa más que algunas alternativas cercanas de 1 kWh.','La capacidad sigue siendo limitada para backup doméstico de varios días.']
        audience='Usuarios que quieren aproximadamente 1,15 kWh y 1.800 W en una estación polivalente para casa, camper o herramientas.'
        no='Quien necesita más de 2 kWh o prioriza una estación especialmente compacta.'
        alt=['EcoFlow DELTA 2','Anker SOLIX C1000']
    elif slug=='anker-solix-c1000':
        pros=['1.056 Wh y 1.800 W continuos.','Hasta 600 W de entrada solar según ficha del producto.','12,9 kg: relación capacidad/peso competitiva.']
        cons=['La capacidad alrededor de 1 kWh limita la autonomía con cargas altas.','Conviene comprobar conectores y configuración exacta del mercado antes de comprar.']
        audience='Camping, camper y backup doméstico ligero donde importan tanto la potencia como el peso.'
        no='Quien necesita más de 2 kWh de autonomía sin recargar.'
        alt=['BLUETTI AC180','EcoFlow DELTA 2']
    else:
        pros=['1.070 Wh y 1.500 W continuos.','10,8 kg: muy transportable para su capacidad.','LFP y 400 W de entrada solar indicada en nuestra base de datos.']
        cons=['1.500 W continuos dejan menos margen que las estaciones de 1.800–2.600 W.','Para backup doméstico prolongado conviene valorar 2 kWh o más.']
        audience='Camping y camper donde el peso es importante y las cargas no exigen más de 1.500 W continuos.'
        no='Quien necesita alimentar herramientas o cargas de alta potencia de forma frecuente.'
        alt=['EcoFlow DELTA 2','Anker SOLIX C1000']
    case_html=''.join(f'<div class="card"><strong>{w} W · {label}</strong><p>Autonomía teórica orientativa: <b>{h:.1f} h</b></p><small>Estimación con 85 % de energía útil; el consumo real depende de pérdidas y ciclos.</small></div>' for w,label,h in cases)
    pros_html=''.join(f'<li>{x}</li>' for x in pros); cons_html=''.join(f'<li>{x}</li>' for x in cons)
    alt_html=''.join(f'<a class="related-product" href="/es/productos/{next((s for s,p2 in products.items() if p2["name"]==a), a.lower().replace(" ","-"))}/"><strong>{a}</strong></a>' for a in alt)
    price_html=f'<div class="price">€{price}</div><div class="price-update">Precio observado: {p.get("priceChecked") or "—"}</div>' if price else '<div class="price">Consultar</div><div class="price-update">Precio no verificado en esta revisión</div>'
    return f'''<div class="score-badge"><strong>{score:.1f}/100</strong><span>PowerStationHub Score</span></div>
<div class="method-box"><strong>¿Cómo leer este score?</strong><p>Es una métrica editorial propia basada en capacidad, potencia, portabilidad, entrada solar y utilidad general. No es una valoración de usuarios ni una garantía de compra. Consulta la metodología antes de comparar puntuaciones.</p></div>
<h2>¿Para quién es?</h2><p>{audience}</p><h2>¿Para quién no es?</h2><p>{no}</p>
<h2>Casos de uso con números</h2><div class="case-grid">{case_html}</div>
<h2>Pros y contras</h2><div class="proscons"><div class="card"><h3>Puntos fuertes</h3><ul>{pros_html}</ul></div><div class="card"><h3>Limitaciones</h3><ul>{cons_html}</ul></div></div>
<h2>Alternativas directas</h2><div class="related-products">{alt_html}</div>''', price_html

for slug in money_slugs:
    path=root/f'es/productos/{slug}/index.html'
    html=path.read_text()
    p=products[slug]
    content,price_html=money_content(p)
    # score after lead if absent
    marker='<p class="lead">'
    pos=html.find('</p>', html.find(marker))
    if pos!=-1:
        pos+=4
        html=html[:pos]+content+html[pos:]
    # replace primary CTA and sidebar price block
    source=p['source']
    html=html.replace('Ver producto oficial ↗','Ver precio actual ↗')
    html=html.replace('Ver precio / producto oficial ↗','Ver precio actual ↗')
    # replace price contents only in the price card's first occurrence
    html=re.sub(r'<div class="price">€[^<]+</div><div class="price-note">Tienda oficial europea · comprobado [^<]+</div>', price_html, html, count=1)
    # if no observed price
    html=html.replace('<div class="price">Consultar</div><div class="price-note">Precio no verificado</div>', price_html)
    # add disclosure near first product actions
    actions_end=html.find('</div>', html.find('<div class="product-actions">'))
    if actions_end!=-1:
        actions_end+=6
        disclosure='<p class="affiliate-disclosure">Enlace comercial: actualmente te dirigimos a la tienda oficial. Los enlaces de afiliado se activarán cuando PowerStationHub tenga aprobada la cuenta correspondiente; no usamos enlaces de tracking inventados.</p>'
        html=html[:actions_end]+disclosure+html[actions_end:]
    # methodology link near source box
    html=html.replace('<div class="eyebrow">Fuente primaria</div>','<div class="eyebrow">Fuente primaria · datos técnicos</div>')
    path.write_text(html)

# Add a dedicated methodology page and improve affiliate page
for lang,prefix in [('es','es'),('en','en')]:
    if lang=='es':
        title='Cómo elegimos y calculamos el PowerStationHub Score'
        body='''<h1>Cómo elegimos y calculamos el PowerStationHub Score</h1><p class="lead">Metodología editorial para comparar estaciones de energía sin convertir una puntuación en una promesa de compra.</p><div class="method-grid"><div class="card"><h2>Capacidad</h2><p>Wh disponibles para estimar autonomía y tamaño de batería.</p></div><div class="card"><h2>Potencia</h2><p>W continuos y, cuando está verificado, potencia pico.</p></div><div class="card"><h2>Portabilidad</h2><p>Peso y equilibrio entre capacidad y transporte.</p></div><div class="card"><h2>Solar</h2><p>Entrada solar máxima indicada por el fabricante.</p></div></div><div class="method-box"><h2>Qué no hacemos</h2><ul><li>No inventamos reviews ni valoraciones de usuarios.</li><li>No asignamos una puntuación por popularidad.</li><li>No tratamos el precio como permanente.</li><li>No presentamos una estimación de autonomía como garantía.</li></ul></div><h2>Fecha de revisión</h2><p>Las fichas muestran la fecha de revisión editorial y, cuando existe, la fecha del precio observado.</p>'''
    else:
        title='How PowerStationHub selects products and calculates its Score'
        body='''<h1>How PowerStationHub selects products and calculates its Score</h1><p class="lead">Editorial methodology for comparing portable power stations without turning a score into a purchase promise.</p><div class="method-grid"><div class="card"><h2>Capacity</h2><p>Wh used to estimate runtime and battery size.</p></div><div class="card"><h2>Output</h2><p>Continuous W and, when verified, peak output.</p></div><div class="card"><h2>Portability</h2><p>Weight and the balance between capacity and transport.</p></div><div class="card"><h2>Solar</h2><p>Maximum solar input stated by the manufacturer.</p></div></div><div class="method-box"><h2>What we don't do</h2><ul><li>We don't invent reviews or user ratings.</li><li>We don't score popularity.</li><li>We don't treat price as permanent.</li><li>We don't present runtime estimates as guarantees.</li></ul></div><h2>Review date</h2><p>Product pages show the editorial review date and, where available, the observed price date.</p>'''
    out=root/f'{prefix}/metodologia/index.html'
    out.parent.mkdir(parents=True,exist_ok=True)
    langattr='es' if lang=='es' else 'en'
    out.write_text(f'''<!doctype html><html lang="{langattr}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="index,follow"><title>{title} | PowerStationHub</title><link rel="canonical" href="https://power-station-hub.vercel.app/{prefix}/metodologia/"><link rel="stylesheet" href="/assets/style.css"></head><body><header class="site-header"><div class="container nav"><a class="brand" href="/{prefix}/"><img src="/assets/logo.png" alt="PowerStationHub logo"><span>PowerStation<b>Hub</b></span></a><nav class="menu"><a href="/{prefix}/">Inicio</a><a href="/{prefix}/productos/">Productos</a><a href="/{prefix}/mejores-2026/">Mejores 2026</a><a href="/{prefix}/comparativas/">Comparativas</a><a href="/{prefix}/calculadora-potencia/">Calculadora</a></nav></div></header><main><section class="page"><div class="container article">{body}</div></section></main><footer class="footer"><div class="container fine">© <span data-year></span> PowerStationHub · Datos técnicos con fuentes oficiales.</div></footer><script src="/assets/site.js"></script></body></html>''')

# Affiliate page explain status + official programs
path=root/'es/afiliados/index.html'
html=path.read_text()
insert='''<div class="method-box"><h2>Estado de los enlaces comerciales</h2><p>PowerStationHub todavía no inserta identificadores de afiliado inventados. Mientras se tramitan las cuentas, los CTA llevan a las tiendas oficiales de cada fabricante. Cuando se aprueben los programas, sustituiremos esos destinos por enlaces de tracking reales sin cambiar la estructura de las fichas.</p><ul><li><a href="https://es.ecoflow.com/pages/affiliate" target="_blank" rel="noopener noreferrer">EcoFlow Affiliate ↗</a></li><li><a href="https://eu.jackery.com/pages/affiliate-program" target="_blank" rel="noopener noreferrer">Jackery Affiliate EU ↗</a></li><li><a href="https://www.bluettipower.com/pages/affiliate-program" target="_blank" rel="noopener noreferrer">BLUETTI Affiliate ↗</a></li></ul></div>'''
if 'Estado de los enlaces comerciales' not in html:
    html=html.replace('</div></section>',insert+'</div></section>',1)
path.write_text(html)

# Add methodology links to about/footer-ish pages where easy
for pth in root.glob('es/**/index.html'):
    h=pth.read_text()
    if 'metodologia' not in h and 'class="footer"' in h:
        h=h.replace('PowerStationHub · Datos técnicos con fuentes oficiales.','PowerStationHub · <a href="/es/metodologia/">Metodología</a> · Datos técnicos con fuentes oficiales.')
        pth.write_text(h)
for pth in root.glob('en/**/index.html'):
    h=pth.read_text()
    if 'methodology' not in h and 'class="footer"' in h:
        h=h.replace('PowerStationHub · Datos técnicos con fuentes oficiales.','PowerStationHub · <a href="/en/methodology/">Methodology</a> · Data from official sources.')
        pth.write_text(h)

# English methodology path rename
src=root/'en/metodologia/index.html'
dst=root/'en/methodology/index.html'
dst.parent.mkdir(parents=True,exist_ok=True); src.rename(dst)
# Fix English nav footer link if generated as methodology path
h=dst.read_text().replace('/en/metodologia/','/en/methodology/').replace('Metodología','Methodology')
dst.write_text(h)

# README
(root/'README.md').write_text('''# PowerStationHub v13\n\nConversion-focused release.\n\n- Calculator recommendations retained and improved visually.\n- Five priority money pages expanded with score, practical cases, pros/cons, audience fit and alternatives.\n- Price observation date shown where available.\n- Editorial methodology page added.\n- Affiliate-ready CTAs: official-store fallback until real affiliate IDs/accounts are approved.\n- No fake affiliate IDs or tracking links.\n\nTo activate affiliate tracking later, replace the official product URLs in the product data/templates with the unique URLs supplied by the approved affiliate networks.\n''')

# zip
zip_path='/mnt/data/PowerStationHub-Professional-v13-Conversion-Money-Pages.zip'
with zipfile.ZipFile(zip_path,'w',zipfile.ZIP_DEFLATED) as z:
    for f in root.rglob('*'):
        if f.is_file(): z.write(f,f.relative_to(root))
print(zip_path)
print('files',sum(1 for f in root.rglob('*') if f.is_file()))
