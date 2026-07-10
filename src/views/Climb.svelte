<script>
  import { lang, tt } from '../lib/i18n.js';
  import SectionHead from '../lib/SectionHead.svelte';

  export let data;
  $: L = $lang;
  const cl = data.climb;
</script>

<SectionHead eyebrow={cl.eyebrow} title={cl.title} sub={cl.sub} />

<div class="gauges">
  {#each cl.gauge as g}
    <div class="gauge card" class:trick={g.fill === 2}>
      <div class="g-head">
        <span class="g-h">{tt(g.h, L)}</span>
        <span class="g-pill" class:trick={g.fill === 2}>{tt(g.pill, L)}</span>
      </div>
      <div class="segs">
        {#each Array(4) as _, i}
          <div class="seg" class:filled={i < g.fill} class:double={g.fill === 2 && i < 2}></div>
        {/each}
      </div>
      <p class="g-note">{tt(g.note, L)}</p>
    </div>
  {/each}
</div>

<div class="tips">
  {#each tt(cl.tips, L) as tip}
    <div class="tip card">
      <span class="tip-ico">{tip[0]}</span>
      <div>
        <div class="tip-t">{tip[1]}</div>
        <div class="tip-d">{tip[2]}</div>
      </div>
    </div>
  {/each}
</div>

<style>
  .gauges { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 22px; }
  .gauge { padding: 18px; }
  .gauge.trick { border-color: var(--gold); background: color-mix(in srgb, var(--gold) 7%, var(--surface)); }
  .g-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 14px; }
  .g-h { font-weight: 700; font-size: 14px; font-family: var(--font-display); }
  .g-pill { font-size: 10.5px; font-weight: 800; text-transform: uppercase; letter-spacing: .05em; color: var(--muted); background: var(--surface-2); padding: 3px 9px; border-radius: 999px; }
  .g-pill.trick { color: #0a0e1a; background: var(--gold); }
  .segs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-bottom: 12px; }
  .seg { height: 14px; border-radius: 5px; background: var(--surface-2); border: 1px solid var(--line); }
  .seg.filled { background: linear-gradient(90deg, var(--cyan), var(--violet)); border-color: transparent; }
  .seg.double { background: linear-gradient(90deg, var(--gold), #ff9d3c); }
  .g-note { font-size: 12.5px; color: var(--muted); line-height: 1.5; margin: 0; }

  .tips { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .tip { display: flex; gap: 12px; padding: 15px; align-items: flex-start; }
  .tip-ico { font-size: 22px; flex: 0 0 auto; }
  .tip-t { font-weight: 700; font-size: 14px; margin-bottom: 4px; }
  .tip-d { font-size: 12.5px; color: var(--muted); line-height: 1.5; }

  @media (max-width: 640px) {
    .gauges { grid-template-columns: 1fr; }
    .tips { grid-template-columns: 1fr; }
  }
</style>
