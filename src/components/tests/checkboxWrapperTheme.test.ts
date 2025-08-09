import { defaultCheckboxWrapperTheme } from "../ui/theme/checkboxTheme";
import { ComponentKeys, CHECKBOX_CATEGORIES } from "../ui/props";
import { BaseTheme } from "../ui/theme/common/baseTheme";

type ComponentKeysType = typeof ComponentKeys;

describe("Checkbox component themes cover all CheckboxProps keys", () => {
  // Build reverse lookup: key -> category (for diagnostics)
  const keyToCategory: Record<string, keyof ComponentKeysType> = Object.keys(ComponentKeys).reduce((acc, category) => {
    const cat = category as keyof ComponentKeysType;
    for (const key of ComponentKeys[cat] as readonly string[]) {
      acc[key] = cat;
    }
    return acc;
  }, {} as Record<string, keyof ComponentKeysType>);

  // Recursively collect all BaseTheme instances from the themes tree
  const collectBaseThemes = (node: any): BaseTheme[] => {
    const result: BaseTheme[] = [];
    const visit = (n: any) => {
      if (!n || typeof n !== "object") return;
      if (n instanceof BaseTheme) {
        result.push(n);
      }
      for (const k of Object.keys(n)) {
        try {
          visit((n as any)[k]);
        } catch {
          // ignore access errors
        }
      }
    };
    visit(node);
    return result;
  };

  // Check if a BaseTheme actually handles a specific prop/category
  const themeHandlesProp = (theme: BaseTheme, prop: string, category: keyof ComponentKeysType | undefined): boolean => {
    if (!category) return false;
    
    // Test with and without the prop to see if the theme actually responds to it
    const extractedWith: Record<string, any> = {};
    extractedWith[category] = prop;
    
    const extractedWithout: Record<string, any> = {};
    
    try {
      const classesWith = theme.getClasses(extractedWith as any);
      const classesWithout = theme.getClasses(extractedWithout as any);
      
      // The theme should produce different output when the category is set vs not set
      const withContent = Array.isArray(classesWith) ? classesWith.filter(s => s && s.trim()).join(' ') : '';
      const withoutContent = Array.isArray(classesWithout) ? classesWithout.filter(s => s && s.trim()).join(' ') : '';
      
      // If the outputs are different, the theme is responding to this category
      return withContent !== withoutContent && withContent.length > 0;
    } catch {
      return false;
    }
  };

  // Check which props from a list are missing handlers in the given themes
  const findMissingHandlers = (props: string[], baseThemes: BaseTheme[]): Array<{prop: string, category: string}> => {
    const missing: Array<{prop: string, category: string}> = [];
    
    for (const prop of props) {
      const category = keyToCategory[prop];
      
      if (category) {
        const hasHandler = baseThemes.some(bt => themeHandlesProp(bt, prop, category));
        
        if (!hasHandler) {
          missing.push({prop, category});
        }
      }
    }
    
    return missing;
  };

  it("should ensure defaultCheckboxWrapperTheme has handlers for all its default props", () => {
    const theme = defaultCheckboxWrapperTheme;
    const defaults = theme.defaults || {};
    const defaultTrueProps = Object.keys(defaults).filter(key => (defaults as any)[key] === true);
    
    // Collect all BaseTheme instances from this theme
    const baseThemes = collectBaseThemes(theme.themes as any);
    
    // Find missing handlers for default props
    const missingHandlers = findMissingHandlers(defaultTrueProps, baseThemes);
    
    // The test should fail if there are missing handlers
    if (missingHandlers.length > 0) {
      const errorMessages = missingHandlers.map(({prop, category}) => 
        `  - defaults.${prop} = true, but no theme handler for category '${category}'`
      );
      
      throw new Error(
        `defaultCheckboxWrapperTheme has the following missing theme handlers:\n` +
        errorMessages.join('\n') +
        `\n\nEvery default prop must have a corresponding theme handler.`
      );
    }
    
    expect(missingHandlers.length).toBe(0);
  });

  it("should ensure all CheckboxProps keys from CHECKBOX_CATEGORIES have at least one theme mapping", () => {
    // Collect all possible CheckboxProps boolean keys from CHECKBOX_CATEGORIES
    const checkboxPropKeys: string[] = CHECKBOX_CATEGORIES.flatMap((cat) => (ComponentKeys as any)[cat]);
    
    // Collect all BaseThemes from defaultCheckboxWrapperTheme
    // (This could be extended to include other themes later)
    const baseThemes = collectBaseThemes(defaultCheckboxWrapperTheme.themes as any);
    
    // Find missing mappings
    const missingMappings = findMissingHandlers(checkboxPropKeys, baseThemes);
    
    // This test should fail if there are missing mappings
    if (missingMappings.length > 0) {
      const errorMessages = missingMappings.slice(0, 10).map(({prop, category}) => 
        `  - ${prop} (category: ${category})`
      );
      
      const additionalCount = missingMappings.length > 10 ? `\n  ... and ${missingMappings.length - 10} more` : '';
      
      throw new Error(
        `The following CheckboxProps keys lack theme mappings in defaultCheckboxWrapperTheme:\n` +
        errorMessages.join('\n') +
        additionalCount +
        `\n\nTotal missing: ${missingMappings.length} out of ${checkboxPropKeys.length} keys`
      );
    }
    
    expect(missingMappings.length).toBe(0);
  });
});