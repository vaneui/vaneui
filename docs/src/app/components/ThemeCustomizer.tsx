'use client'

import React, { useState } from 'react';
import { Button, Card, Title, Text, Row, Stack, ButtonSettings, BorderSettings, ShadowSettings, TypographySettings, ThemeProvider } from '@vaneui/ui';

// Define custom button settings
const customButtonSettings = new ButtonSettings({
  tag: "button",
  base: {
    typography: new TypographySettings({
      fontWeight: {light: true,}
    }),
    border: new BorderSettings({noBorder: true}),
    shadow: new ShadowSettings({noShadow: true}),
  }
});

// Create custom theme
const customTheme = {
  button: {
    settings: customButtonSettings,
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
