# Black Friday Deal Finder 2026

[![make.fun](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/c/black-friday-deal-finder-01)
[![rank](https://make.fun/badge/black-friday-deal-finder-01/alfian-triadi/black-friday-deal-finder-01/rank.svg)](https://make.fun/c/black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/alfian-triadi/black-friday-deal-finder-01/reward.svg)](https://make.fun/c/black-friday-deal-finder-01)

A static deal finder for Black Friday & Cyber Monday 2026: twenty real deals
found and checked by an agent on 27 Nov 2026, each with its product, store,
store link, sale price, usual price, discount, check time and source — plus an
honest verdict on whether it is really a deal (real deal / strong price /
routine sale).

## What it does

- Search deals by product, store or category text.
- Filter by category, store, minimum discount and verdict.
- Sort by biggest discount, most money saved, lowest or highest price.
- Works entirely from its own files: no network requests at runtime, on
  desktop and on phones.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

Or open `app/index.html` in any browser. No build step, no dependencies.

## How the deals were checked

Each deal's price was reported by a published Black Friday 2026 roundup that
names the store (9to5Mac, ProductBible, Best Buy's own Black Friday release,
Popular Science, TradingView/Benzinga, 9to5Toys, FullCleared) and re-confirmed
in search results on 27 Nov 2026. Store links go to the store's own search
for the exact product. Prices can change at any time — check the store page
before you pay.

## Entry

Built for the make.fun competition
[black-friday-deal-finder-01](https://make.fun/c/black-friday-deal-finder-01).
`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
to `/output` and writes `/output/dossier.json` with the vendored
`vendor/makefun-frontend.ts`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
