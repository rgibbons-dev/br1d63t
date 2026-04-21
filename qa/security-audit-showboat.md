# Security Audit

*2026-04-21T13:18:48Z by Showboat 0.6.1*
<!-- showboat-id: b336aac5-c804-4dda-9b9c-c5d3a6175c3b -->

Findings first: no confirmed client-side vulnerabilities were identified in the current application code during this audit.

Residual risks and observations: src/layouts/RecipeLayout.astro uses set:html to place rendered Markdown sections back into the page. That is acceptable with repo-controlled trusted Markdown, but it becomes an XSS sink if recipe content ever becomes user-submitted or CMS-managed without sanitization.

Residual risks and observations: the site currently sets no explicit Content-Security-Policy or other hardening headers in the Astro app itself. For a static site this is often handled by the hosting layer, but it is still worth configuring there.

Residual risks and observations: recipe and season images are loaded from external Unsplash URLs, which creates third-party requests and should be considered a privacy and availability dependency rather than a direct client-side code execution issue.

Checks performed: searched for raw HTML sinks, inline scripts, dangerous DOM APIs, external network calls, and client-side storage usage; then reviewed the small interactive surface in the archive filter script and the HTML assembly path in the recipe layout.

```bash
cd /workspace && rg -n 'set:html|innerHTML|outerHTML|insertAdjacent|eval\(|new Function|document\.write|localStorage|sessionStorage|fetch\(|XMLHttpRequest|postMessage|is:inline|script' src
```

```output
src/layouts/BaseLayout.astro:6:  description = 'A quiet collection of seasonal recipes, cakes, soups, salads, and simple dinners.'
src/layouts/BaseLayout.astro:18:    <meta name="description" content={description} />
src/lib/recipes.ts:50:    description: 'Bright dinners, grain bowls, pasta, and things that feel generous without much effort.',
src/lib/recipes.ts:55:    description: 'Cakes, galettes, and loaf cakes with a little ceremony but still a relaxed hand.',
src/lib/recipes.ts:60:    description: 'Salads, soups, and grain dishes that hold well and improve as they sit.',
src/pages/all-recipes.astro:55:  <script is:inline>
src/pages/all-recipes.astro:98:  </script>
src/layouts/RecipeLayout.astro:52:<BaseLayout title={`${title} | Bridget Recipes`} description={intro}>
src/layouts/RecipeLayout.astro:77:            <section class="recipe-body prose-flow recipe-section" set:html={ingredientsSection.html} />
src/layouts/RecipeLayout.astro:82:          {preamble && <div class="recipe-body prose-flow" set:html={preamble} />}
src/layouts/RecipeLayout.astro:84:            <section class="recipe-body prose-flow recipe-section" set:html={instructionsSection.html} />
src/layouts/RecipeLayout.astro:87:            <section class="recipe-body prose-flow recipe-section" set:html={section.html} />
```

```bash
cd /workspace && sed -n '55,98p' src/pages/all-recipes.astro && printf '\n---\n' && sed -n '70,90p' src/layouts/RecipeLayout.astro && printf '\n---\n' && rg -n 'https://images.unsplash.com' src/pages/recipes
```

```output
  <script is:inline>
    const panel = document.getElementById('recipe-filter-panel');
    const form = document.getElementById('recipe-filter-form');
    const clearButton = document.getElementById('filter-clear');
    const countLabel = document.getElementById('filter-count');
    const cards = Array.from(document.querySelectorAll('.filterable-recipe'));
    const params = new URLSearchParams(window.location.search);
    const selected = new Set(params.getAll('tags'));

    const update = () => {
      const active = Array.from(form.querySelectorAll('input[name="tags"]:checked')).map((input) => input.value);
      const activeSet = new Set(active);

      cards.forEach((card) => {
        const tags = (card.getAttribute('data-tags') || '').split(' ').filter(Boolean);
        const visible = activeSet.size === 0 || active.every((tag) => tags.includes(tag));
        card.hidden = !visible;
      });

      countLabel.textContent = `${active.length} selected`;

      const nextParams = new URLSearchParams();
      active.forEach((tag) => nextParams.append('tags', tag));
      const next = nextParams.toString();
      const url = next ? `${window.location.pathname}?${next}` : window.location.pathname;
      window.history.replaceState({}, '', url);
    };

    form.querySelectorAll('input[name="tags"]').forEach((input) => {
      input.checked = selected.has(input.value);
      input.addEventListener('change', update);
    });

    clearButton.addEventListener('click', () => {
      form.reset();
      update();
    });

    if (selected.size > 0) {
      panel.open = true;
    }

    update();
  </script>

---
      <section class="recipe-shell">
        <figure class="recipe-figure">
          <img class="recipe-hero" src={image} alt={imageAlt} />
        </figure>

        {ingredientsSection && (
          <div class="recipe-sidebar">
            <section class="recipe-body prose-flow recipe-section" set:html={ingredientsSection.html} />
          </div>
        )}

        <div class="recipe-main">
          {preamble && <div class="recipe-body prose-flow" set:html={preamble} />}
          {instructionsSection && (
            <section class="recipe-body prose-flow recipe-section" set:html={instructionsSection.html} />
          )}
          {remainingSections.map((section) => (
            <section class="recipe-body prose-flow recipe-section" set:html={section.html} />
          ))}
        </div>
      </section>

---
src/pages/recipes/strawberry-shortcake.md:10:image: https://images.unsplash.com/photo-1464306076886-da185f6a9d05?auto=format&fit=crop&w=1400&q=80
src/pages/recipes/spring-pea-risotto.md:10:image: https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1400&q=80
src/pages/recipes/citrus-braised-chicken.md:11:image: https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=1400&q=80
src/pages/recipes/coconut-lime-rice-noodles.md:10:image: https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=1400&q=80
src/pages/recipes/apricot-yogurt-loaf.md:10:image: https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=1400&q=80
src/pages/recipes/burnt-leek-butter-beans.md:11:image: https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=80
src/pages/recipes/roasted-plum-ripple.md:10:image: https://images.unsplash.com/photo-1464306076886-da185f6a9d05?auto=format&fit=crop&w=1400&q=80
src/pages/recipes/soft-herb-frittata.md:10:image: https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=1400&q=80
src/pages/recipes/squash-soup.md:11:image: https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1400&q=80
src/pages/recipes/tomato-galette.md:10:image: https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1400&q=80
src/pages/recipes/mushroom-toasts.md:11:image: https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=80
src/pages/recipes/blood-orange-cake.md:10:image: https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1400&q=80
src/pages/recipes/charred-corn-salad.md:10:image: https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1400&q=80
```

```bash
cd /workspace && npm audit --production
```

```output
npm warn config production Use `--omit=dev` instead.
npm warn audit request to https://registry.npmjs.org/-/npm/v1/security/audits/quick failed, reason: getaddrinfo EAI_AGAIN registry.npmjs.org
undefined
npm error audit endpoint returned an error
npm error Log files were not written due to an error writing to the directory: /root/.npm/_logs
npm error You can rerun the command with `--loglevel=verbose` to see the logs in your terminal
```

Dependency audit gap: npm audit could not complete in this container because outbound access to the npm audit endpoint is blocked, so the review above is a static code audit plus local dependency inspection rather than a live registry-backed package audit.
