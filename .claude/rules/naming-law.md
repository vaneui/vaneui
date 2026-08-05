# VaneUI Prop Naming Law

The rule every multi-value prop category follows, and the guard that enforces it.

## The law

> **A prop name is `camelCase(tailwind-class)`, keeping the CSS-property prefix** — *except* the design-system **semantic layer**, which intentionally abstracts above Tailwind.

The target users know Tailwind, so mirroring the class name is the disambiguation. Dropping the prefix is what made `light` (font-weight 300) read as a color and `inside`/`circle` read as shapes. The fix is always to *restore the prefix Tailwind already uses* (`font-light` → `fontLight`, `list-inside` → `listInside`), never to invent a parallel scheme (`weight*`, `grow*`) that corresponds to no class.

## Two buckets

Every category in `ComponentKeys` is exactly one of these. The guard test (`src/components/tests/namingLaw.test.ts`) fails if a category is unclassified, so a new category forces a conscious decision.

### 1. Prefixed (Tailwind-utility mirroring)

Every value carries the category's CSS-property prefix. This is where the `light` sin recurs, so it is enforced: each value must start with the prefix (or be its single `no*` negation).

`fontWeight`/`fontFamily` (`font`), `listStyle`/`listPosition` (`list`), `textAlign` (`text`), `items`, `justify`, `justifySelf`, `alignSelf`, `overflow`, `cursor`, `whitespace`, `objectFit` (`object`), `wordBreak` (`break`), `letterSpacing` (`tracking`), `width` (`w`), `height` (`h`), `padding`, `margin`, `border`, `gap`, `shadow`, `transition`, `focusVisible`, `ring` (`insetRing`), `blur` (`backdropBlur`), `pointerEvents`, `wrap`/`flex` (`flex`), `placement` (`place`).

The prefix is enforced, not the full class, so a deliberate logical/suffix divergence still passes as long as the prefix holds:
- `borderStart`/`borderEnd` emit `border-s`/`border-e` (logical, RTL-aware) but keep the `border` prefix.
- `alignSelf*` emit `self-*` but keep the `alignSelf` prefix (symmetry with `justifySelf*`).
- `place*` are computed to floating-placement strings but keep the `place` prefix.

### 2. Semantic (abstracted above Tailwind — allow-listed)

Named for clarity, not class-correspondence. Not prefix-checked.

- **Design-system layer:** `appearance`, `variant`, `shape`, `size`.
- **Bare Tailwind values** (individually class-correct, no shared prefix): `display`, `position`, `flexDirection`, `fontStyle`, `textDecoration`, `textTransform`, `truncate`.
- **Responsive/semantic:** `breakpoint` (`mobileStack`…), `hide`, `orientation`, `responsiveSizing`.
- **Deliberately-clearer renames** (from the prop-naming review): `validity` (`invalid`), `constrainWidth`, `clampHeight`.
- **Single-flag state:** `transparent`, `disabled`, `readOnly`, `shrink`.
- **Inherit family:** `inheritSize`, `inheritColor`, `inheritBg`, `inheritBorder` (appearance's `inheritAppearance` value lives in the design-system layer).

## Adding a category

Classify it in `namingLaw.test.ts`: give it a prefix in `PREFIXED_CATEGORIES` if its values mirror a Tailwind utility, else add it to `SEMANTIC_CATEGORIES` with a one-line reason. An unclassified category fails the test.
