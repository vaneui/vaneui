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

// Function to create px variants
export function makePxVariants(
  pxMap: Record<SizeKey, string>
): SizeTheme {
  return {
    size: {
      px: makeSizeVariant(pxMap)
    }
  };
}

// Function to create py variants
export function makePyVariants(
  pyMap: Record<SizeKey, string>
): SizeTheme {
  return {
    size: {
      py: makeSizeVariant(pyMap)
    }
  };
}

// Function to create text size variants
export function makeTextSizeVariants(
  textSizeMap: Record<SizeKey, string>
): SizeTheme {
  return {
    size: {
      text: makeSizeVariant(textSizeMap)
    }
  };
}

// Function to create gap variants
export function makeGapVariants(
  gapMap: Record<SizeKey, string>
): SizeTheme {
  return {
    size: {
      gap: makeSizeVariant(gapMap)
    }
  };
}

// Function to create a complete size theme
export function makeSizeTheme(
  pxMap?: Record<SizeKey, string>,
  pyMap?: Record<SizeKey, string>,
  textSizeMap?: Record<SizeKey, string>,
  gapMap?: Record<SizeKey, string>
): SizeTheme {
  return {
    size: {
      px: pxMap ? makeSizeVariant(pxMap) : undefined,
      py: pyMap ? makeSizeVariant(pyMap) : undefined,
      text: textSizeMap ? makeSizeVariant(textSizeMap) : undefined,
      gap: gapMap ? makeSizeVariant(gapMap) : undefined
    }
  };
}
