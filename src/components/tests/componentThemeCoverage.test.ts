import { ComponentKeys } from "../ui/props";
import { BaseClassMapper } from "../ui/theme/common/BaseClassMapper";
import { ComponentTheme } from "../ui/theme/common/ComponentTheme";
import { defaultTheme } from "../defaultTheme";

// Import all component themes — existing
import { defaultCheckboxWrapperTheme, defaultCheckboxTheme, defaultCheckboxCheckTheme, defaultCheckboxIndeterminateTheme, CHECKBOX_INDETERMINATE_CATEGORIES } from "../ui/checkbox";
import { defaultButtonTheme } from "../ui/button/defaultButtonTheme";
import { defaultButtonSpinnerTheme, BUTTON_SPINNER_CATEGORIES } from "../ui/button";
import { defaultIconButtonTheme } from "../ui/iconButton";
import { defaultBadgeTheme } from "../ui/badge/defaultBadgeTheme";
import { defaultChipTheme } from "../ui/chip/defaultChipTheme";
import { defaultCodeTheme } from "../ui/code/defaultCodeTheme";
import { defaultKbdTheme } from "../ui/kbd";
import { defaultMarkTheme } from "../ui/mark";
import { textTheme, titleTheme, pageTitleTheme, sectionTitleTheme, blockquoteTheme, linkTheme, listTheme, listItemTheme, LIST_CATEGORIES } from "../ui/typography";
import { defaultGrid2Theme } from "../ui/grid/defaultGrid2Theme";
import { defaultGrid3Theme } from "../ui/grid/defaultGrid3Theme";
import { defaultGrid4Theme } from "../ui/grid/defaultGrid4Theme";
import { defaultGrid5Theme } from "../ui/grid/defaultGrid5Theme";
import { defaultGrid6Theme } from "../ui/grid/defaultGrid6Theme";
import { defaultContainerTheme } from "../ui/container/defaultContainerTheme";
import { defaultColTheme } from "../ui/col/defaultColTheme";
import { defaultRowTheme } from "../ui/row/defaultRowTheme";
import { defaultStackTheme } from "../ui/stack/defaultStackTheme";
import { defaultCardTheme, defaultCardHeaderTheme, defaultCardBodyTheme, defaultCardFooterTheme, CARD_HEADER_CATEGORIES, CARD_BODY_CATEGORIES, CARD_FOOTER_CATEGORIES } from "../ui/card";
import { defaultDividerTheme } from "../ui/divider/defaultDividerTheme";
import { defaultMenuDividerTheme } from "../ui/divider/defaultMenuDividerTheme";
import { defaultSectionTheme } from "../ui/section/defaultSectionTheme";
import { defaultLabelTheme } from "../ui/label/defaultLabelTheme";
import { defaultImgTheme } from "../ui/img/defaultImgTheme";
import { defaultInputTheme } from "../ui/input";
import { defaultNavLinkTheme, NAV_LINK_CATEGORIES, defaultNavLinkLabelTheme, NAV_LINK_LABEL_CATEGORIES } from "../ui/navLink";
import { defaultOverlayTheme } from "../ui/overlay";
import { defaultPopupTheme } from "../ui/popup";
import { defaultIconTheme } from "../ui/icon";
import { defaultModalContentTheme, defaultModalOverlayTheme, defaultModalHeaderTheme, defaultModalBodyTheme, defaultModalFooterTheme, defaultModalCloseButtonTheme, MODAL_CATEGORIES, MODAL_CLOSE_BUTTON_CATEGORIES } from "../ui/modal";
import { MODAL_HEADER_CATEGORIES } from "../ui/modal/ModalHeaderCategories";
import { MODAL_BODY_CATEGORIES } from "../ui/modal/ModalBodyCategories";
import { MODAL_FOOTER_CATEGORIES } from "../ui/modal/ModalFooterCategories";
import { defaultMenuItemTheme, defaultMenuLabelTheme, defaultMenuPopupTheme, MENU_ITEM_CATEGORIES, MENU_LABEL_CATEGORIES } from "../ui/menu";

// Import all category constants
import {
  BUTTON_CATEGORIES,
  BADGE_CATEGORIES,
  CHIP_CATEGORIES,
  CODE_CATEGORIES,
  TYPOGRAPHY_CATEGORIES,
  GRID_CATEGORIES,
  CONTAINER_CATEGORIES,
  COL_CATEGORIES,
  ROW_CATEGORIES,
  STACK_CATEGORIES,
  CARD_CATEGORIES,
  DIVIDER_CATEGORIES,
  SECTION_CATEGORIES,
  CHECKBOX_CATEGORIES,
  LABEL_CATEGORIES,
  IMG_CATEGORIES,
  INPUT_CATEGORIES,
  POPUP_CATEGORIES,
  OVERLAY_CATEGORIES,
  ICON_CATEGORIES
} from "../ui/props";

type ComponentKeysType = typeof ComponentKeys;

// Generic theme testing utilities
class ComponentThemeTester {
  private keyToCategory: Record<string, keyof ComponentKeysType>;

  constructor() {
    // Build reverse lookup: key -> category
    this.keyToCategory = Object.keys(ComponentKeys).reduce((acc, category) => {
      const cat = category as keyof ComponentKeysType;
      for (const key of ComponentKeys[cat] as readonly string[]) {
        acc[key] = cat;
      }
      return acc;
    }, {} as Record<string, keyof ComponentKeysType>);
  }

  // Recursively collect all BaseClassMapper instances from the themes tree
  collectBaseClassMappers(node: unknown): BaseClassMapper[] {
    const result: BaseClassMapper[] = [];
    const visited = new WeakSet();
    
    const visit = (n: unknown, depth: number = 0) => {
      if (!n || typeof n !== "object" || depth > 10) return; // Prevent infinite recursion
      if (visited.has(n)) return; // Prevent circular references
      visited.add(n);
      
      if (n instanceof BaseClassMapper) {
        result.push(n);
      }
      
      // Recursively visit all properties, including nested objects
      try {
        for (const k of Object.keys(n)) {
          const value = (n as Record<string, unknown>)[k];
          if (value && typeof value === "object") {
            visit(value, depth + 1);
          }
        }
      } catch {
        // ignore access errors
      }
    };
    
    visit(node);
    return result;
  }

  // Test if any theme can handle a specific category by testing all keys in that category
  canHandleCategory(category: keyof ComponentKeysType, baseThemes: BaseClassMapper[]): boolean {
    const categoryKeys = ComponentKeys[category] as readonly string[] || [];
    if (categoryKeys.length === 0) return false;
    
    // Test each key in the category to see if any theme can handle it
    for (const key of categoryKeys) {
      if (this.canAnyThemeHandleKey(key, category, baseThemes)) {
        return true;
      }
    }
    return false;
  }
  
  // Test if any theme can handle a specific key for a category
  canAnyThemeHandleKey(key: string, category: keyof ComponentKeysType, baseThemes: BaseClassMapper[]): boolean {
    return baseThemes.some(theme => this.themeHandlesKey(theme, key, category));
  }
  
  // Test if a single theme can handle a specific key for a category
  themeHandlesKey(theme: BaseClassMapper, key: string, category: keyof ComponentKeysType): boolean {
    // Create base context that provides commonly needed properties for themes to work
    const baseContext = {
      appearance: 'primary',
      size: 'md',
      variant: 'outline',
      padding: 'padding',
      border: 'border',
      shadow: 'shadow',
      gap: 'gap',
      wrap: 'flexNoWrap',
      flexDirection: 'column',
      reverse: false,
      shape: 'rounded',
      ring: 'ring'
    };
    
    // Test by setting the category to the key value vs a different value
    const extractedWithKey: Record<string, unknown> = { ...baseContext };
    extractedWithKey[category] = key;
    
    const extractedWithDifferent: Record<string, unknown> = { ...baseContext };
    // Use a different value for the category that should produce different output
    if (category === 'shape') {
      extractedWithDifferent[category] = key === 'rounded' ? 'sharp' : 'rounded';
    } else if (category === 'border') {
      extractedWithDifferent[category] = key === 'border' ? 'noBorder' : 'border';
    } else if (category === 'shadow') {
      extractedWithDifferent[category] = key === 'shadow' ? 'noShadow' : 'shadow';
    } else if (category === 'variant') {
      extractedWithDifferent[category] = key === 'outline' ? 'filled' : 'outline';
    } else if (category === 'ring') {
      extractedWithDifferent[category] = key === 'ring' ? 'noRing' : 'ring';
    } else if (category === 'size') {
      extractedWithDifferent[category] = key === 'md' ? 'lg' : 'md';
    } else if (category === 'padding') {
      extractedWithDifferent[category] = key === 'padding' ? 'noPadding' : 'padding';
    } else {
      extractedWithDifferent[category] = 'INVALID_TEST_VALUE_DIFFERENT_FROM_KEY';
    }
    
    try {
      const classesWithKey = theme.getClasses(extractedWithKey as Parameters<typeof theme.getClasses>[0]);
      const classesWithDifferent = theme.getClasses(extractedWithDifferent as Parameters<typeof theme.getClasses>[0]);
      
      const keyContent = Array.isArray(classesWithKey) ? classesWithKey.filter(s => s && s.trim()).join(' ') : '';
      const differentContent = Array.isArray(classesWithDifferent) ? classesWithDifferent.filter(s => s && s.trim()).join(' ') : '';
      
      // A theme handles a category if it produces different output for different category values
      // OR if it produces any non-empty output for the key (handles uniform values)
      const hasOutput = keyContent.length > 0;
      const hasDifferentOutput = keyContent !== differentContent;
      
      return hasDifferentOutput || hasOutput;
    } catch {
      return false;
    }
  }

  // Test a single theme's default props using category-driven approach
  testThemeDefaults(themeName: string, theme: { defaults?: Record<string, unknown>, themes?: unknown }): void {
    const defaults = theme.defaults || {};
    const defaultTrueProps = Object.keys(defaults).filter(key => defaults[key] === true);
    
    // Collect all BaseClassMapper instances from this theme
    const baseThemes = this.collectBaseClassMappers(theme.themes);
    
    // Debug: show only if there are missing handlers
    // Remove debug logging unless needed
    
    // Find missing handlers for default props by checking categories
    const missingHandlers: Array<{prop: string, category: string}> = [];
    
    for (const prop of defaultTrueProps) {
      const category = this.keyToCategory[prop];
      
      if (category) {
        const hasHandler = this.canAnyThemeHandleKey(prop, category, baseThemes);
        
        if (!hasHandler) {
          missingHandlers.push({prop, category});
        }
      }
    }
    
    // The test should fail if there are missing handlers
    if (missingHandlers.length > 0) {
      const errorMessages = missingHandlers.map(({prop, category}) => 
        `  - defaults.${prop} = true, but no theme handler for category '${category}'`
      );
      
      throw new Error(
        `${themeName} has the following missing theme handlers:\n` +
        errorMessages.join('\n') +
        `\n\nEvery default prop must have a corresponding theme handler.`
      );
    }
    
    expect(missingHandlers.length).toBe(0);
  }

  // Test coverage of component category keys across multiple themes using category-driven approach
  testCategoryCoverage(componentName: string, categories: readonly string[], themes: Array<{name: string, theme: { defaults?: Record<string, unknown>, themes?: unknown }}>): void {
    // Collect all BaseClassMappers from all provided themes
    const allBaseClassMappers = themes.flatMap(({theme}) => this.collectBaseClassMappers(theme.themes));
    
    // Check each category to see if any theme can handle it
    const missingCategories: string[] = [];
    
    for (const category of categories) {
      const categoryKey = category as keyof ComponentKeysType;
      const canHandle = this.canHandleCategory(categoryKey, allBaseClassMappers);
      
      if (!canHandle) {
        missingCategories.push(category);
      }
    }
    
    // This test should fail if there are missing category handlers
    if (missingCategories.length > 0) {
      const themeNames = themes.map(t => t.name).join(', ');
      
      throw new Error(
        `The following ${componentName} categories lack theme handlers in [${themeNames}]:\n` +
        missingCategories.map(cat => `  - ${cat}`).join('\n') +
        `\n\nTotal missing: ${missingCategories.length} out of ${categories.length} categories`
      );
    }
    
    expect(missingCategories.length).toBe(0);
  }
}

// Generic test configuration interface
interface ComponentTestConfig {
  propsType: string;
  categories: readonly string[];
  themes: Array<{
    name: string;
    theme: { defaults?: Record<string, unknown>, themes?: unknown };
  }>;
}

describe("Component theme coverage tests", () => {
  const tester = new ComponentThemeTester();

  // Helper function to create tests for a component configuration
  const createThemeTests = (config: ComponentTestConfig) => {
    // Test each theme's defaults individually
    config.themes.forEach(({name, theme}) => {
      it(`should ensure ${name} has handlers for all its default props`, () => {
        tester.testThemeDefaults(name, theme);
      });
    });

    // Test overall coverage across all themes
    it(`should ensure all ${config.propsType} keys have theme mappings across all ${config.propsType.toLowerCase()} themes`, () => {
      tester.testCategoryCoverage(config.propsType, config.categories, config.themes);
    });
  };

  // Interactive Components (Button, IconButton, Badge, Chip, Code, Kbd, Mark, Input, NavLink)
  describe("Interactive component themes", () => {
    const buttonConfig: ComponentTestConfig = {
      propsType: "ButtonProps",
      categories: BUTTON_CATEGORIES,
      themes: [
        { name: "defaultButtonTheme", theme: defaultButtonTheme },
        { name: "defaultIconButtonTheme", theme: defaultIconButtonTheme }
      ]
    };
    createThemeTests(buttonConfig);

    const badgeConfig: ComponentTestConfig = {
      propsType: "BadgeProps",
      categories: BADGE_CATEGORIES,
      themes: [
        { name: "defaultBadgeTheme", theme: defaultBadgeTheme }
      ]
    };
    createThemeTests(badgeConfig);

    const chipConfig: ComponentTestConfig = {
      propsType: "ChipProps",
      categories: CHIP_CATEGORIES,
      themes: [
        { name: "defaultChipTheme", theme: defaultChipTheme }
      ]
    };
    createThemeTests(chipConfig);

    const codeConfig: ComponentTestConfig = {
      propsType: "CodeProps",
      categories: CODE_CATEGORIES,
      themes: [
        { name: "defaultCodeTheme", theme: defaultCodeTheme },
        { name: "defaultKbdTheme", theme: defaultKbdTheme },
        { name: "defaultMarkTheme", theme: defaultMarkTheme }
      ]
    };
    createThemeTests(codeConfig);

    const inputConfig: ComponentTestConfig = {
      propsType: "InputProps",
      categories: INPUT_CATEGORIES,
      themes: [
        { name: "defaultInputTheme", theme: defaultInputTheme }
      ]
    };
    createThemeTests(inputConfig);

    const navLinkConfig: ComponentTestConfig = {
      propsType: "NavLinkProps",
      categories: NAV_LINK_CATEGORIES,
      themes: [
        { name: "defaultNavLinkTheme", theme: defaultNavLinkTheme }
      ]
    };
    createThemeTests(navLinkConfig);
  });

  // Typography Components
  describe("Typography component themes", () => {
    const typographyConfig: ComponentTestConfig = {
      propsType: "TypographyProps",
      categories: TYPOGRAPHY_CATEGORIES,
      themes: [
        { name: "textTheme", theme: textTheme },
        { name: "titleTheme", theme: titleTheme },
        { name: "pageTitleTheme", theme: pageTitleTheme },
        { name: "sectionTitleTheme", theme: sectionTitleTheme },
        { name: "blockquoteTheme", theme: blockquoteTheme }
      ]
    };
    createThemeTests(typographyConfig);

    // Link has its own theme (not typographyClassMappers) but uses TYPOGRAPHY_CATEGORIES
    const linkConfig: ComponentTestConfig = {
      propsType: "LinkProps",
      categories: TYPOGRAPHY_CATEGORIES,
      themes: [
        { name: "linkTheme", theme: linkTheme }
      ]
    };
    createThemeTests(linkConfig);

    // List and ListItem use LIST_CATEGORIES (different from TYPOGRAPHY_CATEGORIES)
    const listConfig: ComponentTestConfig = {
      propsType: "ListProps",
      categories: LIST_CATEGORIES,
      themes: [
        { name: "listTheme", theme: listTheme },
        { name: "listItemTheme", theme: listItemTheme }
      ]
    };
    createThemeTests(listConfig);
  });

  // Layout Components
  describe("Layout component themes", () => {
    const gridConfig: ComponentTestConfig = {
      propsType: "GridProps",
      categories: GRID_CATEGORIES,
      themes: [
        { name: "defaultGrid2Theme", theme: defaultGrid2Theme },
        { name: "defaultGrid3Theme", theme: defaultGrid3Theme },
        { name: "defaultGrid4Theme", theme: defaultGrid4Theme },
        { name: "defaultGrid5Theme", theme: defaultGrid5Theme },
        { name: "defaultGrid6Theme", theme: defaultGrid6Theme }
      ]
    };
    createThemeTests(gridConfig);

    const containerConfig: ComponentTestConfig = {
      propsType: "ContainerProps",
      categories: CONTAINER_CATEGORIES,
      themes: [
        { name: "defaultContainerTheme", theme: defaultContainerTheme }
      ]
    };
    createThemeTests(containerConfig);

    const colConfig: ComponentTestConfig = {
      propsType: "ColProps",
      categories: COL_CATEGORIES,
      themes: [
        { name: "defaultColTheme", theme: defaultColTheme }
      ]
    };
    createThemeTests(colConfig);

    const rowConfig: ComponentTestConfig = {
      propsType: "RowProps",
      categories: ROW_CATEGORIES,
      themes: [
        { name: "defaultRowTheme", theme: defaultRowTheme }
      ]
    };
    createThemeTests(rowConfig);

    const stackConfig: ComponentTestConfig = {
      propsType: "StackProps",
      categories: STACK_CATEGORIES,
      themes: [
        { name: "defaultStackTheme", theme: defaultStackTheme }
      ]
    };
    createThemeTests(stackConfig);

    const cardConfig: ComponentTestConfig = {
      propsType: "CardProps",
      categories: CARD_CATEGORIES,
      themes: [
        { name: "defaultCardTheme", theme: defaultCardTheme }
      ]
    };
    createThemeTests(cardConfig);

    const cardHeaderConfig: ComponentTestConfig = {
      propsType: "CardHeaderProps",
      categories: CARD_HEADER_CATEGORIES,
      themes: [
        { name: "defaultCardHeaderTheme", theme: defaultCardHeaderTheme }
      ]
    };
    createThemeTests(cardHeaderConfig);

    const cardBodyConfig: ComponentTestConfig = {
      propsType: "CardBodyProps",
      categories: CARD_BODY_CATEGORIES,
      themes: [
        { name: "defaultCardBodyTheme", theme: defaultCardBodyTheme }
      ]
    };
    createThemeTests(cardBodyConfig);

    const cardFooterConfig: ComponentTestConfig = {
      propsType: "CardFooterProps",
      categories: CARD_FOOTER_CATEGORIES,
      themes: [
        { name: "defaultCardFooterTheme", theme: defaultCardFooterTheme }
      ]
    };
    createThemeTests(cardFooterConfig);

    const dividerConfig: ComponentTestConfig = {
      propsType: "DividerProps",
      categories: DIVIDER_CATEGORIES,
      themes: [
        { name: "defaultDividerTheme", theme: defaultDividerTheme }
      ]
    };
    createThemeTests(dividerConfig);

    const sectionConfig: ComponentTestConfig = {
      propsType: "SectionProps",
      categories: SECTION_CATEGORIES,
      themes: [
        { name: "defaultSectionTheme", theme: defaultSectionTheme }
      ]
    };
    createThemeTests(sectionConfig);
  });

  // Form Components
  describe("Form component themes", () => {
    const checkboxConfig: ComponentTestConfig = {
      propsType: "CheckboxProps",
      categories: CHECKBOX_CATEGORIES,
      themes: [
        { name: "defaultCheckboxWrapperTheme", theme: defaultCheckboxWrapperTheme },
        { name: "defaultCheckboxTheme", theme: defaultCheckboxTheme },
        { name: "defaultCheckboxCheckTheme", theme: defaultCheckboxCheckTheme }
      ]
    };
    createThemeTests(checkboxConfig);

    const labelConfig: ComponentTestConfig = {
      propsType: "LabelProps",
      categories: LABEL_CATEGORIES,
      themes: [
        { name: "defaultLabelTheme", theme: defaultLabelTheme }
      ]
    };
    createThemeTests(labelConfig);
  });

  // Media Components
  describe("Media component themes", () => {
    const imgConfig: ComponentTestConfig = {
      propsType: "ImgProps",
      categories: IMG_CATEGORIES,
      themes: [
        { name: "defaultImgTheme", theme: defaultImgTheme }
      ]
    };
    createThemeTests(imgConfig);
  });

  // Overlay, Popup, Icon
  describe("Overlay/Popup/Icon component themes", () => {
    const overlayConfig: ComponentTestConfig = {
      propsType: "OverlayProps",
      categories: OVERLAY_CATEGORIES,
      themes: [
        { name: "defaultOverlayTheme", theme: defaultOverlayTheme }
      ]
    };
    createThemeTests(overlayConfig);

    const popupConfig: ComponentTestConfig = {
      propsType: "PopupProps",
      categories: POPUP_CATEGORIES,
      themes: [
        { name: "defaultPopupTheme", theme: defaultPopupTheme }
      ]
    };
    createThemeTests(popupConfig);

    const iconConfig: ComponentTestConfig = {
      propsType: "IconProps",
      categories: ICON_CATEGORIES,
      themes: [
        { name: "defaultIconTheme", theme: defaultIconTheme }
      ]
    };
    createThemeTests(iconConfig);
  });

  // Modal Components
  describe("Modal component themes", () => {
    const modalConfig: ComponentTestConfig = {
      propsType: "ModalProps",
      categories: MODAL_CATEGORIES,
      themes: [
        { name: "defaultModalContentTheme", theme: defaultModalContentTheme },
        { name: "defaultModalOverlayTheme", theme: defaultModalOverlayTheme }
      ]
    };
    createThemeTests(modalConfig);

    const modalHeaderConfig: ComponentTestConfig = {
      propsType: "ModalHeaderProps",
      categories: MODAL_HEADER_CATEGORIES,
      themes: [
        { name: "defaultModalHeaderTheme", theme: defaultModalHeaderTheme }
      ]
    };
    createThemeTests(modalHeaderConfig);

    const modalBodyConfig: ComponentTestConfig = {
      propsType: "ModalBodyProps",
      categories: MODAL_BODY_CATEGORIES,
      themes: [
        { name: "defaultModalBodyTheme", theme: defaultModalBodyTheme }
      ]
    };
    createThemeTests(modalBodyConfig);

    const modalFooterConfig: ComponentTestConfig = {
      propsType: "ModalFooterProps",
      categories: MODAL_FOOTER_CATEGORIES,
      themes: [
        { name: "defaultModalFooterTheme", theme: defaultModalFooterTheme }
      ]
    };
    createThemeTests(modalFooterConfig);

    const modalCloseButtonConfig: ComponentTestConfig = {
      propsType: "ModalCloseButtonProps",
      categories: MODAL_CLOSE_BUTTON_CATEGORIES,
      themes: [
        { name: "defaultModalCloseButtonTheme", theme: defaultModalCloseButtonTheme }
      ]
    };
    createThemeTests(modalCloseButtonConfig);
  });

  // Menu Components
  describe("Menu component themes", () => {
    const menuItemConfig: ComponentTestConfig = {
      propsType: "MenuItemProps",
      categories: MENU_ITEM_CATEGORIES,
      themes: [
        { name: "defaultMenuItemTheme", theme: defaultMenuItemTheme }
      ]
    };
    createThemeTests(menuItemConfig);

    const menuLabelConfig: ComponentTestConfig = {
      propsType: "MenuLabelProps",
      categories: MENU_LABEL_CATEGORIES,
      themes: [
        { name: "defaultMenuLabelTheme", theme: defaultMenuLabelTheme }
      ]
    };
    createThemeTests(menuLabelConfig);
  });

  // Sub-component themes (ButtonSpinner, CheckboxIndeterminate)
  describe("Sub-component themes", () => {
    const buttonSpinnerConfig: ComponentTestConfig = {
      propsType: "ButtonSpinnerProps",
      categories: BUTTON_SPINNER_CATEGORIES,
      themes: [
        { name: "defaultButtonSpinnerTheme", theme: defaultButtonSpinnerTheme }
      ]
    };
    createThemeTests(buttonSpinnerConfig);

    const navLinkLabelConfig: ComponentTestConfig = {
      propsType: "NavLinkLabelProps",
      categories: NAV_LINK_LABEL_CATEGORIES,
      themes: [
        { name: "defaultNavLinkLabelTheme", theme: defaultNavLinkLabelTheme }
      ]
    };
    createThemeTests(navLinkLabelConfig);

    const checkboxIndeterminateConfig: ComponentTestConfig = {
      propsType: "CheckboxIndeterminateProps",
      categories: CHECKBOX_INDETERMINATE_CATEGORIES,
      themes: [
        { name: "defaultCheckboxIndeterminateTheme", theme: defaultCheckboxIndeterminateTheme }
      ]
    };
    createThemeTests(checkboxIndeterminateConfig);
  });

  // .withDefaults() variants — only need defaults tests (category coverage tested by parent)
  describe("withDefaults variant themes", () => {
    it("should ensure defaultMenuPopupTheme has handlers for all its default props", () => {
      tester.testThemeDefaults("defaultMenuPopupTheme", defaultMenuPopupTheme);
    });

    it("should ensure defaultMenuDividerTheme has handlers for all its default props", () => {
      tester.testThemeDefaults("defaultMenuDividerTheme", defaultMenuDividerTheme);
    });
  });

  // Completeness check — ensures every ComponentTheme in defaultTheme is tested above.
  // If you add a new component and forget to register it here, this test will fail.
  describe("Theme coverage completeness", () => {
    // Collect all ComponentTheme instances from defaultTheme with their paths
    function collectThemeInstances(obj: unknown, path: string = ""): Array<{ path: string; theme: object }> {
      const results: Array<{ path: string; theme: object }> = [];
      if (!obj || typeof obj !== "object") return results;

      if (obj instanceof ComponentTheme) {
        results.push({ path, theme: obj });
      } else {
        for (const [key, value] of Object.entries(obj)) {
          const childPath = path ? `${path}.${key}` : key;
          results.push(...collectThemeInstances(value, childPath));
        }
      }
      return results;
    }

    // Collect all themes that are tested in the configs above
    const allTestedThemes = new Set<object>([
      // Interactive
      defaultButtonTheme, defaultIconButtonTheme,
      defaultBadgeTheme,
      defaultChipTheme,
      defaultCodeTheme, defaultKbdTheme, defaultMarkTheme,
      defaultInputTheme,
      defaultNavLinkTheme,
      // Typography
      textTheme, titleTheme, pageTitleTheme, sectionTitleTheme, blockquoteTheme,
      linkTheme,
      listTheme, listItemTheme,
      // Layout
      defaultGrid2Theme, defaultGrid3Theme, defaultGrid4Theme, defaultGrid5Theme, defaultGrid6Theme,
      defaultContainerTheme, defaultColTheme, defaultRowTheme, defaultStackTheme,
      defaultCardTheme, defaultCardHeaderTheme, defaultCardBodyTheme, defaultCardFooterTheme,
      defaultDividerTheme,
      defaultSectionTheme,
      // Form
      defaultCheckboxWrapperTheme, defaultCheckboxTheme, defaultCheckboxCheckTheme,
      defaultLabelTheme,
      // Media
      defaultImgTheme,
      // Overlay/Popup/Icon
      defaultOverlayTheme, defaultPopupTheme, defaultIconTheme,
      // Modal
      defaultModalContentTheme, defaultModalOverlayTheme,
      defaultModalHeaderTheme, defaultModalBodyTheme, defaultModalFooterTheme, defaultModalCloseButtonTheme,
      // Menu
      defaultMenuItemTheme, defaultMenuLabelTheme,
      // Sub-components
      defaultButtonSpinnerTheme, defaultNavLinkLabelTheme, defaultCheckboxIndeterminateTheme,
      // withDefaults variants
      defaultMenuPopupTheme, defaultMenuDividerTheme,
    ]);

    it("should cover every ComponentTheme instance in defaultTheme", () => {
      const allInstances = collectThemeInstances(defaultTheme);
      const untested = allInstances.filter(({ theme }) => !allTestedThemes.has(theme));

      if (untested.length > 0) {
        const paths = untested.map(({ path }) => `  - defaultTheme.${path}`).join("\n");
        throw new Error(
          `The following ComponentTheme instances in defaultTheme are NOT registered in componentThemeCoverage.test.ts:\n` +
          paths +
          `\n\nAdd them to the appropriate ComponentTestConfig or withDefaults test section.`
        );
      }

      expect(untested.length).toBe(0);
    });
  });
});