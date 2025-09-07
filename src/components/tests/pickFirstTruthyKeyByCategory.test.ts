import { pickFirstTruthyKeyByCategory } from '../utils/componentUtils';

describe('pickFirstTruthyKeyByCategory', () => {
  describe('Basic Functionality', () => {
    it('should return first truthy key from props', () => {
      const props = { border: true, noBorder: false };
      const defaults = {};
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'border');
      
      expect(result).toBe('border');
    });

    it('should return undefined when no keys are truthy', () => {
      const props = {};
      const defaults = {};
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'border');
      
      expect(result).toBe(undefined);
    });

    it('should fall back to defaults when no props are truthy', () => {
      const props = {};
      const defaults = { noBorder: true };
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'border');
      
      expect(result).toBe('noBorder');
    });
  });

  describe('Props Priority Over Defaults', () => {
    it('should prioritize explicit true props over defaults', () => {
      const props = { border: true };
      const defaults = { noBorder: true };
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'border');
      
      expect(result).toBe('border');
    });

    it('should prioritize explicit false props (falsy exclusion)', () => {
      const props = { noBorder: false }; // Explicitly set to false
      const defaults = { noBorder: true }; // Default wants noBorder
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'border');
      
      // Since noBorder is explicitly false in props, it should be excluded from defaults
      expect(result).toBe(undefined);
    });
  });

  describe('Border Category Tests', () => {
    it('should handle <Stack border noBorder={false}> case', () => {
      // This represents: <Stack border noBorder={false}>Content</Stack>
      const props = { border: true, noBorder: false };
      const defaults = {};
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'border');
      
      expect(result).toBe('border');
    });

    it('should handle defaults with explicit false override', () => {
      // Button defaults have noBorder: true, but component sets border: true
      const props = { border: true };
      const defaults = { noBorder: true };
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'border');
      
      expect(result).toBe('border'); // Explicit prop wins
    });

    it('should respect explicit false props preventing defaults', () => {
      // Component explicitly sets noBorder={false}, preventing default noBorder: true
      const props = { noBorder: false };
      const defaults = { noBorder: true };
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'border');
      
      expect(result).toBe(undefined); // False prop blocks default
    });
  });

  describe('Ring Category Tests', () => {
    it('should handle ring vs noRing priority', () => {
      const props = { ring: true, noRing: false };
      const defaults = {};
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'ring');
      
      expect(result).toBe('ring');
    });

    it('should handle checkbox defaults (noRing: true)', () => {
      const props = {}; // No explicit ring props
      const defaults = { noRing: true }; // Checkbox defaults
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'ring');
      
      expect(result).toBe('noRing');
    });

    it('should allow overriding noRing default with explicit ring', () => {
      const props = { ring: true }; // Explicit ring prop
      const defaults = { noRing: true }; // Checkbox defaults
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'ring');
      
      expect(result).toBe('ring'); // Explicit prop wins
    });
  });

  describe('Size Category Tests', () => {
    it('should handle size props with defaults', () => {
      const props = { lg: true };
      const defaults = { md: true };
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'size');
      
      expect(result).toBe('lg');
    });

    it('should use defaults when no size props provided', () => {
      const props = {};
      const defaults = { md: true };
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'size');
      
      expect(result).toBe('md');
    });

    it('should handle first-wins priority for size', () => {
      const props = { sm: true, lg: true }; // Both set to true
      const defaults = { md: true };
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'size');
      
      // Should return first truthy key found in ComponentKeys.size order
      // ComponentKeys.size = ['xs', 'sm', 'md', 'lg', 'xl']
      expect(result).toBe('sm'); // sm comes first in the keys array
    });
  });

  describe('Appearance Category Tests', () => {
    it('should handle appearance with defaults', () => {
      const props = { primary: true };
      const defaults = { default: true };
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'appearance');
      
      expect(result).toBe('primary');
    });

    it('should handle multiple appearance props', () => {
      const props = { secondary: true, primary: true };
      const defaults = {};
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'appearance');
      
      // Should return first truthy key in ComponentKeys.appearance order
      // ComponentKeys.appearance = ['default', 'accent', 'primary', 'secondary', ...]
      expect(result).toBe('primary'); // primary comes before secondary
    });
  });

  describe('Variant Category Tests', () => {
    it('should handle filled vs outline', () => {
      const props = { filled: true };
      const defaults = { outline: true };
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'variant');
      
      expect(result).toBe('filled');
    });

    it('should fall back to outline default', () => {
      const props = {};
      const defaults = { outline: true };
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'variant');
      
      expect(result).toBe('outline');
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle multiple false props excluding defaults', () => {
      const props = { 
        border: false, 
        noBorder: false 
      };
      const defaults = { 
        border: true, 
        noBorder: true 
      };
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'border');
      
      // Both keys are explicitly false in props, so both are excluded from defaults
      expect(result).toBe(undefined);
    });

    it('should handle partial default exclusion', () => {
      const props = { 
        border: false // Only border is explicitly false
      };
      const defaults = { 
        border: true,   // This will be excluded
        noBorder: true  // This can still be used
      };
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'border');
      
      // border is excluded, but noBorder from defaults should be used
      expect(result).toBe('noBorder');
    });

    it('should respect ComponentKeys order for size priority', () => {
      // Test that the function respects the order in ComponentKeys.size
      const props = { 
        xl: true,  // Last in ComponentKeys.size
        xs: true   // First in ComponentKeys.size  
      };
      const defaults = {};
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'size');
      
      // xs should win because it comes first in ComponentKeys.size array
      expect(result).toBe('xs');
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined and null values', () => {
      const props = { 
        border: undefined, 
        noBorder: null 
      };
      const defaults = { noBorder: true };
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'border');
      
      // undefined and null should not be considered truthy or explicitly false
      expect(result).toBe('noBorder');
    });

    it('should handle non-boolean truthy values', () => {
      const props = { 
        border: 'truthy-string',
        noBorder: 0  // falsy but not false
      };
      const defaults = {};
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'border');
      
      // Only true should be considered truthy for props
      expect(result).toBe(undefined);
    });

    it('should handle empty strings and zero as non-truthy', () => {
      const props = { 
        border: '',
        noBorder: 0
      };
      const defaults = { noBorder: true };
      
      const result = pickFirstTruthyKeyByCategory(props, defaults, 'border');
      
      // Empty string and 0 are not explicitly true, so defaults should be used
      expect(result).toBe('noBorder');
    });
  });

  describe('Type Safety', () => {
    it('should work with all ComponentKeys categories', () => {
      // Test a few different categories to ensure type safety
      const borderResult = pickFirstTruthyKeyByCategory({}, {}, 'border');
      const sizeResult = pickFirstTruthyKeyByCategory({}, {}, 'size');
      const appearanceResult = pickFirstTruthyKeyByCategory({}, {}, 'appearance');
      
      // All should be undefined with empty props/defaults, but shouldn't throw
      expect(borderResult).toBe(undefined);
      expect(sizeResult).toBe(undefined);
      expect(appearanceResult).toBe(undefined);
    });
  });
});