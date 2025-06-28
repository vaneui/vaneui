import {
  Text,
  Section,
  Container,
  Col,
  SectionTitle,
  Row,
  Title,
  Grid3
} from '@vaneui/ui';
import { Settings, Sliders, Zap } from "react-feather";

export function FeaturesSection() {
  return (
    <Section className="py-20 z-10">
      <Container xl>
        <Row justifyCenter className="mb-12">
          <Col md itemsCenter>
            <SectionTitle>Key Features</SectionTitle>
            <Text lg className="text-center">VaneUI combines the flexibility of Tailwind CSS with the structure of a
              component library, giving you the best of both worlds.</Text>
          </Col>
        </Row>

        <Grid3>
          <Col md className="h-full p-6 border rounded-lg shadow-sm">
            <Zap className="w-12 h-12 text-indigo-500 mb-4"/>
            <Title sm>Lightning Fast</Title>
            <Text>Built with performance in mind, VaneUI components are lightweight and optimized for speed, ensuring
              your applications remain responsive.</Text>
          </Col>

          <Col md className="h-full p-6 border rounded-lg shadow-sm">
            <Sliders className="w-12 h-12 text-indigo-500 mb-4"/>
            <Title sm>Highly Customizable</Title>
            <Text>Every component is designed to be customized to fit your brand. Use Tailwind classes directly or
              leverage our theming system.</Text>
          </Col>

          <Col md className="h-full p-6 border rounded-lg shadow-sm">
            <Settings className="w-12 h-12 text-indigo-500 mb-4"/>
            <Title sm>Seamless Integration</Title>
            <Text>Works perfectly with your existing Tailwind projects. No conflicts, no overrides, just clean
              integration.</Text>
          </Col>
        </Grid3>
      </Container>
    </Section>
  );
} 