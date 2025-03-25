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
  Stack,
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
          <Text lg textCenter>{PRODUCT.description}</Text>
          <Row lg smCol justifyCenter className="w-full">
            <Button lg className="max-sm:w-full">Get Started</Button>
            <Button lg secondary className="max-sm:w-full">View on GitHub</Button>
          </Row>
        </Col>
      </Container>
      <Container sm className="z-10">
        <Col itemsCenter>
          <Col className="max-w-xl max-sm:max-w-80 z-10 border-8 rounded-3xl border-gray-400/10 backdrop-blur-sm">
            <Card xl noBorder>
              <Row noGap smCol>
                <img src={dog.image} alt="puppy" className="self-stretch w-52 object-cover max-sm:w-80" />
                <Stack>
                  <Row justifyBetween>
                    <Title>{dog.name}</Title>
                    <Chip sm secondary semibold>{dog.gender}</Chip>
                  </Row>
                  <Divider />
                  <Text sm>{dog.description}</Text>
                  <Row justifyEnd>
                    <Button sm primary pill>Adopt</Button>
                    <Button sm secondary>Learn more</Button>
                  </Row>
                </Stack>
              </Row>
            </Card>
          </Col>
          <CodeBlock className="z-0 lg:-mt-[calc(var(--spacing)*20)] shadow-xl"
            fileName="DogCard.tsx"
            language="tsx"
            code={`import { Card, Row, Col, Title, Text, Chip, Divider, Button } from 'vaneui';

<Card xl noBorder>
  <Row noGap smCol>
    <img src={dog.image} alt="puppy" className="self-stretch w-52 object-cover max-sm:w-80" />
    <Stack>
      <Row justifyBetween>
        <Title>{dog.name}</Title>
        <Chip sm secondary semibold>{dog.gender}</Chip>
      </Row>
      <Divider />
      <Text sm>{dog.description}</Text>
      <Row justifyEnd>
        <Button sm primary>Adopt</Button>
        <Button sm secondary>Learn more</Button>
      </Row>
    </Stack>
  </Row>
</Card>`}
          />
        </Col>
      </Container>
    </Section>
  );
}
