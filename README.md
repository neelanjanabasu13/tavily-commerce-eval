# How well can a shopping assistant answer UK product searches using Tavily?

With Black Friday approaching, I wanted to know what happens when a shopper delegates a purchase decision to an AI assistant. If you build that assistant and use Tavily to search the web, can you tell the shopper which UK shop carries the exact item, what it costs and whether it is available? A shopper looking for a second-hand item has another requirement: the results should respect their choices about condition and brand.

This comparison looks at the evidence the assistant receives **before it writes an answer**. It covers three shopping tasks:

| Where the assistant searches | What the shopper asks it to do | What I checked |
|---|---|---|
| Across the web | Find UK offers for a specific item | Four products, each searched four ways. I checked the retailer, exact item, price and availability in each returned result. |
| On Amazon UK | Find a specific brand and pack of baby wipes | I compared the same query with the website field blank and restricted to Amazon UK. |
| On Vinted UK | Find women’s earmuffs in new condition, from any brand | I examined whether the returned links led to listings or catalogues that respected the shopper’s instructions. |

**What I found:** In the open-web test, asking Tavily to favour UK results increased the number of UK retailer product pages from 6 to 10 out of 20. The number showing a clearly attributable selling price went from 6 to 5. On Vinted, even an explicit request to keep brands open returned a single-brand catalogue first. Both findings matter for an assistant deciding what it can promise a shopper.

## Open-web test: how four questions produced 80 results

On 24 November I tested four UK price searches. I ran **each question four times**, once with each search setting. Each time Tavily returned **five links**. That makes **16 searches and 80 result appearances**. A link appearing under two settings counts twice. The earlier Vinted experiment is separate from those 80.

In **Additional fields**, **Search depth** and **Country** are two independent dropdowns. “Basic” and “Advanced” are the literal Search depth choices. Neither choice specifies a country. Selecting **United Kingdom** in Country gives UK results priority and still allows other websites. **Include domains** is a separate field for restricting the websites searched. I left it blank in all 16 searches.

**How to read the table:** Each cell shows how many of the five results clearly identified the exact product requested. Click a count to see the five original results. Read across a row to compare the settings for the same shopper question.

| Exact words typed | Basic · no country | Basic · United Kingdom | Advanced · United Kingdom | Basic · United Kingdom · 6 hours |
|---|---:|---:|---:|---:|
| Barbour Barrhill tartan earmuffs UK price | [5 of 5](runs/2026-11-24/raw/A_baseline_Q1.json) | [4 of 5](runs/2026-11-24/raw/B_uk_boost_Q1.json) | [5 of 5](runs/2026-11-24/raw/C_advanced_uk_Q1.json) | [5 of 5](runs/2026-11-24/raw/D_fresh_uk_Q1.json) |
| CeraVe Moisturising Cream 454g UK price | [3 of 5](runs/2026-11-24/raw/A_baseline_Q2.json) | [4 of 5](runs/2026-11-24/raw/B_uk_boost_Q2.json) | [5 of 5](runs/2026-11-24/raw/C_advanced_uk_Q2.json) | [5 of 5](runs/2026-11-24/raw/D_fresh_uk_Q2.json) |
| LEGO Botanicals Tiny Plants 10329 UK price | [4 of 5](runs/2026-11-24/raw/A_baseline_Q3.json) | [5 of 5](runs/2026-11-24/raw/B_uk_boost_Q3.json) | [5 of 5](runs/2026-11-24/raw/C_advanced_uk_Q3.json) | [5 of 5](runs/2026-11-24/raw/D_fresh_uk_Q3.json) |
| Dyson V8 genuine replacement battery UK price | [1 of 5](runs/2026-11-24/raw/A_baseline_Q4.json) | [1 of 5](runs/2026-11-24/raw/B_uk_boost_Q4.json) | [2 of 5](runs/2026-11-24/raw/C_advanced_uk_Q4.json) | [0 of 5](runs/2026-11-24/raw/D_fresh_uk_Q4.json) |

For example, standard search found the exact LEGO set in four results, yet none of the five links was a UK retailer’s product page. Asking Tavily to favour UK results brought back three such pages. Only John Lewis clearly tied its price to Tiny Plants (£30.99). Finding the right item, finding a UK shop and finding a price you can quote are three separate checks.

## Dyson: three UK links and one exact match

I entered `Dyson V8 genuine replacement battery UK price` with **Search depth = Basic, Country = United Kingdom, Max results = 5, Topic = General, Include answer = None, Include domains = blank**.

| Rank | Returned link | Ends in .co.uk? | Evidence for a genuine V8 battery |
|---:|---|---|---|
| 1 | Dyson.com V8 battery selector | No | Yes. The text explicitly identified genuine V8 batteries. |
| 2 | Amazon.co.uk search results | Yes | Partial. The text mentioned compatible batteries. |
| 3 | Dyson.co.uk batteries, chargers and docks | Yes | Partial. The page covered several models. |
| 4 | Dyson.co.uk battery 974815-01 | Yes | Partial. The text confirmed genuine parts but did not identify the V8. |
| 5 | Tavily.com Dyson profile | No | No. A company profile. |

Three links ended in .co.uk. One result clearly identified a genuine V8 battery. The two in the other column counts exact matches when **Search depth = Advanced** and **Country = United Kingdom**. [Original Basic results](runs/2026-11-24/raw/B_uk_boost_Q4.json)

## What I compared

On 24 November 2026 I searched for four products: Barbour Barrhill tartan earmuffs, CeraVe Moisturising Cream 454 g, LEGO Tiny Plants 10329 and a genuine Dyson V8 replacement battery. Every search already included the words **“UK price”**. I kept the wording the same and changed how Tavily searched.

| Search setting | What changed | Question this setting tests |
|---|---|---|
| Basic · no country | Used Tavily’s basic search. | What does the shopper get just by typing “UK price”? |
| Basic · United Kingdom | Kept basic search and also set the country to the United Kingdom. | Does giving Tavily the country separately help it find UK shops? |
| Advanced · United Kingdom | Kept the UK preference and switched to Tavily’s advanced search. | Does spending more search credits improve the results? |
| Basic · United Kingdom · 6 hours | Kept basic search and the UK preference, and requested results no more than six hours old. | Does asking for recent information help surface prices or stock? The test did not independently verify the age of each page. |

Each setting returned five results for each of the four products, so **each row below describes 20 results**. Across the four settings I reviewed 80 results, including pages that appeared more than once. I read the title, link and text Tavily returned, which is what a shopping assistant would have available before opening a retailer’s site.

## What the shopper could learn

| Search setting | UK shop pages for an individual product | Matched the exact product requested | Showed a clear selling price for the item displayed | Stated stock or dispatch information |
|---|---:|---:|---:|---:|
| Basic · no country | 6 | 13 | 6 | 2 |
| Basic · United Kingdom | 10 | 14 | 5 | 1 |
| Advanced · United Kingdom | 12 | 17 | 11 | 2 |
| Basic · United Kingdom · 6 hours | 12 | 15 | 7 | 2 |

Read the columns separately. For example, LEGO’s US shop matched the exact set and clearly showed a dollar price. It counts in both those columns, but it contributes zero to the UK shop column. A marketplace listing such as eBay is counted separately from a retailer’s own product page.

- **For finding UK shops**, specifying the country helped. UK product pages rose from 6 to 10, even though the shopper had already typed “UK price”. Clear prices fell from 6 to 5 in the same comparison.
- **For identifying products and prices**, the deeper search performed best on these four questions. It found 17 exact matches and 11 clear prices, compared with 14 and 5 when I only asked it to favour UK results.
- **For checking availability**, even the recent-results setting gave explicit stock or dispatch information in only 2 of 20 results. For the other 18, the shopper would still need to check. When stock information is missing, availability is unknown.

## Three examples from the returned text

| Shopper’s question | What Tavily returned | What the assistant can safely say |
|---|---|---|
| Is Very selling LEGO Tiny Plants for £16.99? | The page title identifies Tiny Plants 10329. The text includes £16.99 beside “Save for later LEGO Speed Champions Dodge Challenger SRT Hellcat Sports Car 77237.” | Very has a page for Tiny Plants. The returned text leaves it unclear which set costs £16.99. [Very](https://www.very.co.uk/lego-botanical-tiny-plants-flowers-set-10329/1600952505.prd) |
| What does Millbry Hill charge for the Barbour earmuffs? | “Classic Tartan RRP £34.96” | £34.96 is the recommended retail price. The shop’s selling price is unknown from this result. [Millbry Hill](https://millbryhill.co.uk/products/barbour-ladies-barrhill-tartan-ear-muffs-green-check) |
| Is this eBay battery a genuine Dyson part? | “These are new 4000 mAH batteries compatible with Dyson V7 and V8 models where the batteries are secured by screws.” | The seller says the battery fits certain V8 models. Who manufactured it remains unclear. [eBay](https://www.ebay.co.uk/itm/305371741036) |

## What each setting cost and how long it took

| Search setting | Tavily credits used for all four searches | Average wait for one complete response | Average amount of text returned per search, in estimated tokens |
|---|---:|---:|---:|
| Basic · no country | 4 | 1.11 seconds | 1,627 |
| Basic · United Kingdom | 4 | 1.29 seconds | 1,522 |
| Advanced · United Kingdom | 8 | 3.24 seconds | 1,108 |
| Basic · United Kingdom · 6 hours | 4 | 1.90 seconds | 486 |

Credits are Tavily’s units for charging for searches. The wait includes downloading the results. A token is a small piece of text processed by an AI model. To compare response sizes, I counted all the characters Tavily sent back and divided by four. These estimates describe how much text an assistant would have to read.

## The original Vinted search

> women earmufs new with tags or new without tags

The shopper wanted women’s earmuffs in either of two conditions and left the brand open. In the original test, I saw the first Vinted page open with **SHEIN** selected. The original response and filter state were not saved together, so the record cannot establish where that filter came from.

A recorded follow-up on 23 November used basic search restricted to Vinted UK and explicitly said “keep brand open, don't send me to a single-brand page”. Its first link led to a [New Era earmuffs catalogue](https://www.vinted.co.uk/catalog/2935-klapky-na-usi/brand/232-new-era). The second led to a [general earmuffs catalogue](https://www.vinted.co.uk/catalog/2935-nauszniki). Here the unwanted brand is visible in the first URL itself.

## Amazon UK: what happens when I restrict the website?

I chose baby wipes because Amazon identifies them among its frequently purchased UK essentials. The published figures cover groceries and household essentials together; they do not establish a single top-selling category. [Amazon’s UK sales figures](https://www.aboutamazon.co.uk/news/retail/amazon-uk-grocery-sales-growth-essentials)

I entered `WaterWipes Original baby wipes 12 packs of 60 UK price` twice in the Tavily Playground. Both times I used **Search depth = Advanced, Topic = General, Country = None, Max results = 10, Chunks per source = 3, Include answer = None**. This separate pair used ten links per search. I changed only **Include domains**.

| What changed | Include domains left blank | Include domains = amazon.co.uk |
|---|---|---|
| Amazon UK links returned | 0 of 10 | 10 of 10 |
| First result | Mediq UK listed £2.15 ex VAT beside a single pack and a 12-pack case. The case price was unclear. | An Amazon search page for “Water Wipes 12 Pack”. |
| What price could the assistant quote? | PriceRunner reported £21.59 for 12 × 60. This was a comparison-site claim. | None of the ten excerpts gave a £ amount. |
| Did the site restriction enforce the pack and brand? | Results included a single pack and a different WaterWipes range. | Rank 3 linked to WaterWipes 12 × 60. Rank 4 was Amazon’s own brand and rank 5 was WaterWipes 4 × 60. |

The website restriction worked on all ten links in this pair. To recommend an offer, an assistant would still need to check the selected pack and its current price. [Amazon rank 3](https://www.amazon.co.uk/WaterWipes-Wipes-Sensitive-Newborn-Packaging/dp/B008J2MZL8) · [Open-web price comparison at rank 5](https://www.pricerunner.com/pl/350-3321507222/Baby-Care/WaterWipes-baby-720-count-60s-x-12-99.9-for-sensitive-skin-Compare-Prices)

Playground request IDs: `16943416-86f9-4bf7-839c-77018133b24c` (open web) and `202baf11-03ee-410d-95da-210351a079fc` (Amazon only).

## What Tavily could add

Give the assistant a product name or model, seller, price, currency and stock status, with the exact source words supporting each value. Let it return **“unknown”** for individual details. On Very’s result it could identify set 10329, link to the retailer and leave the price unknown. Include the time Tavily retrieved each page so the shopper can judge how recently the evidence was collected.

To test that change, measure how often a result gives a usable UK offer with the right item, price and availability; how often a claim disagrees with the retailer; and how often a detail is marked unknown. Also track how much text the assistant has to read for each usable answer.

## Limits and evidence

Four products searched once give a small snapshot. The test measured what the search results supported. Only the merchant can confirm the final price and availability at checkout. I did not test the proposed product changes.

[All 16 original responses](runs/2026-11-24/raw/) · [Scores for all 80 results](runs/2026-11-24/scores.json) · [Request settings, timings and credits](runs/2026-11-24/collect.json)

## Repeat the open-web comparison

1. Clone this repository and enter its directory. Use Node.js 22 or later. The runner needs no additional packages.
2. Create a local file named `.env` beside `run_eval.mjs` and set `TAVILY_API_KEY=your_key_here`. Git ignores this file.
3. Run the following command with an unused date. The script preserves existing runs. The original 16 searches used 20 Tavily credits.

```sh
node run_eval.mjs 2026-11-25
```

The script sends each of the four queries in the first results table to `POST https://api.tavily.com/search`. It uses these exact settings for every request:

```json
{"topic":"general","max_results":5,"chunks_per_source":3,"auto_parameters":false,"include_answer":false,"include_raw_content":false,"include_usage":true}
```

| Setting in the tables | Additional fields sent with each query |
|---|---|
| Basic search | `{"search_depth":"basic"}` |
| Basic, favour UK results | `{"search_depth":"basic","country":"united kingdom"}` |
| Deeper search, favour UK results | `{"search_depth":"advanced","country":"united kingdom"}` |
| Basic, favour UK results, request recent pages | `{"search_depth":"basic","country":"united kingdom","max_age_hours":6}` |

The open-web searches leave the domain unrestricted. Each returned response is saved under `runs/<date>/raw/`; `collect.json` records the full request, time taken, status, credits and response size. The script does not retry failed calls. Rankings, stock and prices can change between runs.

**To repeat the scoring**, read each result’s title, URL and returned text. Count a UK retailer product page when a UK shop links to an individual product. Count an exact match when the evidence supports the requested model, size or genuine part. Count a clear price when a selling price can be tied to the displayed item. Count stock when the result explicitly states availability or a dispatch promise. Score these independently; the script collects responses and I scored the original results.

## Repeat the Vinted UK check

In the Tavily Search Playground, start with default settings. Select **Basic** search, set **maximum results to 5**, select **no generated answer**, and restrict included domains to **vinted.co.uk**. Run each of the two searches below separately, keeping the same settings. These are the recorded Playground controls; the earlier session did not preserve a full API request for the original search.

1. Original wording, including the spelling: `women earmufs new with tags or new without tags`
2. Explicit wording: `Earmuffs listings for women, only condition New with tags or New without tags, exclude all other conditions, keep brand open, don't send me to a single-brand page`

For each of the five links, record its rank and URL. Open it and check whether it shows an individual listing, a general category or a single brand. Record any active brand and condition filters separately from the words in the search snippet. This lets another reviewer distinguish a brand already in the URL from a filter that appears only after Vinted opens the page.
