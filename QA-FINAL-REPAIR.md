# PowerStationHub — Final Repair QA

Base: Professional v18 Integrated Home Energy Hub Affiliate US SEO Fix

## Structured data
- 30 product pages checked (15 ES + 15 EN).
- 30 valid `Product` JSON-LD objects present after repair.
- Every Product contains at least one of `offers`, `review`, or `aggregateRating`.
- No fabricated aggregate ratings were added.
- Existing verified offers were preserved.
- Editorial reviews use the visible technical strengths/limitations on the corresponding page.
- No customer/user ratings were invented.

Google requires Product snippets to include `name` and at least one of `review`, `aggregateRating`, or `offers`. Editorial pros/cons can be represented through `positiveNotes` / `negativeNotes` when they correspond to visible editorial review content.

## SEO / technical
- Canonical and hreflang tags verified on product pages.
- Missing canonical/hreflang tags on the six bilingual Home Energy long-tail HTML guides repaired.
- Missing meta descriptions on methodology pages repaired.
- Root redirect page metadata and language corrected.
- Sitemap XML parses successfully.
- Local internal links checked: 0 missing targets found.
- JSON-LD parse errors: 0.

## Affiliate safety
- Existing affiliate/official URLs preserved.
- No invented affiliate IDs, placeholder domains, or fake tracking URLs added.
- Existing pages that explicitly say pricing is unverified continue to avoid invented `Offer` prices.

## Deployment
The ZIP preserves the original static-site structure, assets, Vercel configuration, redirects, sitemap, robots.txt and bilingual ES/EN content.
