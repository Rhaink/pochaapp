<script>
  import { lang, tt, UI } from './lib/i18n.js';
  import { theme } from './lib/store.js';
  import { route, go } from './lib/router.js';
  import data from './lib/data/m4.json';

  import Home from './views/Home.svelte';
  import Meta from './views/Meta.svelte';
  import Roster from './views/Roster.svelte';
  import Cleanup from './views/Cleanup.svelte';
  import Teams from './views/Teams.svelte';
  import Strategy from './views/Strategy.svelte';
  import Builds from './views/Builds.svelte';
  import TierList from './views/TierList.svelte';
  import Recruit from './views/Recruit.svelte';
  import Climb from './views/Climb.svelte';
  import Scout from './views/Scout.svelte';
  import System from './views/System.svelte';
  import Plan from './views/Plan.svelte';
  import SearchOverlay from './views/SearchOverlay.svelte';

  const views = { home: Home, meta: Meta, roster: Roster, cleanup: Cleanup, teams: Teams, strategy: Strategy, builds: Builds, tierlist: TierList, recruit: Recruit, climb: Climb, scout: Scout, system: System, plan: Plan };

  // Destinos primarios (bottom bar en móvil). El resto vive en el sidebar / búsqueda.
  const primary = ['home', 'meta', 'teams', 'strategy', 'builds'];
  const secondary = ['roster', 'tierlist', 'cleanup', 'recruit', 'climb', 'scout', 'system', 'plan'];
  const icons = { home: '◆', meta: '📊', roster: '📦', cleanup: '🧹', teams: '⚔️', strategy: '🧠', builds: '🛠️', tierlist: '🏆', recruit: '🎯', climb: '📈', scout: '🔭', system: '⚙️', plan: '🗺️' };

  let searchOpen = false;

  function toggleTheme() {
    theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }
  function toggleLang() {
    lang.update((l) => (l === 'es' ? 'en' : 'es'));
  }

  $: L = $lang;
  $: CurrentView = views[$route] || Home;

  function onKey(e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchOpen = true;
    }
  }
</script>

<svelte:window on:keydown={onKey} />

<div class="shell">
  <!-- Sidebar (PC / laptop) -->
  <aside class="sidebar">
    <div class="brand">
      <span class="logo pixel">P</span>
      <div>
        <div class="brand-name">{tt(UI.appName, L)}</div>
        <div class="brand-sub">{tt(UI.tagline, L)}</div>
      </div>
    </div>

    <nav class="side-nav">
      {#each [...primary, ...secondary] as r}
        <button class="side-link" class:active={$route === r} on:click={() => go(r)}>
          <span class="ico">{icons[r]}</span>
          <span>{tt(UI.nav[r], L)}</span>
        </button>
      {/each}
    </nav>

    <div class="side-foot">
      <span class="chip-tag">M-4 · Reg {data.season.regulation}</span>
    </div>
  </aside>

  <div class="main">
    <!-- Topbar -->
    <header class="topbar">
      <button class="mini-brand" on:click={() => go('home')}>
        <span class="logo pixel">P</span>
      </button>

      <button class="search-trigger" on:click={() => (searchOpen = true)}>
        <span class="mag">⌕</span>
        <span class="ph">{tt(UI.search, L)}</span>
        <kbd>⌘K</kbd>
      </button>

      <div class="top-actions">
        <button class="toggle" on:click={toggleLang} title="ES / EN">
          <span class:on={L === 'es'}>ES</span><span class="sep">/</span><span class:on={L === 'en'}>EN</span>
        </button>
        <button class="icon-btn" on:click={toggleTheme} title="Tema">
          {$theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>
    </header>

    <main class="content">
      <svelte:component this={CurrentView} {data} />
    </main>
  </div>

  <!-- Bottom tab bar (móvil) -->
  <nav class="tabbar">
    {#each primary as r}
      <button class="tab" class:active={$route === r} on:click={() => go(r)}>
        <span class="tab-ico">{icons[r]}</span>
        <span class="tab-lbl">{tt(UI.nav[r], L)}</span>
      </button>
    {/each}
    <button class="tab" on:click={() => (searchOpen = true)}>
      <span class="tab-ico">⌕</span>
      <span class="tab-lbl">{L === 'es' ? 'Buscar' : 'Search'}</span>
    </button>
  </nav>

  {#if searchOpen}
    <SearchOverlay {data} on:close={() => (searchOpen = false)} />
  {/if}
</div>

<style>
  .shell { min-height: 100dvh; display: flex; }

  /* --- Sidebar (PC) --- */
  .sidebar {
    position: fixed; inset: 0 auto 0 0;
    width: var(--sidebar-w);
    padding: 18px 14px;
    background: color-mix(in srgb, var(--surface) 92%, transparent);
    border-right: 1px solid var(--line);
    backdrop-filter: blur(10px);
    display: flex; flex-direction: column; gap: 18px;
    z-index: 20;
  }
  .brand { display: flex; align-items: center; gap: 12px; padding: 6px 8px; }
  .logo {
    display: grid; place-items: center;
    width: 40px; height: 40px; border-radius: 11px;
    background: linear-gradient(135deg, var(--cyan), var(--violet));
    color: #061018; font-size: 16px;
  }
  .brand-name { font-family: var(--font-display); font-weight: 700; font-size: 17px; }
  .brand-sub { font-size: 11px; color: var(--muted); }
  .side-nav { display: flex; flex-direction: column; gap: 4px; flex: 1; }
  .side-link {
    display: flex; align-items: center; gap: 12px;
    padding: 11px 12px; border-radius: var(--r-sm);
    background: transparent; border: 1px solid transparent; color: var(--muted);
    font-size: 14.5px; font-weight: 600; text-align: left; width: 100%;
    transition: background .15s, color .15s;
  }
  .side-link:hover { background: var(--surface-2); color: var(--text); }
  .side-link.active {
    background: var(--accent-soft); color: var(--text);
    border-color: color-mix(in srgb, var(--accent) 40%, transparent);
  }
  .side-link .ico { font-size: 16px; width: 20px; text-align: center; }
  .side-foot { padding: 0 6px; }

  /* --- Main column --- */
  .main { flex: 1; margin-left: var(--sidebar-w); min-width: 0; }
  .topbar {
    position: sticky; top: 0; z-index: 15;
    display: flex; align-items: center; gap: 12px;
    padding: 12px max(14px, env(safe-area-inset-right)) 12px 20px;
    padding-top: calc(12px + var(--safe-t));
    background: color-mix(in srgb, var(--bg) 82%, transparent);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--line);
  }
  .mini-brand { display: none; background: none; border: none; padding: 0; }
  .search-trigger {
    flex: 1; max-width: 460px;
    display: flex; align-items: center; gap: 10px;
    padding: 10px 14px; border-radius: 999px;
    background: var(--surface); border: 1px solid var(--line); color: var(--faint);
    font-size: 14px;
  }
  .search-trigger:hover { border-color: var(--line-hi); }
  .search-trigger .mag { font-size: 17px; }
  .search-trigger .ph { flex: 1; text-align: left; }
  .search-trigger kbd {
    font-family: var(--font-body); font-size: 11px; color: var(--faint);
    background: var(--surface-2); border: 1px solid var(--line);
    border-radius: 6px; padding: 2px 6px;
  }
  .top-actions { display: flex; align-items: center; gap: 8px; margin-left: auto; }
  .toggle {
    display: flex; align-items: center; gap: 4px;
    padding: 7px 12px; border-radius: 999px;
    background: var(--surface); border: 1px solid var(--line);
    color: var(--faint); font-weight: 700; font-size: 12px;
  }
  .toggle .on { color: var(--accent); }
  .toggle .sep { opacity: .4; }
  .icon-btn {
    width: 38px; height: 38px; border-radius: 50%;
    background: var(--surface); border: 1px solid var(--line);
    color: var(--text); font-size: 16px;
  }
  .content {
    max-width: var(--maxw); margin: 0 auto;
    padding: 22px 20px calc(96px + var(--safe-b));
  }

  /* --- Bottom tab bar (móvil) --- */
  .tabbar { display: none; }

  @media (max-width: 860px) {
    .sidebar { display: none; }
    .main { margin-left: 0; }
    .mini-brand { display: grid; }
    .search-trigger kbd { display: none; }
    .content { padding: 16px 14px calc(90px + var(--safe-b)); }

    .tabbar {
      position: fixed; inset: auto 0 0 0; z-index: 30;
      display: grid; grid-auto-flow: column; grid-auto-columns: 1fr;
      padding: 8px 6px calc(8px + var(--safe-b));
      background: color-mix(in srgb, var(--surface) 94%, transparent);
      border-top: 1px solid var(--line);
      backdrop-filter: blur(14px);
    }
    .tab {
      display: flex; flex-direction: column; align-items: center; gap: 3px;
      background: none; border: none; color: var(--faint);
      padding: 4px 2px; border-radius: 10px;
    }
    .tab-ico { font-size: 19px; line-height: 1; }
    .tab-lbl { font-size: 10.5px; font-weight: 600; }
    .tab.active { color: var(--accent); }
  }
</style>
