<script>
  import { lang, tt } from './i18n.js';
  export let eyebrow = '';
  export let title = '';
  export let sub = '';
  $: L = $lang;
</script>

<header class="sh">
  {#if eyebrow}<span class="eyebrow">{tt(eyebrow, L)}</span>{/if}
  <h2>{tt(title, L)}</h2>
  {#if sub}<p class="sub">{tt(sub, L)}</p>{/if}
</header>

<style>
  .sh { margin: 4px 0 18px; }
  h2 { font-size: clamp(22px, 5vw, 30px); letter-spacing: -.01em; margin-top: 6px; }
  .sub { color: var(--muted); font-size: 14.5px; margin: 8px 0 0; max-width: 62ch; line-height: 1.5; }
</style>
