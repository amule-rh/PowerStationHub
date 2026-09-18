# PowerStationHub v12 — Money Pages + Recommendation Funnel

## Included
- Priority money pages upgraded for EcoFlow DELTA 2, DELTA 2 Max, BLUETTI AC180, Anker SOLIX C1000 and Jackery Explorer 1000 v2.
- Calculator recommendations now show real product images, specs, price when observed, product page CTA and official manufacturer link.
- If no catalog model meets both calculated thresholds, the calculator shows the closest alternatives instead of an empty result.
- Five primary indexable comparison pages upgraded with product images, practical interpretation, official sources and calculator CTA.
- Breadcrumb and Product structured data on priority product pages.
- Sitemap regenerated from actual routes.
- No affiliate links are inserted yet.

## Deployment
Replace the contents of the GitHub repository with this folder and deploy through Vercel.

Editorial update: 18 September 2026.


## v14 fixes
- Fixed blank comparator route: full HTML shell + products.js + comparator.js + site.js.
- Comparator now handles 0, 1, 2 and 3 selected products.
- Replaced the broken EcoFlow DELTA 2 image URL with the current official EcoFlow CDN image.
- Added image error fallback so broken remote images do not render as broken-image icons.
