# How well does Tavily support UK shopping searches across the open web, Amazon UK and Vinted UK?

I undertook this study ahead of Black Friday to assess whether a company building a shopping assistant could use Tavily’s search results to answer questions about products sold in the UK. I examined whether the results identified the requested product and seller and whether the accompanying text supported a claim about price or availability. I also examined how well the results respected a shopper’s requirements for brand, pack size and condition.

## How I conducted the study

I began with a few manual searches in the Tavily Playground and inspected a sample of the links myself. For example, I opened the Vinted result for women’s earmuffs to check the brand filter on the destination page. I also repeated the Dyson battery search with the country set to the United Kingdom and counted which links ended in `.co.uk`.

I used OpenAI Codex to extend those sample checks into a systematic comparison. I specified the four open-web queries, the search settings and the criteria for judging each result. Codex wrote the script, which submitted the 16 requests and saved the responses. Codex then applied the criteria to the title, URL and text of all 80 returned results and compiled the tables. My manual checks covered a sample of those judgements. I did not independently verify all 80 results against the retailers’ pages.

For the Amazon UK case study, I used Codex to run the same query twice in the Playground, changing only the website restriction. For the Vinted UK case study, I drew on my earlier manual observations and the recorded follow-up search. The results describe the information available to an assistant at the point of search. I did not test a completed purchase or verify prices at checkout.

## What did the searches show?

In the open-web comparison, selecting the United Kingdom increased the number of UK retailer product pages from six to ten out of 20. The number of results with a clearly attributable selling price fell from six to five.

In the Amazon UK comparison, restricting the search to `amazon.co.uk` increased the number of Amazon UK links from zero to ten out of ten. The results included a different brand and a different pack size, and none of the ten excerpts stated a price in pounds.

In the Vinted UK comparison, I asked for women’s earmuffs in new condition and left the choice of brand open. Even when I explicitly asked to avoid single-brand pages, the first result linked to the New Era catalogue.

## How did I compare the four open-web queries?

On 24 November I tested four UK price searches. I ran **each question four times**, once with each search setting. Each time Tavily returned **five links**. That makes **16 searches and 80 result appearances**. A link appearing under two settings counts twice. The Amazon UK and Vinted UK case studies are separate from this set of 80 results.

In **Additional fields**, **Search depth** and **Country** are two independent dropdowns. “Basic” and “Advanced” are the literal Search depth choices. Neither choice specifies a country. Selecting **United Kingdom** in Country gives UK results priority and still allows other websites. **Include domains** is a separate field for restricting the websites searched. I left it blank in all 16 searches.

Each cell shows how many of the five results clearly identified the exact product requested. Click a count to see the five original results. Read across a row to compare the settings for the same shopper question.

| Exact words typed | Basic · no country | Basic · United Kingdom | Advanced · United Kingdom | Basic · United Kingdom · 6 hours |
|---|---:|---:|---:|---:|
| Barbour Barrhill tartan earmuffs UK price | [5 of 5](runs/2026-11-24/raw/A_baseline_Q1.json) | [4 of 5](runs/2026-11-24/raw/B_uk_boost_Q1.json) | [5 of 5](runs/2026-11-24/raw/C_advanced_uk_Q1.json) | [5 of 5](runs/2026-11-24/raw/D_fresh_uk_Q1.json) |
| CeraVe Moisturising Cream 454g UK price | [3 of 5](runs/2026-11-24/raw/A_baseline_Q2.json) | [4 of 5](runs/2026-11-24/raw/B_uk_boost_Q2.json) | [5 of 5](runs/2026-11-24/raw/C_advanced_uk_Q2.json) | [5 of 5](runs/2026-11-24/raw/D_fresh_uk_Q2.json) |
| LEGO Botanicals Tiny Plants 10329 UK price | [4 of 5](runs/2026-11-24/raw/A_baseline_Q3.json) | [5 of 5](runs/2026-11-24/raw/B_uk_boost_Q3.json) | [5 of 5](runs/2026-11-24/raw/C_advanced_uk_Q3.json) | [5 of 5](runs/2026-11-24/raw/D_fresh_uk_Q3.json) |
| Dyson V8 genuine replacement battery UK price | [1 of 5](runs/2026-11-24/raw/A_baseline_Q4.json) | [1 of 5](runs/2026-11-24/raw/B_uk_boost_Q4.json) | [2 of 5](runs/2026-11-24/raw/C_advanced_uk_Q4.json) | [0 of 5](runs/2026-11-24/raw/D_fresh_uk_Q4.json) |

For example, standard search found the exact LEGO set in four results, yet none of the five links was a UK retailer’s product page. Asking Tavily to favour UK results brought back three such pages. Only John Lewis clearly tied its price to Tiny Plants (£30.99). Finding the right item, finding a UK shop and finding a price you can quote are three separate checks.

## Why did the Dyson search return three UK links but only one exact product match?

I entered `Dyson V8 genuine replacement battery UK price` with **Search depth = Basic, Country = United Kingdom, Max results = 5, Topic = General, Include answer = None, Include domains = blank**.

| Rank | Returned link | Ends in .co.uk? | Evidence for a genuine V8 battery |
|---:|---|---|---|
| 1 | Dyson.com V8 battery selector | No | The text explicitly identified genuine V8 batteries. |
| 2 | Amazon.co.uk search results | Yes | The text mentioned compatible batteries. |
| 3 | Dyson.co.uk batteries, chargers and docks | Yes | The page covered several models. |
| 4 | Dyson.co.uk battery 974815-01 | Yes | The text confirmed genuine parts but did not identify the V8. |
| 5 | Tavily.com Dyson profile | No | The result described Dyson as a company. |

Three links ended in .co.uk. One result clearly identified a genuine V8 battery. The count of two refers to the number of exact product matches when **Search depth = Advanced** and **Country = United Kingdom**. [Original Basic results](runs/2026-11-24/raw/B_uk_boost_Q4.json)

## Which settings did I change?

On 24 November 2026 I searched for four products: Barbour Barrhill tartan earmuffs, CeraVe Moisturising Cream 454 g, LEGO Tiny Plants 10329 and a genuine Dyson V8 replacement battery. Every search already included the words **“UK price”**. I kept the wording the same and changed how Tavily searched.

| Search setting | What changed | Question this setting tests |
|---|---|---|
| Basic · no country | I used Tavily’s basic search. | What does the shopper get just by typing “UK price”? |
| Basic · United Kingdom | I kept basic search and also set the country to the United Kingdom. | Does giving Tavily the country separately help it find UK shops? |
| Advanced · United Kingdom | I kept the UK preference and switched to Tavily’s advanced search. | Does spending more search credits improve the results? |
| Basic · United Kingdom · 6 hours | I kept basic search and the UK preference, and requested results no more than six hours old. | Does asking for recent information help surface prices or stock? The test did not independently verify the age of each page. |

Each setting returned five results for each of the four products, so **each row below describes 20 results**. I used Codex to assess each result from its title, link and returned text. These are the materials a shopping assistant can inspect before opening the retailer’s site.

## What information could a shopper obtain from the results?

| Search setting | UK shop pages for an individual product | Matched the exact product requested | Showed a clear selling price for the item displayed | Stated stock or dispatch information |
|---|---:|---:|---:|---:|
| Basic · no country | 6 | 13 | 6 | 2 |
| Basic · United Kingdom | 10 | 14 | 5 | 1 |
| Advanced · United Kingdom | 12 | 17 | 11 | 2 |
| Basic · United Kingdom · 6 hours | 12 | 15 | 7 | 2 |

Read the columns separately. For example, LEGO’s US shop matched the exact set and clearly showed a dollar price. It counts in both those columns, but it contributes zero to the UK shop column. A marketplace listing such as eBay is counted separately from a retailer’s own product page.

The number of UK retailer product pages rose from 6 to 10, even though the shopper had already typed “UK price”. Clear prices fell from 6 to 5 in the same comparison.
With the country set to the United Kingdom, Advanced search returned 17 exact matches and 11 clear prices, compared with 14 and 5 when I only asked it to favour UK results.
When I requested results from the previous six hours, Tavily returned explicit stock or dispatch information in only 2 of 20 results. For the other 18, the shopper would still need to check. When stock information is missing, availability is unknown.

## How did I interpret ambiguous product information?

| Shopper’s question | What Tavily returned | What the assistant can safely say |
|---|---|---|
| Is Very selling LEGO Tiny Plants for £16.99? | The page title identifies Tiny Plants 10329. The text includes £16.99 beside “Save for later LEGO Speed Champions Dodge Challenger SRT Hellcat Sports Car 77237.” | Very has a page for Tiny Plants. The returned text leaves it unclear which set costs £16.99. [Very](https://www.very.co.uk/lego-botanical-tiny-plants-flowers-set-10329/1600952505.prd) |
| What does Millbry Hill charge for the Barbour earmuffs? | “Classic Tartan RRP £34.96” | £34.96 is the recommended retail price. The shop’s selling price is unknown from this result. [Millbry Hill](https://millbryhill.co.uk/products/barbour-ladies-barrhill-tartan-ear-muffs-green-check) |
| Is this eBay battery a genuine Dyson part? | “These are new 4000 mAH batteries compatible with Dyson V7 and V8 models where the batteries are secured by screws.” | The seller says the battery fits certain V8 models. Who manufactured it remains unclear. [eBay](https://www.ebay.co.uk/itm/305371741036) |

## How much did the searches cost and how long did they take?

| Search setting | Tavily credits used for all four searches | Average wait for one complete response | Average amount of text returned per search, in estimated tokens |
|---|---:|---:|---:|
| Basic · no country | 4 | 1.11 seconds | 1,627 |
| Basic · United Kingdom | 4 | 1.29 seconds | 1,522 |
| Advanced · United Kingdom | 8 | 3.24 seconds | 1,108 |
| Basic · United Kingdom · 6 hours | 4 | 1.90 seconds | 486 |

Credits are Tavily’s units for charging for searches. The wait includes downloading the results. A token is a small piece of text processed by an AI model. To compare response sizes, I counted all the characters Tavily sent back and divided by four. These estimates describe how much text an assistant would have to read.

## How did restricting the search to Amazon UK affect the brand, pack size and price information returned?

I chose baby wipes because Amazon identifies them among its frequently purchased UK essentials. Amazon reports sales for groceries and household essentials together, so these figures cannot establish the sales ranking of baby wipes alone. [Amazon’s UK sales figures](https://www.aboutamazon.co.uk/news/retail/amazon-uk-grocery-sales-growth-essentials)

I entered `WaterWipes Original baby wipes 12 packs of 60 UK price` twice in the Tavily Playground. Both times I used **Search depth = Advanced, Topic = General, Country = None, Max results = 10, Chunks per source = 3, Include answer = None**. This separate pair used ten links per search. I changed only **Include domains**.

| What changed | Include domains left blank | Include domains = amazon.co.uk |
|---|---|---|
| Amazon UK links returned | 0 of 10 | 10 of 10 |
| First result | Mediq UK listed £2.15 ex VAT beside a single pack and a 12-pack case. The case price was unclear. | The first link opened an Amazon search page for “Water Wipes 12 Pack”. |
| What price could the assistant quote? | PriceRunner reported £21.59 for 12 × 60. This was a comparison-site claim. | None of the ten excerpts gave a £ amount. |
| Did the site restriction enforce the pack and brand? | Results included a single pack and a different WaterWipes range. | Rank 3 linked to WaterWipes 12 × 60. Rank 4 was Amazon’s own brand and rank 5 was WaterWipes 4 × 60. |

The website restriction worked on all ten links in this pair. To recommend an offer, an assistant would still need to check the selected pack and its current price. [Amazon rank 3](https://www.amazon.co.uk/WaterWipes-Wipes-Sensitive-Newborn-Packaging/dp/B008J2MZL8) · [Open-web price comparison at rank 5](https://www.pricerunner.com/pl/350-3321507222/Baby-Care/WaterWipes-baby-720-count-60s-x-12-99.9-for-sensitive-skin-Compare-Prices)

The Playground assigned the following request identifiers to the two searches: `16943416-86f9-4bf7-839c-77018133b24c` (open web) and `202baf11-03ee-410d-95da-210351a079fc` (Amazon only).

## Did the Vinted UK results respect the requested condition and leave the choice of brand open?

> women earmufs new with tags or new without tags

The shopper wanted women’s earmuffs in either of two conditions and left the brand open. In the original test, I saw the first Vinted page open with **SHEIN** selected. The original response and filter state were not saved together, so the record cannot establish where that filter came from.

A recorded follow-up on 23 November used basic search restricted to Vinted UK and explicitly said “keep brand open, don't send me to a single-brand page”. Its first link led to a [New Era earmuffs catalogue](https://www.vinted.co.uk/catalog/2935-klapky-na-usi/brand/232-new-era). The second led to a [general earmuffs catalogue](https://www.vinted.co.uk/catalog/2935-nauszniki). Here the unwanted brand is visible in the first URL itself.

## How could Tavily improve the evidence available to a shopping assistant?

Give the assistant a product name or model, seller, price, currency and stock status, with the exact source words supporting each value. Let it return **“unknown”** for individual details. On Very’s result it could identify set 10329, link to the retailer and leave the price unknown. Include the time Tavily retrieved each page so the shopper can judge how recently the evidence was collected.

To test that change, measure how often a result gives a usable UK offer with the right item, price and availability; how often a claim disagrees with the retailer; and how often a detail is marked unknown. Also track how much text the assistant has to read for each usable answer.

## What conclusions does the evidence support?

The open-web comparison covered four products. The Amazon UK pair tested one shopping question twice. The Vinted UK case compared wording on one shopping intent, with an incomplete record of the original search. The test measured what the search results supported. Only the merchant can confirm the final price and availability at checkout. I did not test the proposed product changes.

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

**To repeat the scoring**, read each result’s title, URL and returned text. Count a UK retailer product page when a UK shop links to an individual product. Count an exact match when the evidence supports the requested model, size or genuine part. Count a clear price when a selling price can be tied to the displayed item. Count stock when the result explicitly states availability or a dispatch promise. Apply each criterion independently. The collection script saves the responses. I used Codex to score the original results and checked a sample myself.

## Repeat the Amazon UK check

1. In the Tavily Search Playground, enter `WaterWipes Original baby wipes 12 packs of 60 UK price`.
2. Select **Search depth = Advanced**, **Country = None**, **Topic = General**, **Max results = 10**, **Chunks per source = 3** and **Include answer = None**.
3. Leave **Include domains** blank and send the request. Save the response. Enter **amazon.co.uk** in **Include domains** and send the same request again.
4. In each response, count the Amazon UK links. For each link, check the brand, the number of packs, the wipes per pack and whether the returned text gives a £ price tied to that pack.

## Repeat the Vinted UK check

In the Tavily Search Playground, start with default settings. Select **Basic** search, set **maximum results to 5**, select **no generated answer**, and restrict included domains to **vinted.co.uk**. Run each of the two searches below separately, keeping the same settings. These instructions reproduce the Playground settings I recorded. I do not have the complete API request for the original search.

1. Enter the original query exactly as written, including the spelling of “earmufs”: `women earmufs new with tags or new without tags`
2. Run a second search with the more explicit wording: `Earmuffs listings for women, only condition New with tags or New without tags, exclude all other conditions, keep brand open, don't send me to a single-brand page`

For each of the five links, record its rank and URL. Open it and check whether it shows an individual listing, a general category or a single brand. Record any active brand and condition filters separately from the words in the search snippet. This lets another reviewer distinguish a brand already in the URL from a filter that appears only after Vinted opens the page.
