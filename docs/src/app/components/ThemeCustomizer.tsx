'use client'

import React, { useState } from 'react';
import {
  Button, Card, Title, Text, Row, Stack, ThemeProvider, PartialTheme
} from '@vaneui/ui';
import { ThemeProps } from "../../../../src";

const customTheme: PartialTheme = {
  button: {
    themes: {
      appearance: {
        text: {
          outline: {
            default: {
              hover: 'hover:text-gray-800',
              active: 'active:text-gray-400',
            }
          }
        },
        ring: {
          outline: {
            default: {
              base: 'ring-green-300',
              active: 'active:ring-green-500',
            }
          }
        }
      },
      layout: {
        border: {
          border: {
            base: 'ring-2',
            active: 'active:ring-3',
          }
        }
      }
    },
    defaults: {
      normal: true,
      pill: true,
    }
  }
};

const overrideFunc = (theme: ThemeProps) => {
  theme.button.themes.appearance.text.outline.default.base = 'text-blue-500';
  theme.button.themes.appearance.text.outline.default.hover = 'hover:text-blue-700';
  theme.button.themes.appearance.text.outline.default.active = 'active:text-blue-900';
  return theme;
};

const themeDefaults = {
  button: {
    noShadow: true
  }
}

export const ThemeCustomizer: React.FC = () => {
  const [useCustomTheme, setUseCustomTheme] = useState(false);

  // Toggle between default and custom theme
  const toggleTheme = () => {
    setUseCustomTheme(!useCustomTheme);
  };

  return (
    <Card className="w-full">
      <Stack md noPadding>
        <Title>Theme Customization Demo</Title>
        <Text>
          This demonstrates the Global Configuration Provider using React Context.
          Click the button to apply custom button settings using lambda functions.
          Lambda functions allow for more dynamic customization by accessing and modifying the default settings and
          classes.
        </Text>

        <Row justifyBetween itemsCenter mdCol>
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
        <ThemeProvider theme={useCustomTheme ? customTheme : {}}
                       themeOverride={useCustomTheme ? overrideFunc : undefined}
                       themeDefaults={useCustomTheme ? themeDefaults : undefined}
        >
          <Row flexWrap>
            <Button>Default Button</Button>
            <Button filled>Filled Button</Button>
            <Button sm outline>Outline Button Small</Button>
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
