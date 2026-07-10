<script>
  import { lang, tt, UI } from '../lib/i18n.js';
  import { trained, toggleIn } from '../lib/store.js';
  import Sprite from '../lib/Sprite.svelte';
  import SectionHead from '../lib/SectionHead.svelte';

  export let data;
  $: L = $lang;

  let group = 'all';
  $: groups = ['all', ...Object.keys(data.buildGroups)];
  $: shown = group === 'all' ? data.builds : data.builds.filter((b) => b.group === group);

  const groupColor = { singles: 'var(--cyan)', sun: 'var(--gold)', rain: 'var(--blue)', extra: 'var(--violet)' };

  function groupLabel(g) {
    return g === 'all' ? (L === 'es' ? 'Todos' : 'All') : tt(data.buildGroups[g], L);
  }
</script>

<SectionHead
  eyebrow={{ es: 'Builds · sets reales', en: 'Builds · real sets' }}
  title={{ es: 'Configuraciones completas', en: 'Full configurations' }}
  sub={{ es: 'Objeto, habilidad, naturaleza, Puntos de Característica (máx 32/stat) y movimientos. Los términos van bilingües (ES · EN).', en: 'Item, ability, nature, Trait Points (max 32/stat) and moves. Terms are bilingual (ES · EN).' }} />

<div class="filters">
  {#each groups as g}
    <button class="fbtn" class:on={group === g} on:click={() => (group = g)}
      style={g !== 'all' ? `--gc:${groupColor[g]}` : ''}>{groupLabel(g)}</button>
  {/each}
</div>

<div class="builds">
  {#each shown as b (b.group + ':' + b.name + (b.form || ''))}
    <article class="build card" style="--gc:{groupColor[b.group]}">
      <header class="b-head">
        <div class="b-sprite"><Sprite id={b.sprite} size={64} alt={b.name} bob /></div>
        <div class="b-id">
          <div class="b-name">
            {b.name}{#if b.form}<span class="form">{b.form}</span>{/if}
          </div>
          <span class="b-group">{tt(data.buildGroups[b.group], L)}</span>
        </div>
        <button class="tr-btn" class:on={$trained.includes('build:' + b.name + (b.form || ''))}
          on:click={() => toggleIn(trained, 'build:' + b.name + (b.form || ''))}
          title={tt(UI.labels.trained, L)}>
          {$trained.includes('build:' + b.name + (b.form || '')) ? '✓' : '○'}
        </button>
      </header>

      <div class="b-stats">
        <div class="stat"><span class="k">{tt(UI.labels.item, L)}</span><span class="v item">{b.item}</span></div>
        <div class="stat"><span class="k">{tt(UI.labels.ability, L)}</span><span class="v">{b.ability}</span></div>
        <div class="stat"><span class="k">{tt(UI.labels.nature, L)}</span><span class="v">{b.nature}</span></div>
        <div class="stat"><span class="k">{tt(UI.labels.spread, L)}</span><span class="v">{b.spread}</span></div>
      </div>

      <div class="b-moves">
        <span class="k">{tt(UI.labels.moves, L)}</span>
        <div class="moves">
          {#each b.moves as mv}<span class="mv">{mv}</span>{/each}
        </div>
      </div>

      <p class="note"><span class="bulb">💡</span>{tt(b.note, L)}</p>

      {#if b.tips}
        <div class="b-tips">
          <span class="k">{L === 'es' ? 'Estrategia y trucos' : 'Strategy & tricks'}</span>
          <ul>
            {#each b.tips as tip}<li>{tt(tip, L)}</li>{/each}
          </ul>
        </div>
      {/if}
    </article>
  {/each}
</div>

<style>
  .filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
  .fbtn { padding: 8px 15px; border-radius: 999px; background: var(--surface); border: 1px solid var(--line); color: var(--muted); font-weight: 600; font-size: 13px; }
  .fbtn.on { background: color-mix(in srgb, var(--gc, var(--cyan)) 16%, transparent); border-color: var(--gc, var(--accent)); color: var(--text); }

  .builds { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 14px; }
  .build { padding: 18px; border-top: 3px solid var(--gc); display: flex; flex-direction: column; gap: 14px; }

  .b-head { display: flex; align-items: center; gap: 12px; }
  .b-sprite { background: var(--surface-2); border: 1px solid var(--line); border-radius: 14px; padding: 4px; flex: 0 0 auto; }
  .b-id { flex: 1; min-width: 0; }
  .b-name { font-family: var(--font-display); font-weight: 700; font-size: 19px; }
  .b-name .form { color: var(--violet); font-size: 13px; margin-left: 6px; }
  .b-group { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--gc); }
  .tr-btn { width: 32px; height: 32px; flex: 0 0 auto; border-radius: 50%; background: var(--surface-2); border: 1px solid var(--line); color: var(--faint); font-size: 15px; font-weight: 800; }
  .tr-btn.on { background: var(--green); border-color: var(--green); color: #04120a; }

  .b-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .stat { background: var(--surface-2); border-radius: var(--r-sm); padding: 9px 11px; min-width: 0; }
  .k { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: .07em; color: var(--faint); font-weight: 700; margin-bottom: 3px; }
  .v { font-size: 12.5px; font-weight: 600; line-height: 1.3; word-break: break-word; }
  .v.item { color: var(--gold); }

  .b-moves .k { margin-bottom: 7px; }
  .moves { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
  .mv { background: color-mix(in srgb, var(--gc) 12%, transparent); border: 1px solid color-mix(in srgb, var(--gc) 30%, transparent); border-radius: 8px; padding: 8px 10px; font-size: 12px; font-weight: 600; line-height: 1.25; }

  .note { display: flex; gap: 8px; color: var(--muted); font-size: 13px; line-height: 1.5; margin: 0; background: var(--surface-2); border-radius: var(--r-sm); padding: 11px 12px; }
  .bulb { flex: 0 0 auto; }

  .b-tips ul { margin: 8px 0 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 7px; }
  .b-tips li { position: relative; padding-left: 18px; font-size: 12.5px; line-height: 1.45; color: var(--muted); }
  .b-tips li::before { content: '▸'; position: absolute; left: 2px; color: var(--gc); font-weight: 700; }

  @media (max-width: 520px) {
    .builds { grid-template-columns: 1fr; }
    .b-stats { grid-template-columns: 1fr; }
    .moves { grid-template-columns: 1fr; }
  }
</style>
