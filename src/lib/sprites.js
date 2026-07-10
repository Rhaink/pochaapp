/**
 * Sprites vía PokéAPI. Ya no incrustamos base64: el service worker cachea las
 * imágenes (CacheFirst) para que funcionen offline tras la primera carga.
 * Las formas regionales/Mega usan IDs 10xxx.
 */
const BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

// Poké Ball SVG de reserva (inline) para cuando no hay id o falla la carga.
export const BALL =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#e8ecf7" stroke="#26304f" stroke-width="4"/><path d="M4 50a46 46 0 0 1 92 0z" fill="#ff6b7d"/><rect x="4" y="46" width="92" height="8" fill="#26304f"/><circle cx="50" cy="50" r="14" fill="#fff" stroke="#26304f" stroke-width="4"/></svg>`
  );

export function spriteUrl(id) {
  return id ? `${BASE}${id}.png` : BALL;
}
