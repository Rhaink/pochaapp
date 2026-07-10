/**
 * Sistema de idioma (mismo patrón que la v3).
 * - `L` es el idioma activo, reactivo vía store de Svelte.
 * - `tt(o)` devuelve o[L] si es {es,en}; si no, lo devuelve tal cual.
 * - Los términos del juego (movimientos, objetos, habilidades) NO se traducen:
 *   viajan siempre bilingües inline ("Español · English").
 */
import { writable, get } from 'svelte/store';

const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('pocha:lang') : null;
export const lang = writable(stored === 'en' ? 'en' : 'es');

lang.subscribe((v) => {
  if (typeof localStorage !== 'undefined') localStorage.setItem('pocha:lang', v);
  if (typeof document !== 'undefined') document.documentElement.lang = v;
});

/** Traduce un objeto {es,en} al idioma actual. Acepta strings tal cual. */
export function tt(o, L) {
  const cur = L || get(lang);
  if (o && typeof o === 'object' && ('es' in o || 'en' in o)) return o[cur] ?? o.es ?? o.en;
  return o;
}

// Cadenas de la interfaz (chrome de la app, no contenido de datos).
export const UI = {
  appName: { es: 'Pocha', en: 'Pocha' },
  tagline: { es: 'Ascenso Champions M-4', en: 'Champions M-4 Climb' },
  search: { es: 'Buscar Pokémon, build, objeto…', en: 'Search Pokémon, build, item…' },
  nav: {
    home: { es: 'Inicio', en: 'Home' },
    meta: { es: 'Meta', en: 'Meta' },
    roster: { es: 'Roster', en: 'Roster' },
    cleanup: { es: 'Depurar', en: 'Cleanup' },
    teams: { es: 'Equipos', en: 'Teams' },
    strategy: { es: 'Estrategia', en: 'Strategy' },
    builds: { es: 'Builds', en: 'Builds' },
    tierlist: { es: 'Top 40', en: 'Top 40' },
    recruit: { es: 'Sinistcha', en: 'Sinistcha' },
    climb: { es: 'A Máster', en: 'To Master' },
    scout: { es: 'Scout', en: 'Scout' },
    system: { es: 'Sistema', en: 'System' },
    plan: { es: 'Plan', en: 'Plan' }
  },
  filters: {
    all: { es: 'Todos', en: 'All' },
    keep: { es: 'Conservar', en: 'Keep' },
    situational: { es: 'Situacional', en: 'Situational' },
    cut: { es: 'Liberar', en: 'Cut' },
    new: { es: 'Nuevos', en: 'New' }
  },
  labels: {
    usage: { es: 'Uso', en: 'Usage' },
    singles: { es: 'Singles', en: 'Singles' },
    doubles: { es: 'Dobles', en: 'Doubles' },
    item: { es: 'Objeto', en: 'Item' },
    ability: { es: 'Habilidad', en: 'Ability' },
    nature: { es: 'Naturaleza', en: 'Nature' },
    moves: { es: 'Movimientos', en: 'Moves' },
    spread: { es: 'Características', en: 'Trait points' },
    slot: { es: 'Espacio', en: 'Slot' },
    altTeams: { es: 'Equipos alternos (guardar como Réplica)', en: 'Alt teams (save as Replica)' },
    have: { es: 'Ya lo tienes', en: 'You have it' },
    missing: { es: 'Falta', en: 'Missing' },
    priority: { es: 'Prioridad', en: 'Priority' },
    threshold: { es: 'Umbral', en: 'Threshold' },
    done: { es: 'Hecho', en: 'Done' },
    sources: { es: 'Fuentes', en: 'Sources' },
    trained: { es: 'Entrenado', en: 'Trained' },
    bought: { es: 'Comprado', en: 'Bought' },
    noResults: { es: 'Sin resultados', en: 'No results' },
    resetProgress: { es: 'Borrar mi progreso', en: 'Reset my progress' }
  },
  home: {
    today: { es: 'Qué hacer hoy', en: 'What to do today' },
    yourRank: { es: 'Tu rango actual', en: 'Your current rank' },
    boxSlots: { es: 'Espacios de equipo', en: 'Team slots' },
    setRank: { es: 'Fija tu rango para ver cuántos espacios tienes', en: 'Set your rank to see your slot count' },
    nextAction: { es: 'Siguiente acción del plan', en: 'Next plan action' },
    streakTitle: { es: 'Sesión de ranked', en: 'Ranked session' },
    streakHint: { es: 'Registra tus resultados. Con racha de 3+, cada victoria vale doble.', en: 'Log your results. On a 3+ streak, each win counts double.' },
    win: { es: 'Victoria', en: 'Win' },
    loss: { es: 'Derrota', en: 'Loss' },
    streak: { es: 'Racha', en: 'Streak' },
    doubleFill: { es: '¡Llenado doble activo!', en: 'Double fill active!' },
    reset: { es: 'Reiniciar', en: 'Reset' }
  }
};
