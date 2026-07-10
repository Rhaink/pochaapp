/**
 * Estado persistente del usuario (localStorage — ahora SÍ funciona porque ya no
 * vivimos dentro de un artifact de Claude). Cada store se auto-serializa.
 */
import { writable } from 'svelte/store';

function persisted(key, initial) {
  let start = initial;
  if (typeof localStorage !== 'undefined') {
    const raw = localStorage.getItem(key);
    if (raw != null) {
      try { start = JSON.parse(raw); } catch { /* valor corrupto: usa initial */ }
    }
  }
  const store = writable(start);
  store.subscribe((v) => {
    if (typeof localStorage !== 'undefined') localStorage.setItem(key, JSON.stringify(v));
  });
  return store;
}

// Tema claro/oscuro.
export const theme = persisted('pocha:theme', 'dark');
theme.subscribe((v) => {
  if (typeof document !== 'undefined') document.documentElement.dataset.theme = v;
});

// Checklists: sets de identificadores marcados.
export const trained = persisted('pocha:trained', []);   // nombres de Pokémon entrenados
export const bought = persisted('pocha:bought', []);     // objetos comprados
export const scouted = persisted('pocha:scouted', []);   // objetivos de scout conseguidos

// Rango actual del jugador (índice de tier + subrango) para calcular espacios de caja.
export const rank = persisted('pocha:rank', { tier: 1, sub: 4 });

// Sesión de ranked: racha actual (para el truco del +2/4).
export const session = persisted('pocha:session', { streak: 0, wins: 0, losses: 0 });

/** Alterna un valor dentro de un store de tipo array (checklist). */
export function toggleIn(store, id) {
  store.update((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));
}

export function resetProgress() {
  trained.set([]);
  bought.set([]);
  scouted.set([]);
  session.set({ streak: 0, wins: 0, losses: 0 });
}
