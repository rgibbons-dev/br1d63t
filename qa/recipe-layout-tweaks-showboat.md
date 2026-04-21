# Recipe Layout Tweaks QA

*2026-04-21T12:35:33Z by Showboat 0.6.1*
<!-- showboat-id: 6acab4af-b9d1-4360-b76a-8105f5e5f939 -->

```bash {image}
![Recipe layout tweaks screenshot](qa/artifacts/recipe-layout-tweaks.png)
```

![Recipe layout tweaks screenshot](e573df97-2026-04-21.png)

Adjusted the recipe detail page to remove the related-image strip, enlarge the tag line, drop recipe subtitle frontmatter, and split ingredients beside the hero image with the method below.

```bash
cd /workspace && ASTRO_TELEMETRY_DISABLED=1 npm run build
```

```output

> build
> astro build

12:35:53 [content] Syncing content
12:35:53 [content] Synced content
12:35:53 [types] Generated 38ms
12:35:53 [build] output: "static"
12:35:53 [build] mode: "static"
12:35:53 [build] directory: /workspace/dist/
12:35:53 [build] Collecting build info...
12:35:53 [build] ✓ Completed in 55ms.
12:35:53 [build] Building static entrypoints...
12:35:54 [vite] ✓ built in 1.05s
12:35:54 [build] ✓ Completed in 1.09s.

 generating static routes 
12:35:54 ▶ src/pages/all-recipes.astro
12:35:54   └─ /all-recipes/index.html (+12ms) 
12:35:54 ▶ src/pages/recipes/apricot-yogurt-loaf.md
12:35:54   └─ /recipes/apricot-yogurt-loaf/index.html (+5ms) 
12:35:54 ▶ src/pages/recipes/blood-orange-cake.md
12:35:54   └─ /recipes/blood-orange-cake/index.html (+2ms) 
12:35:54 ▶ src/pages/recipes/burnt-leek-butter-beans.md
12:35:54   └─ /recipes/burnt-leek-butter-beans/index.html (+1ms) 
12:35:54 ▶ src/pages/recipes/charred-corn-salad.md
12:35:54   └─ /recipes/charred-corn-salad/index.html (+1ms) 
12:35:54 ▶ src/pages/recipes/citrus-braised-chicken.md
12:35:54   └─ /recipes/citrus-braised-chicken/index.html (+1ms) 
12:35:54 ▶ src/pages/recipes/coconut-lime-rice-noodles.md
12:35:54   └─ /recipes/coconut-lime-rice-noodles/index.html (+1ms) 
12:35:54 ▶ src/pages/recipes/mushroom-toasts.md
12:35:54   └─ /recipes/mushroom-toasts/index.html (+1ms) 
12:35:54 ▶ src/pages/recipes/roasted-plum-ripple.md
12:35:54   └─ /recipes/roasted-plum-ripple/index.html (+4ms) 
12:35:54 ▶ src/pages/recipes/soft-herb-frittata.md
12:35:54   └─ /recipes/soft-herb-frittata/index.html (+2ms) 
12:35:54 ▶ src/pages/recipes/spring-pea-risotto.md
12:35:54   └─ /recipes/spring-pea-risotto/index.html (+2ms) 
12:35:54 ▶ src/pages/recipes/squash-soup.md
12:35:54   └─ /recipes/squash-soup/index.html (+1ms) 
12:35:54 ▶ src/pages/recipes/strawberry-shortcake.md
12:35:54   └─ /recipes/strawberry-shortcake/index.html (+1ms) 
12:35:54 ▶ src/pages/recipes/tomato-galette.md
12:35:54   └─ /recipes/tomato-galette/index.html (+1ms) 
12:35:54 ▶ src/pages/tags/[tag].astro
12:35:54   ├─ /tags/appetizer/index.html (+2ms) 
12:35:54   ├─ /tags/baking/index.html (+1ms) 
12:35:54   ├─ /tags/beans/index.html (+2ms) 
12:35:54   ├─ /tags/berries/index.html (+2ms) 
12:35:54   ├─ /tags/breakfast/index.html (+1ms) 
12:35:54   ├─ /tags/chicken/index.html (+1ms) 
12:35:54   ├─ /tags/citrus/index.html (+1ms) 
12:35:54   ├─ /tags/comfort/index.html (+1ms) 
12:35:54   ├─ /tags/dessert/index.html (+1ms) 
12:35:54   ├─ /tags/fall/index.html (+1ms) 
12:35:54   ├─ /tags/fruit/index.html (+1ms) 
12:35:54   ├─ /tags/grilling/index.html (+1ms) 
12:35:54   ├─ /tags/lunch/index.html (+1ms) 
12:35:54   ├─ /tags/make-ahead/index.html (+1ms) 
12:35:54   ├─ /tags/mushrooms/index.html (+1ms) 
12:35:54   ├─ /tags/noodles/index.html (+1ms) 
12:35:54   ├─ /tags/one-pot/index.html (+1ms) 
12:35:54   ├─ /tags/picnic/index.html (+1ms) 
12:35:54   ├─ /tags/rice/index.html (+1ms) 
12:35:54   ├─ /tags/salad/index.html (+1ms) 
12:35:54   ├─ /tags/soup/index.html (+1ms) 
12:35:54   ├─ /tags/spring/index.html (+1ms) 
12:35:54   ├─ /tags/summer/index.html (+1ms) 
12:35:54   ├─ /tags/tomato/index.html (+1ms) 
12:35:54   ├─ /tags/vegetarian/index.html (+1ms) 
12:35:54   ├─ /tags/weeknight/index.html (+1ms) 
12:35:54   └─ /tags/winter/index.html (+1ms) 
12:35:54 ▶ src/pages/index.astro
12:35:54   └─ /index.html (+1ms) 
12:35:54 ✓ Completed in 92ms.

12:35:54 [build] 42 page(s) built in 1.26s
12:35:54 [build] Complete!
```
