import { ComponentKeys } from "../ui/props";
import { BaseTheme } from "../ui/theme/common/baseTheme";

// Import all component themes
import { defaultCheckboxWrapperTheme, defaultCheckboxTheme, defaultCheckTheme } from "../ui/theme/checkboxTheme";
import { defaultButtonTheme } from "../ui/theme/buttonTheme";
import { defaultBadgeTheme } from "../ui/theme/badgeTheme";
import { defaultChipTheme } from "../ui/theme/chipTheme";
import { defaultCodeTheme } from "../ui/theme/codeTheme";
import { textTheme, titleTheme, pageTitleTheme, sectionTitleTheme } from "../ui/theme/typographyTheme";
import { defaultGrid3Theme, defaultGrid4Theme } from "../ui/theme/gridTheme";
import { defaultContainerTheme } from "../ui/theme/containerTheme";
import { defaultColTheme } from "../ui/theme/colTheme";
import { defaultRowTheme } from "../ui/theme/rowTheme";
import { defaultStackTheme } from "../ui/theme/stackTheme";
import { defaultCardTheme } from "../ui/theme/cardTheme";
import { defaultDividerTheme } from "../ui/theme/dividerTheme";
import { defaultSectionTheme } from "../ui/theme/sectionTheme";
import { defaultLabelTheme } from "../ui/theme/labelTheme";
import { defaultImgTheme } from "../ui/theme/imgTheme";

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
  IMG_CATEGORIES
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

  // Recursively collect all BaseTheme instances from the themes tree
  collectBaseThemes(node: any): BaseTheme[] {
    const result: BaseTheme[] = [];
    const visited = new WeakSet();
    
    const visit = (n: any, depth: number = 0) => {
      if (!n || typeof n !== "object" || depth > 10) return; // Prevent infinite recursion
      if (visited.has(n)) return; // Prevent circular references
      visited.add(n);
      
      if (n instanceof BaseTheme) {
        result.push(n);
      }
      
      // Recursively visit all properties, including nested objects
      try {
        for (const k of Object.keys(n)) {
          const value = (n as any)[k];
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
  canHandleCategory(category: keyof ComponentKeysType, baseThemes: BaseTheme[]): boolean {
    const categoryKeys = (ComponentKeys as any)[category] as string[] || [];
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
  canAnyThemeHandleKey(key: string, category: keyof ComponentKeysType, baseThemes: BaseTheme[]): boolean {
    return baseThemes.some(theme => this.themeHandlesKey(theme, key, category));
  }
  
  // Test if a single theme can handle a specific key for a category
  themeHandlesKey(theme: BaseTheme, key: string, category: keyof ComponentKeysType): boolean {
    // Create base context that provides commonly needed properties for themes to work
    const baseContext = {
      appearance: 'default',
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
    const extractedWithKey: Record<string, any> = { ...baseContext };
    extractedWithKey[category] = key;
    
    const extractedWithDifferent: Record<string, any> = { ...baseContext };
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
      const classesWithKey = theme.getClasses(extractedWithKey as any);
      const classesWithDifferent = theme.getClasses(extractedWithDifferent as any);
      
      const keyContent = Array.isArray(classesWithKey) ? classesWithKey.filter(s => s && s.trim()).join(' ') : '';
      const differentContent = Array.isArray(classesWithDifferent) ? classesWithDifferent.filter(s => s && s.trim()).join(' ') : '';
      
      // A theme handles a category if it produces different output for different category values
      return keyContent !== differentContent;
    } catch {
      return false;
    }
  }

  // Test a single theme's default props using category-driven approach
  testThemeDefaults(themeName: string, theme: any): void {
    const defaults = theme.defaults || {};
    const defaultTrueProps = Object.keys(defaults).filter(key => (defaults as any)[key] === true);
    
    // Collect all BaseTheme instances from this theme
    const baseThemes = this.collectBaseThemes(theme.themes as any);
    
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
  testCategoryCoverage(componentName: string, categories: readonly string[], themes: Array<{name: string, theme: any}>): void {
    // Collect all BaseThemes from all provided themes
    const allBaseThemes = themes.flatMap(({theme}) => this.collectBaseThemes(theme.themes as any));
    
    // Check each category to see if any theme can handle it
    const missingCategories: string[] = [];
    
    for (const category of categories) {
      const categoryKey = category as keyof ComponentKeysType;
      const canHandle = this.canHandleCategory(categoryKey, allBaseThemes);
      
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
    theme: any;
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

  // Interactive Components (Button, Badge, Chip, Code)
  describe("Interactive component themes", () => {
    const buttonConfig: ComponentTestConfig = {
      propsType: "ButtonProps",
      categories: BUTTON_CATEGORIES,
      themes: [
        { name: "defaultButtonTheme", theme: defaultButtonTheme }
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
        { name: "defaultCodeTheme", theme: defaultCodeTheme }
      ]
    };
    createThemeTests(codeConfig);
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
        { name: "sectionTitleTheme", theme: sectionTitleTheme }
      ]
    };
    createThemeTests(typographyConfig);
  });

  // Layout Components
  describe("Layout component themes", () => {
    const gridConfig: ComponentTestConfig = {
      propsType: "GridProps",
      categories: GRID_CATEGORIES,
      themes: [
        { name: "defaultGrid3Theme", theme: defaultGrid3Theme },
        { name: "defaultGrid4Theme", theme: defaultGrid4Theme }
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
        { name: "defaultCheckTheme", theme: defaultCheckTheme }
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
});