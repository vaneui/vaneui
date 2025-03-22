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

const dog = {
  name: "Luka",
  gender: "male",
  image: "/puppy.png",
  description: "Luka is a 5 months old puppy who loves to play with his toys. He is a very friendly and playful puppy, and he is looking for a new home."
}

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
      <Container sm className="z-10 ">
        <Col itemsCenter>
          <Col className="z-10 border-8 rounded-3xl border-gray-400/10 backdrop-blur-sm">
            <Card lg className="max-w-xl max-sm:max-w-80">
              <Row noGap smCol>
                <img src={dog.image} alt="puppy" className="size-52 max-sm:w-80 object-cover" />
                <Col justifyBetween className="p-3">
                  <Row justifyBetween itemsCenter>
                    <Title>{dog.name}</Title>
                    <Chip sm secondary semibold>{dog.gender}</Chip>
                  </Row>
                  <Divider />
                  <Text sm>{dog.description}</Text>
                  <Row justifyEnd>
                    <Button sm primary>Adopt</Button>
                    <Button sm secondary>Learn more</Button>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
          <CodeBlock className="z-0 lg:-mt-[calc(var(--spacing)*20)] shadow-xl"
            fileName="DogCard.tsx"
            language="tsx"
            code={`import { Card, Row, Col, Title, Text, Chip } from 'vaneui';

<Card lg className="max-w-xl max-sm:max-w-80">
  <Row noGap smCol>
    <img src={dog.image} alt="puppy" className="size-52 max-sm:w-80 object-cover" />
    <Col justifyBetween className="m-3">
      <Row justifyBetween itemsCenter>
        <Title>{dog.name}</Title>
        <Chip sm secondary semibold>{dog.gender}</Chip>
      </Row>
      <Divider />
      <Text sm>{dog.description}</Text>
      <Row justifyEnd>
        <Button sm primary>Adopt</Button>
        <Button sm secondary>Learn more</Button>
      </Row>
    </Col>
  </Row>
</Card>`}
          />
        </Col>
      </Container>
    </Section>
  );
}
