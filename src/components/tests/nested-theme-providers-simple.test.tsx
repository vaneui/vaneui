import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Title,
  ThemeProvider,
  defaultTheme,
  Button
} from '../../index';

describe('Simple Nested ThemeProvider Test', () => {
  it('should apply theme overrides correctly', () => {
    const override = (theme: typeof defaultTheme) => {
      theme.title.defaults = { primary: true };
      return theme;
    };

    const { container } = render(
      <div>
        <ThemeProvider theme={defaultTheme}>
          <Title className="no-override">No Override</Title>
        </ThemeProvider>
        <ThemeProvider theme={defaultTheme} themeOverride={override}>
          <Title className="with-override">With Override</Title>
        </ThemeProvider>
      </div>
    );

    const noOverride = container.querySelector('.no-override');
    const withOverride = container.querySelector('.with-override');

    // Without override should have no default text color
    expect(noOverride).not.toHaveClass('text-(--color-text-default)');
    expect(noOverride).not.toHaveClass('text-(--color-text-primary)');
    
    // With override should have primary appearance
    expect(withOverride).toHaveClass('text-(--color-text-primary)');
  });

  it('should properly isolate extra classes between nested providers', () => {
    const { container } = render(
      <div>
        {/* Control - no provider */}
        <Title className="no-provider">No Provider</Title>
        
        {/* Outer provider with extra classes */}
        <ThemeProvider extraClasses={{ title: { primary: 'outer-class' } }} themeDefaults={{ title: {bold: true } }}>
          <Title primary className="outer-title">Outer Title</Title>
          
          {/* Inner provider without extra classes */}
          <ThemeProvider themeDefaults={{ title: {semibold: true } }}>
            <Title primary className="inner-title">Inner Title</Title>
          </ThemeProvider>
        </ThemeProvider>
        
        {/* Another outer title to verify persistence */}
        <ThemeProvider extraClasses={{ title: { primary: 'outer-class' } }}>
          <Title primary className="outer-title-2">Outer Title 2</Title>
        </ThemeProvider>
      </div>
    );

    const noProviderTitle = container.querySelector('.no-provider');
    const outerTitle = container.querySelector('.outer-title');
    const innerTitle = container.querySelector('.inner-title');
    const outerTitle2 = container.querySelector('.outer-title-2');


    // Control should not have any extra classes
    expect(noProviderTitle).not.toHaveClass('outer-class');

    // Outer title should have the extra class
    expect(outerTitle).toHaveClass('outer-class');

    // Inner title SHOULD inherit the outer extra class in merge mode
    expect(innerTitle).toHaveClass('outer-class');
    expect(innerTitle).toHaveClass('font-semibold');
    expect(innerTitle).toHaveClass('text-(--color-text-primary)');

    // Another outer title should have the extra class
    expect(outerTitle2).toHaveClass('outer-class');
  });

  it('should merge themes by default (merge strategy)', () => {
    const { container } = render(
      <div>
        {/* Outer provider sets primary and lg */}
        <ThemeProvider 
          themeDefaults={{ button: { primary: true, lg: true } }}
          extraClasses={{ button: { primary: 'outer-primary-class' } }}
        >
          <Button className="outer-button">Outer Button</Button>
          
          {/* Inner provider with default merge strategy - should inherit from parent */}
          <ThemeProvider 
            themeDefaults={{ button: { secondary: true } }}
            extraClasses={{ button: { secondary: 'inner-secondary-class' } }}
          >
            <Button className="inner-merged">Inner Merged</Button>
          </ThemeProvider>
        </ThemeProvider>
      </div>
    );

    const outerButton = container.querySelector('.outer-button');
    const innerMerged = container.querySelector('.inner-merged');

    // Outer button should have primary and lg
    expect(outerButton).toHaveClass('bg-(--color-bg-primary)');
    expect(outerButton).toHaveClass('[--fs-unit:9]');
    expect(outerButton).toHaveClass('outer-primary-class');

    // Inner button with merge strategy should:
    // - Have secondary (from inner provider)
    // - Keep lg (inherited from outer provider)
    // - Have both extra classes available
    expect(innerMerged).toHaveClass('bg-(--color-bg-secondary)');
    expect(innerMerged).toHaveClass('[--fs-unit:9]'); // inherited from outer
    expect(innerMerged).toHaveClass('inner-secondary-class');
  });

  it('should replace parent theme when using replace strategy', () => {
    const { container } = render(
      <div>
        {/* Outer provider sets primary and lg */}
        <ThemeProvider 
          themeDefaults={{ button: { primary: true, lg: true } }}
          extraClasses={{ button: { primary: 'outer-primary-class' } }}
        >
          <Button className="outer-button">Outer Button</Button>
          
          {/* Inner provider with replace strategy - should NOT inherit from parent */}
          <ThemeProvider 
            mergeStrategy="replace"
            themeDefaults={{ button: { secondary: true } }}
            extraClasses={{ button: { secondary: 'inner-secondary-class' } }}
          >
            <Button className="inner-replaced">Inner Replaced</Button>
          </ThemeProvider>
        </ThemeProvider>
      </div>
    );

    const outerButton = container.querySelector('.outer-button');
    const innerReplaced = container.querySelector('.inner-replaced');

    // Outer button should have primary and lg
    expect(outerButton).toHaveClass('bg-(--color-bg-primary)');
    expect(outerButton).toHaveClass('[--fs-unit:9]');
    expect(outerButton).toHaveClass('outer-primary-class');

    // Inner button with replace strategy should:
    // - Have secondary (from inner provider)
    // - NOT have lg (not inherited due to replace)
    // - Only have inner extra classes
    expect(innerReplaced).toHaveClass('bg-(--color-bg-secondary)');
    expect(innerReplaced).not.toHaveClass('[--fs-unit:9]'); // NOT inherited
    expect(innerReplaced).toHaveClass('inner-secondary-class');
    expect(innerReplaced).not.toHaveClass('outer-primary-class'); // NOT inherited
  });

  it('should handle extra classes correctly with different merge strategies', () => {
    const { container } = render(
      <div>
        {/* Test 1: Merge mode - extra classes should be inherited */}
        <ThemeProvider 
          extraClasses={{ button: { primary: 'outer-class-merge' } }}
        >
          <ThemeProvider 
            extraClasses={{ button: { secondary: 'inner-class-merge' } }}
          >
            <Button primary className="merge-primary">Merge Primary</Button>
            <Button secondary className="merge-secondary">Merge Secondary</Button>
          </ThemeProvider>
        </ThemeProvider>

        {/* Test 2: Replace mode - extra classes should NOT be inherited */}
        <ThemeProvider 
          extraClasses={{ button: { primary: 'outer-class-replace' } }}
        >
          <ThemeProvider 
            mergeStrategy="replace"
            extraClasses={{ button: { secondary: 'inner-class-replace' } }}
          >
            <Button primary className="replace-primary">Replace Primary</Button>
            <Button secondary className="replace-secondary">Replace Secondary</Button>
          </ThemeProvider>
        </ThemeProvider>
      </div>
    );

    const mergePrimary = container.querySelector('.merge-primary');
    const mergeSecondary = container.querySelector('.merge-secondary');
    const replacePrimary = container.querySelector('.replace-primary');
    const replaceSecondary = container.querySelector('.replace-secondary');

    // Merge mode: both outer and inner extra classes are available
    expect(mergePrimary).toHaveClass('outer-class-merge'); // inherited from outer
    expect(mergeSecondary).toHaveClass('inner-class-merge'); // from inner

    // Replace mode: only inner extra classes are available
    expect(replacePrimary).not.toHaveClass('outer-class-replace'); // NOT inherited
    expect(replaceSecondary).toHaveClass('inner-class-replace'); // from inner
  });

  it('should handle deeply nested providers with mixed strategies', () => {
    const { container } = render(
      <div>
        {/* Level 1: Outer provider */}
        <ThemeProvider 
          themeDefaults={{ button: { primary: true, lg: true } }}
          extraClasses={{ button: { primary: 'level-1-class' } }}
        >
          <Button className="level-1">Level 1</Button>
          
          {/* Level 2: Merge strategy (default) */}
          <ThemeProvider 
            themeDefaults={{ button: { filled: true } }}
            extraClasses={{ button: { filled: 'level-2-class' } }}
          >
            <Button className="level-2-merged">Level 2 Merged</Button>
            
            {/* Level 3: Replace strategy */}
            <ThemeProvider 
              mergeStrategy="replace"
              themeDefaults={{ button: { secondary: true, sm: true } }}
              extraClasses={{ button: { secondary: 'level-3-class' } }}
            >
              <Button className="level-3-replaced">Level 3 Replaced</Button>
              
              {/* Level 4: Merge strategy after replace */}
              <ThemeProvider 
                themeDefaults={{ button: { outline: true } }}
                extraClasses={{ button: { outline: 'level-4-class' } }}
              >
                <Button className="level-4-merged-after-replace">Level 4</Button>
              </ThemeProvider>
            </ThemeProvider>
          </ThemeProvider>
        </ThemeProvider>
      </div>
    );

    const level1 = container.querySelector('.level-1');
    const level2 = container.querySelector('.level-2-merged');
    const level3 = container.querySelector('.level-3-replaced');
    const level4 = container.querySelector('.level-4-merged-after-replace');

    // Level 1: Has primary and lg
    expect(level1).toHaveClass('bg-(--color-bg-primary)');
    expect(level1).toHaveClass('[--fs-unit:9]');
    expect(level1).toHaveClass('level-1-class');

    // Level 2: Inherits from level 1 and adds filled
    expect(level2).toHaveClass('bg-(--color-bg-filled-primary)'); // filled variant
    expect(level2).toHaveClass('[--fs-unit:9]'); // inherited
    expect(level2).toHaveClass('shadow-md'); // filled
    expect(level2).toHaveClass('level-2-class');

    // Level 3: Replace strategy - starts fresh from defaultTheme
    expect(level3).toHaveClass('bg-(--color-bg-secondary)');
    expect(level3).toHaveClass('[--fs-unit:7]', 'text-(length:--fs)'); // sm, not lg
    expect(level3).not.toHaveClass('[--fs-unit:9]'); // NOT inherited
    expect(level3).not.toHaveClass('shadow-md'); // NOT inherited
    expect(level3).toHaveClass('level-3-class');
    expect(level3).not.toHaveClass('level-1-class'); // NOT inherited
    expect(level3).not.toHaveClass('level-2-class'); // NOT inherited

    // Level 4: Merges with level 3 (not level 1 or 2)
    expect(level4).toHaveClass('bg-(--color-bg-secondary)'); // inherited from level 3
    expect(level4).toHaveClass('[--fs-unit:7]', 'text-(length:--fs)'); // sm inherited from level 3
    expect(level4).toHaveClass('level-4-class');
    expect(level4).not.toHaveClass('level-1-class'); // NOT inherited (blocked by replace)
    expect(level4).not.toHaveClass('level-2-class'); // NOT inherited (blocked by replace)
  });
});