# Pokémon Champions · Plan de Ascenso M-4 — Documento de contexto (handoff)

> Documento de referencia para continuar el desarrollo en **Claude Code**.
> Resume todo lo construido, los datos de investigación verificados, el roster del jugador y los próximos pasos.
> Entregable actual: `plan-ascenso-champions-m4-v3.html` (un solo archivo, autónomo).

---

## 1. Objetivo del proyecto

Guía visual e interactiva para que el jugador (**móvil**) escale lo más alto posible en el ranked de **Pokémon Champions** (Singles 3v3 y Dobles), temporada **M-4 / Regulation M-B**. La guía debe:

- Analizar el **roster real del jugador** (44 Pokémon) y decir qué conservar, qué liberar y cómo usar sus **3 espacios de equipo**.
- Dar **composiciones** (fáciles y de techo alto) con **builds completas**.
- Explicar el **meta actual**, el **sistema de personalización** del juego, **cómo conseguir Pokémon** (incl. Sinistcha) y **trucos de escalada** a Máster.
- Ser **bilingüe ES/EN** con nombres correctos de movimientos/objetos/habilidades tal como aparecen en el juego.
- Mostrar **sprites** de todos los Pokémon.

---

## 2. Estado del entregable (v3) y arquitectura técnica

**Archivo único:** `plan-ascenso-champions-m4-v3.html` (~172 KB). No requiere build ni dependencias externas salvo Google Fonts (por CDN). **Funciona offline** porque los sprites van incrustados.

### Stack
- HTML + CSS puro (variables CSS, sin frameworks) + **JavaScript vanilla** (sin librerías).
- Fuentes: `Chakra Petch`, `Inter`, `Press Start 2P` (Google Fonts).
- Estética: "consola de entrenador" oscura, acentos cian/violeta/oro, sprites pixel con animación *bob* sutil.

### Patrón de datos (importante para extender)
Todo el contenido vive en un objeto JS global **`D`** y en los arrays `roster` y `builds`. Cada string traducible es un objeto `{es:"…", en:"…"}`. Un helper `tt(obj)` devuelve `obj[L]` según el idioma activo `L` (`'es'` por defecto).

- **`render()`** vuelve a pintar toda la página según `L`. El toggle ES/EN llama a `render()`.
- Los **términos del juego** (movimientos, objetos, habilidades, naturalezas) NO usan el toggle: se muestran **bilingües inline** con formato `"Español · English"` (siempre correctos en ambos idiomas).
- **`SPRITES`** es un mapa `{ dexId: "data:image/png;base64,…" }`. `S(id)` devuelve el data-URI o una Poké Ball SVG de reserva. `img(id, cls)` genera el `<img>`.

### Cómo se generan los sprites (para regenerar/añadir)
Los PNG pixel provienen de **PokéAPI** (`raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`) y se **incrustan en base64** dentro del HTML (el visor bloquea imágenes externas; incrustar garantiza que se vean).

Flujo usado:
1. Descargar los PNG por National Dex ID (formas regionales/Mega usan IDs `10xxx`, p. ej. Alolan Ninetales `10104`, Rotom-Wash `10161`, Rotom-Heat `10162`, Charizard-Mega-X `10034`, Charizard-Mega-Y `10035`, Swampert-Mega `10064`, Aerodactyl-Mega `10042`, Sableye-Mega `10066`, Metagross-Mega `10076`).
2. Base64-encode y sustituir el placeholder `/*__SPRITES__*/` en la plantilla.

> En Claude Code conviene **separar** en archivos: `index.html`, `styles.css`, `data.js` (el objeto `D` + `roster` + `builds`), `sprites.js` (mapa base64) y `app.js` (render + toggle + filtros). Así es mucho más mantenible que el HTML monolítico actual.

### Secciones de la página (IDs de ancla)
`meta` · `roster` · `decidir` (eliminar/conservar) · `recluta` (Sinistcha) · `master` (escalada) · `espacios` (equipos) · `top40` · `sistema` (costos) · `compras` · `builds` · `plan`.

### Interactividad actual
- Toggle **ES/EN** (repinta todo).
- **Filtros de roster** (Todos / Conservar / Situacional / Liberar / Nuevos).
- **Acordeones** de builds (`<details>`).
- Navegación por anclas.

---

## 3. Contexto del juego (verificado con fuentes oficiales)

- **Pokémon Champions**: juego de combate competitivo de The Pokémon Company / The Pokémon Works + ILCA. **Switch: 8 abr 2026. Móvil (iOS/Android): 17 jun 2026.** Free-to-start, crossplay, se conecta con **Pokémon HOME**. Será el juego oficial del VGC / Mundial 2026.
- **~186 Pokémon** disponibles; se añaden por lotes con cada regulación. No todos los de HOME están.
- **Mega Evolución** vía objeto **Omni Ring** (Piedra Llave). Megas nuevas de *Leyendas Z-A* con habilidades inéditas: **Mega Meganium** (Mega Sol), **Mega Emboar** (Rompemoldes), **Mega Feraligatr** (Dragoniza), **Mega Scovillain** (Rocío Picante), **Mega Golurk** (Puño Certero), **Mega Chandelure** (Infiltración), **Mega Raichu X/Y** (evento de lanzamiento móvil).
- **M-4** continúa **Regulation M-B** (introducida el 17 jun 2026): mismo roster, reinicio de rango, nuevo Battle Pass. Los datos de uso de M-B siguen vigentes.

### Sistema de rango (ranked)
- 6 tiers: **Beginner → Poké Ball → Great Ball → Ultra Ball → Master Ball → Champion**. Los Ball tienen 4 subrangos (4→1). Champion no tiene subrangos y va por **leaderboard**.
- Cada temporada (~35 días) **reinicia**: todos empiezan en **Poké Ball R4**. Sin placement.
- **Barra**: victoria **+1/4**, derrota **−1/4** → 4 victorias netas por subrango.
- **TRUCO CLAVE:** con **racha de 3+ victorias**, cada victoria llena **+2/4** (el doble) → 2 victorias limpian el subrango.
- Una vez promovido a un tier, **no bajas de tier** (sí puedes bajar subrangos dentro del tier).
- **Máster R1-3 + Champion** se desbloquean **una semana** tras el inicio de temporada.
- **Singles y Dobles rankean por separado** (recompensas separadas): jugar ambos maximiza VP.
- Recompensas de promoción: +5 caja (Great/Ultra), +10 caja (Máster) + títulos visibles en Team Preview. Misiones: llegar a Great Ball = 2000 VP por formato. Fin de temporada: Champion 20 000 VP, Máster R1 15 000 VP.

### Cómo se consiguen Pokémon (Roster Ranch + HOME)
- **Roster Ranch**: alineación de **10 Pokémon aleatorios cada 22 h** (gratis) de un pool de ~186. **Eliges solo 1** por alineación.
  - **Prueba** (Trial): gratis, 7 días, **no se puede entrenar**.
  - **Permanente**: **2500 VP** o **1 Ticket de Compañero** (Teammate Ticket), totalmente entrenable.
  - Acelerar el timer de 22 h: **Cupones Rápidos** (1 h c/u) o VP.
  - **Tickets de Afinidad**: usados antes de sacar alineación, **suben la probabilidad de un tipo** concreto.
  - "Info del Roster" muestra el pool actual. Hay animaciones que señalan Pokémon especiales/shiny.
- **Pokémon HOME (recomendado para piezas concretas):** transfiere el Pokémon **exacto** que quieras (solo **evoluciones finales** presentes en el juego). El enlace se activa **desde dentro de HOME**, no desde Champions. Los que vienen de HOME **sí se pueden entrenar**. Algunos (p. ej. Floette Eterna) **solo** existen por esta vía.

### Sistema de personalización (build)
- **No hay EVs/IVs.** Todo a nivel 50 con IVs perfectos.
- **Puntos de Característica** (reemplazan EVs): **66 totales, máx 32 por stat**, **5 VP por punto** → maximizar dos stats ≈ **330 VP**.
- **Naturaleza** (variación de característica): +10% una / −10% otra. Cambiar = **500 VP**.
- Cambiar un **movimiento** = 250 VP · cambiar **habilidad** = 500 VP · **Mega Piedra** = 2000 VP · **reclutar permanente** = 2500 VP.
- **Tickets de Entrenamiento** reducen el costo de VP a 0. **Códigos de Equipo Réplica** (Team ID) permiten guardar/compartir equipos gratis (clave para tener variantes sin membresía).
- Caja gratis: 30 base + crece con el rango. **Starter Pack**: +50 caja permanentes, 30 Tickets de Compañero, 50 de Entrenamiento. Membresía: caja a 1000 (temporal).

---

## 4. Meta M-4 (Reg M-B) — datos verificados

**Winrates (Pikalytics, Reg M-B S3)** — comunitarios, no oficiales:

| Pokémon | WR | | Pokémon | WR |
|---|---|---|---|---|
| Kingambit | 54.3% | | Aerodactyl | 50.1% |
| Charizard-Y | 53.4% | | Maushold | 48.7% |
| Basculegion | 52.6% | | Metagross | 48.4% |
| Incineroar | 51.1% | | Grimmsnarl | 48.1% |
| Archaludon | 50.8% | | Sableye | 46.0% |
| Whimsicott | 50.8% | | Staraptor | 45.1% |
| Swampert | 50.3% | | Annihilape | 44.0% |
| Sylveon | 50.2% | | | |

**Más usados (Dobles):** Garchomp (#1), Sinistcha, Basculegion, Whimsicott, Kingambit, Incineroar, Charizard-Y, Pelipper, Archaludon, Sylveon, Sneasler, Farigiraf.

**Arquetipos dominantes:** Sol · Lluvia · Viento Afín/HO · Doble Mega · Trick Room · Balance.

**Cambios M-A → M-B (vigentes en M-4):** Sinistcha subió a nº1 de soporte; Basculegion bajó desde el nº1 de M-A; Whimsicott = mejor control de velocidad; Life Orb permitida; nerfs a Metagross (perdió Machacar/Desarme) y a Lluvia Dorada de Gholdengo.

---

## 5. Roster del jugador (44 Pokémon)

Límite de caja original: 40; crece con el rango (+5/tier, +10 Máster). El jugador ya sumó 4 nuevos (**Aerodactyl, Milotic, Greninja, Sableye**).

### ✅ Conservar — núcleo tier S/A (22)
Garchomp · Incineroar · Kingambit · **Charizard (Mega Y)** · **Charizard (Mega X)** · Sylveon · Basculegion · Whimsicott · Pelipper · Archaludon · Metagross (Mega) · Farigiraf · Swampert (Mega) · Sneasler · Mimikyu · Meowscarada · Hippowdon · Corviknight · Grimmsnarl · Gholdengo · Rotom-Wash · **Aerodactyl (Mega) ← nuevo**

### 🟡 Situacional — piezas de arquetipo (19)
Venusaur (Mega, sol) · Torkoal (sol/TR) · Tyranitar (arena) · Mawile (Mega, anti-acero) · **Milotic ← nuevo** · **Sableye (Mega) ← nuevo** · **Greninja ← nuevo** · Ninetales-Alola (nieve) · Staraptor (Mega, tailwind) · Dragonite (setup) · Volcarona (sweeper) · Glimmora (hazards) · Kangaskhan (Mega) · Annihilape (singles) · Aegislash (pivote) · Gyarados (Mega, intimida) · Starmie (singles) · Raichu (Mega, anti-lluvia) · Rotom-Heat (redundante con Rotom-Wash)

### ❌ Liberar — fuera del meta (3)
Sceptile · Eelektross · Samurott
> Motivo: no rankean en M-B en ningún formato. Devolver a **HOME** (reversible), no soltar. Libera hueco para reclutar Sinistcha.

### 🎯 A cazar (1)
**Sinistcha** (Planta/Fantasma) — nº1 de soporte en Dobles (Trick Room + Danza Amiga + curación). Ver §3 para las dos vías de obtención. **Aerodactyl ya está conseguido**, así que del top solo falta Sinistcha.

---

## 6. Los 3 equipos recomendados (uso de espacios: 1 Singles + 2 Dobles)

**Espacio 1 — Singles 3v3 · Balance ofensivo (fácil):**
Garchomp · Mega Metagross · Meowscarada · Hippowdon · Corviknight · Rotom-Wash.
*Reemplaza a Raichu y Basculegion del equipo actual del jugador (Great Ball 2).*

**Espacio 2 — Dobles · Sol ofensivo (el más consistente):**
Charizard-Y · Incineroar · Garchomp · Sylveon · Venusaur · Rotom-Wash.
*Versión arreglada del sol que le falló (antes metía Kingambit/Sneasler que no aprovechan el sol y sin control de velocidad).*

**Espacio 3 — Dobles · Lluvia (techo alto):**
Pelipper · Mega Swampert · Archaludon · Basculegion · Incineroar · Grimmsnarl.
*Mejora del equipo con el que llegó a ~Ultra 3-4 (añade Mega Swampert y pantallas de Grimmsnarl en vez de Raichu).*

### Equipos alternos (guardar como Réplica)
- **Singles HO (techo alto):** Mimikyu · Garchomp · Charizard-X · Kingambit · Meowscarada · Mega Metagross.
- **Singles Stall (consistente):** Hippowdon · Corviknight · Rotom-Wash · Sylveon · Garchomp · Gholdengo.
- **Dobles Goodstuff doble Mega (techo alto):** Mega Aerodactyl · Charizard-Y · Farigiraf · Garchomp · Kingambit · Sylveon. *(ya tiene todas las piezas)*
- **Dobles Trick Room (contra-meta):** Farigiraf · Sinistcha · Torkoal · Sableye · Incineroar · Gyarados. *(requiere Sinistcha)*
- **Dobles HO Tailwind:** Basculegion · Kingambit · Sneasler · Whimsicott · Garchomp · Incineroar.

---

## 7. Builds (sets reales de Pikalytics Reg M-B)

Formato: Naturaleza · Habilidad · Objeto · Puntos de Característica (máx 32/stat) · Movimientos.

**Singles**
- **Garchomp** — Alegre · Piel Tosca · Vidasfera/Banda Focus · Atk32/Vel32 · Terremoto, Garra Dragón, Roca Afilada, Danza Espada *(en Dobles: Danza→Protección)*.
- **Metagross (Mega)** — Alegre · Cuerpo Puro→Zarpas Duras · Metagrossita · Atk32/Vel32 · Puño Meteoro, Colmillo Psíquico, Puño Bala, Puño Hielo.
- **Meowscarada** — Alegre · Mutatipo · Pañuelo Elección · Atk32/Vel32 · Truco Floral, Desarme, Ida y Vuelta, Triple Axel.
- **Hippowdon** — Agitada · Chorro Arena · Restos · PS32/Def32 · Terremoto, Relajo, Trampa Rocas, Bostezo.
- **Corviknight** — Agitada · Coraza Reflejo · Restos · PS32/Def32 · Pájaro Osado, Ida y Vuelta, Respiro, Despejar.
- **Rotom-Wash** — Modesta · Levitación · Restos · PS32/AtEsp32 · Hidrobomba, Voltiocambio, Fuego Fatuo, Protección.

**Dobles Sol**
- **Charizard (Mega Y)** — Miedosa · Sequía · Charizardita Y · AtEsp32/Vel32 · Onda Ígnea, Rayo Solar, Tajo Aéreo, Protección.
- **Venusaur (Mega)** — Modesta · Clorofila · Banda Focus · AtEsp32/Vel32 · Somnífero, Bomba Lodo, Energibola, Protección.
- **Incineroar** — Cauta · Intimidación · Baya Zidra · PS32/DefEsp32 · Sorpresa, Última Palabra, Envite Ígneo, Fuego Fatuo.
- **Garchomp (Dobles)** — Alegre · Piel Tosca · Vidasfera · Atk32/Vel32 · Terremoto, Avalancha, Garra Dragón, Protección.
- **Sylveon** — Modesta · Piel Feérica · Pluma Hada · PS32/AtEsp32 · Vozarrón, Fuerza Lunar, Ataque Rápido, Protección.

**Dobles Lluvia**
- **Pelipper** — Modesta · Llovizna · Piedra Lluvia · PS32/AtEsp32 · Vendaval, Bola Clima, Viento Afín, Protección.
- **Swampert (Mega)** — Firme · Nado Rápido · Swampertita · Atk32/Vel32 · Hidroariete, Terremoto, Puño Hielo, Protección.
- **Archaludon** — Modesta · Aguante · Restos · PS32/AtEsp32 · Electro Shot, Foco Resplandor, Pulso Dragón, Protección.
- **Basculegion** — Firme · Nado Rápido · Agua Mística · Atk32/Vel32 · Hidroariete, Last Respects, Acua Jet, Ida y Vuelta (Flip Turn).
- **Grimmsnarl** — Agitada · Bromista · Refleluz · PS32/Def32 · Reflejo, Pantalla de Luz, Corazón Roto, Última Palabra.

**Piezas extra**
- **Kingambit** — Firme · Competitivo (Dobles: General Supremo) · Banda Focus/Vidasfera · Atk32/PS32 · Golpe Bajo, Kowtow Cleave, Cabeza de Hierro, Danza Espada.
- **Mimikyu** — Alegre · Disfraz · Vidasfera · Atk32/Vel32 · Danza Espada, Carantoña, Sombra Vil, Puño Drenaje.
- **Aerodactyl (Mega)** — Alegre · Fuerza Bruta (Tough Claws) · Aerodactylita · Atk32/Vel32 · Avalancha, Viento Afín, Ala Bis, Protección.
- **Sableye (Mega)** — Osada · Bromista→Espejo Mágico · Refleluz · PS32/Def32 · Fuego Fatuo, Reflejo, Otra Vez, Juego Sucio.

---

## 8. Top 40 para tener/cazar

- **Tier S:** Garchomp, Incineroar, Charizard-Y, Kingambit, **Sinistcha (falta)**, Whimsicott, Sylveon, Basculegion.
- **Tier A:** Pelipper, Archaludon, Metagross, Farigiraf, Swampert, Sneasler, Mimikyu, Meowscarada, Hippowdon, Corviknight, Grimmsnarl, Aerodactyl, Charizard-X, Gholdengo, Rotom-Wash, Hydreigon (no lo tiene).
- **Tier B:** Venusaur, Torkoal, Tyranitar, Mawile, Milotic, Sableye, Greninja, Ninetales-Alola, Staraptor, Dragonite, Volcarona, Glimmora, Kangaskhan, Annihilape, Scovillain (no lo tiene).

De los 40, el jugador tiene ~38. Le faltan del top solo **Sinistcha** (y opcionalmente Hydreigon/Scovillain).

---

## 9. Lista de compras (objetos · un objeto por equipo)

Mega Piedras (2000 VP c/u): **Charizardita Y, Metagrossita, Swampertita, Aerodactylita**.
Objetos de tienda: **Banda Focus, Pañuelo Elección, Vidasfera, Baya Zidra, Pluma Hada, Refleluz (Light Clay), Piedra Lluvia (Damp Rock), Agua Mística, Restos**.

---

## 10. Plan de 3 fases

1. **Singles:** montar el equipo Balance, comprar Metagrossita, maximizar Garchomp/Metagross. *Umbral: si pasas Ultra, mantén; si te frenan Hadas, mete Kingambit por Rotom-Wash.*
2. **Dobles + Sinistcha:** empezar por Sol; conseguir Sinistcha (HOME o Rancho con Ticket de Afinidad); guardar lluvia como 2º Réplica. *Umbral: contra lluvia/arena, sube Rotom-Wash.*
3. **Recursos:** usar Equipos Réplica para variantes; devolver a HOME lo que no uses; aprovechar rachas de 3+ para el llenado doble en cada empujón de rango.

---

## 11. Correcciones hechas (v2 → v3) — no repetir errores

- **Nombres ES corregidos:** Rock Slide=**Avalancha** (no "Roca Afilada", que es Stone Edge); Timid=**Miedosa** (no "Tímida"); Impish=**Agitada** (no "Osada", que es Bold); Choice Scarf=**Pañuelo Elección** (no "Cinta Elección", que es Choice Band); Light Clay=**Refleluz**; Damp Rock=**Piedra Lluvia**; Flash Cannon=**Foco Resplandor**; Defog=**Despejar**; Knock Off=**Desarme**; Snarl=**Alarido**; Protean=**Mutatipo**; Mirror Armor=**Coraza Reflejo**; Tough Claws=**Zarpas Duras**.
- **Sprites:** faltaba Blaziken (añadido); los dos Charizard usaban el mismo sprite → ahora **Mega X (10034)** y **Mega Y (10035)** distintos.
- **Dato corregido:** el jugador **sí tiene Farigiraf** (en v1 se dijo por error que faltaba). Lo que falta es Sinistcha.
- **Winrates/sets** actualizados a datos reales de **Pikalytics Reg M-B** (antes eran aproximados).

---

## 12. Fuentes

- Oficial: `champions.pokemon.com`, `pokemon.com/us/news/…`, Nintendo store.
- Enciclopedias: **Bulbapedia**, **Serebii**.
- Guías: **Game8**, **Gamerant**, **TheGamer**, **GAMES.GG**, **ChampsDex**, **oslink**, **Deltia's Gaming**, **Pokémon GO Hub**, **Beebom**.
- Datos competitivos: **Pikalytics** (Reg M-B S3), **Pokémon Zone**.
- Sprites: **PokéAPI** (`github.com/PokeAPI/sprites`).

> ⚠️ Los winrates/usos son **comunitarios**, no cifras oficiales de rango; el meta puede moverse tras torneos (MCS). Algunos nombres ES de movimientos gen 9 son de mejor esfuerzo (el inglés al lado es la referencia fiable).

---

## 13. Próximos pasos sugeridos para Claude Code

1. **Refactor a multi-archivo:** separar `index.html` / `styles.css` / `data.js` / `sprites.js` / `app.js`. Facilita mantener el objeto `D` bilingüe y el mapa de sprites.
2. **Persistencia local:** marcar qué Pokémon ya entrenaste, checklist de compras y de reclutamiento (usar `localStorage` — recordar que **no** funciona dentro de artifacts de Claude, pero **sí** en un despliegue web propio).
3. **Buscador/filtros de builds** por tipo, objeto o formato.
4. **Calculadora de daño** para los remates clave de cada equipo.
5. **Códigos de Equipo Réplica**: campo para pegar/guardar los códigos reales de cada equipo una vez creados en el juego.
6. **Auto-actualización del meta:** script que lea winrates/uso desde Pikalytics y regenere `data.js` por temporada.
7. **Sprites animados** (GIF gen-5 de Showdown/PokéAPI) como opción; pesan más (~4.5 MB), evaluar carga en móvil.
8. **Versión imprimible / export PDF** de los 3 equipos + builds.
9. **Verificar nombres ES** de los movimientos gen 9 marcados como "mejor esfuerzo" contra la localización oficial del juego.
10. **PWA** (manifest + service worker) para instalarla en el móvil y usarla offline.

---

*Generado como documento de contexto para continuar el desarrollo. Entregable asociado: `plan-ascenso-champions-m4-v3.html`.*
