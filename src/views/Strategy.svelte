<script>
  import { lang, tt } from '../lib/i18n.js';
  import Sprite from '../lib/Sprite.svelte';
  import SectionHead from '../lib/SectionHead.svelte';

  export let data;
  $: L = $lang;
  const s = data.strategy;
  const clsColor = { singles: 'var(--cyan)', sun: 'var(--gold)', rain: 'var(--blue)' };

  let openTeam = 0; // primer equipo abierto por defecto
</script>

<SectionHead
  eyebrow={{ es: 'Estrategia · camino a Máster', en: 'Strategy · road to Master' }}
  title={{ es: 'Cómo jugar y pensar cada partida', en: 'How to play and think each game' }}
  sub={{ es: 'El método general para leer al rival y decidir turno a turno, más una guía profunda de tus 3 equipos.', en: 'The general method to read the opponent and decide turn by turn, plus a deep guide to your 3 teams.' }} />

<div class="disclaimer card">
  <span class="d-ico">ⓘ</span>
  <p>{tt(s.disclaimer, L)}</p>
</div>

<!-- Método general -->
<h3 class="block-h">{L === 'es' ? 'El método (aplica a todo)' : 'The method (applies to everything)'}</h3>
<p class="block-sub">{tt(s.general.intro, L)}</p>
<div class="steps">
  {#each s.general.steps as st}
    <div class="step card">
      <span class="step-ico">{st.icon}</span>
      <div>
        <div class="step-t">{tt(st.title, L)}</div>
        <div class="step-b">{tt(st.body, L)}</div>
      </div>
    </div>
  {/each}
</div>

<!-- Guías por equipo -->
<h3 class="block-h">{L === 'es' ? 'Guía de tus 3 equipos' : 'Guide to your 3 teams'}</h3>
<div class="tguides">
  {#each s.teams as t, i}
    <article class="tguide card" style="--tc:{clsColor[t.cls]}">
      <button class="tg-head" on:click={() => (openTeam = openTeam === i ? -1 : i)}>
        <div class="tg-title">
          <span class="tg-slot">{L === 'es' ? 'Espacio' : 'Slot'} {t.slot}</span>
          <h4>{tt(t.name, L)}</h4>
          <span class="tg-fmt">{tt(t.format, L)}</span>
        </div>
        <span class="chev" class:open={openTeam === i}>▾</span>
      </button>

      {#if openTeam === i}
        <div class="tg-body">
          <div class="tg-win">
            <span class="lbl">{L === 'es' ? 'Condición de victoria' : 'Win condition'}</span>
            <p>{tt(t.winCondition, L)}</p>
          </div>

          <div class="tg-sec">
            <span class="lbl">{L === 'es' ? 'Rol de cada Pokémon' : "Each Pokémon's role"}</span>
            <div class="roles">
              {#each t.roles as r}
                <div class="role">
                  <Sprite id={r.sprite} size={44} alt={r.name} />
                  <div><b>{r.name}</b><span>{tt(r.role, L)}</span></div>
                </div>
              {/each}
            </div>
          </div>

          <div class="tg-sec">
            <span class="lbl">{L === 'es' ? 'Leads recomendados' : 'Recommended leads'}</span>
            {#each t.leads as ld}
              <div class="lead">
                <div class="lead-mons">{ld.mons.join(' + ')}</div>
                <div class="lead-when">{tt(ld.when, L)}</div>
              </div>
            {/each}
          </div>

          <div class="tg-sec">
            <span class="lbl">{L === 'es' ? 'Leer el Team Preview' : 'Reading Team Preview'}</span>
            <p class="ptext">{tt(t.preview, L)}</p>
          </div>

          <div class="tg-sec">
            <span class="lbl">{L === 'es' ? 'Turno a turno' : 'Turn by turn'}</span>
            <div class="flow">
              {#each tt(t.flow, L) as ph}
                <div class="phase"><span class="ph-name">{ph[0]}</span><span class="ph-text">{ph[1]}</span></div>
              {/each}
            </div>
          </div>

          <div class="tg-sec">
            <span class="lbl">{L === 'es' ? 'Cómo responder a cada arquetipo' : 'How to answer each archetype'}</span>
            <div class="vsarch">
              {#each t.vs as v}
                <div class="varch"><span class="varch-n">{tt(v.arch, L)}</span><span class="varch-t">{tt(v.how, L)}</span></div>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    </article>
  {/each}
</div>

<style>
  .disclaimer { display: flex; gap: 12px; padding: 14px 16px; margin-bottom: 22px; border-left: 3px solid var(--accent); align-items: flex-start; }
  .d-ico { color: var(--accent); font-size: 18px; flex: 0 0 auto; }
  .disclaimer p { margin: 0; font-size: 12.5px; line-height: 1.55; color: var(--muted); }

  .block-h { font-size: 18px; margin: 4px 0 6px; }
  .block-sub { color: var(--muted); font-size: 13.5px; line-height: 1.5; margin: 0 0 14px; }

  .steps { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 30px; }
  .step { display: flex; gap: 12px; padding: 15px; align-items: flex-start; }
  .step-ico { font-size: 22px; flex: 0 0 auto; }
  .step-t { font-weight: 700; font-size: 14px; margin-bottom: 5px; }
  .step-b { font-size: 12.5px; color: var(--muted); line-height: 1.5; }

  .tguides { display: flex; flex-direction: column; gap: 12px; }
  .tguide { overflow: hidden; border-left: 4px solid var(--tc); }
  .tg-head { width: 100%; display: flex; align-items: center; gap: 12px; padding: 16px 18px; background: none; border: none; color: var(--text); text-align: left; }
  .tg-title { flex: 1; display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
  .tg-slot { font-family: var(--font-display); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--tc); background: color-mix(in srgb, var(--tc) 14%, transparent); padding: 4px 9px; border-radius: 8px; }
  .tg-title h4 { font-size: 17px; }
  .tg-fmt { font-size: 12px; color: var(--muted); }
  .chev { color: var(--faint); transition: transform .2s; }
  .chev.open { transform: rotate(180deg); }

  .tg-body { padding: 0 18px 18px; display: flex; flex-direction: column; gap: 18px; }
  .lbl { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: .07em; color: var(--tc); font-weight: 700; margin-bottom: 8px; }
  .tg-win p, .ptext { margin: 0; font-size: 13.5px; line-height: 1.6; color: var(--text); }
  .tg-win { background: color-mix(in srgb, var(--tc) 8%, transparent); border-radius: var(--r-sm); padding: 12px 14px; }

  .roles { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .role { display: flex; gap: 10px; align-items: center; background: var(--surface-2); border-radius: var(--r-sm); padding: 8px 10px; }
  .role b { display: block; font-size: 13px; }
  .role span { font-size: 11.5px; color: var(--muted); line-height: 1.35; }

  .lead { background: var(--surface-2); border-radius: var(--r-sm); padding: 10px 12px; margin-bottom: 8px; }
  .lead-mons { font-weight: 700; font-size: 13px; color: var(--tc); margin-bottom: 3px; }
  .lead-when { font-size: 12.5px; color: var(--muted); line-height: 1.45; }

  .flow { display: flex; flex-direction: column; gap: 8px; }
  .phase { display: grid; grid-template-columns: 92px 1fr; gap: 10px; align-items: baseline; }
  .ph-name { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .05em; color: var(--tc); }
  .ph-text { font-size: 12.5px; color: var(--muted); line-height: 1.5; }

  .vsarch { display: flex; flex-direction: column; gap: 8px; }
  .varch { display: grid; grid-template-columns: 120px 1fr; gap: 10px; align-items: baseline; }
  .varch-n { font-size: 12.5px; font-weight: 700; }
  .varch-t { font-size: 12.5px; color: var(--muted); line-height: 1.5; }

  @media (max-width: 640px) {
    .steps, .roles { grid-template-columns: 1fr; }
    .phase, .varch { grid-template-columns: 1fr; gap: 2px; }
    .ph-name, .varch-n { color: var(--tc); }
  }
</style>
