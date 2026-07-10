<script>
  import { lang, tt, UI } from '../lib/i18n.js';
  import Sprite from '../lib/Sprite.svelte';
  import SectionHead from '../lib/SectionHead.svelte';

  export let data;
  $: L = $lang;

  let group = 'all';
  $: groups = ['all', ...Object.keys(data.buildGroups)];
  $: shown = group === 'all' ? data.builds : data.builds.filter((b) => b.group === group);

  function groupLabel(g) {
    return g === 'all' ? (L === 'es' ? 'Todos' : 'All') : tt(data.buildGroups[g], L);
  }
</script>

<SectionHead
  eyebrow={{ es: 'Builds · sets reales', en: 'Builds · real sets' }}
  title={{ es: 'Configuraciones por equipo', en: 'Per-team configurations' }}
  sub={{ es: 'Naturaleza · Habilidad · Objeto · Puntos de Característica (máx 32/stat) · Movimientos. Los términos van bilingües.', en: 'Nature · Ability · Item · Trait Points (max 32/stat) · Moves. Terms are shown bilingually.' }} />

<div class="filters">
  {#each groups as g}
    <button class="fbtn" class:on={group === g} on:click={() => (group = g)}>{groupLabel(g)}</button>
  {/each}
</div>

<div class="builds">
  {#each shown as b (b.name + (b.form || ''))}
    <details class="build card">
      <summary>
        <Sprite id={b.sprite} size={52} alt={b.name} />
        <div class="b-id">
          <b>{b.name}{#if b.form}<span class="form"> {b.form}</span>{/if}</b>
          <small>{b.ability}</small>
        </div>
        <span class="b-item">{b.item}</span>
        <span class="chev">▾</span>
      </summary>
      <div class="b-body">
        <div class="b-grid">
          <div><span class="k">{tt(UI.labels.nature, L)}</span>{b.nature}</div>
          <div><span class="k">{tt(UI.labels.spread, L)}</span>{b.spread}</div>
        </div>
        <div class="moves">
          {#each b.moves as mv}<span class="mv">{mv}</span>{/each}
        </div>
        <p class="note">{tt(b.note, L)}</p>
      </div>
    </details>
  {/each}
</div>

<style>
  .filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
  .fbtn { padding: 8px 15px; border-radius: 999px; background: var(--surface); border: 1px solid var(--line); color: var(--muted); font-weight: 600; font-size: 13px; }
  .fbtn.on { background: var(--accent-soft); border-color: var(--accent); color: var(--text); }

  .builds { display: flex; flex-direction: column; gap: 10px; }
  .build { overflow: hidden; }
  summary { display: flex; align-items: center; gap: 12px; padding: 12px 16px; cursor: pointer; list-style: none; }
  summary::-webkit-details-marker { display: none; }
  .b-id { display: flex; flex-direction: column; min-width: 0; }
  .b-id b { font-size: 15px; }
  .b-id .form { color: var(--violet); font-size: 12px; }
  .b-id small { color: var(--muted); font-size: 11.5px; }
  .b-item { margin-left: auto; font-size: 12.5px; font-weight: 600; color: var(--gold); text-align: right; }
  .chev { transition: transform .2s; color: var(--faint); }
  details[open] .chev { transform: rotate(180deg); }

  .b-body { padding: 0 16px 16px; border-top: 1px solid var(--line); margin-top: 2px; padding-top: 14px; }
  .b-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px; }
  .b-grid > div { background: var(--surface-2); border-radius: var(--r-sm); padding: 10px 12px; font-size: 13px; font-weight: 600; }
  .k { display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: .08em; color: var(--faint); margin-bottom: 3px; font-weight: 700; }
  .moves { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin-bottom: 12px; }
  .mv { background: color-mix(in srgb, var(--cyan) 10%, transparent); border: 1px solid color-mix(in srgb, var(--cyan) 25%, transparent); border-radius: 8px; padding: 7px 10px; font-size: 12.5px; font-weight: 600; }
  .note { color: var(--muted); font-size: 13px; line-height: 1.5; margin: 0; }

  @media (max-width: 560px) {
    .b-item { display: none; }
    .moves { grid-template-columns: 1fr; }
  }
</style>
