<script>
  import { lang, tt, UI } from '../lib/i18n.js';
  import Sprite from '../lib/Sprite.svelte';
  import SectionHead from '../lib/SectionHead.svelte';

  export let data;
  $: L = $lang;

  const clsColor = { singles: 'var(--cyan)', sun: 'var(--gold)', rain: 'var(--blue)' };
</script>

<SectionHead
  eyebrow={{ es: 'Equipos · usa tus espacios', en: 'Teams · use your slots' }}
  title={{ es: 'Composiciones recomendadas', en: 'Recommended compositions' }}
  sub={{ es: 'La caja crece con tu rango: activa un equipo por espacio y guarda el resto como Réplica (código gratis).', en: 'Your box grows with rank: activate one team per slot and save the rest as Replica (free code).' }} />

<div class="teams">
  {#each data.teams as t}
    <article class="team card" style="--tc:{clsColor[t.cls]}">
      <header class="team-head">
        <span class="slotno">{tt(UI.labels.slot, L)} {t.slot}</span>
        <div class="team-title">
          <h3>{tt(t.name, L)}</h3>
          <div class="team-meta">
            <span class="chip-tag">{tt(t.format, L)}</span>
            <span class="chip-tag diff">{tt(t.difficulty, L)}</span>
          </div>
        </div>
      </header>
      <div class="lineup">
        {#each t.mons as id}
          <div class="lu"><Sprite id={id} size={56} alt="" bob /></div>
        {/each}
      </div>
      <p class="strat">{tt(t.strat, L)}</p>
      <div class="tags">
        {#each tt(t.tags, L) as tag}<span class="tag">{tag}</span>{/each}
      </div>
    </article>
  {/each}
</div>

<h3 class="alt-h">{tt(UI.labels.altTeams, L)}</h3>
<div class="alts">
  {#each data.altTeams as a}
    <div class="alt card">
      <div class="alt-top">
        <h4>{tt(a.name, L)}</h4>
        <span class="chip-tag">{tt(a.fmt, L)}</span>
      </div>
      <div class="alt-line">
        {#each a.mons as id, i}
          <div class="am"><Sprite id={id} size={40} alt="" /></div>
        {/each}
      </div>
      {#if a.miss.length}
        <div class="miss">{tt(UI.labels.missing, L)}: {a.miss.join(', ')}</div>
      {:else}
        <div class="ready">✓ {L === 'es' ? 'Tienes todas las piezas' : 'You have all pieces'}</div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .teams { display: grid; grid-template-columns: 1fr; gap: 14px; margin-bottom: 28px; }
  .team { padding: 20px; border-left: 4px solid var(--tc); }
  .team-head { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 16px; }
  .slotno { flex: 0 0 auto; font-family: var(--font-display); font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: .08em; color: var(--tc); background: color-mix(in srgb, var(--tc) 14%, transparent); padding: 6px 10px; border-radius: 8px; }
  .team-title h3 { font-size: 19px; }
  .team-meta { display: flex; gap: 6px; margin-top: 6px; }
  .diff { color: var(--tc); border-color: color-mix(in srgb, var(--tc) 40%, transparent); }
  .lineup { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
  .lu { background: var(--surface-2); border: 1px solid var(--line); border-radius: 12px; padding: 6px; }
  .strat { color: var(--muted); font-size: 14px; line-height: 1.55; margin: 0 0 12px; }
  .tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .tag { font-size: 11.5px; font-weight: 600; padding: 4px 10px; border-radius: 999px; background: var(--surface-2); border: 1px solid var(--line); color: var(--muted); }

  .alt-h { font-size: 16px; margin-bottom: 14px; }
  .alts { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
  .alt { padding: 16px; }
  .alt-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 12px; }
  .alt-top h4 { font-size: 14.5px; }
  .alt-line { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px; }
  .am { background: var(--surface-2); border-radius: 8px; padding: 3px; }
  .miss { font-size: 12px; color: var(--red); font-weight: 600; }
  .ready { font-size: 12px; color: var(--green); font-weight: 600; }

  @media (min-width: 720px) { .teams { grid-template-columns: 1fr; } }
</style>
