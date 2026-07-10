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

  const groupColor = { t1: 'var(--cyan)', t2: 'var(--gold)', t3: 'var(--blue)', extra: 'var(--violet)' };
  const isTeam = (g) => g === 't1' || g === 't2' || g === 't3';

  function groupLabel(g) {
    return g === 'all' ? (L === 'es' ? 'Todos' : 'All') : tt(data.buildGroups[g], L);
  }
  const key = (b) => 'build:' + b.group + b.name + (b.form || '');
</script>

<SectionHead
  eyebrow={{ es: 'Builds · sets comprobados', en: 'Builds · verified sets' }}
  title={{ es: 'Configuraciones y guía de uso', en: 'Configurations & usage guide' }}
  sub={{ es: 'Datos reales de uso de M-B (Pikalytics, ChampDex). Objetos sin repetir por equipo (Item Clause). La etiqueta «nueva» marca opciones competitivas que quizá no usas.', en: 'Real M-B usage data (Pikalytics, ChampDex). No duplicate items per team (Item Clause). The "new" tag marks competitive options you may not be using.' }} />

<div class="filters">
  {#each groups as g}
    <button class="fbtn" class:on={group === g} on:click={() => (group = g)}
      style={g !== 'all' ? `--gc:${groupColor[g] || 'var(--cyan)'}` : ''}>{groupLabel(g)}</button>
  {/each}
</div>

{#if isTeam(group)}
  <div class="team-note" style="--gc:{groupColor[group]}">
    ✓ {L === 'es' ? 'Equipo completo: 6 Pokémon, cada uno con objeto distinto (Item Clause).' : 'Complete team: 6 Pokémon, each with a distinct item (Item Clause).'}
  </div>
{/if}

<div class="builds">
  {#each shown as b (key(b))}
    <article class="build card" style="--gc:{groupColor[b.group]}">
      <header class="b-head">
        <div class="b-sprite"><Sprite id={b.sprite} size={64} alt={b.name} bob /></div>
        <div class="b-id">
          <div class="b-name">
            {b.name}{#if b.form}<span class="form">{b.form}</span>{/if}
          </div>
          <span class="b-group">{tt(data.buildGroups[b.group], L)}</span>
          {#if b.role}<div class="b-role">{tt(b.role, L)}</div>{/if}
        </div>
        <button class="tr-btn" class:on={$trained.includes(key(b))}
          on:click={() => toggleIn(trained, key(b))}
          title={tt(UI.labels.trained, L)}>
          {$trained.includes(key(b)) ? '✓' : '○'}
        </button>
      </header>

      {#if b.fresh}
        <div class="fresh">
          <span class="fresh-tag">{b.own === false ? (L === 'es' ? 'por conseguir' : 'to acquire') : (L === 'es' ? 'nueva opción' : 'new option')}</span>
          <span class="fresh-note">{tt(b.freshNote, L)}</span>
        </div>
      {/if}

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

      {#if b.strategy}
        <div class="b-block">
          <span class="k">{L === 'es' ? 'Estrategia paso a paso' : 'Step-by-step strategy'}</span>
          <ol class="strat">
            {#each tt(b.strategy, L) as step}<li>{step}</li>{/each}
          </ol>
        </div>
      {/if}

      {#if b.strong || b.weak}
        <div class="sw">
          {#if b.strong}
            <div class="sw-col strong">
              <span class="k">{L === 'es' ? 'Fortalezas' : 'Strengths'}</span>
              <ul>{#each tt(b.strong, L) as s}<li>{s}</li>{/each}</ul>
            </div>
          {/if}
          {#if b.weak}
            <div class="sw-col weak">
              <span class="k">{L === 'es' ? 'Debilidades' : 'Weaknesses'}</span>
              <ul>{#each tt(b.weak, L) as s}<li>{s}</li>{/each}</ul>
            </div>
          {/if}
        </div>
      {/if}

      {#if b.vs}
        <div class="b-block">
          <span class="k">{L === 'es' ? 'Enfrentamientos clave' : 'Key matchups'}</span>
          <div class="vs">
            {#each b.vs as m}
              <div class="vrow {m.ok ? 'good' : 'bad'}">
                <span class="vmark">{m.ok ? '▲' : '▼'}</span>
                <span class="vname">{m.n}</span>
                <span class="vtip">{tt(m.t, L)}</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      {#if b.why}
        <div class="b-block why">
          <span class="k">{L === 'es' ? 'Por qué esta build' : 'Why this build'}</span>
          <ul class="whys">
            <li><b>{tt(UI.labels.item, L)}:</b> {tt(b.why.item, L)}</li>
            <li><b>{tt(UI.labels.moves, L)}:</b> {tt(b.why.moves, L)}</li>
            <li><b>{tt(UI.labels.spread, L)} / {tt(UI.labels.nature, L)}:</b> {tt(b.why.spread, L)}</li>
          </ul>
        </div>
      {/if}

      {#if b.note}<p class="note"><span class="bulb">💡</span>{tt(b.note, L)}</p>{/if}
    </article>
  {/each}
</div>

<style>
  .filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
  .fbtn { padding: 8px 15px; border-radius: 999px; background: var(--surface); border: 1px solid var(--line); color: var(--muted); font-weight: 600; font-size: 13px; }
  .fbtn.on { background: color-mix(in srgb, var(--gc, var(--cyan)) 16%, transparent); border-color: var(--gc, var(--accent)); color: var(--text); }

  .builds { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 14px; align-items: start; }
  .build { padding: 18px; border-top: 3px solid var(--gc); display: flex; flex-direction: column; gap: 14px; }

  .b-head { display: flex; align-items: flex-start; gap: 12px; }
  .b-sprite { background: var(--surface-2); border: 1px solid var(--line); border-radius: 14px; padding: 4px; flex: 0 0 auto; }
  .b-id { flex: 1; min-width: 0; }
  .b-name { font-family: var(--font-display); font-weight: 700; font-size: 19px; }
  .b-name .form { color: var(--violet); font-size: 13px; margin-left: 6px; }
  .b-group { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--gc); }
  .b-role { font-size: 12px; color: var(--muted); margin-top: 4px; line-height: 1.35; }
  .tr-btn { width: 32px; height: 32px; flex: 0 0 auto; border-radius: 50%; background: var(--surface-2); border: 1px solid var(--line); color: var(--faint); font-size: 15px; font-weight: 800; }
  .tr-btn.on { background: var(--green); border-color: var(--green); color: #04120a; }

  .fresh { display: flex; flex-direction: column; gap: 4px; background: color-mix(in srgb, var(--violet) 12%, transparent); border: 1px solid color-mix(in srgb, var(--violet) 35%, transparent); border-radius: var(--r-sm); padding: 10px 12px; }
  .fresh-tag { align-self: flex-start; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .06em; color: #fff; background: var(--violet); padding: 2px 8px; border-radius: 999px; }
  .fresh-note { font-size: 12.5px; color: var(--text); line-height: 1.45; }

  .b-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .stat { background: var(--surface-2); border-radius: var(--r-sm); padding: 9px 11px; min-width: 0; }
  .k { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: .07em; color: var(--faint); font-weight: 700; margin-bottom: 3px; }
  .v { font-size: 12.5px; font-weight: 600; line-height: 1.3; word-break: break-word; }
  .v.item { color: var(--gold); }

  .b-moves .k, .b-block .k { margin-bottom: 7px; }
  .moves { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
  .mv { background: color-mix(in srgb, var(--gc) 12%, transparent); border: 1px solid color-mix(in srgb, var(--gc) 30%, transparent); border-radius: 8px; padding: 8px 10px; font-size: 12px; font-weight: 600; line-height: 1.25; }

  .strat { margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 7px; }
  .strat li { font-size: 12.5px; line-height: 1.5; color: var(--text); }

  .sw { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .sw-col { border-radius: var(--r-sm); padding: 10px 12px; }
  .sw-col.strong { background: color-mix(in srgb, var(--green) 9%, transparent); }
  .sw-col.weak { background: color-mix(in srgb, var(--red) 9%, transparent); }
  .sw-col ul { margin: 0; padding-left: 16px; display: flex; flex-direction: column; gap: 5px; }
  .sw-col li { font-size: 12px; line-height: 1.4; color: var(--muted); }
  .sw-col.strong .k { color: var(--green); }
  .sw-col.weak .k { color: var(--red); }

  .vs { display: flex; flex-direction: column; gap: 6px; }
  .vrow { display: grid; grid-template-columns: 16px auto 1fr; gap: 8px; align-items: baseline; font-size: 12px; }
  .vmark { font-size: 10px; }
  .vrow.good .vmark { color: var(--green); }
  .vrow.bad .vmark { color: var(--red); }
  .vname { font-weight: 700; }
  .vtip { color: var(--muted); line-height: 1.4; }

  .why .whys { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 6px; }
  .why .whys li { font-size: 12px; line-height: 1.45; color: var(--muted); }
  .why .whys b { color: var(--text); font-weight: 700; }

  .note { display: flex; gap: 8px; color: var(--muted); font-size: 12.5px; line-height: 1.5; margin: 0; background: var(--surface-2); border-radius: var(--r-sm); padding: 11px 12px; }
  .bulb { flex: 0 0 auto; }

  .team-note { margin: -6px 0 16px; padding: 10px 14px; border-radius: var(--r-sm); font-size: 13px; font-weight: 600; color: var(--text); background: color-mix(in srgb, var(--gc) 12%, transparent); border: 1px solid color-mix(in srgb, var(--gc) 35%, transparent); }

  @media (max-width: 520px) {
    .builds { grid-template-columns: 1fr; }
    .b-stats, .moves, .sw { grid-template-columns: 1fr; }
  }
</style>
