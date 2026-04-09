import { ComponentTheme, defaultSizedLayoutClassMappers, defaultTypographyClassMappers, textAppearance, borderAppearance, ringAppearance, focusVisibleAppearance, shadowAppearance } from "../theme/common";
import { PxClassMapper, PyClassMapper, GapClassMapper, FontSizeClassMapper, LineHeightClassMapper } from "../theme/size";
import { BorderClassMapper, RingClassMapper, FocusVisibleClassMapper, RadiusClassMapper, WrapClassMapper, DirectionClassMapper, CursorClassMapper, TransitionClassMapper, WhitespaceClassMapper } from "../theme/layout";
import type { MenuLabelProps } from "./MenuLabelProps";
import type { MenuLabelTheme } from "./MenuLabelTheme";
import { MENU_LABEL_CATEGORIES } from "./MenuLabelCategories";
import { menuLabelDefaults } from "./menuLabelDefaults";

/**
 * MenuLabel theme — presentational heading inside a menu.
 *
 * Intentionally has NO `bgAppearance` mapper. MenuLabel inherits its
 * background from the parent menu and never emits its own bg-* classes —
 * see `menu.test.tsx` "should have no background classes" for the
 * design assertion. Because there's no background, `transparent` is also
 * NOT in `MENU_LABEL_CATEGORIES`.
 */
export const defaultMenuLabelTheme = new ComponentTheme<MenuLabelProps, MenuLabelTheme>(
  "div",
  "vane-menu-label [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    size: {
      px: new PxClassMapper(),
      py: new PyClassMapper(),
      text: new FontSizeClassMapper(),
      lineHeight: new LineHeightClassMapper(),
      gap: new GapClassMapper(),
    },
    appearance: {
      text: textAppearance,
      border: borderAppearance,
      ring: ringAppearance,
      focusVisible: focusVisibleAppearance,
      shadow: shadowAppearance,
    },
    layout: {
      ...defaultSizedLayoutClassMappers,
      border: new BorderClassMapper(),
      ring: new RingClassMapper(),
      focusVisible: new FocusVisibleClassMapper(),
      radius: new RadiusClassMapper(),
      wrap: new WrapClassMapper(),
      flexDirection: new DirectionClassMapper(),
      cursor: new CursorClassMapper(),
      transition: new TransitionClassMapper(),
      whitespace: new WhitespaceClassMapper(),
    },
    typography: defaultTypographyClassMappers,
  },
  menuLabelDefaults,
  MENU_LABEL_CATEGORIES,
  undefined,
  'ui',
  // `secondary outline` from menuLabelDefaults is MenuLabel's semantic
  // identity — a muted section heading color that should not inherit from
  // any ancestor appearance context.
  true,
);
