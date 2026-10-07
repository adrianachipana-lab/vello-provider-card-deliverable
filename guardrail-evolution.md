# Evolución del guardrail: qué hizo mal Claude y cómo lo corregimos

Fecha: 2026-10-07 · Versiones: `before/CLAUDE-v1.md` → `before/CLAUDE-v2.md` → `CLAUDE.md` (v3 → v3.1)

## La idea central

Cada versión del guardrail nació de fallas concretas:

- **v1** le dio a Claude **reglas** ("solo estos seis colores"), sin contexto. Claude
  las siguió al pie de la letra y aun así se equivocó: usó colores crudos porque eso
  era lo único que conocía.
- **v2** agregó **contexto** (tokens semánticos, significado de las señales de
  confianza, contrato de datos). El componente React mejoró mucho, pero la
  integración en el prototipo volvió a fallar.
- **v3** agrega **método y verificación**: mirar primero lo que el prototipo ya
  resuelve, mapear los datos, construir desde una sola fuente y **medir** antes de
  dar algo por terminado.

Conclusión: las reglas dicen *qué* seguir, el contexto dice *por qué* y la
verificación demuestra *que se cumplió*. Hacen falta las tres.

---

## Qué hizo mal Claude y qué no entendió

### 1. Imitó el sistema de diseño en vez de usarlo
- **Qué hizo:** armó el avatar con un `<span class="vl-avatar vl-avatar--lg">`
  copiado, con iniciales. El resultado midió **21×20 px** al lado de fotos de
  **64 px**, con el escudo de verificación tapando las iniciales.
- **Qué no entendió:** que una clase CSS no es el componente. El tamaño lo aplica
  el `Avatar` del sistema de diseño al renderizarse. Copiar el nombre de la clase no
  trae su comportamiento.
- **Mejora (v3 §6):** "Reutiliza el componente nativo, no lo imites". Ahora la
  integración debe pasar por `NeighborCard` / `AvatarVerified` / el `Avatar` del
  sistema de diseño, y el Definition of Done (§9) exige medir el avatar en px.

### 2. No miró cómo el prototipo ya resolvía la tarjeta
- **Qué hizo:** inventó su propia versión: chip "Identity verified" **además** del
  escudo nativo, ícono `map-pin` en vez de `footprints`, 1 estrella en vez de 5,
  sin badge "Available", un solo formato de distancia.
- **Qué no entendió:** que la tarjeta ya existía (`NeighborCard`) y que el trabajo
  era *integrarse* a ese patrón, no rediseñarlo. v2 decía "prefiere las clases
  nativas", pero no decía *dónde mirar* ni *qué comparar*.
- **Mejora (v3 §0 paso 1 y §1):** paso obligatorio "mirar antes de construir" y una
  tabla con los archivos exactos donde vive cada pieza. Además, §5 exige **una sola
  señal de verificación** por tarjeta.

### 3. Hubo dos implementaciones y se auditó la que no se mostraba
- **Qué hizo:** el componente React usaba `verificationStatus` y `pricing` con tipo,
  pero el script de integración tenía su propia copia con `price: 18` fijo, siempre
  "Identity verified", "from $18" para un precio fijo y "Tomas" sin tilde.
- **Qué no entendió:** que "el componente" es lo que el usuario ve. Una auditoría
  sobre un archivo que no se muestra no prueba nada.
- **Mejora (v3 §0 paso 3 y §4):** una sola forma de datos para ambas
  implementaciones, reglas de texto atadas al dato ("from" solo para `range`) y
  nombres con tildes.

### 4. No contrastó los datos con el modelo real
- **Qué hizo:** asumió campos (`walkMinutes`, `ratingCount`, `vouches`) sin
  compararlos con `NEIGHBORS`, que usa `walk/blocks/mi`, `reviews`, `available`,
  `verified` y no tiene vouches.
- **Qué no entendió:** que proponer un campo nuevo es una decisión de esquema que
  hay que señalar, no implementar en silencio. Tampoco notó que le faltaba un campo
  que sí existía (`available`).
- **Mejora (v3 §4):** tabla de mapeo campo por campo con estado *existe /
  renombrado / falta / propuesto*, y la regla "nunca presentes un campo propuesto
  como si existiera".

### 5. Entendió "mejorar" como "dar más énfasis"
- **Qué hizo:** la versión "Mejorada" se insertó **encima** de las categorías y de
  la solicitud abierta, midió **246 px** frente a ~155 px de las nativas (+59 %),
  repitió el vouch en un pill "Vouched by neighbors" y metió un CTA dentro de una
  tarjeta que ya era un botón.
- **Qué no entendió:** que en una lista mejorar es *encajar mejor*, no destacar
  más. Nuestro propio QA ya decía que Home tenía demasiados módulos compitiendo.
- **Mejora (v3 §5 y §6):** presupuesto de tamaño (±15 % de una `.nb`), ubicación
  obligatoria dentro de "Trusted on your block", no repetir señales, un solo
  target por tarjeta y el baseline como variante por defecto.

### 6. Preguntó al diseñador cosas que estaban en el código
- **Qué hizo:** dejó como "pregunta abierta" la sombra de la tarjeta y el color del
  texto sobre el avatar. El prototipo ya respondía las dos: `.nb` no tiene sombra
  en reposo y existe `--text-on-deep`. Mientras tanto, usó `--shadow-md` en reposo
  y `--brand-on-primary`.
- **Qué no entendió:** que "no adivinar" no significa "preguntar todo". Significa
  rastrear la fuente primero.
- **Mejora (v3 §1 y §2):** "lee la fuente antes de preguntar" y una tabla de
  decisiones ya rastreadas para que no se vuelvan a preguntar.

### 7. Siguió la regla de tokens solo donde era obvio
- **Qué hizo:** en el CSS inyectado del prototipo usó colores base
  (`--forest-800`, `--paper`, `--green-200`), un `rgba(246,242,231,.92)` crudo,
  `36px` literal en vez de `--radius-2xl`, tamaños fuera de escala (13, 15, 17 px),
  Mono para la palabra "from" y botones de demo de 32 px.
- **Qué no entendió:** que el código de demo y los strings de estilos también son
  CSS de componente.
- **Mejora (v3 §2, §3 y §6):** la regla cubre explícitamente el CSS inyectado, el
  chrome de demo y los tamaños (`--text-*`, `--space-*`, `--radius-*`). Las palabras
  junto a números van en Hanken.

### 8. "Verificar contraste" sin medir
- **Qué hizo:** dio por accesibles combinaciones de la marca sin calcularlas. Al
  medir aparecieron fallas reales: anillo de foco **1.52:1** (se pide 3:1), badge
  Available **4.10:1** (se pide 4.5:1), chevron **2.82:1**.
- **Qué no entendió:** que una instrucción sin método ni registro no se ejecuta.
  Es también lo que señaló el feedback del mentor: "tu auditoría no tiene números de
  contraste".
- **Mejora (v3 §8 y §9):** tabla de contraste medida dentro del guardrail, la regla
  de agregar una fila por cada combinación nueva y un Definition of Done que exige
  pegar las medidas en la auditoría.

---

## Prueba real: aplicar la v3 (2026-10-07)

Le pedimos a Claude "Aplica `CLAUDE.md` y arregla todo". La v3 hizo su trabajo: el paso 1
("mirar antes de construir") obligó a leer el sistema de diseño y ahí apareció lo más
importante de toda la semana.

### Qué encontró gracias a la v3
- **El sistema de diseño ya traía un `ProviderCard`**, junto con `Avatar`, `Badge` y
  `Rating`. Ninguna versión anterior los había usado.
- **El badge "Available" del sistema de diseño es verde** (`Badge` brand, 5.70:1). El coral
  del prototipo (4.10:1) era un desvío, exactamente el que señaló el mentor.
- **El avatar sin foto del sistema de diseño es verde claro**, no forest. El avatar "corregido"
  de la v2 también estaba desviado.

### Resultado medido
| | Antes | Después |
| --- | --- | --- |
| Avatar | 21×20 px | 64×64 px |
| Señales de verificación | 2 | 1 |
| Alto de la tarjeta | 246 px ("Mejorada") | 154–175 px (nativa ≈ 155) |
| Badge Available | no existía | 5.70:1 |
| Foco | 1.52:1 | 4.77:1 |
| Valores crudos en el CSS | varios | 0 (grep) |
| Implementaciones con datos propios | 2 | 1 modelo compartido |

### Qué hizo mal Claude incluso con la v3 (y se convirtió en v3.1)
1. **Casi reconstruye una tarjeta que el sistema de diseño ya tenía.** La v3 decía "mira el
   prototipo", pero no "revisa primero la lista de componentes del sistema de diseño". Ahora
   §0 y §1 empiezan por ahí, y si el sistema de diseño y el prototipo no coinciden, gana el
   sistema de diseño.
2. **La primera versión integrada medía 192 px.** La regla del límite de alto (±15 %) la
   detectó y forzó una decisión de diseño: la tarjeta compacta muestra un solo vouch con
   nombre. Quedó como regla (§5) y como pregunta para el diseñador (§10 Q7).
3. **La integración no aparecía.** El empaquetador del prototipo reemplaza el `<html>`
   después de cargar. Ahora está documentado en §6 para que no se vuelva a perder tiempo.
4. **Puso `<p>` dentro del `<button>` de la tarjeta**, que es HTML inválido. Se agregó la regla
   de "contenido de frase" en §6 y §8.
5. **El control de demo tapaba el teléfono.** Se agregó una regla de ubicación para el
   chrome de demo.

**Lección:** un guardrail no queda terminado al escribirlo. Queda terminado cuando se
aplica, se mide, y lo que falló vuelve al guardrail.

## Cómo usarlo para el próximo cambio

Con la v3, el pedido a Claude puede ser corto, porque el método ya está en el
guardrail:

> Aplica `CLAUDE.md` para [cambio]. Empieza por el §0 paso 1 y muéstrame la lista de
> patrones nativos y el mapeo de datos antes de escribir código. Al final pega el
> checklist del §9 con las medidas.

Para corregir los problemas que siguen abiertos de esta auditoría:

> Aplica `CLAUDE.md` y deja el ProviderCard integrado cumpliendo todo el §9.

Antes de pedirle algo a Claude, haz tu propio primer vistazo (consejo del mentor) y
compara después con lo que proponga.

## Qué sigue abierto

Las preguntas del §10 del `CLAUDE.md` (foco, badge Available, "Background-checked"
vs "Identity verified", aprobación de vouches y pricing, escala de espaciado) son
decisiones de diseño. El guardrail le prohíbe a Claude resolverlas por su cuenta.
