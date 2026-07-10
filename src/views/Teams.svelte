<script>
  import { lang, tt, UI } from '../lib/i18n.js';
  import Sprite from '../lib/Sprite.svelte';
  import SectionHead from '../lib/SectionHead.svelte';

  export let data;
  $: L = $lang;

  const clsColor = { singles: 'var(--cyan)', sun: 'var(--gold)', rain: 'var(--blue)' };

  // Objeto por Pokémon (desde builds) + conocidos sin build. Solo el nombre ES corto.
  const itemBySprite = {};
  for (const b of data.builds) itemBySprite[b.sprite] = b.item;
  const extra = { 10034: 'Charizardita X · Charizardite X', 1013: 'Baya Zonora · Kasib Berry', 324: 'Carbón · Charcoal', 10041: 'Gyaradosita · Gyaradosite' };
  for (const [k, v] of Object.entries(extra)) if (!itemBySprite[k]) itemBySprite[k] = v;
  const nameBySprite = {};
  for (const b of data.builds) nameBySprite[b.sprite] = b.name + (b.form ? ' ' + b.form : '');
  for (const m of data.roster) if (!nameBySprite[m.sprite]) nameBySprite[m.sprite] = m.name + (m.form ? ' ' + m.form : '');

  const shortItem = (id) => {
    const it = itemBySprite[id];
    return it ? it.split('·')[0].trim() : '—';
  };
  const monName = (id) => nameBySprite[id] || '';
</script>

<SectionHead
  eyebrow={{ es: 'Equipos · usa tus espacios', en: 'Teams · use your slots' }}
  title={{ es: 'Composiciones recomendadas', en: 'Recommended compositions' }}
  sub={{ es: 'Cada Pokémon lleva su objeto (sin repetir en el equipo — Item Clause). La caja crece con tu rango: activa uno por espacio y guarda el resto como Réplica.', en: 'Each Pokémon shows its item (no repeats per team — Item Clause). Your box grows with rank: activate one per slot, save the rest as Replica.' }} />

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
          <div class="lu">
            <Sprite id={id} size={54} alt={monName(id)} bob />
            <span class="lu-name">{monName(id)}</span>
            <span class="lu-item">{shortItem(id)}</span>
          </div>
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
        {#each a.mons as id}
          <div class="am" title="{monName(id)} · {shortItem(id)}"><Sprite id={id} size={38} alt="" /></div>
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
  .lineup { display: grid; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); gap: 8px; margin-bottom: 14px; }
  .lu { display: flex; flex-direction: column; align-items: center; gap: 2px; background: var(--surface-2); border: 1px solid var(--line); border-radius: 12px; padding: 8px 4px; }
  .lu-name { font-size: 11px; font-weight: 700; text-align: center; line-height: 1.1; }
  .lu-item { font-size: 10px; color: var(--gold); text-align: center; line-height: 1.15; }
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
</style>
