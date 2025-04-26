export const MODE_KEYS = ['base', 'hover', 'active'] as const;
export type Mode = typeof MODE_KEYS[number];
