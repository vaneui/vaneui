import { BorderClassMapper } from "./borderClassMapper";

/**
 * Border-width mapper whose every side reads its OWN width variable
 * (`--bw-t` / `--bw-r` / `--bw-b` / `--bw-l` and the logical `--bw-s` / `--bw-e`),
 * each defaulting to `--bw`. This lets a component thicken a single edge — e.g.
 * Kbd's keycap bottom or Blockquote's start accent — purely by overriding one
 * variable in its `.vane-*` rule, with no magic-number class and no
 * `border-width` shorthand to fight (see the standard `BorderClassMapper`,
 * which uses the uniform `--bw` for every side).
 *
 * Behaviour (getClasses, noBorder handling, key set) is inherited unchanged from
 * `BorderClassMapper`; only the per-key class strings differ. Wire it into a
 * component by swapping `layout.border` in that component's mapper collection.
 */
export class PerSideBorderClassMapper extends BorderClassMapper {
  border: string =
    "border-t-[length:var(--bw-t)] border-r-[length:var(--bw-r)] " +
    "border-b-[length:var(--bw-b)] border-l-[length:var(--bw-l)]";
  borderT: string = "border-t-[length:var(--bw-t)]";
  borderB: string = "border-b-[length:var(--bw-b)]";
  borderL: string = "border-l-[length:var(--bw-l)]";
  borderR: string = "border-r-[length:var(--bw-r)]";
  borderX: string = "border-l-[length:var(--bw-l)] border-r-[length:var(--bw-r)]";
  borderY: string = "border-t-[length:var(--bw-t)] border-b-[length:var(--bw-b)]";
  borderS: string = "border-s-[length:var(--bw-s)]";
  borderE: string = "border-e-[length:var(--bw-e)]";
}
