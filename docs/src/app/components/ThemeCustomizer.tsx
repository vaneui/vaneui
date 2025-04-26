'use client'

import React, { useState } from 'react';
import {
  Button, Card, Title, Text, Row, Stack, ThemeProvider, ThemeProps
} from '@vaneui/ui';

const customTheme: ThemeProps = {
  button: {
    // Using lambda function to modify button settings
    settings: (s) => {
      console.log("before", s)
      s.base.typography.fontWeight.light = true;
      s.base.border.noBorder = true;
      s.base.border.radius.pill = true;
      s.base.shadow.noShadow = true;
      s.base.px.setSize('sm');
      s.base.py.setSize('sm');

      s.hover.shadow.size.setSize('xs');
      s.hover.border.noBorder = false;
      s.hover.px.setSize('md');
      s.hover.py.setSize('md');

      console.log("after", s)
      return s;
    },
    classes: (c) => {
      c.extraClasses = "hover:ring-4"
      c.style.outline.hover.background!.success = "hover:bg-green-600";
      //c.style.outline.hover.borderColor!.success = "hover:bg-green-800";
      return c;
    }
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
          Click the button to apply custom button settings using lambda functions.
          Lambda functions allow for more dynamic customization by accessing and modifying the default settings and classes.
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
            <Button outline success>Outline Success Button</Button>
          </Row>
        </ThemeProvider>

        <Text sm>
          The custom theme makes all buttons larger with bold text and filled by default.
        </Text>
      </Stack>
    </Card>
  );
};
