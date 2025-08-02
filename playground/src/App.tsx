import React from 'react';
import { ThemeProvider, defaultTheme, Row, Badge, Text, ROW_CATEGORIES, Divider, Link, Col } from '../../src';
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
    </>
  );
}

export default App;