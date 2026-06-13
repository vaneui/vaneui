/**
 * Pure string transforms for scoping Tailwind's preflight to VaneUI subtrees.
 *
 * Extracted from scripts/scopePreflight.ts (the thin runner that does the
 * file I/O) so the logic is importable by Jest with no side effects: this
 * module must stay free of `import.meta`, `node:*` imports, and top-level
 * work.
 *
 * Why the splitting is depth/quote-aware: the preflight selector lists
 * contain commas INSIDE functional pseudo-classes, e.g.
 * `input:where([type='button'], [type='reset'], [type='submit'])` and
 * `:where(select:is([multiple], [size])) optgroup`. A naive split on `,`
 * suffixes the scope mid-parens; whether the rejoined list stays valid then
 * depends on the accidental paren geometry of the current preflight. One
 * invalid selector in a list makes the browser drop the ENTIRE rule, so the
 * split must only happen at paren/bracket depth 0 and outside quoted strings,
 * and `verifyScopedOutput` must reject any output that could have been
 * mangled before it is written to disk.
 */

export const SCOPE = ":where([data-vane-type], [data-vane-type] *)";

export const stripComments = (css: string): string => css.replace(/\/\*[\s\S]*?\*\//g, "");

interface SelectorScan {
  /** paren/bracket nesting depth surrounding each character index */
  depths: number[];
  /** true where the character is quoted string content or backslash-escaped */
  masked: boolean[];
  /** false on stray/mismatched closers, unclosed parens/brackets, or an unterminated string */
  wellFormed: boolean;
}

/**
 * Single quote/escape/depth-aware pass over a selector. Powers the
 * top-level-only comma split, the top-level-only `::` search, and the
 * integrity checks.
 */
const scanSelector = (text: string): SelectorScan => {
  const depths: number[] = new Array(text.length);
  const masked: boolean[] = new Array(text.length);
  const stack: ("(" | "[")[] = [];
  let quote: '"' | "'" | null = null;
  let wellFormed = true;
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch === "\\") {
      // escaped character: literal text, never syntax
      depths[i] = stack.length;
      masked[i] = true;
      if (i + 1 < text.length) {
        depths[i + 1] = stack.length;
        masked[i + 1] = true;
      }
      i += 2;
      continue;
    }
    if (quote !== null) {
      depths[i] = stack.length;
      masked[i] = true;
      if (ch === quote) quote = null;
      i++;
      continue;
    }
    if (ch === "'" || ch === '"') {
      quote = ch;
      depths[i] = stack.length;
      masked[i] = true;
      i++;
      continue;
    }
    if (ch === "(" || ch === "[") {
      depths[i] = stack.length;
      masked[i] = false;
      stack.push(ch);
      i++;
      continue;
    }
    if (ch === ")" || ch === "]") {
      const expected = ch === ")" ? "(" : "[";
      if (stack.length === 0 || stack[stack.length - 1] !== expected) {
        wellFormed = false;
      } else {
        stack.pop();
      }
      depths[i] = stack.length;
      masked[i] = false;
      i++;
      continue;
    }
    depths[i] = stack.length;
    masked[i] = false;
    i++;
  }
  if (quote !== null || stack.length > 0) wellFormed = false;
  return { depths, masked, wellFormed };
};

/**
 * Splits a selector list on `,` only at paren/bracket depth 0 and outside
 * quoted strings. Segments are trimmed; empty segments are preserved so the
 * caller's selector count always mirrors the top-level comma structure.
 */
export const splitSelectorList = (selectorList: string): string[] => {
  const scan = scanSelector(selectorList);
  const segments: string[] = [];
  let start = 0;
  for (let i = 0; i < selectorList.length; i++) {
    if (selectorList[i] === "," && scan.depths[i] === 0 && !scan.masked[i]) {
      segments.push(selectorList.slice(start, i).trim());
      start = i + 1;
    }
  }
  segments.push(selectorList.slice(start).trim());
  return segments;
};

/**
 * Suffixes one whole compound selector with the scope, outside all parens.
 * Pseudo-elements must stay rightmost, so the scope is inserted before the
 * first TOP-LEVEL `::` (a `::` inside parens, e.g. `:has(::before)`, is
 * ignored): `input::placeholder` -> `input:where(SCOPE)::placeholder`,
 * bare `::before` -> `:where(SCOPE)::before`,
 * `:where(p)::before` -> `:where(p):where(SCOPE)::before`.
 */
export const scopeSelector = (sel: string): string => {
  const s = sel.trim().replace(/\s+/g, " ");
  if (!s) return s;
  const scan = scanSelector(s);
  let pseudoIdx = -1;
  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] === ":" && s[i + 1] === ":" && scan.depths[i] === 0 && !scan.masked[i]) {
      pseudoIdx = i;
      break;
    }
  }
  if (pseudoIdx !== -1) {
    return `${s.slice(0, pseudoIdx)}${SCOPE}${s.slice(pseudoIdx)}`;
  }
  return `${s}${SCOPE}`;
};

export const scopeSelectorList = (selectorList: string): string =>
  splitSelectorList(selectorList).map(scopeSelector).join(",\n");

/** Matches `@keyframes` and vendor-prefixed `@-webkit-keyframes` etc. */
const KEYFRAMES_RE = /^@(-[\w-]+-)?keyframes\b/i;

/**
 * Returns the index just PAST the `}` matching the `{` at `open`, counting
 * braces only outside quoted strings (and skipping backslash escapes). A
 * declaration value such as `content: "}"` must not be mistaken for the end
 * of the rule. Returns `css.length` if the block is unterminated.
 */
const matchBraceEnd = (css: string, open: number): number => {
  let depth = 1;
  let j = open + 1;
  let quote: '"' | "'" | null = null;
  while (j < css.length && depth > 0) {
    const ch = css[j];
    if (ch === "\\") { j += 2; continue; }
    if (quote !== null) {
      if (ch === quote) quote = null;
      j++;
      continue;
    }
    if (ch === '"' || ch === "'") { quote = ch; j++; continue; }
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
    j++;
  }
  return j;
};

/**
 * Index of the first `;` in `css[i..limit)` that sits outside a quoted string,
 * or -1. Used to peel off block-less statement at-rules (`@layer base;`,
 * `@import "x";`, `@charset "UTF-8";`) that end in `;` before the next `{` —
 * otherwise they would glue to the following rule's selector and pass through
 * unscoped as part of an at-rule prelude.
 */
const findStatementEnd = (css: string, i: number, limit: number): number => {
  let quote: '"' | "'" | null = null;
  let k = i;
  while (k < limit) {
    const ch = css[k];
    if (ch === "\\") { k += 2; continue; }
    if (quote !== null) {
      if (ch === quote) quote = null;
      k++;
      continue;
    }
    if (ch === '"' || ch === "'") { quote = ch; k++; continue; }
    if (ch === ";") return k;
    k++;
  }
  return -1;
};

/**
 * Recursive prelude{body} walker shared by `transform` and
 * `collectStyleRulePreludes` so both traverse rules identically: block-less
 * statement at-rules pass through verbatim; `@keyframes` bodies copy verbatim
 * (their step selectors `from`/`to`/`0%` are NOT style-rule selectors and must
 * never be scoped); other at-rule preludes pass through with their bodies
 * recursed; style rules are handed to the visitor; declaration bodies copy
 * verbatim. Brace matching is quote-aware so a `}` inside a declaration string
 * cannot desync rule boundaries.
 */
const walkRules = (css: string, visitStyleRule: (prelude: string, body: string) => string): string => {
  let out = "";
  let i = 0;
  while (i < css.length) {
    const open = css.indexOf("{", i);
    if (open === -1) {
      out += css.slice(i);
      break;
    }
    // block-less statement at-rule (ends in `;` before the next `{`)
    const semi = findStatementEnd(css, i, open);
    if (semi !== -1) {
      const stmt = css.slice(i, semi + 1).trim();
      if (stmt) out += `${stmt.replace(/\s+/g, " ")}\n`;
      i = semi + 1;
      continue;
    }
    const prelude = css.slice(i, open).trim();
    const j = matchBraceEnd(css, open);
    const body = css.slice(open + 1, j - 1);
    if (prelude.startsWith("@")) {
      if (KEYFRAMES_RE.test(prelude)) {
        out += `${prelude.replace(/\s+/g, " ")} {${body}}\n`;
      } else {
        out += `${prelude.replace(/\s+/g, " ")} {\n${walkRules(body, visitStyleRule)}}\n`;
      }
    } else {
      out += visitStyleRule(prelude, body);
    }
    i = j;
  }
  return out;
};

/** Scopes every style-rule selector in a (comment-stripped) stylesheet. */
export const transform = (css: string): string =>
  walkRules(css, (prelude, body) => `${scopeSelectorList(prelude)} {${body}}\n`);

/** Style-rule preludes in document order, recursing into at-rule bodies. */
export const collectStyleRulePreludes = (css: string): string[] => {
  const preludes: string[] = [];
  walkRules(css, (prelude) => {
    preludes.push(prelude);
    return "";
  });
  return preludes;
};

const fail = (reason: string, prelude?: string): never => {
  const context = prelude === undefined ? "" : `\n  offending prelude: ${JSON.stringify(prelude)}`;
  throw new Error(
    `scopePreflight integrity violation: ${reason}${context}\n` +
      "Refusing to write the scoped preflight. The upstream tailwindcss preflight.css " +
      "likely changed shape; fix scripts/scopePreflightTransform.ts so every emitted " +
      "selector stays valid (an invalid selector silently drops its entire rule)."
  );
};

/**
 * Integrity guard run before the scoped preflight is written. For every
 * emitted selector it asserts:
 *  (a) parens/brackets balance (quote-aware, matched pairs),
 *  (b) the scope suffix appears exactly once, at paren/bracket depth 0,
 *  (c) each output rule has exactly as many top-level selectors as its
 *      input rule (and the rule count itself is preserved).
 * Throws with the offending prelude on any violation — failing the build
 * loudly instead of ever writing corrupt CSS silently.
 */
export const verifyScopedOutput = (inputCss: string, outputCss: string): void => {
  const inputPreludes = collectStyleRulePreludes(stripComments(inputCss));
  const outputPreludes = collectStyleRulePreludes(stripComments(outputCss));
  if (inputPreludes.length !== outputPreludes.length) {
    fail(
      `style rule count changed: input has ${inputPreludes.length} style rules, output has ${outputPreludes.length}`
    );
  }
  for (let r = 0; r < inputPreludes.length; r++) {
    const inputCount = splitSelectorList(inputPreludes[r]).length;
    const outSelectors = splitSelectorList(outputPreludes[r]);
    if (outSelectors.length !== inputCount) {
      fail(
        `selector count mismatch: input rule has ${inputCount} top-level selectors, output rule has ${outSelectors.length}`,
        outputPreludes[r]
      );
    }
    for (const outSel of outSelectors) {
      const scan = scanSelector(outSel);
      if (!scan.wellFormed) {
        fail(
          `unbalanced or mismatched parens/brackets (or unterminated string) in emitted selector ${JSON.stringify(outSel)}`,
          outputPreludes[r]
        );
      }
      let occurrences = 0;
      let k = outSel.indexOf(SCOPE);
      while (k !== -1) {
        occurrences++;
        if (scan.depths[k] !== 0 || scan.masked[k]) {
          fail(
            `scope suffix nested inside parens in emitted selector ${JSON.stringify(outSel)}`,
            outputPreludes[r]
          );
        }
        k = outSel.indexOf(SCOPE, k + 1);
      }
      if (occurrences !== 1) {
        fail(
          `expected exactly one scope suffix per selector, found ${occurrences} in ${JSON.stringify(outSel)}`,
          outputPreludes[r]
        );
      }
    }
  }
};
