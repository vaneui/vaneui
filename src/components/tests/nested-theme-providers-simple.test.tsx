import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  Title,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Simple Nested ThemeProvider Test', () => {
  it('should apply theme overrides correctly', () => {
    const override = (theme: any) => {
      theme.title.defaults = { primary: true };
      return theme;
    };

    const { container } = render(
      <div>
        <Title className="no-override">No Override</Title>
        <ThemeProvider themeOverride={override}>
          <Title className="with-override">With Override</Title>
        </ThemeProvider>
      </div>
    );

    const noOverride = container.querySelector('.no-override');
    const withOverride = container.querySelector('.with-override');

    // Without override should have default appearance
    expect(noOverride).toHaveClass('text-(--text-color-default)');
    
    // With override should have primary appearance
    expect(withOverride).toHaveClass('text-(--text-color-primary)');
  });

  it('should properly isolate extra classes between nested providers', () => {
    const { container } = render(
      <div>
        {/* Control - no provider */}
        <Title className="no-provider">No Provider</Title>
        
        {/* Outer provider with extra classes */}
        <ThemeProvider extraClasses={{ title: { primary: 'outer-class' } }}>
          <Title primary className="outer-title">Outer Title</Title>
          
          {/* Inner provider without extra classes */}
          <ThemeProvider>
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

    // Inner title should NOT have the outer extra class
    expect(innerTitle).not.toHaveClass('outer-class');

    // Another outer title should have the extra class
    expect(outerTitle2).toHaveClass('outer-class');
  });
});