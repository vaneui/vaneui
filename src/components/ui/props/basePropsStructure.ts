import { ComponentCategoryKey, ComponentKeys } from "./keys";

export type CategoryProps = {
  [K in ComponentCategoryKey]?: (typeof ComponentKeys)[K][number];
} & {
  // Special mapped field names used by extractKeysFromCategories
  reverse?: 'reverse';
};