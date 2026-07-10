/**
 * Router mínimo por hash (#/ruta). El hash evita 404 en GitHub Pages con
 * deep-links y no necesita configuración de servidor.
 */
import { writable } from 'svelte/store';

function currentRoute() {
  const h = (typeof location !== 'undefined' ? location.hash : '') || '#/home';
  return h.replace(/^#\//, '') || 'home';
}

export const route = writable(currentRoute());

if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => route.set(currentRoute()));
}

export function go(name) {
  if (typeof location !== 'undefined') location.hash = `#/${name}`;
  route.set(name);
  if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
}
