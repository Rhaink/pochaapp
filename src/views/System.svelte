<script>
  import { lang, tt, UI } from '../lib/i18n.js';
  import { bought, toggleIn, resetProgress } from '../lib/store.js';
  import SectionHead from '../lib/SectionHead.svelte';

  export let data;
  $: L = $lang;
  const s = data.system;
  $: allShop = [...data.shopping.megaStones.map((x) => ({ x, mega: true })), ...data.shopping.items.map((x) => ({ x, mega: false }))];
</script>

<SectionHead
  eyebrow={{ es: 'Sistema del juego', en: 'Game system' }}
  title={{ es: 'Rango, caja, costos y compras', en: 'Rank, box, costs and shopping' }}
  sub={s.customization} />

<div class="cols">
  <!-- Ranking -->
  <div class="card pad">
    <h3>{L === 'es' ? 'Sistema de rango' : 'Ranking system'}</h3>
    <div class="tier-flow">
      {#each s.ranking.tiers as t, i}
        <span class="tier">{t}</span>{#if i < s.ranking.tiers.length - 1}<span class="arr">→</span>{/if}
      {/each}
    </div>
    <ul class="facts">
      {#each s.ranking.facts as f}<li>{tt(f, L)}</li>{/each}
    </ul>
  </div>

  <!-- Costos -->
  <div class="card pad">
    <h3>{L === 'es' ? 'Costos de personalización (VP)' : 'Customization costs (VP)'}</h3>
    <div class="costs">
      {#each s.costs as c}
        <div class="cost"><span class="cv">{c.v}</span><span class="cl">{tt(c.l, L)}</span></div>
      {/each}
    </div>
    <div class="box-facts">
      {#each s.box as b}<p>• {tt(b, L)}</p>{/each}
    </div>
  </div>

  <!-- Obtención -->
  <div class="card pad wide">
    <h3>{L === 'es' ? 'Cómo conseguir Pokémon' : 'How to get Pokémon'}</h3>
    <div class="obtain">
      {#each s.obtain as o}
        <div class="ob">
          <h4>{tt(o.title, L)}</h4>
          <ul>{#each o.steps as st}<li>{tt(st, L)}</li>{/each}</ul>
        </div>
      {/each}
    </div>
  </div>

  <!-- Lista de compras (checklist persistente) -->
  <div class="card pad wide">
    <h3>{L === 'es' ? 'Lista de compras' : 'Shopping list'} <span class="hint">· {$bought.length}/{allShop.length}</span></h3>
    <div class="shop">
      {#each allShop as it}
        <button class="shop-item" class:on={$bought.includes(it.x)} on:click={() => toggleIn(bought, it.x)}>
          <span class="box-check">{$bought.includes(it.x) ? '✓' : ''}</span>
          <span class="shop-name">{it.x}</span>
          {#if it.mega}<span class="mega-tag">Mega · 2000 VP</span>{/if}
        </button>
      {/each}
    </div>
  </div>
</div>

<button class="reset" on:click={resetProgress}>{tt(UI.labels.resetProgress, L)}</button>

<style>
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .wide { grid-column: 1 / -1; }
  .pad { padding: 20px; }
  h3 { font-size: 16px; margin-bottom: 14px; }
  .hint { color: var(--faint); font-weight: 500; font-size: 13px; }

  .tier-flow { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-bottom: 14px; }
  .tier { font-size: 12px; font-weight: 700; padding: 5px 10px; border-radius: 8px; background: var(--surface-2); border: 1px solid var(--line); }
  .arr { color: var(--faint); }
  .facts { margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 8px; }
  .facts li { font-size: 13px; line-height: 1.45; color: var(--muted); }

  .costs { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
  .cost { display: flex; align-items: center; gap: 12px; padding: 10px 12px; background: var(--surface-2); border-radius: var(--r-sm); }
  .cv { font-family: var(--font-display); font-weight: 700; color: var(--accent); min-width: 70px; }
  .cl { font-size: 13px; color: var(--muted); }
  .box-facts p { font-size: 12.5px; color: var(--muted); margin: 6px 0; line-height: 1.45; }

  .obtain { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .ob h4 { font-size: 14px; color: var(--accent); margin-bottom: 8px; }
  .ob ul { margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 7px; }
  .ob li { font-size: 13px; line-height: 1.45; color: var(--muted); }

  .shop { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 8px; }
  .shop-item { display: flex; align-items: center; gap: 10px; padding: 11px 13px; border-radius: var(--r-sm); background: var(--surface-2); border: 1px solid var(--line); color: var(--text); text-align: left; }
  .shop-item.on { opacity: .6; }
  .box-check { width: 20px; height: 20px; flex: 0 0 auto; display: grid; place-items: center; border-radius: 6px; border: 1.5px solid var(--line-hi); font-size: 12px; font-weight: 800; color: var(--green); }
  .shop-item.on .box-check { background: var(--green); color: #04120a; border-color: var(--green); }
  .shop-name { flex: 1; font-size: 13px; font-weight: 600; }
  .mega-tag { font-size: 10px; font-weight: 700; color: var(--gold); }

  .reset { margin-top: 20px; padding: 10px 16px; border-radius: 999px; background: transparent; border: 1px solid var(--line); color: var(--muted); font-size: 13px; font-weight: 600; }
  .reset:hover { border-color: var(--red); color: var(--red); }

  @media (max-width: 720px) { .cols { grid-template-columns: 1fr; } .obtain { grid-template-columns: 1fr; } }
</style>
