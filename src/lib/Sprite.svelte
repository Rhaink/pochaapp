<script>
  import { spriteUrl, BALL } from './sprites.js';

  export let id = 0;
  export let size = 56;
  export let alt = '';
  export let bob = false;

  let src = spriteUrl(id);
  $: src = spriteUrl(id);

  function onError(e) {
    if (e.target.src !== BALL) e.target.src = BALL;
  }
</script>

<img
  class="sprite {bob ? 'bob' : ''}"
  {src}
  {alt}
  width={size}
  height={size}
  loading="lazy"
  decoding="async"
  on:error={onError}
  style="width:{size}px;height:{size}px"
/>
