<script>
  import { lang, tt, UI } from '../lib/i18n.js';
  import { trained, toggleIn } from '../lib/store.js';
  import Sprite from '../lib/Sprite.svelte';
  import SectionHead from '../lib/SectionHead.svelte';

  export let data;
  $: L = $lang;

  let filter = 'all';
  const filters = ['all', 'keep', 'situational', 'cut', 'new'];

  $: shown = data.roster.filter((m) => {
    if (filter === 'all') return true;
    if (filter === 'new') return m.isNew;
    return m.status === filter;
  });

  const statusColor = { keep: 'var(--green)', situational: 'var(--gold)', cut: 'var(--red)' };
</script>

<SectionHead
  eyebrow={{ es: 'Mi roster · 44 Pokémon', en: 'My roster · 44 Pokémon' }}
  title={{ es: 'Qué conservar y qué liberar', en: 'What to keep and what to cut' }}
  sub={{ es: 'Toca un Pokémon para marcarlo como entrenado. Se guarda en tu dispositivo.', en: 'Tap a Pokémon to mark it trained. Saved on your device.' }} />

<div class="filters">
  {#each filters as f}
    <button class="fbtn" class:on={filter === f} on:click={() => (filter = f)}>{tt(UI.filters[f], L)}</button>
  {/each}
</div>

<div class="roster">
  {#each shown as m (m.name + (m.form || '') + m.sprite)}
    <button
      class="mon"
      class:trained={$trained.includes(m.name + (m.form || ''))}
      style="--sc:{statusColor[m.status]}"
      on:click={() => toggleIn(trained, m.name + (m.form || ''))}>
      {#if m.isNew}<span class="new-dot">{L === 'es' ? 'nuevo' : 'new'}</span>{/if}
      {#if $trained.includes(m.name + (m.form || ''))}<span class="check">✓</span>{/if}
      <Sprite id={m.sprite} size={64} alt={m.name} bob />
      <div class="mon-name">{m.name}</div>
      {#if m.form}<div class="mon-form">{m.form}</div>{/if}
      <div class="mon-tag">{tt(m.tag, L)}</div>
      {#if m.flag}<div class="mon-flag" title={tt(m.flag, L)}>⚑</div>{/if}
    </button>
  {/each}
</div>

{#if shown.length === 0}
  <p class="empty">{tt(UI.labels.noResults, L)}</p>
{/if}

<div class="legend">
  {#each Object.entries(data.rosterLegend) as [k, v]}
    <span class="leg"><i style="background:{statusColor[k] || 'var(--cyan)'}"></i>{tt(v, L)}</span>
  {/each}
</div>

<style>
  .filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; position: sticky; top: 66px; z-index: 5; }
  .fbtn { padding: 8px 15px; border-radius: 999px; background: var(--surface); border: 1px solid var(--line); color: var(--muted); font-weight: 600; font-size: 13px; }
  .fbtn.on { background: var(--accent-soft); border-color: var(--accent); color: var(--text); }

  .roster { display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr)); gap: 10px; }
  .mon {
    position: relative; display: flex; flex-direction: column; align-items: center; gap: 3px;
    padding: 14px 8px 10px; border-radius: var(--r);
    background: var(--surface); border: 1px solid var(--line);
    border-top: 3px solid var(--sc); color: var(--text);
    transition: transform .12s, border-color .12s;
  }
  .mon:hover { transform: translateY(-2px); border-color: var(--line-hi); }
  .mon.trained { opacity: .55; }
  .mon-name { font-weight: 700; font-size: 13px; }
  .mon-form { font-size: 10.5px; color: var(--violet); font-weight: 700; margin-top: -2px; }
  .mon-tag { font-size: 10.5px; color: var(--muted); margin-top: 2px; }
  .new-dot { position: absolute; top: 6px; left: 6px; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; background: var(--violet); color: #fff; padding: 2px 6px; border-radius: 999px; }
  .check { position: absolute; top: 6px; right: 6px; width: 20px; height: 20px; display: grid; place-items: center; background: var(--green); color: #04120a; border-radius: 50%; font-size: 12px; font-weight: 800; }
  .mon-flag { position: absolute; bottom: 8px; right: 8px; color: var(--gold); font-size: 13px; }

  .empty { text-align: center; color: var(--muted); padding: 40px; }
  .legend { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--line); }
  .leg { display: flex; align-items: center; gap: 7px; font-size: 12.5px; color: var(--muted); }
  .leg i { width: 12px; height: 12px; border-radius: 4px; display: inline-block; }
</style>
