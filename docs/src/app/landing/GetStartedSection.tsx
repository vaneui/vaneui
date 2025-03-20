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
    <Section primary>
      <Container xl>
        <Row justifyCenter>
          <Col lg itemsCenter>
            <SectionTitle>Ready to Get Started?</SectionTitle>
            <Text lg>VaneUI is easy to install and integrate into your React projects</Text>
            
            <CodeBlock
              fileName="Installation"
              language="bash"
              code={`# Install via npm
npm install vaneui

# Or with yarn
yarn add vaneui`}
            />
            
            <Row lg>
              <Button lg primary>Read the Documentation</Button>
              <Button lg default>View on GitHub</Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </Section>
  );
} 