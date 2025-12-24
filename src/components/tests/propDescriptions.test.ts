import { ComponentKeys, PropDescriptions, getPropDescription, getCategoryDescription, getCategoryName } from '../ui/props';

describe('PropDescriptions', () => {

  describe('All categories have descriptions', () => {
    const categoryKeys = Object.keys(ComponentKeys) as (keyof typeof ComponentKeys)[];

    it.each(categoryKeys)('category "%s" should exist in PropDescriptions', (category) => {
      expect(PropDescriptions[category]).toBeDefined();
      expect(PropDescriptions[category].name).toBeTruthy();
      expect(PropDescriptions[category].description).toBeTruthy();
      expect(PropDescriptions[category].props).toBeDefined();
    });
  });

  describe('All props within each category have descriptions', () => {
    const categoryKeys = Object.keys(ComponentKeys) as (keyof typeof ComponentKeys)[];

    categoryKeys.forEach(category => {
      describe(`Category: ${category}`, () => {
        const props = ComponentKeys[category];

        it.each(props)('prop "%s" should have a description', (prop) => {
          const description = PropDescriptions[category]?.props[prop];
          expect(description).toBeDefined();
          expect(description?.description).toBeTruthy();
          expect(typeof description?.description).toBe('string');
          expect(description?.description.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('No orphaned props in PropDescriptions', () => {
    const categoryKeys = Object.keys(PropDescriptions);

    categoryKeys.forEach(category => {
      describe(`Category: ${category}`, () => {
        it('should only contain props that exist in ComponentKeys', () => {
          const propDescriptionKeys = Object.keys(PropDescriptions[category].props);
          const componentKeyProps = ComponentKeys[category as keyof typeof ComponentKeys] as readonly string[];

          propDescriptionKeys.forEach(prop => {
            expect(componentKeyProps).toContain(prop);
          });
        });
      });
    });
  });

  describe('CategoryDescription structure', () => {
    it('should have correct structure for each category', () => {
      Object.entries(PropDescriptions).forEach(([_key, value]) => {
        expect(value).toHaveProperty('name');
        expect(value).toHaveProperty('description');
        expect(value).toHaveProperty('props');

        expect(typeof value.name).toBe('string');
        expect(typeof value.description).toBe('string');
        expect(typeof value.props).toBe('object');
      });
    });

    it('category names should be properly formatted (Title Case)', () => {
      Object.values(PropDescriptions).forEach(category => {
        // Name should start with uppercase
        expect(category.name[0]).toBe(category.name[0].toUpperCase());
        // Name should not be empty
        expect(category.name.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Helper functions', () => {
    describe('getPropDescription', () => {
      it('should return description for valid category and prop', () => {
        expect(getPropDescription('size', 'xs')).toBe('Extra small size');
        expect(getPropDescription('size', 'md')).toBe('Medium size (default)');
        expect(getPropDescription('shape', 'pill')).toBe('Fully rounded corners (circular)');
      });

      it('should return undefined for invalid category', () => {
        expect(getPropDescription('invalidCategory', 'xs')).toBeUndefined();
      });

      it('should return undefined for invalid prop', () => {
        expect(getPropDescription('size', 'invalidProp')).toBeUndefined();
      });
    });

    describe('getCategoryDescription', () => {
      it('should return description for valid category', () => {
        expect(getCategoryDescription('size')).toBe('Size props for controlling component dimensions');
        expect(getCategoryDescription('shape')).toBe('Shape props for controlling component border radius');
      });

      it('should return undefined for invalid category', () => {
        expect(getCategoryDescription('invalidCategory')).toBeUndefined();
      });
    });

    describe('getCategoryName', () => {
      it('should return name for valid category', () => {
        expect(getCategoryName('size')).toBe('Size');
        expect(getCategoryName('fontWeight')).toBe('Font Weight');
        expect(getCategoryName('flexDirection')).toBe('Flex Direction');
      });

      it('should return undefined for invalid category', () => {
        expect(getCategoryName('invalidCategory')).toBeUndefined();
      });
    });
  });

  describe('Completeness check', () => {
    it('should have the same number of categories as ComponentKeys', () => {
      const componentKeysCount = Object.keys(ComponentKeys).length;
      const propDescriptionsCount = Object.keys(PropDescriptions).length;
      expect(propDescriptionsCount).toBe(componentKeysCount);
    });

    it('should have descriptions for all props across all categories', () => {
      let totalPropsInComponentKeys = 0;
      let totalPropsInDescriptions = 0;

      Object.keys(ComponentKeys).forEach(category => {
        const props = ComponentKeys[category as keyof typeof ComponentKeys];
        totalPropsInComponentKeys += props.length;
      });

      Object.values(PropDescriptions).forEach(category => {
        totalPropsInDescriptions += Object.keys(category.props).length;
      });

      expect(totalPropsInDescriptions).toBe(totalPropsInComponentKeys);
    });

    it('each prop description should be non-empty and meaningful', () => {
      Object.entries(PropDescriptions).forEach(([_categoryKey, category]) => {
        Object.entries(category.props).forEach(([propKey, prop]) => {
          // Description should be at least 5 characters (meaningful)
          expect(prop.description.length).toBeGreaterThanOrEqual(5);
          // Description should not be just the prop name
          expect(prop.description.toLowerCase()).not.toBe(propKey.toLowerCase());
        });
      });
    });
  });

  describe('Specific category validations', () => {
    it('appearance category should have all color appearances', () => {
      const expectedAppearances = ['primary', 'brand', 'accent', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'info'];
      const appearanceProps = Object.keys(PropDescriptions.appearance.props);

      expectedAppearances.forEach(appearance => {
        expect(appearanceProps).toContain(appearance);
      });
    });

    it('size category should have all size variants', () => {
      const expectedSizes = ['xs', 'sm', 'md', 'lg', 'xl'];
      const sizeProps = Object.keys(PropDescriptions.size.props);

      expectedSizes.forEach(size => {
        expect(sizeProps).toContain(size);
      });
    });

    it('variant category should have filled and outline', () => {
      const variantProps = Object.keys(PropDescriptions.variant.props);
      expect(variantProps).toContain('filled');
      expect(variantProps).toContain('outline');
    });

    it('shape category should have rounded, pill, and sharp', () => {
      const shapeProps = Object.keys(PropDescriptions.shape.props);
      expect(shapeProps).toContain('rounded');
      expect(shapeProps).toContain('pill');
      expect(shapeProps).toContain('sharp');
    });
  });
});
