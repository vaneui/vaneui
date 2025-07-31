import React from 'react';
import { ThemeProvider, defaultTheme, Row, Badge, ROW_CATEGORIES } from '../../src';
import Demo from './Demo';
import { defaultRowTheme } from "../../src/components/ui/theme/rowTheme";

function App() {
  return (
      <Row success primary transparent>
        <Badge>Test 1</Badge>
      </Row>
  );
}

export default App;