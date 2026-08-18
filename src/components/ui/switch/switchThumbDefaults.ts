import type { SwitchThumbProps } from "./SwitchThumbProps";

/** Default props for Switch thumb component */
export const switchThumbDefaults: Partial<SwitchThumbProps> = {
  pill: true,
  transition: true,
  // sits at the track's inline start and slides on :checked
  justifySelfStart: true,
  // decorative overlay — clicks must reach the <input> underneath it
  pointerEventsNone: true,
};
