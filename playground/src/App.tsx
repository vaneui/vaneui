import React from 'react';
import { ThemeProvider, defaultTheme, Row, Badge, Text, ROW_CATEGORIES, Divider, Link, Col } from '../../src';
import Demo from './Demo';
import { defaultRowTheme } from "../../src/components/ui/theme/rowTheme";

function App() {
  return (
    <>
      <Row transparent>
        <Badge>Test 1</Badge>
        <Badge>Test 2</Badge>
        <Badge>Test 3</Badge>
      </Row>
      <Text sm default>Text</Text>
      <Text lg primary>Text</Text>
      <Text xl secondary>Text</Text>
      <Text xl transparent>Text</Text>
      <Text xl link>Text</Text>
      <Divider/>
      <Col xs>
        <Link href="/">Some link text</Link>
        <Link transparent>Some link text</Link>
      </Col>
    </>
  );
}

export default App;