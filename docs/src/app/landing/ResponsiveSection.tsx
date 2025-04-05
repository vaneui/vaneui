'use client';

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

export function ResponsiveSection() {
  return (
    <Section className="py-20">
      <Container xl>
        <Row>
          <Col md className="order-2 md:order-1">
            <CodeBlock
              fileName="ResponsiveExample.tsx"
              language="tsx"
              code={`import { Row, Col, Text, Title } from '@vaneui/ui';

function ResponsiveLayout() {
  return (
    <Row>
      {/* Columns automatically stack on mobile */}
      {/* and become a row on larger screens */}
      <Col sm md lg className="border rounded-lg p-4">
        <Title sm>Card 1</Title>
        <Text>Responsive by default</Text>
      </Col>

      <Col sm md lg className="border rounded-lg p-4">
        <Title sm>Card 2</Title>
        <Text>Adapts to all screen sizes</Text>
      </Col>

      {/* Use responsive props for conditional display */}
      <Col sm md lg smHide mdShow className="border rounded-lg p-4">
        <Title sm>Card 3</Title>
        <Text>Hidden on small screens</Text>
      </Col>
    </Row>
  );
}`}
            />
          </Col>

          <Col md className="order-1 md:order-2 mb-6 md:mb-0">
            <SectionTitle>Responsive Design Built In</SectionTitle>
            <Text lg className="mb-4">Build interfaces that look great on any device with VaneUI's responsive components.</Text>
            <Text className="mb-6">Every component in VaneUI is designed with responsiveness in mind. Our grid system based on Row and Col components makes building responsive layouts intuitive.</Text>

            <div className="p-4 border border-indigo-200 rounded-lg bg-indigo-50 mb-6">
              <Title sm className="text-indigo-700 mb-2">Responsive Breakpoints:</Title>
              <div className="grid grid-cols-2 gap-2">
                <Text semibold className="text-indigo-700">sm:</Text>
                <Text>640px and up</Text>
                <Text semibold className="text-indigo-700">md:</Text>
                <Text>768px and up</Text>
                <Text semibold className="text-indigo-700">lg:</Text>
                <Text>1024px and up</Text>
                <Text semibold className="text-indigo-700">xl:</Text>
                <Text>1280px and up</Text>
              </div>
            </div>

            <Text>Use responsive props to control visibility, layout, and more based on screen size:</Text>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><Text>smHide, mdShow: Control visibility at different breakpoints</Text></li>
              <li><Text>Responsive flags: sm, md, lg</Text></li>
              <li><Text>Responsive ordering: order-1 md:order-2</Text></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Section>
  );
} 
