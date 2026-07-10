<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { lang, tt, UI } from '../lib/i18n.js';
  import { go } from '../lib/router.js';
  import Sprite from '../lib/Sprite.svelte';

  export let data;
  const dispatch = createEventDispatcher();
  $: L = $lang;

  let q = '';
  let input;

  // Índice de búsqueda: roster + builds + objetos + scout.
  const index = [
    ...data.roster.map((m) => ({ type: 'roster', label: m.name + (m.form ? ' ' + m.form : ''), sprite: m.sprite, route: 'roster', kw: m.name })),
    ...data.builds.map((b) => ({ type: 'build', label: b.name + (b.form ? ' ' + b.form : ''), sprite: b.sprite, route: 'builds', kw: b.name + ' ' + b.item + ' ' + b.moves.join(' ') })),
    ...data.scout.targets.map((t) => ({ type: 'scout', label: t.name, sprite: t.sprite, route: 'scout', kw: t.name })),
    ...data.shopping.items.map((i) => ({ type: 'item', label: i, sprite: 0, route: 'system', kw: i })),
    ...data.shopping.megaStones.map((i) => ({ type: 'mega', label: i, sprite: 0, route: 'system', kw: i }))
  ];

  const typeLabel = { roster: 'Roster', build: 'Build', scout: 'Scout', item: L === 'es' ? 'Objeto' : 'Item', mega: 'Mega' };

  $: results = q.trim().length < 1 ? [] : index.filter((r) => (r.label + ' ' + r.kw).toLowerCase().includes(q.toLowerCase())).slice(0, 24);

  function pick(r) {
    go(r.route);
    dispatch('close');
  }
  function onKey(e) {
    if (e.key === 'Escape') dispatch('close');
    if (e.key === 'Enter' && results[0]) pick(results[0]);
  }

  onMount(() => input?.focus());
</script>

<div class="backdrop" on:click={() => dispatch('close')} on:keydown={onKey} role="presentation">
  <div class="panel card" on:click|stopPropagation on:keydown|stopPropagation role="dialog" aria-modal="true">
    <div class="search-in">
      <span class="mag">⌕</span>
      <input bind:this={input} bind:value={q} on:keydown={onKey} placeholder={tt(UI.search, L)} />
      <button class="esc" on:click={() => dispatch('close')}>esc</button>
    </div>

    {#if q.trim().length > 0}
      <div class="results">
        {#each results as r}
          <button class="res" on:click={() => pick(r)}>
            {#if r.sprite}<Sprite id={r.sprite} size={34} alt="" />{:else}<span class="dot">◆</span>{/if}
            <span class="res-label">{r.label}</span>
            <span class="res-type">{typeLabel[r.type]}</span>
          </button>
        {:else}
          <p class="none">{tt(UI.labels.noResults, L)}</p>
        {/each}
      </div>
    {:else}
      <p class="hint">{L === 'es' ? 'Escribe para buscar en tu roster, builds y objetos.' : 'Type to search your roster, builds and items.'}</p>
    {/if}
  </div>
</div>

<style>
  .backdrop { position: fixed; inset: 0; z-index: 100; background: rgba(4, 8, 18, .6); backdrop-filter: blur(4px); display: flex; align-items: flex-start; justify-content: center; padding: 12vh 16px 16px; }
  .panel { width: 100%; max-width: 560px; overflow: hidden; }
  .search-in { display: flex; align-items: center; gap: 12px; padding: 16px 18px; border-bottom: 1px solid var(--line); }
  .mag { font-size: 20px; color: var(--faint); }
  input { flex: 1; background: none; border: none; outline: none; color: var(--text); font-size: 16px; font-family: var(--font-body); }
  .esc { font-size: 11px; color: var(--faint); background: var(--surface-2); border: 1px solid var(--line); border-radius: 6px; padding: 3px 8px; }
  .results { max-height: 52vh; overflow-y: auto; padding: 8px; }
  .res { display: flex; align-items: center; gap: 12px; width: 100%; padding: 10px 12px; border-radius: var(--r-sm); background: none; border: none; color: var(--text); text-align: left; }
  .res:hover { background: var(--surface-2); }
  .res-label { flex: 1; font-weight: 600; font-size: 14px; }
  .res-type { font-size: 11px; font-weight: 700; color: var(--accent); background: var(--accent-soft); padding: 3px 8px; border-radius: 6px; }
  .dot { width: 34px; text-align: center; color: var(--faint); }
  .none, .hint { padding: 20px; text-align: center; color: var(--muted); font-size: 13.5px; }
</style>
