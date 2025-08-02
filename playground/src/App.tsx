import React from 'react';
import { ThemeProvider, defaultTheme, Row, Badge, Text, ROW_CATEGORIES, Divider, Link, Col, Title } from '../../src';
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
    </>
  );
}

export default App;