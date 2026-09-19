# PowerStationHub v15 PRO — QA report

## Repository checks
- 77 HTML pages packaged.
- 1,732 HTML href/src references scanned.
- 0 missing internal references.
- Sitemap: 75 URLs; 0 missing; 0 duplicates.
- Added missing English `/en/guides/` index.
- Added `/en/methodology/` and `/es/metodologia/` to sitemap.
- Fixed English methodology links that pointed to Spanish/non-existent routes.
- Fixed English product related links that pointed to Spanish product routes.
- JavaScript syntax checked with Node for site, calculator, catalog, comparator and products scripts.

## Calculator changes
- Keeps v14 duty-cycle model.
- Does not add the household baseline when explicit appliances are selected.
- Applies an 88% AC/inverter availability factor to the energy estimate.
- Keeps startup peak separate from daily energy calculation.
- Calculator pages load the centralized affiliate configuration before the calculator script.

## Visual changes
- White/green electric visual layer.
- Subtle energy-ring/line effects in hero sections.
- Hover elevation and CTA feedback.
- Professional four-column responsive footer.
- Mobile hamburger/drawer navigation.
- Reduced-motion support.

## Product data
- BLUETTI AC180 peak/surge field set to 2,700 W, consistent with BLUETTI's official specification page.
- Affiliate URLs remain empty until actual merchant approval/tracking URLs are supplied.
