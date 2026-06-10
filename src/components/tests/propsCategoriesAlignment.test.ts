/**
 * Compile-time alignment check between the Props layer and the Categories
 * layer of the 3-layer prop system. Nothing else ties them together:
 * componentThemeCoverage.test.ts checks Categories <-> Mappers, but a
 * category missing from a component's Props type makes an engine-supported
 * feature unreachable through TypeScript (and via ThemeDefaults, which is
 * derived from the Props type).
 *
 * Each assertion resolves to `true` when every category-driven boolean key
 * exists on the component's Props type; otherwise it resolves to the union
 * of the MISSING keys, so the compile error names them.
 *
 * The reverse direction (Props keys not backed by a category) is
 * intentionally NOT asserted — props like `loading`, `href`, or `active`
 * are legitimate non-category props.
 */
import { ComponentKeys, type ComponentCategoryKey } from '../ui/props';
import {
  BUTTON_CATEGORIES, BADGE_CATEGORIES, CHIP_CATEGORIES, CODE_CATEGORIES,
  ICON_CATEGORIES, GRID_CATEGORIES, CONTAINER_CATEGORIES,
  STACK_CATEGORIES, ROW_CATEGORIES,
} from '../ui/props/categoryBuilders';
import type { ButtonProps } from '../ui/button';
import type { IconButtonProps } from '../ui/iconButton';
import type { BadgeProps } from '../ui/badge';
import type { ChipProps } from '../ui/chip';
import type { CodeProps } from '../ui/code';
import type { KbdProps } from '../ui/kbd';
import type { MarkProps } from '../ui/mark';
import type { IconProps } from '../ui/icon';
import type { InputProps } from '../ui/input';
import type { CheckboxProps } from '../ui/checkbox';
import type { LabelProps } from '../ui/label';
import type { CardProps } from '../ui/card';
import type { ColProps } from '../ui/col';
import type { RowProps } from '../ui/row';
import type { StackProps } from '../ui/stack';
import type { SectionProps } from '../ui/section';
import type { ContainerProps } from '../ui/container';
import type { GridProps } from '../ui/grid';
import type { DividerProps } from '../ui/divider';
import type { ImgProps } from '../ui/img';
import type { ModalProps } from '../ui/modal';
import type { OverlayProps } from '../ui/overlay';
import type { PopupProps } from '../ui/popup';
import type { MenuItemProps, MenuLabelProps } from '../ui/menu';
import type { NavLinkProps } from '../ui/navLink';
import type { TypographyProps, LinkProps, ListProps } from '../ui/typography';
import { INPUT_CATEGORIES } from '../ui/input/InputCategories';
import { CHECKBOX_CATEGORIES } from '../ui/checkbox/CheckboxCategories';
import { LABEL_CATEGORIES } from '../ui/label/LabelCategories';
import { CARD_CATEGORIES } from '../ui/card/CardCategories';
import { COL_CATEGORIES } from '../ui/col/ColCategories';
import { SECTION_CATEGORIES } from '../ui/section/SectionCategories';
import { DIVIDER_CATEGORIES } from '../ui/divider/DividerCategories';
import { IMG_CATEGORIES } from '../ui/img/ImgCategories';
import { MODAL_CATEGORIES } from '../ui/modal/ModalCategories';
import { OVERLAY_CATEGORIES } from '../ui/overlay/OverlayCategories';
import { POPUP_CATEGORIES } from '../ui/popup/PopupCategories';
import { MENU_ITEM_CATEGORIES } from '../ui/menu/MenuItemCategories';
import { MENU_LABEL_CATEGORIES } from '../ui/menu/MenuLabelCategories';
import { NAV_LINK_CATEGORIES } from '../ui/navLink/NavLinkCategories';
import { TYPOGRAPHY_CATEGORIES, LIST_CATEGORIES } from '../ui/typography/common/TypographyCategories';
import { LINK_CATEGORIES } from '../ui/typography/link/LinkCategories';

type CategoryFlagKeys<C extends readonly ComponentCategoryKey[]> =
  (typeof ComponentKeys)[C[number]][number];

type AssertCategoriesCovered<P, C extends readonly ComponentCategoryKey[]> =
  [Exclude<CategoryFlagKeys<C>, keyof P>] extends [never]
    ? true
    : Exclude<CategoryFlagKeys<C>, keyof P>;

// each line fails to COMPILE (naming the missing keys) when a component's
// categories declare a flag its Props type doesn't expose
const assertions: true[] = [
  true as AssertCategoriesCovered<ButtonProps, typeof BUTTON_CATEGORIES>,
  true as AssertCategoriesCovered<IconButtonProps, typeof BUTTON_CATEGORIES>,
  true as AssertCategoriesCovered<BadgeProps, typeof BADGE_CATEGORIES>,
  true as AssertCategoriesCovered<ChipProps, typeof CHIP_CATEGORIES>,
  true as AssertCategoriesCovered<CodeProps, typeof CODE_CATEGORIES>,
  true as AssertCategoriesCovered<KbdProps, typeof CODE_CATEGORIES>,
  true as AssertCategoriesCovered<MarkProps, typeof CODE_CATEGORIES>,
  true as AssertCategoriesCovered<IconProps, typeof ICON_CATEGORIES>,
  true as AssertCategoriesCovered<InputProps, typeof INPUT_CATEGORIES>,
  true as AssertCategoriesCovered<CheckboxProps, typeof CHECKBOX_CATEGORIES>,
  true as AssertCategoriesCovered<LabelProps, typeof LABEL_CATEGORIES>,
  true as AssertCategoriesCovered<CardProps, typeof CARD_CATEGORIES>,
  true as AssertCategoriesCovered<ColProps, typeof COL_CATEGORIES>,
  true as AssertCategoriesCovered<RowProps, typeof ROW_CATEGORIES>,
  true as AssertCategoriesCovered<StackProps, typeof STACK_CATEGORIES>,
  true as AssertCategoriesCovered<SectionProps, typeof SECTION_CATEGORIES>,
  true as AssertCategoriesCovered<ContainerProps, typeof CONTAINER_CATEGORIES>,
  true as AssertCategoriesCovered<GridProps, typeof GRID_CATEGORIES>,
  true as AssertCategoriesCovered<DividerProps, typeof DIVIDER_CATEGORIES>,
  true as AssertCategoriesCovered<ImgProps, typeof IMG_CATEGORIES>,
  true as AssertCategoriesCovered<ModalProps, typeof MODAL_CATEGORIES>,
  true as AssertCategoriesCovered<OverlayProps, typeof OVERLAY_CATEGORIES>,
  true as AssertCategoriesCovered<PopupProps, typeof POPUP_CATEGORIES>,
  true as AssertCategoriesCovered<MenuItemProps, typeof MENU_ITEM_CATEGORIES>,
  true as AssertCategoriesCovered<MenuLabelProps, typeof MENU_LABEL_CATEGORIES>,
  true as AssertCategoriesCovered<NavLinkProps, typeof NAV_LINK_CATEGORIES>,
  true as AssertCategoriesCovered<TypographyProps, typeof TYPOGRAPHY_CATEGORIES>,
  true as AssertCategoriesCovered<LinkProps, typeof LINK_CATEGORIES>,
  true as AssertCategoriesCovered<ListProps, typeof LIST_CATEGORIES>,
];

describe('Props/Categories alignment', () => {
  it('should expose every category-driven flag on the corresponding Props type (compile-time)', () => {
    expect(assertions.every(Boolean)).toBe(true);
  });
});
