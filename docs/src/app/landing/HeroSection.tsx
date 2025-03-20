import {
  PageTitle,
  Text,
  Section,
  Container,
  Col,
  Row,
  Button,
  Title,
  Card,
  Badge,
  Chip,
  Divider
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
      <Container sm className="z-10 -mb-[calc(var(--spacing)*20)]">
        <Col noGap itemsCenter>
          <CodeBlock
            fileName="DogCard.tsx"
            language="tsx"
            code={`import { Card, Row, Col, Title, Text, Chip } from 'vaneui';

<Card xl className="max-w-lg">
  <Row lg itemsCenter>
    <Col relative>
      <img src="/puppy.png" alt="puppy" className="w-44 h-44 rounded-xl max-w-44" />
      <Badge absolute xs normalCase className="bottom-1 right-1 opacity-75">
        In foster care
      </Badge>
    </Col>
    <Col>
      <Row justifyBetween itemsCenter>
        <Title lg>Luka</Title>
        <Chip sm secondary semibold>male</Chip>
      </Row>
      <Row justifyBetween itemsCenter>
        <Text semibold>Breed:</Text>
        <Text secondary>Mixed breed</Text>
      </Row>
      <Text italic>Lukа is a 5 months old puppy who loves to play with his toys.</Text>
    </Col>
  </Row>
</Card>`}
          />
          <Col className="border-8 rounded-4xl border-gray-400/10 -mt-[calc(var(--spacing)*10)] backdrop-blur-sm">
            <Card xl className="max-w-lg">
              <Row lg itemsCenter>
                <Col relative>
                  <img src="/puppy.png" alt="puppy" className="w-44 h-44 rounded-xl max-w-44" />
                  <Badge absolute xs normalCase className="bottom-1 right-1 opacity-75">In foster care</Badge>
                </Col>
                <Col>
                  <Row justifyBetween itemsCenter>
                    <Title lg>Luka</Title>
                    <Chip sm secondary semibold>male</Chip>
                  </Row>
                  <Row justifyBetween itemsCenter>
                    <Text semibold>Breed:</Text>
                    <Text secondary>Mixed breed</Text>
                  </Row>
                  <Text italic>Lukа is a 5 months old puppy who loves to play with his toys.</Text>
                </Col>
              </Row>
            </Card>
          </Col>
        </Col>
      </Container>
    </Section>
  );
}
