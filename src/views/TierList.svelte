<script>
  import { lang, tt } from '../lib/i18n.js';
  import Sprite from '../lib/Sprite.svelte';
  import SectionHead from '../lib/SectionHead.svelte';

  export let data;
  $: L = $lang;

  const tierColor = { S: 'var(--gold)', A: 'var(--cyan)', B: 'var(--violet)' };
</script>

<SectionHead
  eyebrow={{ es: 'Top 40 · tier list', en: 'Top 40 · tier list' }}
  title={{ es: 'Los 40 a tener o cazar', en: 'The 40 to own or hunt' }}
  sub={data.tierList.intro} />

<div class="tiers">
  {#each data.tierList.tiers as t}
    <div class="tier-row">
      <div class="tier-badge" style="--tc:{tierColor[t.tier]}">{t.tier}</div>
      <div class="tier-mons">
        {#each t.mons as m}
          <div class="tmon" class:missing={!m.have} title={m.name}>
            <Sprite id={m.sprite} size={52} alt={m.name} bob />
            <span class="tname">{m.name}</span>
            {#if m.hunt}<span class="hunt">{L === 'es' ? 'cazar' : 'hunt'}</span>{/if}
            {#if m.have}<span class="own">✓</span>{/if}
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

<div class="legend">
  <span class="leg"><i class="own-dot">✓</i>{L === 'es' ? 'Ya lo tienes' : 'You own it'}</span>
  <span class="leg"><i class="hunt-dot"></i>{L === 'es' ? 'Falta por cazar' : 'Still to hunt'}</span>
</div>

<style>
  .tiers { display: flex; flex-direction: column; gap: 12px; }
  .tier-row { display: flex; gap: 12px; align-items: stretch; }
  .tier-badge {
    flex: 0 0 56px; display: grid; place-items: center;
    font-family: var(--font-display); font-size: 28px; font-weight: 700; color: #0a0e1a;
    background: var(--tc); border-radius: var(--r);
  }
  .tier-mons {
    flex: 1; display: grid; grid-template-columns: repeat(auto-fill, minmax(84px, 1fr)); gap: 8px;
    background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 12px;
  }
  .tmon { position: relative; display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 6px 4px; border-radius: var(--r-sm); background: var(--surface-2); }
  .tmon.missing { opacity: .78; border: 1px dashed var(--line-hi); }
  .tname { font-size: 10.5px; font-weight: 600; text-align: center; line-height: 1.1; }
  .hunt { font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: .05em; color: #fff; background: var(--red); padding: 1px 6px; border-radius: 999px; }
  .own { position: absolute; top: 4px; right: 4px; width: 16px; height: 16px; display: grid; place-items: center; background: var(--green); color: #04120a; border-radius: 50%; font-size: 10px; font-weight: 800; }

  .legend { display: flex; gap: 18px; margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--line); }
  .leg { display: flex; align-items: center; gap: 7px; font-size: 12.5px; color: var(--muted); }
  .own-dot { width: 16px; height: 16px; display: grid; place-items: center; background: var(--green); color: #04120a; border-radius: 50%; font-size: 10px; font-weight: 800; font-style: normal; }
  .hunt-dot { width: 14px; height: 14px; border: 1px dashed var(--line-hi); border-radius: 4px; display: inline-block; }

  @media (max-width: 560px) {
    .tier-badge { flex-basis: 44px; font-size: 22px; }
    .tier-mons { grid-template-columns: repeat(auto-fill, minmax(72px, 1fr)); }
  }
</style>
