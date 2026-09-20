# PowerStationHub — v15 PRO

Professional static website for portable power stations, batteries and solar energy.

## v15 changes
- White/green electric visual system with subtle motion and energy accents.
- Professional responsive footer with ordered navigation and affiliate/legal links.
- Functional mobile navigation drawer.
- Calculator avoids double-counting the household baseline when appliances are explicitly selected.
- Calculator applies inverter-loss allowance and preserves duty-cycle modelling.
- BLUETTI AC180 startup/surge field updated to 2700 W.
- Affiliate configuration remains centralized and empty until merchant approvals/tracking URLs are available.
- Internal-link and asset QA performed before packaging.

## Deploy
Upload the contents of this repository to GitHub and connect the repository to Vercel. No build command is required.

## Important
Prices and affiliate tracking URLs are intentionally not invented. Populate `assets/affiliate-config.js` only with real approved tracking URLs.


## v17 — Home Energy Hub
Adds a home-energy vertical without changing the PowerStationHub brand: home batteries, solar + storage, EV charging, wallboxes, dynamic tariffs, V2H/V2G and smart energy management. Includes six long-tail guides, a bilingual Home Energy hub and a Home Energy Finder. Product-level home batteries/wallboxes/solar systems should be added only after current specifications and partner programmes are verified.


## v18 — Integrated Home Energy Finder
The standalone energy-independence/autonomy pages have been consolidated into `/es/home-energy-finder/` and `/en/home-energy-finder/`. The Finder now combines consumption or bill input, existing solar, EV usage, backup autonomy, battery sizing, solar sizing, inverter sizing, wallbox sizing and indicative budget. Legacy autonomy URLs redirect to the Finder.
