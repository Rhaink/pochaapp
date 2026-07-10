<script>
  import { lang, tt } from '../lib/i18n.js';
  import Sprite from '../lib/Sprite.svelte';
  import SectionHead from '../lib/SectionHead.svelte';

  export let data;
  $: L = $lang;
  const rc = data.recruit;
</script>

<SectionHead eyebrow={rc.eyebrow} title={rc.title} sub={rc.sub} />

<div class="target card">
  <div class="t-sprite"><Sprite id={rc.target.sprite} size={88} alt={rc.target.name} bob /></div>
  <div class="t-info">
    <h3>{rc.target.name}</h3>
    <span class="types">{tt(rc.target.types, L)}</span>
    <span class="role">{tt(rc.target.role, L)}</span>
    <p>{tt(rc.target.why, L)}</p>
  </div>
</div>

<div class="routes">
  {#each rc.routes as r}
    <article class="route card" class:best={r.best}>
      <header class="r-head">
        <h4>{tt(r.title, L)}</h4>
        <span class="r-tag" class:best={r.best}>{tt(r.tag, L)}</span>
      </header>
      <ol>
        {#each tt(r.steps, L) as step}<li>{step}</li>{/each}
      </ol>
    </article>
  {/each}
</div>

<div class="facts">
  {#each tt(rc.facts, L) as f}
    <div class="fact"><span class="fv">{f[0]}</span><span class="fl">{f[1]}</span></div>
  {/each}
</div>

<style>
  .target { display: flex; gap: 18px; padding: 20px; margin-bottom: 18px; align-items: center; }
  .t-sprite { flex: 0 0 auto; background: var(--surface-2); border: 1px solid var(--line); border-radius: 16px; padding: 6px; }
  .t-info h3 { font-size: 22px; }
  .types { display: inline-block; font-size: 12px; font-weight: 700; color: var(--violet); margin: 4px 0; }
  .role { display: block; font-size: 12.5px; color: var(--gold); font-weight: 600; margin-bottom: 8px; }
  .t-info p { color: var(--muted); font-size: 13.5px; line-height: 1.55; margin: 0; }

  .routes { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px; }
  .route { padding: 18px; }
  .route.best { border-color: color-mix(in srgb, var(--green) 50%, var(--line)); }
  .r-head { display: flex; align-items: center; gap: 10px; justify-content: space-between; margin-bottom: 12px; }
  .r-head h4 { font-size: 15px; }
  .r-tag { flex: 0 0 auto; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: var(--muted); background: var(--surface-2); border: 1px solid var(--line); padding: 3px 9px; border-radius: 999px; }
  .r-tag.best { color: var(--green); border-color: var(--green); background: color-mix(in srgb, var(--green) 14%, transparent); }
  .route ol { margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 9px; }
  .route li { font-size: 13px; line-height: 1.5; color: var(--text); }

  .facts { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
  .fact { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 14px 12px; text-align: center; }
  .fv { display: block; font-family: var(--font-display); font-size: 24px; font-weight: 700; color: var(--accent); }
  .fl { font-size: 11px; color: var(--muted); line-height: 1.3; }

  @media (max-width: 640px) {
    .routes { grid-template-columns: 1fr; }
    .facts { grid-template-columns: 1fr 1fr; }
  }
</style>
