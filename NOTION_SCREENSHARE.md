# Can a shopping agent quote this offer?

> **For LEGO 10329, the UK boost moved UK retailer product pages from 0/5 to 3/5. Only John Lewis supplied a price clearly attributable to the set among those three.**

Four UK shopping queries · 16 successful calls · 80 ranked results · 20 credits

| Arm | Credits/4Q | Avg latency | Avg payload tokens | UK retailer PDPs (of 20) | Exact product + variant | Clean price | Stock shown |
|---|---:|---:|---:|---:|---:|---:|---:|
| A_baseline | 4 | 1.11 s | 1627 | 6 | 13 | 6 | 2 |
| B_uk_boost | 4 | 1.29 s | 1522 | 10 | 14 | 5 | 1 |
| C_advanced_uk | 8 | 3.24 s | 1108 | 12 | 17 | 11 | 2 |
| D_fresh_uk | 4 | 1.90 s | 486 | 12 | 15 | 7 | 2 |

**Three decisions an agent faces**

- Very names a different LEGO set beside the sale price. Assigning £16.99 to Tiny Plants would require more evidence. “Save for later LEGO Speed Champions Dodge Challenger SRT Hellcat Sports Car 77237.” [Source](https://www.very.co.uk/lego-botanical-tiny-plants-flowers-set-10329/1600952505.prd) · B_uk_boost, Q3, rank 2
- Millbry Hill gives the recommended retail price. The selling price is unknown. “Classic Tartan RRP £34.96” [Source](https://millbryhill.co.uk/products/barbour-ladies-barrhill-tartan-ear-muffs-green-check) · D_fresh_uk, Q1, rank 1
- The eBay seller claims compatibility. The snippet leaves genuine Dyson manufacture unverified. “These are new 4000 mAH batteries compatible with Dyson V7 and V8 models where the batteries are secured by screws.” [Source](https://www.ebay.co.uk/itm/305371741036) · D_fresh_uk, Q4, rank 1

**Proposal**

1. Return per-result `fetched_at` so an agent can show when the source was retrieved.
2. Offer optional fields for product ID, variant, seller, price, currency and availability, each linked to its source excerpt.
3. Emit `"unknown"` when the excerpt cannot resolve a field. For the Very result, retain set 10329 and abstain on its price.

**Three launch metrics** · Useful-offer rate · Hard-fail rate · Abstention rate

Four queries, one date. Merchant checkout determines the payable price and availability.
