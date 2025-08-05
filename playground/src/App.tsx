import React from 'react';
import {
  ThemeProvider,
  defaultTheme,
  Row,
  Text,
  Divider,
  Col,
  Title,
  Section,
  Code,
  Chip, Card
} from '../../src';
import Demo from './Demo';

function App() {

  return (
    <ThemeProvider theme={defaultTheme} extraClasses={{
      code: {
        //primary: 'border-2 border-blue-300 shadow-lg',
        //success: 'bg-green-50 border border-green-200',
        //danger: 'bg-red-50 border border-red-200',
        //lg: 'font-bold tracking-wide'
      }
    }}>
      <Section>
        <Text>
          Use the Code component for inline code like <Code>console.log('hello')</Code> or
          commands like <Code>npm install</Code>. It uses monospace font by default.
        </Text>
        <Text sm>
          Use the Code component for inline code like <Code sm>console.log('hello')</Code> or
          commands like <Code sm>npm install</Code>. It uses monospace font by default.
        </Text>
        <Text lg>
          Use the Code component for inline code like <Code lg>console.log('hello')</Code> or
          commands like <Code lg>npm install</Code>. It uses monospace font by default.
        </Text>

        <Title>Basic Usage</Title>
        <Row flexWrap>
          <Card xs className="max-w-xs">
            <Text xs>
              Use the Code component for inline code like <Code xs>console.log('hello')</Code> or
              commands like <Code xs>npm install</Code>. It uses monospace font by default.
            </Text>
          </Card>
          <Card sm className="max-w-xs">
            <Text sm>
              Use the Code component for inline code like <Code sm>console.log('hello')</Code> or
              commands like <Code sm>npm install</Code>. It uses monospace font by default.
            </Text>
          </Card>
          <Card md className="max-w-xs">
            <Text>
              Use the Code component for inline code like <Code>console.log('hello')</Code> or
              commands like <Code>npm install</Code>. It uses monospace font by default.
            </Text>
          </Card>
          <Card lg className="max-w-xs">
            <Text lg>
              Use the Code component for inline code like <Code lg>console.log('hello')</Code> or
              commands like <Code lg>npm install</Code>. It uses monospace font by default.
            </Text>
          </Card>
          <Card xl className="max-w-xs">
            <Text xl>
              Use the Code component for inline code like <Code xl>console.log('hello')</Code> or
              commands like <Code xl>npm install</Code>. It uses monospace font by default.
            </Text>
          </Card>
        </Row>
        <Divider/>

        <Title>Size Variants</Title>
        <Row gap>
          <Text>XS: <Code xs>tiny</Code></Text>
          <Text>SM: <Code>default</Code></Text>
          <Text>MD: <Code md>medium</Code></Text>
          <Text>LG: <Code lg>large</Code></Text>
          <Text>XL: <Code xl>extra large</Code></Text>
        </Row>

        <Divider/>

        <Title>Appearance Variants</Title>
        <Col gap>
          <Text>Default: <Code>const value = 42;</Code></Text>
          <Text>Primary: <Code primary>import React from 'react';</Code></Text>
          <Text>Secondary: <Code secondary>export default App;</Code></Text>
          <Text>Success: <Code success>✓ Build successful</Code></Text>
          <Text>Danger: <Code danger>✗ Error: Module not found</Code></Text>
          <Text>Warning: <Code warning>⚠ Deprecated method</Code></Text>
          <Text>Info: <Code info>ℹ Tips: Use TypeScript</Code></Text>
        </Col>

        <Divider/>

        <Title>Real-World Examples</Title>
        <Col gap>
          <Text>Install package: <Code>npm install @vaneui/ui</Code></Text>
          <Text>Import component: <Code primary>{'import { Code } from \'@vaneui/ui\';'}</Code></Text>
          <Text>Environment variable: <Code success>NODE_ENV=production</Code></Text>
          <Text>Error message: <Code danger>TypeError: Cannot read property 'length'</Code></Text>
          <Text>File path: <Code secondary>/src/components/ui/code.tsx</Code></Text>
          <Text>API endpoint: <Code info>GET /api/v1/users</Code></Text>
          <Text>HTTP status: <Code filled success>200 OK</Code></Text>
          <Text>Git branch: <Code>feature/code-component</Code></Text>
        </Col>

        <Divider/>

        <Title>Code vs Chip Comparison</Title>
        <Col gap>
          <Text>Code (smaller, inline): <Code>console.log</Code> vs Chip (larger): <Chip>console.log</Chip></Text>
          <Text>Code: <Code xs>xs size</Code> vs Chip: <Chip xs>xs size</Chip></Text>
          <Text>Code: <Code md>md size</Code> vs Chip: <Chip md>md size</Chip></Text>
          <Text>Code has no shadow/ring by default for cleaner inline appearance.</Text>
        </Col>

      </Section>
    </ThemeProvider>
  );
}

export default App;