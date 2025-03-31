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
  Divider,
  Badge
} from 'vaneui';
import { PRODUCT } from '../constants';
import { CodeBlock } from "../components/CodeBlock";
import Link from "next/link";
import Image from "next/image";
import githubMark from './../../../public/github-mark.svg'

const dog = {
  name: "Luka",
  gender: "male",
  image: "/puppy.png",
  description: "Luka is a 5 months old puppy who loves to play with his toys. He is a very friendly and playful puppy, and he is looking for a new home."
}

export function HeroSection() {
  return (
    <Section xl relative
             className="border-b bg-gradient-to-r from-slate-100 via-white to-slate-100 mt-[calc(36px+(var(--spacing)*6))]">
      <Row absolute
           className="inset-0 bg-[radial-gradient(var(--color-slate-200)_1px,transparent_1px)] [background-size:calc(var(--spacing)*4)_calc(var(--spacing)*4)]"/>
      <Container xs className="z-10">
        <Col xl itemsCenter>
          <Badge normalCase light>
            <Image src={githubMark} alt="GitHub" className="h-5 w-5"/>
            Open source components
          </Badge>
          <PageTitle xl sans textCenter medium>
            {PRODUCT.slogan}
          </PageTitle>
          <Text lg textCenter>{PRODUCT.description}</Text>
          <Row lg smCol justifyCenter className="w-full">
            <Button lg filled className="max-sm:w-full">Get Started</Button>
            <Button lg className="max-sm:w-full" target="_blank" href={PRODUCT.githubUrl} tag={Link}>
              View on GitHub
            </Button>
          </Row>
        </Col>
      </Container>
      <Container sm className="z-10 -mb-12">
        <Col itemsCenter>
          <Col className="max-w-xl max-sm:max-w-80 z-20 border-8 rounded-3xl border-gray-400/10 backdrop-blur-sm">
            <Card xl noPadding>
              <Row noGap smCol>
                <img src={dog.image} alt="puppy" className="object-cover self-stretch w-48 max-sm:w-80"/>
                <Stack sm>
                  <Row justifyBetween>
                    <Title>{dog.name}</Title>
                    <Chip sm bold>{dog.gender}</Chip>
                  </Row>
                  <Divider/>
                  <Text sm>{dog.description}</Text>
                  <Row justifyEnd>
                    <Button sm success filled>Adopt</Button>
                    <Button sm secondary>Learn more</Button>
                  </Row>
                </Stack>
              </Row>
            </Card>
          </Col>
          <CodeBlock className="z-0 lg:-mt-[calc(var(--spacing)*20)] shadow-xl"
                     fileName="DogCard.tsx"
                     language="tsx"
                     code={`import { Card, Row, Stack, Title, Text, Chip, Divider, Button } from '@vaneui/ui';
import dog from './data/dog.json';

export function DogCard() {
  return (
    <Card xl noPadding>
      <Row noGap smCol>
        <img src={dog.image} alt="puppy" className="self-stretch w-52 max-sm:w-80" />
        <Stack>
          <Row justifyBetween>
            <Title>{dog.name}</Title>
            <Chip sm semibold>{dog.gender}</Chip>
          </Row>
          <Divider />
          <Text sm>{dog.description}</Text>
          <Row justifyEnd>
            <Button sm success filled>Adopt</Button>
            <Button sm secondary>Learn more</Button>
          </Row>
        </Stack>
      </Row>
    </Card>  
  );
} `}
          />
        </Col>
      </Container>
    </Section>
  );
}
