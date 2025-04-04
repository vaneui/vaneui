import { 
  Text, 
  Section, 
  Container, 
  Col, 
  SectionTitle, 
  Row,
  Title
} from '@vaneui/ui';
import { CodeBlock } from "../components/CodeBlock";

export function ThemingSection() {
  return (
    <Section className="py-20">
      <Container xl>
        <Row>
          <Col md className="mb-6 md:mb-0">
            <SectionTitle>CSS Variables & Theming</SectionTitle>
            <Text lg className="mb-4">VaneUI uses CSS variables for theming, making it easy to customize the look and feel of your application.</Text>

            <Text className="mb-6">The framework includes a comprehensive set of CSS variables for colors, spacing, typography, and more. These variables can be customized globally or at the component level.</Text>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6">
              <Title sm className="mb-2">Benefits of our CSS Variable System:</Title>
              <ul className="list-disc pl-5 space-y-1">
                <li><Text>Runtime theme switching (light/dark mode)</Text></li>
                <li><Text>Component-specific theme overrides</Text></li>
                <li><Text>Cascading theme inheritance</Text></li>
                <li><Text>Easy integration with design systems</Text></li>
              </ul>
            </div>

            <Text>Change your entire design system by updating a few CSS variables!</Text>
          </Col>

          <Col md className="flex-1">
            <CodeBlock
              fileName="ThemeExample.css"
              language="css"
              code={`:root {
  /* Primary colors */
  --vane-primary-50: #eff6ff;
  --vane-primary-100: #dbeafe;
  --vane-primary-200: #bfdbfe;
  --vane-primary-500: #3b82f6;
  --vane-primary-600: #2563eb;
  --vane-primary-700: #1d4ed8;

  /* Secondary colors */
  --vane-secondary-50: #f5f3ff;
  --vane-secondary-500: #8b5cf6;
  --vane-secondary-700: #6d28d9;

  /* Spacing scale */
  --vane-spacing-2: 0.5rem;
  --vane-spacing-4: 1rem;
  --vane-spacing-6: 1.5rem;

  /* Typography */
  --vane-font-family: 'Inter', sans-serif;
  --vane-text-sm: 0.875rem;
  --vane-text-base: 1rem;
  --vane-text-lg: 1.125rem;

  /* Border radius */
  --vane-radius-sm: 0.25rem;
  --vane-radius-md: 0.375rem;
  --vane-radius-lg: 0.5rem;
}

/* Dark mode theme */
.dark-theme {
  --vane-primary-50: #1e293b;
  --vane-primary-500: #3b82f6;
  --vane-primary-700: #60a5fa;

  /* Background and text colors */
  --vane-bg-primary: #0f172a;
  --vane-text-primary: #f8fafc;
}`}
            />

            <CodeBlock
              fileName="ThemeUsage.tsx"
              language="tsx"
              code={`import { Button, Row, Col } from '@vaneui/ui';

function ThemedComponents() {
  return (
    <Row>
      <Col>
        <div 
          // Override component theme variables inline
          style={{
            '--vane-primary-500': '#10b981',
            '--vane-radius-md': '1rem'
          }}
          className="p-4 border rounded-lg"
        >
          <h3>Custom Themed Card</h3>
          <p>This card has custom theme variables</p>
          <Button primary>Themed Button</Button>
        </div>
      </Col>
    </Row>
  );
}`}
            />
          </Col>
        </Row>
      </Container>
    </Section>
  );
} 
