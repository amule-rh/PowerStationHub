# PowerStationHub v16 — QA

## New feature
- Home energy independence calculator added in Spanish and English.
- Routes: `/es/autonomia-energetica/` and `/en/energy-independence/`.
- Inputs: monthly kWh or bill amount + effective €/kWh, desired autonomy days, design peak-sun hours, simultaneous load, usable battery fraction, battery/inverter efficiency, solar-system performance.
- Outputs: estimated daily/annual consumption, indicative battery capacity, PV size, inverter size, autonomy, design solar production.
- Bill mode is explicitly approximate; monthly kWh remains the preferred input.
- Calculator includes an educational disclaimer and does not claim year-round grid independence.

## Navigation / SEO
- Solar autonomy link injected into desktop navigation and mobile drawer through `assets/site.js`.
- Footer includes the new route.
- Home pages include a conversion callout to the new calculator.
- Sitemap increased to 77 URLs and includes both new routes.
- hreflang/canonical/OG metadata added to both new pages.

## Validation
- Node syntax check passed for `assets/site.js` and `assets/home-autonomy.js`.
- New route files exist.
- No external affiliate URLs were invented.
