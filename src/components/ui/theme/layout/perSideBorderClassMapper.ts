import { BorderClassMapper } from "./borderClassMapper";

/* Border-width mapper: each side reads its own --bw-* (default --bw), so a component thickens one edge (Kbd bottom, Blockquote start) by overriding one var. Extends BorderClassMapper; only the per-key class strings differ. */
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
  borderStart: string = "border-s-[length:var(--bw-s)]";
  borderEnd: string = "border-e-[length:var(--bw-e)]";
}
