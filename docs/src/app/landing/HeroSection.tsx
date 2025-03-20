import {
  PageTitle,
  Text,
  Section,
  Container,
  Col,
  Row,
  Button
} from 'vaneui';
import { PRODUCT } from '../constants';
import { CodeBlock } from "../components/CodeBlock";

export function HeroSection() {
  return (
    <Section relative className="border-b bg-gradient-to-r from-slate-100 via-white to-slate-100 mt-[calc(36px+(var(--spacing)*6))]">
      <Row className="absolute inset-0 bg-[radial-gradient(var(--color-slate-200)_1px,transparent_1px)] [background-size:calc(var(--spacing)*4)_calc(var(--spacing)*4)]" />
      <Container xs className="py-20 z-10">
        <Col xl itemsCenter>
          <PageTitle xl sans textCenter medium>
            {PRODUCT.slogan}
          </PageTitle>
          <Text xl mono textCenter>{PRODUCT.description}</Text>
          <Row lg smCol justifyCenter itemsCenter className="w-full">
            <Button lg className="max-sm:w-full">Get Started</Button>
            <Button lg secondary className="max-sm:w-full">View on GitHub</Button>
          </Row>
        </Col>
      </Container>
      <Container primary xs className="z-10 -mb-[calc(var(--spacing)*20)]">
        <Col xl itemsCenter>
          <CodeBlock
            fileName="HeroSection.tsx"
            language="tsx"
            code={`import {
  PageTitle,
  Text,`}
          />
        </Col>
      </Container>
    </Section>
  );
}
