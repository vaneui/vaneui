import {
  Text,
  Section,
  Container,
  Col,
  SectionTitle,
  Row,
  Title
} from 'vaneui';
import {
  CubeIcon,
  SparklesIcon,
  ArrowsPointingOutIcon,
  SwatchIcon
} from "@heroicons/react/24/outline";
import { CodeBlock } from "../components/CodeBlock";

export function TailwindSection() {
  return (
    <Section relative secondary className="py-20 bg-[linear-gradient(to_right,var(--color-gray-100)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-gray-100)_1px,transparent_1px)] bg-[size:calc(var(--spacing)*6)_calc(var(--spacing)*6)]">
      <Container xl className="p-8 rounded-2xl border">
        <Row xl itemsCenter lgCol>
          <Col md className="mb-6 md:mb-0">
            <SectionTitle>Powered by Tailwind CSS</SectionTitle>
            <Text lg className="mb-4">VaneUI is built on top of Tailwind CSS, giving you all the utility-first power you love while adding a layer of component abstraction.</Text>
            <Text className="mb-6">Every VaneUI component accepts Tailwind classes, allowing you to customize and extend functionality without leaving the component ecosystem.</Text>

            <Row className="gap-y-4">
              <Col sm className="flex-1">
                <div className="flex items-center">
                  <CubeIcon className="w-5 h-5 text-indigo-500 mr-2" />
                  <Text semibold>Zero Config</Text>
                </div>
              </Col>
              <Col sm className="flex-1">
                <div className="flex items-center">
                  <SparklesIcon className="w-5 h-5 text-indigo-500 mr-2" />
                  <Text semibold>Utility Classes</Text>
                </div>
              </Col>
              <Col sm className="flex-1">
                <div className="flex items-center">
                  <ArrowsPointingOutIcon className="w-5 h-5 text-indigo-500 mr-2" />
                  <Text semibold>Responsive Design</Text>
                </div>
              </Col>
              <Col sm className="flex-1">
                <div className="flex items-center">
                  <SwatchIcon className="w-5 h-5 text-indigo-500 mr-2" />
                  <Text semibold>Visual Consistency</Text>
                </div>
              </Col>
            </Row>
          </Col>

          <Col md className="flex-1">
            <CodeBlock
              fileName="TailwindExample.tsx"
              language="tsx"
              code={`import { Button, Col, Row } from 'vaneui';

// VaneUI components work seamlessly with Tailwind classes
function TailwindExample() {
  return (
    <Row className="gap-4 p-6 bg-gray-100 rounded-lg">
      <Col>
        {/* Use VaneUI props for common styling */}
        <Button primary>Primary Button</Button>
      </Col>
      <Col>
        {/* Or use Tailwind classes for custom styling */}
        <Button className="bg-gradient-to-r from-green-400 
          to-blue-500 text-white border-0 
          hover:from-green-500 hover:to-blue-600">
          Custom Styled Button
        </Button>
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