import { deepMerge } from '../utils/deepMerge';
import { DeepPartial } from '../utils/deepPartial';

// Simple class for testing class instance merging
class TestClass {
  prop1: string;
  prop2: number;

  constructor(init: Partial<TestClass> = {}) {
    this.prop1 = init.prop1 || 'default';
    this.prop2 = init.prop2 || 0;
  }
}

describe('deepMerge function', () => {
  // Test merging simple objects
  test('should merge simple objects correctly', () => {
    const target = { a: 1, b: 2 };
    // Define a type that extends the target type with the additional property 'c'
    type ExtendedTarget = typeof target & { c: number };
    const source: DeepPartial<ExtendedTarget> = { b: 3, c: 4 };
    const result = deepMerge(target, source);

    expect(result).toEqual({ a: 1, b: 3, c: 4 });
    // Original objects should not be modified
    expect(target).toEqual({ a: 1, b: 2 });
    expect(source).toEqual({ b: 3, c: 4 });
  });

  // Test merging nested objects
  test('should merge nested objects correctly', () => {
    const target = { a: 1, b: { c: 2, d: 3 } };
    // Define a type that extends the target type with the additional property 'e'
    type ExtendedTarget = typeof target & { b: { e: number } };
    const source: DeepPartial<ExtendedTarget> = { b: { c: 4, e: 5 } };
    const result = deepMerge(target, source);

    expect(result).toEqual({ a: 1, b: { c: 4, d: 3, e: 5 } });
    // Original objects should not be modified
    expect(target).toEqual({ a: 1, b: { c: 2, d: 3 } });
    expect(source).toEqual({ b: { c: 4, e: 5 } });
  });

  // Test that values from the second object override values from the first object
  test('should override values from the first object with values from the second object', () => {
    const target = { a: 1, b: 2, c: 3 };
    const source: DeepPartial<typeof target> = { a: 10, b: 20 };
    const result = deepMerge(target, source);

    expect(result).toEqual({ a: 10, b: 20, c: 3 });
  });

  // Test that undefined values in the second object don't override values from the first object
  test('should not override values from the first object with undefined values from the second object', () => {
    const target = { a: 1, b: 2 };
    // Define a type that extends the target type with the additional property 'c'
    type ExtendedTarget = typeof target & { c: number };
    const source: DeepPartial<ExtendedTarget> = { a: undefined, c: 3 };
    const result = deepMerge(target, source);

    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  // Test that null values in the second object override values from the first object
  test('should override values from the first object with null values from the second object', () => {
    const target = { a: 1, b: 2 };
    // Define a type that extends the target type with the additional property 'c'
    type ExtendedTarget = typeof target & { c: number };
    // Use a type assertion for null since DeepPartial doesn't allow null directly
    const source: DeepPartial<ExtendedTarget> = { a: null as any, c: 3 };
    const result = deepMerge(target, source);

    expect(result).toEqual({ a: null, b: 2, c: 3 });
  });

  // Test handling of arrays
  test('should handle arrays correctly', () => {
    const target = { a: [1, 2, 3] };
    const source: DeepPartial<typeof target> = { a: [4, 5] };
    const result = deepMerge(target, source);

    // Arrays should be replaced, not merged
    expect(result).toEqual({ a: [4, 5] });
  });

  // Test handling of class instances
  test('should handle class instances correctly', () => {
    const target = { a: new TestClass({ prop1: 'original', prop2: 10 }) };
    const source: DeepPartial<typeof target> = { a: { prop1: 'updated' } };
    const result = deepMerge(target, source);

    expect(result.a).toBeInstanceOf(TestClass);
    expect(result).toEqual({ a: new TestClass({ prop1: 'updated', prop2: 10 }) });
  });

  test('should handle strings correctly', () => {
    const target = { a: { prop1: 'original', prop2: 10 } };
    // Define a type that extends the target type with the additional property 'prop3'
    type ExtendedTarget = typeof target & { a: { prop3: boolean } };
    const source: DeepPartial<ExtendedTarget> = { a: { prop1: 'updated', prop3: true } };
    const result = deepMerge(target, source);

    expect(result).toEqual({ a: { prop1: 'updated', prop2: 10, prop3: true } });
  });

  test('should return a copy of target when source is null', () => {
    const target = { a: 1, b: 2 };
    // null is not a valid DeepPartial<T>, but the function handles it specially
    const result = deepMerge(target, null as unknown as DeepPartial<typeof target>);

    expect(result).toEqual(target);
    expect(result).not.toBe(target); // Should be a new object, not the same reference
  });

  // Test handling of objects with all boolean values
  test('should handle objects with all boolean values correctly', () => {
    // Test case for fontWeight in TypographySettings
    const target = { 
      fontWeight: { 
        semibold: true, 
        light: false, 
        normal: false 
      } 
    };
    const source: DeepPartial<typeof target> = { 
      fontWeight: { 
        semibold: false, 
        light: true, 
        normal: false 
      } 
    };
    const result = deepMerge(target, source);

    // All values in the target object should be set to false, and then the source values should be applied
    expect(result).toEqual({ 
      fontWeight: { 
        semibold: false, 
        light: true, 
        normal: false 
      } 
    });

    // Test case for size in TypographySettings
    const targetSize = { 
      size: { 
        md: true, 
        sm: false, 
        lg: false 
      } 
    };
    const sourceSize: DeepPartial<typeof targetSize> = { 
      size: { 
        md: false, 
        sm: true, 
        lg: false 
      } 
    };
    const resultSize = deepMerge(targetSize, sourceSize);

    // All values in the target object should be set to false, and then the source values should be applied
    expect(resultSize).toEqual({ 
      size: { 
        md: false, 
        sm: true, 
        lg: false 
      } 
    });

    // Test case where source has no true values
    const targetNoTrue = { 
      fontWeight: { 
        semibold: true, 
        light: false, 
        normal: false 
      } 
    };
    const sourceNoTrue: DeepPartial<typeof targetNoTrue> = { 
      fontWeight: { 
        semibold: false, 
        light: false, 
        normal: false 
      } 
    };
    const resultNoTrue = deepMerge(targetNoTrue, sourceNoTrue);

    // In this case, the normal deep merge should be applied, not the special handling
    expect(resultNoTrue).toEqual({ 
      fontWeight: { 
        semibold: false, 
        light: false, 
        normal: false 
      } 
    });
  });
});
