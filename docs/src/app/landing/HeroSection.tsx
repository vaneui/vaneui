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
    <Section className="bg-gradient-to-r from-white via-indigo-50 to-white py-20 mt-[calc(36px+(var(--spacing)*6))]">
      <Container xl>
        <Col lg>
          <PageTitle xl sans>{PRODUCT.slogan}</PageTitle>
          <Text xl mono>{PRODUCT.description}</Text>
          <Row lg>
            <Button lg accent>Get Started</Button>
            <Button lg secondary>View on GitHub</Button>
          </Row>
        </Col>
      </Container>
    </Section>
  );
} 