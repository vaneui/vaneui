'use client'

import React, { useState } from 'react';
import { useTheme, Button, Card, Title, Text, Row, Stack, ButtonSettings, BorderSettings, GapSettings, ShadowSettings, TypographySettings } from 'vaneui';

export const ThemeCustomizer: React.FC = () => {
  const theme = useTheme();
  const [useCustomTheme, setUseCustomTheme] = useState(false);

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

  // Toggle between default and custom theme
  const toggleTheme = () => {
    if (useCustomTheme) {
      // Reset to default settings
      theme.updateButtonSettings(new ButtonSettings());
    } else {
      // Apply custom settings
      theme.updateButtonSettings(customButtonSettings);
    }
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

        <Row>
          <Button>Default Button</Button>
          <Button filled>Filled Button</Button>
          <Button outline>Outline Button</Button>
        </Row>

        <Text sm>
          The custom theme makes all buttons larger with bold text and filled by default.
        </Text>
      </Stack>
    </Card>
  );
};
