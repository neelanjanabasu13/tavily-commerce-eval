# Tavily UK shopping discovery

Can existing Tavily Search parameters support an AI shopping discovery agent, or is the gap structured offer extraction?

**For LEGO 10329, the UK boost moved UK retailer product pages from 0/5 to 3/5. Only John Lewis supplied a price clearly attributable to the set among those three.** Across all four shopping queries, the advanced and six-hour arms tied for the most UK retailer product pages. Source retrieval and assigning the right price to an item are separate decisions.

| Arm | Credits/4Q | Avg latency | Avg payload tokens | UK retailer PDPs (of 20) | Exact product + variant | Clean price | Stock shown |
|---|---:|---:|---:|---:|---:|---:|---:|
| A_baseline | 4 | 1.11 s | 1627 | 6 | 13 | 6 | 2 |
| B_uk_boost | 4 | 1.29 s | 1522 | 10 | 14 | 5 | 1 |
| C_advanced_uk | 8 | 3.24 s | 1108 | 12 | 17 | 11 | 2 |
| D_fresh_uk | 4 | 1.90 s | 486 | 12 | 15 | 7 | 2 |

Each quality column is an independent count across 20 ranked results. Clean price can include a foreign price or a marketplace listing. Stock shown means explicit availability, including a dated dispatch promise. Latency includes downloading the response. Token estimates cover the whole response body.

## Three failures an agent would have to handle

- Very names a different LEGO set beside the sale price. Assigning £16.99 to Tiny Plants would require more evidence. “Save for later LEGO Speed Champions Dodge Challenger SRT Hellcat Sports Car 77237.” [Source](https://www.very.co.uk/lego-botanical-tiny-plants-flowers-set-10329/1600952505.prd) · B_uk_boost, Q3, rank 2
- Millbry Hill gives the recommended retail price. The selling price is unknown. “Classic Tartan RRP £34.96” [Source](https://millbryhill.co.uk/products/barbour-ladies-barrhill-tartan-ear-muffs-green-check) · D_fresh_uk, Q1, rank 1
- The eBay seller claims compatibility. The snippet leaves genuine Dyson manufacture unverified. “These are new 4000 mAH batteries compatible with Dyson V7 and V8 models where the batteries are secured by screws.” [Source](https://www.ebay.co.uk/itm/305371741036) · D_fresh_uk, Q4, rank 1

## Reproduce and audit

Use Node 22+ and place `TAVILY_API_KEY` in the ignored local `.env`. Run `node run_eval.mjs YYYY-MM-DD` with an unused run date. The default is 2026-11-24. The script makes 16 requests without retries and preserves HTTP errors, including 434. The reported 20 credits cover the benchmark only.

Compare B with A for country, C with B for depth, and D with B for requested six-hour freshness. All four queries already include “UK price”. Query order is fixed; arm order rotates. [Requests and timings](runs/2026-11-24/collect.json) · [Verbatim responses](runs/2026-11-24/raw/) · [All 80 judgements](runs/2026-11-24/scores.json)

Score only the returned title, URL and content. UK requires positive storefront or market evidence. Partial includes mixed variants, refill-only packaging and unverified authenticity. Product match covers the named model and size, independently of merchant or price. Category includes comparison pages and product selectors. Marketplace takes precedence over page layout. Editorial includes company profiles and reviews. A clean price must bind to the displayed item or a clearly identified offer. Exclude shipping, RRP alone and prices for other products. Generic delivery policies do not establish stock.

## Product proposal

1. Return per-result `fetched_at` so an agent can show when the source was retrieved.
2. Offer optional fields for product ID, variant, seller, price, currency and availability, each linked to its source excerpt.
3. Emit `"unknown"` when the excerpt cannot resolve a field. For the Very result, retain set 10329 and abstain on its price.

Measure useful-offer rate (exact UK offers with supported price and availability / results), hard-fail rate (asserted offers contradicted by merchant evidence / asserted offers), abstention rate (required fields marked unknown / required fields), and total payload tokens per usable answer.

Four queries on one date provide a directional diagnostic. One reviewer's judgements, repeated URLs and live ranking variation limit generalisation. A successful freshness request does not independently verify page age. Retrieval time also differs from a merchant's last price update. Live checkout price and availability remain merchant-owned.
