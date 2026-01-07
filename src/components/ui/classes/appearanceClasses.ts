/* ==========================================
   CSS VARIABLE CONSUMER CLASSES
   These classes consume component-level CSS variables
   that are set by CSS rules in vars.css based on
   data-appearance and data-variant attributes.
   ========================================== */

/** Background consumer classes - consume --bg-color, --bg-hover-color, --bg-active-color
 * Uses bg-() syntax (background-color) instead of [background:] shorthand
 * to allow gradient overrides via className without conflicts.
 */
export const bgConsumerClasses = {
  base: "bg-(--bg-color)",
  hover: "hover:bg-(--bg-hover-color)",
  active: "active:bg-(--bg-active-color)",
} as const;

/** Text color consumer class - consumes --text-color */
export const textConsumerClass = "text-(--text-color)";

/** Border consumer class - consumes --border-color */
export const borderConsumerClass = "border-(--border-color)";

/** Ring consumer class - consumes --ring-color */
export const ringConsumerClass = "ring-(--ring-color)";

/** Focus visible outline consumer class - consumes --ring-color */
export const focusVisibleConsumerClass = "focus-visible:outline-(--ring-color)";

/** Accent color consumer class - consumes --accent-color */
export const accentConsumerClass = "accent-(--accent-color)";

/** Checked background consumer class - consumes --checked-bg-color */
export const checkedBgConsumerClass = "checked:[background:var(--checked-bg-color)]";
