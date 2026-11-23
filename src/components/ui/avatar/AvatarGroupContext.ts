import { createContext, useContext } from 'react';
import type { SizeKey } from '../props';

/** Resolved size of the nearest AvatarGroup, the size default of the avatars inside it */
export const AvatarGroupContext = createContext<SizeKey | null>(null);

export function useAvatarGroupSize(): SizeKey | null {
  return useContext(AvatarGroupContext);
}
