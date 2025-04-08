import { deepMerge } from '../deepMerge';

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
    const source = { b: 3, c: 4 };
    const result = deepMerge(target, source);

    expect(result).toEqual({ a: 1, b: 3, c: 4 });
    // Original objects should not be modified
    expect(target).toEqual({ a: 1, b: 2 });
    expect(source).toEqual({ b: 3, c: 4 });
  });

  // Test merging nested objects
  test('should merge nested objects correctly', () => {
    const target = { a: 1, b: { c: 2, d: 3 } };
    const source = { b: { c: 4, e: 5 } };
    // Use type assertion to bypass TypeScript's strict type checking
    const result = deepMerge(target, source as any);

    expect(result).toEqual({ a: 1, b: { c: 4, d: 3, e: 5 } });
    // Original objects should not be modified
    expect(target).toEqual({ a: 1, b: { c: 2, d: 3 } });
    expect(source).toEqual({ b: { c: 4, e: 5 } });
  });

  // Test that values from the second object override values from the first object
  test('should override values from the first object with values from the second object', () => {
    const target = { a: 1, b: 2, c: 3 };
    const source = { a: 10, b: 20 };
    const result = deepMerge(target, source);

    expect(result).toEqual({ a: 10, b: 20, c: 3 });
  });

  // Test that undefined values in the second object don't override values from the first object
  test('should not override values from the first object with undefined values from the second object', () => {
    const target = { a: 1, b: 2 };
    const source = { a: undefined, c: 3 };
    const result = deepMerge(target, source);

    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  // Test that null values in the second object override values from the first object
  test('should override values from the first object with null values from the second object', () => {
    const target = { a: 1, b: 2 };
    const source = { a: null, c: 3 };
    // Use type assertion to bypass TypeScript's strict type checking
    const result = deepMerge(target, source as any);

    expect(result).toEqual({ a: null, b: 2, c: 3 });
  });

  // Test handling of arrays
  test('should handle arrays correctly', () => {
    const target = { a: [1, 2, 3] };
    const source = { a: [4, 5] };
    const result = deepMerge(target, source);

    // Arrays should be replaced, not merged
    expect(result).toEqual({ a: [4, 5] });
  });

  // Test handling of class instances
  test('should handle class instances correctly', () => {
    const target = { a: new TestClass({ prop1: 'original', prop2: 10 }) };
    const source = { a: { prop1: 'updated' } };
    // Use type assertion to bypass TypeScript's strict type checking
    const result = deepMerge(target, source as any);

    expect(result.a).toBeInstanceOf(TestClass);
    expect(result).toEqual({ a: new TestClass({ prop1: 'updated', prop2: 10 }) });
  });

  // Test with undefined or null source
  test('should return a copy of target when source is undefined', () => {
    const target = { a: 1, b: 2 };
    const result = deepMerge(target, undefined);

    expect(result).toEqual(target);
    expect(result).not.toBe(target); // Should be a new object, not the same reference
  });

  test('should return a copy of target when source is null', () => {
    const target = { a: 1, b: 2 };
    // Use type assertion to bypass TypeScript's strict type checking
    const result = deepMerge(target, null as any);

    expect(result).toEqual(target);
    expect(result).not.toBe(target); // Should be a new object, not the same reference
  });
});