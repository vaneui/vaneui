import React from 'react';
import { ThemeProvider, defaultTheme, Row, Badge, Text, ROW_CATEGORIES, Divider, Link, Col, Title, List, ListItem } from '../../src';
import Demo from './Demo';
import { defaultRowTheme } from "../../src/components/ui/theme/rowTheme";

function App() {
  return (
    <>
      <Row warning rounded border>
        <Badge>Test 1</Badge>
        <Badge>Test 2</Badge>
        <Badge>Test 3</Badge>
      </Row>
      <Title>Some title with <Link>link in it</Link></Title>
      
      <Divider />
      <Title>List Examples</Title>
      
      <Text>Default List (disc):</Text>
      <List>
        <ListItem>First item</ListItem>
        <ListItem>Second item</ListItem>
        <ListItem>Third item</ListItem>
      </List>
      
      <Text>Decimal List:</Text>
      <List decimal>
        <ListItem>First numbered item</ListItem>
        <ListItem>Second numbered item</ListItem>
        <ListItem>Third numbered item</ListItem>
      </List>
      
      <Text>Explicit Disc List:</Text>
      <List disc>
        <ListItem>Explicit disc item</ListItem>
        <ListItem>Another disc item</ListItem>
      </List>
    </>
  );
}

export default App;