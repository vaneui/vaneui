'use server';

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
} from '@vaneui/ui';
import { PRODUCT } from '../constants';
import { CodeBlock } from "../components/CodeBlock";
import Link from "next/link";
import Image from "next/image";
import githubMark from './../../../public/github-mark.svg'
import { ArrowRight, Play } from "react-feather";

const dog = {
  name: "Luka",
  gender: "male",
  image: "/puppy.png",
  description: "Luka is a 5 months old puppy who loves to play with his toys. He is a very friendly and playful puppy, and he is looking for a new home."
}

export async function HeroSection() {
  return (
    <Section xl relative
             className="border-b bg-gradient-to-r from-slate-100 via-white to-slate-100 mt-[calc(36px+(var(--spacing)*6))]">
      <Row absolute
           className="inset-0 bg-[radial-gradient(var(--color-slate-200)_1px,transparent_1px)] [background-size:calc(var(--spacing)*4)_calc(var(--spacing)*4)]"/>
      <Container xs className="z-10">
        <Col xl itemsCenter>
          <Badge normalCase light>
            <Image src={githubMark} alt="GitHub" className="h-6 w-6"/>
            Open source components
          </Badge>
          <PageTitle xl sans textCenter medium>
            {PRODUCT.slogan}
          </PageTitle>
          <Text lg textCenter>{PRODUCT.description}</Text>
          <Row lg smCol justifyCenter className="w-full">
            <Button lg filled className="max-sm:w-full">
              Get Started <Play/>
            </Button>
            <Button lg className="max-sm:w-full" target="_blank" href={PRODUCT.githubUrl} tag={Link}>
              View on GitHub
            </Button>
          </Row>
        </Col>
      </Container>
      <Container sm itemsCenter className="z-10">
        <Col itemsCenter className="w-full">
          <Col className="max-w-xl max-sm:max-w-80 z-20 border-8 rounded-3xl border-gray-400/10 backdrop-blur-sm">
            <Card row smCol noPadding noGap>
              <img src={dog.image} alt="puppy" className="object-cover w-44 max-sm:w-80"/>
              <Stack sm>
                <Row justifyBetween>
                  <Title>{dog.name}</Title>
                  <Chip sm bold>{dog.gender}</Chip>
                </Row>
                <Divider/>
                <Text sm>{dog.description}</Text>
                <Row sm justifyEnd>
                  <Button sm success filled>Adopt</Button>
                  <Button sm secondary>Learn more</Button>
                </Row>
              </Stack>
            </Card>
          </Col>
          <CodeBlock className="z-0 lg:-mt-[calc(var(--spacing)*20)] shadow-xl"
                     fileName="DogCard.tsx"
                     language="tsx"
                     code={`import { Card, Row, Stack, Title, Text, Chip, Divider, Button } from '@vaneui/ui';
import dog from './data/dog.json';

export function DogCard() {
  return (
    <Card row smCol noPadding noGap>
      <img src={dog.image} alt="puppy" className="object-cover w-44 max-sm:w-80"/>
      <Stack sm>
        <Row justifyBetween>
          <Title>{dog.name}</Title>
          <Chip sm bold>{dog.gender}</Chip>
        </Row>
        <Divider />
        <Text sm>{dog.description}</Text>
        <Row sm justifyEnd>
          <Button sm success filled>Adopt</Button>
          <Button sm secondary>Learn more</Button>
        </Row>
      </Stack>
    </Card>
  );
} `}
          />
        </Col>
      </Container>
    </Section>
  );
}
