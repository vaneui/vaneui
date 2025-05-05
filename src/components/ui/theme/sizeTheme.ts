import {
  SIZE_KEYS,
  SizeKey
} from "../props/propKeys";
import { ModeledStyles } from "./commonTypes";

// Size theme structure
export type SizeTheme = {
  size: Record<SizeKey, ModeledStyles>;
};

// Function to create size variants
export function makeSizeVariants(
  pxMap: Record<SizeKey, string>,
  pyMap: Record<SizeKey, string>,
  textSizeMap: Record<SizeKey, string>,
  gapMap: Record<SizeKey, string>
): Record<SizeKey, ModeledStyles> {
  return SIZE_KEYS.reduce((acc, size) => {
    acc[size] = {
      base: `${pxMap[size]} ${pyMap[size]} ${textSizeMap[size]} ${gapMap[size]}`,
      hover: '',
      active: '',
    };
    return acc;
  }, {} as Record<SizeKey, ModeledStyles>);
}