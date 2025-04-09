'use client'

import React, { useState } from 'react';
import {
  Button, Card, Title, Text, Row, Stack, ThemeProvider, ThemeProps
} from '@vaneui/ui';

const customTheme: ThemeProps = {
  button: {
    settings: {
      base: {
        typography: {
          fontWeight: {light: true}
        },
        border: {noBorder: true},
        shadow: {noShadow: true},
      }
    },
  }
};

export const ThemeCustomizer: React.FC = () => {
  const [useCustomTheme, setUseCustomTheme] = useState(false);

  console.log("customTheme", customTheme);

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
