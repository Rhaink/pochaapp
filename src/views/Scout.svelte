<script>
  import { lang, tt, UI } from '../lib/i18n.js';
  import { scouted, toggleIn } from '../lib/store.js';
  import Sprite from '../lib/Sprite.svelte';
  import SectionHead from '../lib/SectionHead.svelte';

  export let data;
  $: L = $lang;

  const prioColor = { alta: 'var(--red)', media: 'var(--gold)', baja: 'var(--muted)' };
  const prioLabel = { alta: { es: 'Alta', en: 'High' }, media: { es: 'Media', en: 'Medium' }, baja: { es: 'Baja', en: 'Low' } };
</script>

<SectionHead
  eyebrow={{ es: 'Scout · alto potencial', en: 'Scout · high potential' }}
  title={{ es: 'Piezas por conseguir o reevaluar', en: 'Pieces to obtain or reassess' }}
  sub={data.scout.intro} />

<div class="scouts">
  {#each data.scout.targets as t}
    <article class="scout card" style="--pc:{prioColor[t.priority]}">
      <div class="s-left">
        <Sprite id={t.sprite} size={64} alt={t.name} bob />
      </div>
      <div class="s-body">
        <div class="s-head">
          <h3>{t.name}</h3>
          <span class="prio">{tt(UI.labels.priority, L)}: {tt(prioLabel[t.priority], L)}</span>
        </div>
        <p>{tt(t.why, L)}</p>
        <div class="s-foot">
          {#if t.have}
            <span class="have">✓ {tt(UI.labels.have, L)}</span>
          {:else}
            <span class="miss">◎ {tt(UI.labels.missing, L)}</span>
          {/if}
          <button class="mark" class:on={$scouted.includes(t.name)} on:click={() => toggleIn(scouted, t.name)}>
            {$scouted.includes(t.name) ? '✓ ' + tt(UI.labels.done, L) : (L === 'es' ? 'Marcar conseguido' : 'Mark obtained')}
          </button>
        </div>
      </div>
    </article>
  {/each}
</div>

<style>
  .scouts { display: grid; grid-template-columns: 1fr; gap: 12px; }
  .scout { display: flex; gap: 16px; padding: 18px; border-left: 4px solid var(--pc); align-items: flex-start; }
  .s-left { flex: 0 0 auto; background: var(--surface-2); border-radius: 14px; padding: 8px; }
  .s-body { flex: 1; min-width: 0; }
  .s-head { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 6px; }
  .s-head h3 { font-size: 17px; }
  .prio { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: var(--pc); background: color-mix(in srgb, var(--pc) 14%, transparent); padding: 3px 9px; border-radius: 999px; }
  .s-body p { color: var(--muted); font-size: 13.5px; line-height: 1.55; margin: 0 0 14px; }
  .s-foot { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  .have { color: var(--green); font-weight: 700; font-size: 13px; }
  .miss { color: var(--faint); font-weight: 700; font-size: 13px; }
  .mark { margin-left: auto; padding: 8px 14px; border-radius: 999px; background: var(--surface-2); border: 1px solid var(--line); color: var(--text); font-weight: 600; font-size: 12.5px; }
  .mark.on { background: color-mix(in srgb, var(--green) 16%, transparent); border-color: var(--green); color: var(--green); }
</style>
