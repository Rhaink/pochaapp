<script>
  import { lang, tt } from '../lib/i18n.js';
  import Sprite from '../lib/Sprite.svelte';
  import SectionHead from '../lib/SectionHead.svelte';

  export let data;
  $: L = $lang;
  const c = data.cleanup;

  const groups = [
    { key: 'promote', color: 'var(--cyan)', icon: '▲', title: { es: 'Subir a núcleo', en: 'Promote to core' }, hint: { es: 'Piezas nuevas que merecen un hueco fijo.', en: 'New pieces that earn a fixed slot.' } },
    { key: 'keep', color: 'var(--green)', icon: '★', title: { es: 'Mantener', en: 'Keep' }, hint: { es: 'Habilitan un arquetipo o son tech valioso.', en: 'They enable an archetype or are valuable tech.' } },
    { key: 'maybe', color: 'var(--gold)', icon: '?', title: { es: 'Opcional', en: 'Optional' }, hint: { es: 'Manténlos solo si los usas; si no, libéralos.', en: 'Keep only if you use them; otherwise release.' } },
    { key: 'release', color: 'var(--red)', icon: '✕', title: { es: 'Liberar a HOME', en: 'Release to HOME' }, hint: { es: 'No aportan a tus arquetipos. Es reversible: recuperas hueco sin perderlos.', en: "Don't add to your archetypes. Reversible: reclaim space without losing them." } }
  ];
</script>

<SectionHead
  eyebrow={{ es: 'Depurar caja', en: 'Box cleanup' }}
  title={{ es: 'Qué liberar y qué mantener', en: 'What to release and what to keep' }}
  sub={c.intro} />

{#each groups as g}
  <section class="grp">
    <div class="grp-head" style="--gc:{g.color}">
      <span class="grp-icon">{g.icon}</span>
      <div>
        <h3>{tt(g.title, L)} <span class="count">{c[g.key].length}</span></h3>
        <p>{tt(g.hint, L)}</p>
      </div>
    </div>
    <div class="rows">
      {#each c[g.key] as m}
        <div class="row card" style="--gc:{g.color}">
          <div class="r-sprite"><Sprite id={m.sprite} size={48} alt={m.name} /></div>
          <div class="r-body">
            <div class="r-name">{m.name}</div>
            <div class="r-reason">{tt(m.reason, L)}</div>
          </div>
        </div>
      {/each}
    </div>
  </section>
{/each}

<style>
  .grp { margin-bottom: 26px; }
  .grp-head { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .grp-icon { width: 36px; height: 36px; flex: 0 0 auto; display: grid; place-items: center; border-radius: 10px; background: color-mix(in srgb, var(--gc) 16%, transparent); color: var(--gc); font-weight: 800; font-size: 16px; }
  .grp-head h3 { font-size: 17px; }
  .grp-head .count { color: var(--gc); font-size: 14px; }
  .grp-head p { margin: 3px 0 0; font-size: 12.5px; color: var(--muted); line-height: 1.4; }

  .rows { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 10px; }
  .row { display: flex; gap: 12px; padding: 12px 14px; align-items: center; border-left: 3px solid var(--gc); }
  .r-sprite { flex: 0 0 auto; background: var(--surface-2); border-radius: 10px; padding: 3px; }
  .r-name { font-weight: 700; font-size: 14px; margin-bottom: 3px; }
  .r-reason { font-size: 12px; color: var(--muted); line-height: 1.45; }
</style>
