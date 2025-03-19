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

export function HeroSection() {
  return (
    <Section relative className="bg-gradient-to-r from-white via-blue-50 to-white mt-[calc(36px+(var(--spacing)*6))]">
      <Row className="absolute inset-0 bg-[radial-gradient(var(--color-gray-300)_1px,transparent_1px)] [background-size:calc(var(--spacing)*4)_calc(var(--spacing)*4)]" />
      <Container xl className="py-20 z-10">
        <Col lg itemsCenter>
          <PageTitle xl sans textCenter>{PRODUCT.slogan}</PageTitle>
          <Text xl mono textCenter>{PRODUCT.description}</Text>
          <Row lg>
            <Button lg accent>Get Started</Button>
            <Button lg secondary>View on GitHub</Button>
          </Row>
        </Col>
      </Container>
    </Section>
  );
} 