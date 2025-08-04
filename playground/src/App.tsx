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
        danger: 'bg-red-50 border border-red-200',
        lg: 'font-bold tracking-wide'
      }
    }}>
      <Section>
        <Title>Code Component Showcase</Title>
        <Text>The new Code component is designed for inline code display with smaller paddings than Chip.</Text>

        <Divider/>

        <Title>Basic Usage</Title>
        <Card className="max-w-xs">
          <Text>
            Use the Code component for inline code like <Code>console.log('hello')</Code> or
            commands like <Code>npm install</Code>. It uses monospace font by default.
          </Text>
        </Card>

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

        <Title>Variant Styles</Title>
        <Col gap>
          <Text>Outline (default): <Code outline primary>git commit -m "fix"</Code></Text>
          <Text>Filled: <Code filled primary>git push origin main</Code></Text>
          <Text>Filled Success: <Code filled success>Tests passing ✓</Code></Text>
          <Text>Filled Danger: <Code filled danger>Build failed ✗</Code></Text>
        </Col>

        <Divider/>

        <Title>Typography Options</Title>
        <Col gap>
          <Text>Monospace (default): <Code>{'function fibonacci(n) { return n; }'}</Code></Text>
          <Text>Sans font: <Code sans>user-friendly text</Code></Text>
          <Text>Serif font: <Code serif>elegant code</Code></Text>
          <Text>Bold: <Code bold>emphasized code</Code></Text>
          <Text>Semibold: <Code semibold>npm run build</Code></Text>
        </Col>

        <Divider/>

        <Title>Layout Options</Title>
        <Col gap>
          <Text>Inline (default): This is <Code>inline code</Code> within text.</Text>
          <Text>Block: <Code block>This code takes full width as block element</Code></Text>
          <Text>Inline-flex: <Code inlineFlex>flex-aligned</Code> code element.</Text>
        </Col>

        <Divider/>

        <Title>Shape Variants</Title>
        <Row gap>
          <Code rounded>rounded corners</Code>
          <Code pill>pill shaped</Code>
          <Code sharp>sharp corners</Code>
        </Row>

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

        <Divider/>

        <Title>With Extra Classes</Title>
        <Col gap>
          <Text>Primary with border: <Code primary>styled code</Code></Text>
          <Text>Success with background: <Code success>success message</Code></Text>
          <Text>Danger with background: <Code danger>error details</Code></Text>
          <Text>Large with bold tracking: <Code lg>emphasized large</Code></Text>
        </Col>

        <Divider/>

        <Title>Complex Code Examples</Title>
        <Col gap>
          <Text>
            Function definition: <Code>{'const add = (a, b) => a + b;'}</Code>
          </Text>
          <Text>
            React hook: <Code primary>{'const [state, setState] = useState(0);'}</Code>
          </Text>
          <Text>
            SQL query: <Code info>SELECT * FROM users WHERE active = true;</Code>
          </Text>
          <Text>
            Terminal command: <Code>curl -X POST https://api.example.com/data</Code>
          </Text>
          <Text>
            Configuration: <Code secondary>{'{"apiKey": "your-key-here", "timeout": 5000}'}</Code>
          </Text>
        </Col>
      </Section>
    </ThemeProvider>
  );
}

export default App;