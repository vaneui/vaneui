import { 
  Text, 
  Section, 
  Container, 
  Col, 
  SectionTitle, 
  Row,
  Title
} from 'vaneui';
import { CodeBlock } from "../components/CodeBlock";

export function LayoutSection() {
  return (
    <Section className="py-20 bg-gray-50">
      <Container xl>
        <Row justifyCenter className="mb-12">
          <Col md className="text-center">
            <SectionTitle>Flexible Layout System</SectionTitle>
            <Text lg>VaneUI's layout system is built around Row and Col components, making complex layouts simple and intuitive.</Text>
          </Col>
        </Row>
        
        <Row>
          <Col md className="mb-6 md:mb-0">
            <Title sm className="mb-4">Powerful Grid Features:</Title>
            
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <Text semibold className="text-indigo-600">Flexible Columns</Text>
                <Text>Columns can be sized, spaced, aligned, and ordered with simple props</Text>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <Text semibold className="text-indigo-600">Nested Grids</Text>
                <Text>Create complex layouts by nesting Rows and Cols</Text>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <Text semibold className="text-indigo-600">Auto Layout</Text>
                <Text>Columns can automatically fill space or size to content</Text>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <Text semibold className="text-indigo-600">Alignment Controls</Text>
                <Text>Align items vertically and horizontally with simple props</Text>
              </div>
            </div>
          </Col>
          
          <Col md className="flex-1">
            <CodeBlock
              fileName="LayoutExample.tsx"
              language="tsx"
              code={`import { Section, Container, Row, Col } from 'vaneui';

function LayoutExample() {
  return (
    <Section>
      <Container>
        {/* Basic row with equal columns */}
        <Row className="mb-4">
          <Col md className="p-4 border rounded-lg">Column 1</Col>
          <Col md className="p-4 border rounded-lg">Column 2</Col>
          <Col md className="p-4 border rounded-lg">Column 3</Col>
        </Row>
        
        {/* Row with alignment */}
        <Row justifyBetween className="mb-4">
          <Col md className="p-4 border rounded-lg">Left</Col>
          <Col md className="p-4 border rounded-lg">Center</Col>
          <Col md className="p-4 border rounded-lg">Right</Col>
        </Row>
        
        {/* Nested grid layout */}
        <Row>
          <Col md className="p-4 border rounded-lg">
            <Row>
              <Col md>Nested Column 1</Col>
              <Col md>Nested Column 2</Col>
            </Row>
          </Col>
          <Col md className="p-4 border rounded-lg">Sidebar</Col>
        </Row>
      </Container>
    </Section>
  );
}`}
            />
          </Col>
        </Row>
      </Container>
    </Section>
  );
} 