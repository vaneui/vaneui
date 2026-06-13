import { typographyClassMappers } from "../ui/theme/common/typographyClassMappers";
import { defaultLinkTheme } from "../ui/typography/link/defaultLinkTheme";
import { defaultListTheme } from "../ui/typography/list/defaultListTheme";
import { defaultListItemTheme } from "../ui/typography/listItem/defaultListItemTheme";
import { bgAppearance } from "../ui/theme/common/appearanceClassMappers";
import { LinkVariantClassMapper } from "../ui/theme/appearance/linkVariantClassMapper";
import { SimpleConsumerClassMapper } from "../ui/theme/appearance/simpleConsumerClassMapper";
import { FocusVisibleClassMapper } from "../ui/theme/layout/focusVisibleClassMapper";
import { PlClassMapper } from "../ui/theme/size/plClassMapper";

/**
 * Quality gate: Link, List, and ListItem must COMPOSE over the shared
 * `typographyClassMappers` collection instead of hand-rebuilding near-copies
 * of it. Every non-delta mapper entry must be the SAME instance as the shared
 * collection's entry (reference equality), so a future change to the shared
 * collection automatically reaches these components. Every intentional
 * divergence (delta or omission) is asserted explicitly below — if you change
 * one, update both the theme comment and this test.
 */
describe("typography mapper composition (Link/List/ListItem reuse typographyClassMappers)", () => {

  describe("Link", () => {
    it("inherits the shared size group by reference", () => {
      expect(defaultLinkTheme.themes.size).toBe(typographyClassMappers.size);
    });

    it("inherits the shared typography group by reference", () => {
      expect(defaultLinkTheme.themes.typography).toBe(typographyClassMappers.typography);
    });

    it("inherits every shared layout mapper by reference", () => {
      const layout = defaultLinkTheme.themes.layout;
      expect(layout.hide).toBe(typographyClassMappers.layout.hide);
      expect(layout.items).toBe(typographyClassMappers.layout.items);
      expect(layout.justify).toBe(typographyClassMappers.layout.justify);
      expect(layout.position).toBe(typographyClassMappers.layout.position);
      expect(layout.display).toBe(typographyClassMappers.layout.display);
      expect(layout.overflow).toBe(typographyClassMappers.layout.overflow);
      expect(layout.width).toBe(typographyClassMappers.layout.width);
      expect(layout.height).toBe(typographyClassMappers.layout.height);
      expect(layout.cursor).toBe(typographyClassMappers.layout.cursor);
    });

    it("delta: appearance.text is a link-variant mapper, not the shared text appearance", () => {
      expect(defaultLinkTheme.themes.appearance.text).toBeInstanceOf(LinkVariantClassMapper);
      expect(defaultLinkTheme.themes.appearance.text as unknown).not.toBe(typographyClassMappers.appearance.text);
    });

    it("delta: layout adds a focusVisible mapper that the shared collection does not have", () => {
      expect(defaultLinkTheme.themes.layout.focusVisible).toBeInstanceOf(FocusVisibleClassMapper);
      expect("focusVisible" in typographyClassMappers.layout).toBe(false);
    });
  });

  describe("List", () => {
    it("inherits shared size.text and size.lineHeight by reference", () => {
      expect(defaultListTheme.themes.size.text).toBe(typographyClassMappers.size.text);
      expect(defaultListTheme.themes.size.lineHeight).toBe(typographyClassMappers.size.lineHeight);
    });

    it("omission: no letterSpacing mapper (not in LIST_CATEGORIES; mapper emits a default class)", () => {
      expect("letterSpacing" in defaultListTheme.themes.size).toBe(false);
    });

    it("delta: size.paddingLeft mapper for list marker indentation", () => {
      expect(defaultListTheme.themes.size.paddingLeft).toBeInstanceOf(PlClassMapper);
    });

    it("inherits the shared appearance.text mapper by reference", () => {
      expect(defaultListTheme.themes.appearance.text).toBe(typographyClassMappers.appearance.text);
    });

    it("delta: appearance.background for filled/transparent support", () => {
      expect(defaultListTheme.themes.appearance.background).toBe(bgAppearance);
      expect("background" in typographyClassMappers.appearance).toBe(false);
    });

    it("inherits the shared typography group by reference", () => {
      expect(defaultListTheme.themes.typography).toBe(typographyClassMappers.typography);
    });

    it("inherits the whole shared layout group by reference", () => {
      expect(defaultListTheme.themes.layout).toBe(typographyClassMappers.layout);
    });
  });

  describe("ListItem", () => {
    it("inherits shared size.text and size.lineHeight by reference", () => {
      expect(defaultListItemTheme.themes.size.text).toBe(typographyClassMappers.size.text);
      expect(defaultListItemTheme.themes.size.lineHeight).toBe(typographyClassMappers.size.lineHeight);
    });

    it("omission: no letterSpacing mapper (not in LIST_ITEM_CATEGORIES; mapper emits a default class)", () => {
      expect("letterSpacing" in defaultListItemTheme.themes.size).toBe(false);
    });

    it("delta: appearance.background for filled/transparent support", () => {
      expect(defaultListItemTheme.themes.appearance.background).toBe(bgAppearance);
    });

    it("delta: appearance.text is an alwaysOutput variant, not the shared text appearance", () => {
      const text = defaultListItemTheme.themes.appearance.text;
      expect(text).toBeInstanceOf(SimpleConsumerClassMapper);
      expect(text).not.toBe(typographyClassMappers.appearance.text);
      // ListItem has no appearance default (color cascades from the parent List),
      // so the text consumer class must be emitted unconditionally
      expect(text.alwaysOutput).toBe(true);
      expect(typographyClassMappers.appearance.text.alwaysOutput).toBe(false);
    });

    it("inherits the shared typography group by reference", () => {
      expect(defaultListItemTheme.themes.typography).toBe(typographyClassMappers.typography);
    });

    it("inherits the whole shared layout group by reference (activates width/height for LIST_ITEM_CATEGORIES)", () => {
      expect(defaultListItemTheme.themes.layout).toBe(typographyClassMappers.layout);
      // the sized mappers must be present — `<ListItem wFull>` was a silent no-op
      // when the layout group lacked them
      expect(defaultListItemTheme.themes.layout.width).toBe(typographyClassMappers.layout.width);
      expect(defaultListItemTheme.themes.layout.height).toBe(typographyClassMappers.layout.height);
    });
  });
});
