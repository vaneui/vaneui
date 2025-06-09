import { 
  Text, 
  Section, 
  Container, 
  Col, 
  SectionTitle, 
  Row,
  Button
} from '@vaneui/ui';
import { CodeBlock } from "../components/CodeBlock";

export function GetStartedSection() {
  return (
    <Section primary>
      <Container xl itemsCenter>
        <Row justifyCenter className="w-full">
          <Col lg itemsCenter className="w-full">
            <SectionTitle>Ready to Get Started?</SectionTitle>
            <Text lg>VaneUI is easy to install and integrate into your React projects</Text>

            <CodeBlock
              fileName="Installation"
              language="bash"
              code={`# Install via npm
npm install @vaneui/ui

# Or with yarn
yarn add @vaneui/ui`}
            />

            <Row lg mdCol className="w-full">
              <Button lg primary className="max-sm:w-full">Read the Documentation</Button>
              <Button lg default className="max-sm:w-full">View on GitHub</Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </Section>
  );
} 
