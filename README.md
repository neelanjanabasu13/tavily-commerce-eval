# Can a shopping assistant use Tavily to find and price the right product?

## The original Vinted search

> women earmufs new with tags or new without tags

The shopper wanted women’s earmuffs in either of two conditions and left the brand open. In the original test, the shopper reported that the first Vinted page opened with **SHEIN** selected. The original response and filter state were not saved together, so the record cannot establish where that filter came from.

A recorded follow-up on 23 November used basic search restricted to Vinted UK and explicitly said “keep brand open, don't send me to a single-brand page”. Its first link led to a [New Era earmuffs catalogue](https://www.vinted.co.uk/catalog/2935-klapky-na-usi/brand/232-new-era). The second led to a [general earmuffs catalogue](https://www.vinted.co.uk/catalog/2935-nauszniki). Here the unwanted brand is visible in the first URL itself.

## How four questions produced 80 results

On 24 November we tested four UK price searches. We typed **each question four times**, once with each search setting. Each time Tavily returned **five links**. That makes **16 searches and 80 result appearances**. A link appearing under two settings counts twice. The earlier Vinted experiment is separate from those 80.

**How to read the table:** Each cell shows how many of the five results clearly identified the exact product requested. Click a count to see the five original results. Read across a row to compare the settings for the same shopper question.

| Exact words typed | Basic search | Basic, favour UK results | Deeper search, favour UK results | Basic, favour UK results, request pages from last 6 hours |
|---|---:|---:|---:|---:|
| Barbour Barrhill tartan earmuffs UK price | [5 of 5](runs/2026-11-24/raw/A_baseline_Q1.json) | [4 of 5](runs/2026-11-24/raw/B_uk_boost_Q1.json) | [5 of 5](runs/2026-11-24/raw/C_advanced_uk_Q1.json) | [5 of 5](runs/2026-11-24/raw/D_fresh_uk_Q1.json) |
| CeraVe Moisturising Cream 454g UK price | [3 of 5](runs/2026-11-24/raw/A_baseline_Q2.json) | [4 of 5](runs/2026-11-24/raw/B_uk_boost_Q2.json) | [5 of 5](runs/2026-11-24/raw/C_advanced_uk_Q2.json) | [5 of 5](runs/2026-11-24/raw/D_fresh_uk_Q2.json) |
| LEGO Botanicals Tiny Plants 10329 UK price | [4 of 5](runs/2026-11-24/raw/A_baseline_Q3.json) | [5 of 5](runs/2026-11-24/raw/B_uk_boost_Q3.json) | [5 of 5](runs/2026-11-24/raw/C_advanced_uk_Q3.json) | [5 of 5](runs/2026-11-24/raw/D_fresh_uk_Q3.json) |
| Dyson V8 genuine replacement battery UK price | [1 of 5](runs/2026-11-24/raw/A_baseline_Q4.json) | [1 of 5](runs/2026-11-24/raw/B_uk_boost_Q4.json) | [2 of 5](runs/2026-11-24/raw/C_advanced_uk_Q4.json) | [0 of 5](runs/2026-11-24/raw/D_fresh_uk_Q4.json) |

For example, standard search found the exact LEGO set in four results, yet none of the five links was a UK retailer’s product page. Asking Tavily to favour UK results brought back three such pages. Only John Lewis clearly tied its price to Tiny Plants (£30.99). Finding the right item, finding a UK shop and finding a price you can quote are three separate checks.

## What we compared

On 24 November 2026 we searched for four products: Barbour Barrhill tartan earmuffs, CeraVe Moisturising Cream 454 g, LEGO Tiny Plants 10329 and a genuine Dyson V8 replacement battery. Every search already included the words **“UK price”**. We kept the wording the same and changed how Tavily searched.

| Search setting | What changed | What the comparison tells us |
|---|---|---|
| Standard search | Used Tavily’s basic search. | What does the shopper get just by typing “UK price”? |
| Favour UK results | Kept basic search and also set the country to the United Kingdom. | Does giving Tavily the country separately help it find UK shops? |
| Search more deeply | Kept the UK preference and switched to Tavily’s advanced search. | Does spending more search credits improve the results? |
| Request recent results | Kept basic search and the UK preference, and requested results no more than six hours old. | Does asking for recent information help surface prices or stock? The test did not independently verify the age of each page. |

Each setting returned five results for each of the four products, so **each row below describes 20 results**. Across the four settings we reviewed 80 results, including pages that appeared more than once. We read the title, link and text Tavily returned, which is what a shopping assistant would have available before opening a retailer’s site.

## What the shopper could learn

| Search setting | UK shop pages for an individual product | Matched the exact product requested | Showed a clear selling price for the item displayed | Stated stock or dispatch information |
|---|---:|---:|---:|---:|
| Standard search | 6 | 13 | 6 | 2 |
| Favour UK results | 10 | 14 | 5 | 1 |
| Search more deeply | 12 | 17 | 11 | 2 |
| Request recent results | 12 | 15 | 7 | 2 |

Read the columns separately. For example, LEGO’s US shop matched the exact set and clearly showed a dollar price. It counts in both those columns, but it contributes zero to the UK shop column. A marketplace listing such as eBay is counted separately from a retailer’s own product page.

- **For finding UK shops**, specifying the country helped. UK product pages rose from 6 to 10, even though the shopper had already typed “UK price”. Clear prices fell from 6 to 5 in the same comparison.
- **For identifying products and prices**, the deeper search performed best on these four questions. It found 17 exact matches and 11 clear prices, compared with 14 and 5 when we only asked it to favour UK results.
- **For checking availability**, even the recent-results setting gave explicit stock or dispatch information in only 2 of 20 results. For the other 18, the shopper would still need to check. An omitted stock status tells us nothing about whether the item has sold out.

## Three examples from the returned text

| Shopper’s question | What Tavily returned | What the assistant can safely say |
|---|---|---|
| Is Very selling LEGO Tiny Plants for £16.99? | The page title identifies Tiny Plants 10329. The text includes £16.99 beside “Save for later LEGO Speed Champions Dodge Challenger SRT Hellcat Sports Car 77237.” | Very has a page for Tiny Plants. The returned text leaves it unclear which set costs £16.99. [Very](https://www.very.co.uk/lego-botanical-tiny-plants-flowers-set-10329/1600952505.prd) |
| What does Millbry Hill charge for the Barbour earmuffs? | “Classic Tartan RRP £34.96” | £34.96 is the recommended retail price. The shop’s selling price is unknown from this result. [Millbry Hill](https://millbryhill.co.uk/products/barbour-ladies-barrhill-tartan-ear-muffs-green-check) |
| Is this eBay battery a genuine Dyson part? | “These are new 4000 mAH batteries compatible with Dyson V7 and V8 models where the batteries are secured by screws.” | The seller says the battery fits certain V8 models. Who manufactured it remains unclear. [eBay](https://www.ebay.co.uk/itm/305371741036) |

## What each setting cost and how long it took

| Search setting | Tavily credits used for all four searches | Average wait for one complete response | Average amount of text returned per search, in estimated tokens |
|---|---:|---:|---:|
| Standard search | 4 | 1.11 seconds | 1,627 |
| Favour UK results | 4 | 1.29 seconds | 1,522 |
| Search more deeply | 8 | 3.24 seconds | 1,108 |
| Request recent results | 4 | 1.90 seconds | 486 |

Credits are Tavily’s units for charging for searches. The wait includes downloading the results. A token is a small piece of text processed by an AI model. To compare response sizes, we counted all the characters Tavily sent back and divided by four. These estimates describe how much text an assistant would have to read.

## What Tavily could add

Give the assistant a product name or model, seller, price, currency and stock status, with the exact source words supporting each value. Let it return **“unknown”** for individual details. On Very’s result it could identify set 10329, link to the retailer and leave the price unknown. Include the time Tavily retrieved each page so the shopper can judge how recently the evidence was collected.

To test that change, measure how often a result gives a usable UK offer with the right item, price and availability; how often a claim disagrees with the retailer; and how often a detail is marked unknown. Also track how much text the assistant has to read for each usable answer.

## Limits and evidence

Four products searched once give a small snapshot. The test measured what the search results supported. Only the merchant can confirm the final price and availability at checkout. We did not test the proposed product changes.

[All 16 original responses](runs/2026-11-24/raw/) · [Scores for all 80 results](runs/2026-11-24/scores.json) · [Request settings, timings and credits](runs/2026-11-24/collect.json)

To repeat the comparison, use Node.js 22 or later, put your Tavily key in the ignored local `.env` file as `TAVILY_API_KEY`, and run `node run_eval.mjs YYYY-MM-DD` with an unused date. The saved filenames use A, B, C and D for the four settings in table order, and Q1 to Q4 for the four products in the order listed above.
