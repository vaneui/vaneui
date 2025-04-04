'use client'

import React, { useState } from 'react';
import { Button, Card, Title, Text, Row, Stack, ThemeProvider, ButtonSettings, BorderSettings, GapSettings, ShadowSettings, TypographySettings } from 'vaneui';

// Define custom button settings
const customButtonSettings = new ButtonSettings({
  tag: "button",
  base: {
    style: {outline: false, filled: true},
    typography: new TypographySettings({
      fontWeight: {bold: true}
    }),
    px: {lg: true},
    py: {lg: true},
    background: {},
    border: new BorderSettings,
    shadow: new ShadowSettings,
    gap: new GapSettings
  }
});

// Create custom theme
const customTheme = {
  button: {
    settings: customButtonSettings
  }
};

export const ThemeCustomizer: React.FC = () => {
  const [useCustomTheme, setUseCustomTheme] = useState(false);

  // Toggle between default and custom theme
  const toggleTheme = () => {
    setUseCustomTheme(!useCustomTheme);
  };

  return (
    <Card xl>
      <Stack md>
        <Title>Theme Customization Demo</Title>
        <Text>
          This demonstrates the Global Configuration Provider using React Context.
          Click the button to apply custom button settings.
        </Text>

        <Row justifyBetween itemsCenter>
          <Text semibold>
            {useCustomTheme ? 'Using Custom Theme' : 'Using Default Theme'}
          </Text>
          <Button 
            onClick={toggleTheme}
            filled={useCustomTheme}
            outline={!useCustomTheme}
          >
            {useCustomTheme ? 'Disable Custom Theme' : 'Enable Custom Theme'}
          </Button>
        </Row>

        {/* Wrap buttons with ThemeProvider using the appropriate theme */}
        <ThemeProvider theme={useCustomTheme ? customTheme : {}}>
          <Row>
            <Button>Default Button</Button>
            <Button filled>Filled Button</Button>
            <Button outline>Outline Button</Button>
          </Row>
        </ThemeProvider>

        <Text sm>
          The custom theme makes all buttons larger with bold text and filled by default.
        </Text>
      </Stack>
    </Card>
  );
};
