import {
  SIZE_KEYS,
  SizeKey
} from "../props/propKeys";
import { ModeledStyles } from "./commonTypes";

// Size theme structure
export type SizeTheme = {
  size?: {
    px?: Record<SizeKey, ModeledStyles>;
    py?: Record<SizeKey, ModeledStyles>;
    text?: Record<SizeKey, ModeledStyles>;
    gap?: Record<SizeKey, ModeledStyles>;
  };
};

// Generic function to create style variants
export function makeSizeVariant(
  sizeMap: Record<SizeKey, string>
): Record<SizeKey, ModeledStyles> {
  return SIZE_KEYS.reduce((acc, size) => {
    acc[size] = {
      base: sizeMap[size],
      hover: '',
      active: '',
    };
    return acc;
  }, {} as Record<SizeKey, ModeledStyles>);
}
