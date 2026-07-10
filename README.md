# Pocha · Ascenso Champions M-4

Guía interactiva (PWA bilingüe ES/EN) para escalar en el ranked de **Pokémon Champions** — temporada **M-4 / Regulation M-B**, Singles y Dobles. Instalable en Android/PC, funciona offline y guarda tu progreso.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # genera dist/ + service worker
npm run preview
```

## Qué incluye

- **Inicio** — dashboard: tu rango → espacios de equipo, contador de racha (el truco del +2/4), qué hacer hoy.
- **Meta** — uso/winrates, top por formato, arquetipos, cambios M-A → M-4, nuevas Megas/objetos.
- **Roster** — tus 44 Pokémon con filtros (conservar/situacional/liberar/nuevos) y marca de "entrenado".
- **Equipos** — 3 composiciones recomendadas + alternos para guardar como Réplica.
- **Builds** — sets reales con naturaleza, habilidad, objeto, características y movimientos (bilingües).
- **Scout** — piezas de alto potencial por conseguir o reevaluar.
- **Sistema** — rango, caja, costos y lista de compras con checklist.
- **Plan** — ruta de ascenso en 3 fases + fuentes (ES/EN/JP/中文).

## Stack

Vite + Svelte 5 + `vite-plugin-pwa`. Sin backend. Datos por temporada en `src/lib/data/`. Sprites vía PokéAPI (cacheados por el service worker).

## Deploy

Push a `main` → GitHub Actions construye y publica en GitHub Pages (`.github/workflows/deploy.yml`). Requiere activar Pages con "GitHub Actions" como fuente en los ajustes del repo.

## Datos

Uso/winrates son datos comunitarios (ChampDex, PokéChamp DB, Pikalytics, op.gg), no cifras oficiales. Ver `src/lib/data/m4.json` → `sources`.
