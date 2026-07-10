<script>
  import { lang, tt, UI } from '../lib/i18n.js';
  import SectionHead from '../lib/SectionHead.svelte';

  export let data;
  $: L = $lang;
</script>

<SectionHead
  eyebrow={{ es: 'Plan de ascenso', en: 'Climb plan' }}
  title={{ es: 'Tu ruta en 3 fases', en: 'Your 3-phase route' }}
  sub={{ es: 'Sigue las fases en orden. Cada una tiene un umbral: qué ajustar si te frenan.', en: 'Follow the phases in order. Each has a threshold: what to adjust if you get stuck.' }} />

<div class="phases">
  {#each data.plan as p, i}
    <article class="phase card">
      <div class="pn">0{i + 1}</div>
      <div class="p-body">
        <h3>{tt(p.title, L)}</h3>
        <ol>
          {#each tt(p.steps, L) as st}<li>{st}</li>{/each}
        </ol>
        <div class="thr">
          <span class="thr-k">{tt(UI.labels.threshold, L)}</span>
          {tt(p.threshold, L)}
        </div>
      </div>
    </article>
  {/each}
</div>

<div class="sources card pad">
  <h3>{tt(UI.labels.sources, L)}</h3>
  <div class="src-grid">
    {#each data.sources as s}
      <a class="src" href={s.url} target="_blank" rel="noopener">
        <span class="src-lang">{s.lang}</span>
        <span class="src-name">{s.name}</span>
        <span class="ext">↗</span>
      </a>
    {/each}
  </div>
</div>

<style>
  .phases { display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px; }
  .phase { display: flex; gap: 16px; padding: 20px; }
  .pn { flex: 0 0 auto; font-family: var(--font-display); font-size: 34px; font-weight: 700; color: transparent; -webkit-text-stroke: 1.5px var(--accent); line-height: 1; }
  .p-body { flex: 1; }
  .p-body h3 { font-size: 18px; margin-bottom: 12px; }
  .p-body ol { margin: 0 0 14px; padding-left: 20px; display: flex; flex-direction: column; gap: 8px; }
  .p-body li { font-size: 14px; line-height: 1.5; }
  .thr { background: color-mix(in srgb, var(--gold) 10%, transparent); border: 1px solid color-mix(in srgb, var(--gold) 30%, transparent); border-radius: var(--r-sm); padding: 11px 14px; font-size: 13px; color: var(--muted); line-height: 1.45; }
  .thr-k { display: block; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--gold); margin-bottom: 3px; }

  .pad { padding: 20px; }
  .sources h3 { font-size: 16px; margin-bottom: 14px; }
  .src-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 8px; }
  .src { display: flex; align-items: center; gap: 10px; padding: 11px 13px; border-radius: var(--r-sm); background: var(--surface-2); border: 1px solid var(--line); color: var(--text); }
  .src:hover { border-color: var(--accent); }
  .src-lang { font-size: 10px; font-weight: 800; color: var(--accent); background: var(--accent-soft); padding: 3px 7px; border-radius: 6px; flex: 0 0 auto; }
  .src-name { flex: 1; font-size: 12.5px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .ext { color: var(--faint); font-size: 13px; }
</style>
