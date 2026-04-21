# Dist index screenshot smoke test (Playwright)

*2026-04-21T01:53:56Z by Showboat 0.6.1*
<!-- showboat-id: 7e76ac9a-5579-46d4-ab27-d65a931b579b -->

Smoke test to verify static build output and capture a screenshot of dist/index.html using Playwright.

```bash
npm run build
```

```output
npm warn Unknown env config "http-proxy". This will stop working in the next major version of npm.

> build
> astro build

01:53:59 [content] Syncing content
01:53:59 [content] Synced content
01:53:59 [types] Generated 55ms
01:53:59 [build] output: "static"
01:53:59 [build] mode: "static"
01:53:59 [build] directory: /workspace/br1d63t/dist/
01:53:59 [build] Collecting build info...
01:53:59 [build] ✓ Completed in 78ms.
01:53:59 [build] Building static entrypoints...
01:54:02 [vite] ✓ built in 2.02s
01:54:02 [build] ✓ Completed in 2.08s.

 generating static routes 
01:54:02 ▶ src/pages/all-recipes.astro
01:54:02   └─ /all-recipes/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+21ms) 
01:54:02 ▶ src/pages/recipes/blood-orange-cake.md
01:54:02   └─ /recipes/blood-orange-cake/index.html (+2ms) 
01:54:02 ▶ src/pages/recipes/charred-corn-salad.md
01:54:02   └─ /recipes/charred-corn-salad/index.html (+1ms) 
01:54:02 ▶ src/pages/recipes/citrus-braised-chicken.md
01:54:02   └─ /recipes/citrus-braised-chicken/index.html (+2ms) 
01:54:02 ▶ src/pages/recipes/mushroom-toasts.md
01:54:02   └─ /recipes/mushroom-toasts/index.html (+1ms) 
01:54:02 ▶ src/pages/recipes/spring-pea-risotto.md
01:54:02   └─ /recipes/spring-pea-risotto/index.html (+1ms) 
01:54:02 ▶ src/pages/recipes/squash-soup.md
01:54:02   └─ /recipes/squash-soup/index.html (+2ms) 
01:54:02 ▶ src/pages/recipes/strawberry-shortcake.md
01:54:02   └─ /recipes/strawberry-shortcake/index.html (+1ms) 
01:54:02 ▶ src/pages/recipes/tomato-galette.md
01:54:02   └─ /recipes/tomato-galette/index.html (+2ms) 
01:54:02 ▶ src/pages/tags/[tag].astro
Astro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
01:54:02   ├─ /tags/dessert/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+4ms) 
01:54:02   ├─ /tags/citrus/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+2ms) 
01:54:02   ├─ /tags/baking/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+3ms) 
01:54:02   ├─ /tags/winter/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+2ms) 
01:54:02   ├─ /tags/salad/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+2ms) 
01:54:02   ├─ /tags/grilling/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+2ms) 
01:54:02   ├─ /tags/picnic/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+2ms) 
01:54:02   ├─ /tags/summer/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+2ms) 
01:54:02   ├─ /tags/chicken/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+2ms) 
01:54:02   ├─ /tags/comfort/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+2ms) 
01:54:02   ├─ /tags/one-pot/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+2ms) 
01:54:02   ├─ /tags/mushrooms/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+2ms) 
01:54:02   ├─ /tags/appetizer/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+2ms) 
01:54:02   ├─ /tags/vegetarian/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+2ms) 
01:54:02   ├─ /tags/fall/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+1ms) 
01:54:02   ├─ /tags/rice/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+1ms) 
01:54:02   ├─ /tags/weeknight/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+1ms) 
01:54:02   ├─ /tags/spring/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+1ms) 
01:54:02   ├─ /tags/soup/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+3ms) 
01:54:02   ├─ /tags/make-ahead/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+1ms) 
01:54:02   ├─ /tags/berries/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+1ms) 
01:54:02   └─ /tags/tomato/index.htmlAstro.glob is deprecated and will be removed in a future major version of Astro.
Use import.meta.glob instead: https://vitejs.dev/guide/features.html#glob-import
 (+1ms) 
01:54:02 ▶ src/pages/index.astro
01:54:02   └─ /index.html (+1ms) 
01:54:02 ✓ Completed in 103ms.

01:54:02 [build] 32 page(s) built in 2.28s
01:54:02 [build] Complete!
```

```bash
npx playwright screenshot --wait-for-timeout=1500 file:///workspace/br1d63t/dist/index.html artifacts/dist-index-playwright.png
```

```output
npm warn Unknown env config "http-proxy". This will stop working in the next major version of npm.
Navigating to file:///workspace/br1d63t/dist/index.html
Waiting for timeout 1500...
Capturing screenshot into artifacts/dist-index-playwright.png
```

```bash {image}
![Built homepage screenshot](artifacts/dist-index-playwright.png)
```

