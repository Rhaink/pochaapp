<script>
  import { lang, tt, UI } from '../lib/i18n.js';
  import { rank, session } from '../lib/store.js';
  import { go } from '../lib/router.js';

  export let data;
  $: L = $lang;

  // Espacios de equipo: son 3 fijos (1 Singles + 2 Dobles). Lo que crece con el
  // rango es la CAJA (almacenamiento), no los espacios. El resto de variantes se
  // guardan gratis como Códigos de Equipo Réplica.
  const tiers = data.system.ranking.tiers;
  $: tierName = tiers[$rank.tier] || tiers[1];
  const slots = 3;

  $: doubleFill = $session.streak >= 3;

  function win() {
    session.update((s) => ({ streak: s.streak + 1, wins: s.wins + 1, losses: s.losses }));
  }
  function loss() {
    session.update((s) => ({ streak: 0, wins: s.wins, losses: s.losses + 1 }));
  }
  function resetSession() {
    session.set({ streak: 0, wins: 0, losses: 0 });
  }
  function setTier(i) {
    rank.set({ tier: i, sub: 4 });
  }

  // "Qué hacer hoy": derivado del plan + estado.
  $: firstPlan = data.plan[0];
</script>

<section class="hero card">
  <div class="hero-txt">
    <span class="eyebrow">{tt(data.season.note, L).split('.')[0]}.</span>
    <h1>{L === 'es' ? 'Tu ruta a Máster' : 'Your road to Master'}</h1>
    <p>{tt(data.meta.summary, L)}</p>
    <div class="hero-chips">
      <span class="chip-tag">M-4 · Reg {data.season.regulation}</span>
      <span class="chip-tag">{data.season.rosterSize} Pokémon</span>
      <span class="chip-tag">{tt(UI.labels.singles, L)} + {tt(UI.labels.doubles, L)}</span>
    </div>
  </div>
</section>

<div class="grid">
  <!-- Rango + espacios -->
  <div class="card pad">
    <h3>{tt(UI.home.yourRank, L)}</h3>
    <div class="rank-pills">
      {#each tiers as t, i}
        <button class="rank-pill" class:on={$rank.tier === i} on:click={() => setTier(i)}>{t}</button>
      {/each}
    </div>
    <div class="slotbox">
      <div class="slotnum">{slots}</div>
      <div>
        <div class="slotlabel">{tt(UI.home.boxSlots, L)}</div>
        <div class="slothint">{L === 'es' ? '1 Singles + 2 Dobles · guarda variantes como Réplica' : '1 Singles + 2 Doubles · save variants as Replica'}</div>
      </div>
    </div>
  </div>

  <!-- Sesión de ranked -->
  <div class="card pad">
    <h3>{tt(UI.home.streakTitle, L)}</h3>
    <p class="muted-sm">{tt(UI.home.streakHint, L)}</p>
    <div class="streak-row" class:hot={doubleFill}>
      <div class="streak-num">🔥 {$session.streak}</div>
      <div class="streak-meta">
        <span>{$session.wins}V · {$session.losses}D</span>
        {#if doubleFill}<span class="hot-tag">{tt(UI.home.doubleFill, L)}</span>{/if}
      </div>
    </div>
    <div class="btn-row">
      <button class="btn win" on:click={win}>+ {tt(UI.home.win, L)}</button>
      <button class="btn loss" on:click={loss}>− {tt(UI.home.loss, L)}</button>
      <button class="btn ghost" on:click={resetSession}>{tt(UI.home.reset, L)}</button>
    </div>
  </div>

  <!-- Qué hacer hoy -->
  <div class="card pad wide">
    <h3>{tt(UI.home.today, L)}</h3>
    <ol class="today">
      {#each tt(firstPlan.steps, L) as step}
        <li>{step}</li>
      {/each}
    </ol>
    <button class="link-btn" on:click={() => go('plan')}>{L === 'es' ? 'Ver plan completo →' : 'See full plan →'}</button>
  </div>

  <!-- Accesos rápidos -->
  <div class="card pad wide quick">
    <button class="qbtn" on:click={() => go('teams')}><span>⚔️</span>{L === 'es' ? 'Mis equipos' : 'My teams'}</button>
    <button class="qbtn" on:click={() => go('scout')}><span>🔭</span>Scout</button>
    <button class="qbtn" on:click={() => go('roster')}><span>📦</span>Roster</button>
    <button class="qbtn" on:click={() => go('builds')}><span>🛠️</span>Builds</button>
  </div>
</div>

<style>
  .hero {
    padding: 26px; margin-bottom: 16px;
    background:
      radial-gradient(600px 300px at 90% -40%, color-mix(in srgb, var(--violet) 22%, transparent), transparent),
      linear-gradient(180deg, var(--surface-2), var(--surface));
    overflow: hidden;
  }
  .hero h1 { font-size: clamp(26px, 6vw, 40px); margin: 8px 0 10px; letter-spacing: -.02em; }
  .hero p { color: var(--muted); max-width: 60ch; line-height: 1.55; margin: 0 0 16px; font-size: 15px; }
  .hero-chips { display: flex; flex-wrap: wrap; gap: 8px; }

  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .wide { grid-column: 1 / -1; }
  .pad { padding: 20px; }
  .card h3 { font-size: 16px; margin-bottom: 12px; }
  .muted-sm { color: var(--muted); font-size: 13px; margin: -6px 0 12px; line-height: 1.45; }

  .rank-pills { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
  .rank-pill {
    padding: 6px 11px; border-radius: 999px; font-size: 12px; font-weight: 600;
    background: var(--surface-2); border: 1px solid var(--line); color: var(--muted);
  }
  .rank-pill.on { background: var(--accent-soft); border-color: var(--accent); color: var(--text); }
  .slotbox { display: flex; align-items: center; gap: 14px; padding: 12px; background: var(--surface-2); border-radius: var(--r-sm); }
  .slotnum { font-family: var(--font-display); font-size: 40px; font-weight: 700; color: var(--accent); line-height: 1; }
  .slotlabel { font-weight: 600; }
  .slothint { color: var(--muted); font-size: 13px; }

  .streak-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: var(--surface-2); border-radius: var(--r-sm); margin-bottom: 12px; border: 1px solid transparent; }
  .streak-row.hot { border-color: var(--gold); background: color-mix(in srgb, var(--gold) 12%, var(--surface-2)); }
  .streak-num { font-size: 26px; font-weight: 700; font-family: var(--font-display); }
  .streak-meta { text-align: right; font-size: 13px; color: var(--muted); display: flex; flex-direction: column; gap: 3px; }
  .hot-tag { color: var(--gold); font-weight: 700; font-size: 12px; }
  .btn-row { display: flex; gap: 8px; }
  .btn { flex: 1; padding: 10px; border-radius: var(--r-sm); border: 1px solid var(--line); font-weight: 700; font-size: 13px; background: var(--surface-2); color: var(--text); }
  .btn.win { background: color-mix(in srgb, var(--green) 18%, transparent); border-color: var(--green); color: var(--green); }
  .btn.loss { background: color-mix(in srgb, var(--red) 15%, transparent); border-color: var(--red); color: var(--red); }
  .btn.ghost { flex: 0 0 auto; color: var(--muted); }

  .today { margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 8px; }
  .today li { color: var(--text); font-size: 14px; line-height: 1.45; }
  .link-btn { margin-top: 12px; background: none; border: none; color: var(--accent); font-weight: 700; font-size: 14px; padding: 0; }

  .quick { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
  .qbtn { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px 8px; border-radius: var(--r-sm); background: var(--surface-2); border: 1px solid var(--line); color: var(--text); font-weight: 600; font-size: 13px; }
  .qbtn span { font-size: 22px; }

  @media (max-width: 620px) {
    .grid { grid-template-columns: 1fr; }
    .quick { grid-template-columns: repeat(2, 1fr); }
  }
</style>
