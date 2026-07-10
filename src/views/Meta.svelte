<script>
  import { lang, tt, UI } from '../lib/i18n.js';
  import Sprite from '../lib/Sprite.svelte';
  import SectionHead from '../lib/SectionHead.svelte';

  export let data;
  $: L = $lang;
  const m = data.meta;
  const maxUsage = Math.max(...m.usage.map((u) => u.usage));
</script>

<SectionHead
  eyebrow={{ es: 'Meta M-4 · Reg M-B', en: 'M-4 Meta · Reg M-B' }}
  title={{ es: 'El estado del ranked', en: 'State of the ranked' }}
  sub={m.summary} />

<div class="cols">
  <!-- Uso -->
  <div class="card pad">
    <h3>{tt(UI.labels.usage, L)} <span class="hint">· {L === 'es' ? 'top global' : 'global top'}</span></h3>
    <div class="bars">
      {#each m.usage as u}
        <div class="bar-row">
          <Sprite id={u.sprite} size={40} alt={u.name} />
          <div class="bar-body">
            <div class="bar-top"><b>{u.name}</b><span>{u.usage}%</span></div>
            <div class="track"><div class="fill" style="width:{(u.usage / maxUsage) * 100}%"></div></div>
            <div class="bar-note">{u.item}</div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Top por formato -->
  <div class="card pad">
    <h3>{L === 'es' ? 'Top por formato' : 'Top by format'}</h3>
    <div class="fmt">
      <div class="fmt-head">{tt(UI.labels.singles, L)}</div>
      <div class="mons">
        {#each m.singlesTop as p}
          <div class="mono"><Sprite id={p.sprite} size={44} alt={p.name} /><span>{p.name}</span></div>
        {/each}
      </div>
    </div>
    <div class="fmt">
      <div class="fmt-head">{tt(UI.labels.doubles, L)}</div>
      <div class="mons">
        {#each m.doublesTop as p}
          <div class="mono"><Sprite id={p.sprite} size={44} alt={p.name} /><span>{p.name}</span></div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Arquetipos -->
  <div class="card pad">
    <h3>{L === 'es' ? 'Arquetipos dominantes' : 'Dominant archetypes'}</h3>
    <div class="arch">
      {#each m.archetypes as a}
        <div class="arch-pill"><Sprite id={a.sprite} size={30} alt="" /><span>{tt(a.name, L)}</span></div>
      {/each}
    </div>
  </div>

  <!-- Cambios -->
  <div class="card pad">
    <h3>{L === 'es' ? 'Qué cambió (M-A → M-4)' : 'What changed (M-A → M-4)'}</h3>
    <ul class="changes">
      {#each m.changes as c}
        <li class={c.dir}><span class="arrow">{c.dir === 'up' ? '▲' : '▼'}</span>{tt(c.text, L)}</li>
      {/each}
    </ul>
  </div>

  <!-- Nuevas Megas + objetos -->
  <div class="card pad">
    <h3>{L === 'es' ? 'Nuevas Megas y objetos' : 'New Megas and items'}</h3>
    <ul class="changes">
      {#each m.newMegas as c}
        <li class="up" class:flag={c.flag}><span class="arrow">◆</span>{tt(c.text, L)}</li>
      {/each}
    </ul>
    <div class="items">
      {#each m.newItems as it}<span class="chip-tag">{it}</span>{/each}
    </div>
  </div>
</div>

<p class="disclaimer">⚠️ {tt(m.disclaimer, L)}</p>

<style>
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .pad { padding: 20px; }
  h3 { font-size: 16px; margin-bottom: 14px; }
  .hint { color: var(--faint); font-weight: 500; font-size: 13px; }

  .bars { display: flex; flex-direction: column; gap: 14px; }
  .bar-row { display: flex; gap: 12px; align-items: center; }
  .bar-body { flex: 1; min-width: 0; }
  .bar-top { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 5px; }
  .bar-top span { color: var(--accent); font-weight: 700; font-family: var(--font-display); }
  .track { height: 7px; background: var(--surface-2); border-radius: 4px; overflow: hidden; }
  .fill { height: 100%; background: linear-gradient(90deg, var(--cyan), var(--violet)); border-radius: 4px; }
  .bar-note { font-size: 11.5px; color: var(--muted); margin-top: 4px; }

  .fmt { margin-bottom: 14px; }
  .fmt-head { font-size: 12px; text-transform: uppercase; letter-spacing: .1em; color: var(--accent); font-weight: 700; margin-bottom: 8px; }
  .mons { display: flex; flex-wrap: wrap; gap: 8px; }
  .mono { display: flex; flex-direction: column; align-items: center; gap: 2px; width: 62px; }
  .mono span { font-size: 10.5px; color: var(--muted); text-align: center; line-height: 1.1; }

  .arch { display: flex; flex-wrap: wrap; gap: 8px; }
  .arch-pill { display: flex; align-items: center; gap: 7px; padding: 6px 12px 6px 6px; border-radius: 999px; background: var(--surface-2); border: 1px solid var(--line); font-size: 13px; font-weight: 600; }

  .changes { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 9px; }
  .changes li { display: flex; gap: 9px; font-size: 13.5px; line-height: 1.45; color: var(--text); }
  .changes .arrow { flex: 0 0 auto; font-size: 11px; margin-top: 3px; }
  .changes .up .arrow { color: var(--green); }
  .changes .down .arrow { color: var(--red); }
  .changes .flag { background: color-mix(in srgb, var(--gold) 10%, transparent); border-radius: 8px; padding: 6px 8px; margin: -2px -4px; }
  .changes .flag .arrow { color: var(--gold); }
  .items { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 14px; }

  .disclaimer { color: var(--faint); font-size: 12.5px; margin-top: 18px; line-height: 1.5; }

  @media (max-width: 720px) { .cols { grid-template-columns: 1fr; } }
</style>
