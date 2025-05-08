import {
  SIZE_KEYS,
  SizeKey
} from "../props/propKeys";
import { Mode } from "../props/mode";

// Size theme structure
export type SizeTheme = {
  size?: {
    px?: Record<SizeKey, Record<Mode, string>>;
    py?: Record<SizeKey, Record<Mode, string>>;
    text?: Record<SizeKey, Record<Mode, string>>;
    gap?: Record<SizeKey, Record<Mode, string>>;
  };
};

// Generic function to create style variants
export function makeSizeVariant(
  sizeMap: Record<SizeKey, string>
): Record<SizeKey, Record<Mode, string>> {
  return SIZE_KEYS.reduce((acc, size) => {
    acc[size] = {
      base: sizeMap[size],
      hover: '',
      active: '',
    };
    return acc;
  }, {} as Record<SizeKey, Record<Mode, string>>);
}
