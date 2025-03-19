import { 
  Text, 
  Section, 
  Container, 
  Col, 
  SectionTitle, 
  Row,
  Button
} from 'vaneui';
import { CodeBlock } from "../components/CodeBlock";

export function GetStartedSection() {
  return (
    <Section className="py-20 bg-indigo-50">
      <Container xl>
        <Row justifyCenter>
          <Col md className="text-center">
            <SectionTitle>Ready to Get Started?</SectionTitle>
            <Text lg className="mb-8">VaneUI is easy to install and integrate into your React projects</Text>
            
            <CodeBlock
              fileName="Installation"
              language="bash"
              code={`# Install via npm
npm install vaneui

# Or with yarn
yarn add vaneui`}
            />
            
            <div className="mt-12">
              <Button lg primary className="mx-2">Read the Documentation</Button>
              <Button lg default className="mx-2">View on GitHub</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Section>
  );
} 