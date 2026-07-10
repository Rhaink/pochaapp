# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es este proyecto

**Pocha** es una guía interactiva (PWA bilingüe ES/EN) para escalar en el ranked de **Pokémon Champions**. Ayuda a un jugador concreto a llegar al máximo nivel en Singles y Dobles durante la temporada **M-4 / Regulation M-B**: analiza su roster real, recomienda equipos y builds, explica el sistema del juego y traza un plan de ascenso.

La **v4** es una PWA (Vite + Svelte 5) instalable en Android/PC, offline y con progreso guardado. Sustituye a la v3, que era un único HTML monolítico (`plan-ascenso-champions-m4-v3.html`, conservado como referencia histórica del contenido).

`CONTEXTO-plan-champions-m4.md` es el documento de handoff original (meta, roster, builds, sistema, fuentes). Útil como referencia, pero **los datos verificados y actualizados viven ahora en `src/lib/data/m4.json`** — esa es la fuente de verdad.

### Distinción clave del dominio (no confundir)
- **M-B** es la **REGULACIÓN**: qué Pokémon y objetos son legales.
- **M-4** es la **TEMPORADA**: el ciclo de ranked que reinicia (~35 días).
- Ahora mismo se juega la **Temporada M-4 dentro de Regulation M-B**. Ambas etiquetas son correctas y designan cosas distintas.

## Comandos

```bash
npm install       # instalar dependencias
npm run dev       # servidor de desarrollo (Vite, HMR)
npm run build     # build de producción a dist/ (genera también el service worker PWA)
npm run preview   # servir el build de dist/ localmente
```

No hay framework de tests. Para validar cambios sin navegador, el patrón usado es un script temporal que carga las vistas vía **Vite SSR** (`vite.ssrLoadModule`) y las renderiza con `render` de `svelte/server`, comprobando que las plantillas ejecutan con los datos reales. Bórralo al terminar; no lo dejes en el repo.

## Arquitectura

Renderizado 100% cliente. `src/main.js` monta `App.svelte` (API `mount` de Svelte 5) en `#app`.

- **`src/App.svelte`** — shell responsive: **sidebar** en PC, **bottom tab bar** en móvil (breakpoint 860px), topbar con búsqueda global (⌘K), toggle ES/EN y toggle de tema. Enruta la vista activa con `<svelte:component>`.
- **`src/views/*.svelte`** — una vista por sección: `Home` (dashboard: rango→espacios, sesión de racha, "qué hacer hoy"), `Meta`, `Roster`, `Teams`, `Builds`, `Scout`, `System`, `Plan`, más `SearchOverlay` (buscador global que indexa roster+builds+objetos+scout).
- **`src/lib/`** — lógica compartida:
  - `data/m4.json` — **toda** la data de la temporada (meta, roster, teams, builds, system, scout, plan, sources). Fuente de verdad.
  - `i18n.js` — store `lang`, helper `tt(o)` y el objeto `UI` (cadenas de interfaz).
  - `store.js` — estado persistente en `localStorage` (`theme`, checklists `trained`/`bought`/`scouted`, `rank`, `session`). Helper `persisted()` y `toggleIn()`.
  - `router.js` — router mínimo por hash (`#/ruta`); `go(name)` navega.
  - `sprites.js` / `Sprite.svelte` — sprites desde PokéAPI por URL (ya **no** base64); `BALL` SVG de reserva.
  - `SectionHead.svelte` — encabezado de sección reutilizable.

### Sistema de idioma (misma convención que la v3 — respétala)
- `lang` es el idioma activo (store). `tt(o)` devuelve `o[L]` si `o` es `{es,en}`; si no, lo devuelve tal cual.
- **Los términos del juego** (movimientos, objetos, habilidades, naturalezas) **NO** se traducen con el toggle: viajan siempre bilingües inline con formato `"Español · English"` (separador `·`), porque ambos nombres deben ser correctos siempre. En `m4.json`, los campos `item`/`ability`/`nature`/`moves` usan ese formato inline; el resto del contenido usa `{es,en}`.

### Sprites
`Sprite.svelte` pide `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`. El **service worker los cachea (CacheFirst)** para que funcionen offline tras la primera carga. Las **formas regionales y Mega usan IDs `10xxx`** (Charizard-Mega-X `10034`, Mega-Y `10035`, Swampert-Mega `10064`, Metagross-Mega `10076`, Aerodactyl-Mega `10042`, etc.); usar el ID base daría el sprite equivocado. En el JSON cada entrada lleva `sprite` (id de imagen) separado de `dex` (nº de Pokédex).

### PWA / deploy
- `vite.config.js` usa `base: './'` (rutas relativas → funciona en GitHub Pages sin codificar el nombre del repo) y el router es por hash (sin 404 en deep-links).
- `vite-plugin-pwa` genera manifest + service worker (`registerType: 'autoUpdate'`). Runtime caching para sprites de PokéAPI y Google Fonts.
- Íconos en `public/icons/` (generados desde `public/favicon.svg` con ImageMagick: `convert -background none -resize NxN favicon.svg icons/icon-N.png`; el maskable lleva fondo sólido y padding).
- `.github/workflows/deploy.yml` construye y publica `dist/` en GitHub Pages al hacer push a `main`.

## Convenciones de contenido

- Los datos de uso/winrate son **comunitarios** (ChampDex, PokéChamp DB, Pikalytics, op.gg), no cifras oficiales. Etiquétalos como tal (el campo `meta.disclaimer` ya lo hace).
- Los nombres ES de movimientos gen 9 se verifican con cuidado; el nombre EN inline es la referencia fiable. No cambies un nombre ES sin verificarlo.
- Al **actualizar de temporada**: crear `src/lib/data/mN.json` con la misma forma y apuntar el import en `App.svelte`. Cruzar fuentes ES/EN/JP/中文 (las japonesas dan códigos de alquiler y diarios de escalada; las chinas, composiciones de farmeo). Las fuentes están listadas en `sources` dentro del JSON.
- Para **añadir un Pokémon**: añadir su entrada al `roster` del JSON con `sprite` correcto (recordar los IDs `10xxx` de Megas/formas). No hace falta tocar código.
