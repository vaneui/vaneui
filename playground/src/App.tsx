import React from 'react';
import {
  ThemeProvider,
  defaultTheme,
  Row,
  Badge,
  Text,
  Button,
  Divider,
  Link,
  Col,
  Title,
  List,
  ListItem,
  Section
} from '../../src';
import Demo from './Demo';

function App() {
  // Define extra classes to be applied conditionally
  const extraClasses = {
    button: {
      primary: 'transform hover:scale-105 shadow-lg',
      secondary: 'opacity-90 hover:opacity-100',
      lg: 'font-bold tracking-wide'
    },
    badge: {
      success: 'animate-pulse border-2 border-green-300',
      danger: 'shadow-red-500/50 shadow-lg'
    },
    list: {
      disc: 'space-y-0 pl-6',
      decimal: 'space-y-3 pl-8'
    }
  };

  return (
    <ThemeProvider theme={defaultTheme} extraClasses={extraClasses}>
      <Section>
        <Title>Extra Classes Demo</Title>

        <Divider/>
        <Title>Button Examples with Extra Classes</Title>

        <Row gap>
          <Button primary>Primary Button</Button>
          <Button primary lg>Primary Large Button</Button>
          <Button secondary>Secondary Button</Button>
        </Row>

        <Divider/>
        <Title>Badge Examples with Extra Classes</Title>

        <Row gap>
          <Badge success>Success Badge</Badge>
          <Badge danger>Danger Badge</Badge>
          <Badge>Normal Badge</Badge>
        </Row>

        <Divider/>

        <Title>List Examples with Extra Classes</Title>

        <Text>Default List (disc) with extra spacing:</Text>
        <List>
          <ListItem>First item with extra spacing</ListItem>
          <ListItem>Second item with extra spacing</ListItem>
          <ListItem>Third item with extra spacing</ListItem>
        </List>

        <Text>Decimal List with different spacing:</Text>
        <List decimal>
          <ListItem>First numbered item</ListItem>
          <ListItem>Second numbered item</ListItem>
          <ListItem>Third numbered item</ListItem>
        </List>

        <Divider/>
        <Title>Comparison without Extra Classes</Title>
      </Section>
    </ThemeProvider>
  );
}

export default App;