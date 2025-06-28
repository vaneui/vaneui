'use client'

import { Title, Row, Text, Button, Section } from '@vaneui/ui';
import { PRODUCT } from '../constants';
import Image from 'next/image'
import Link from 'next/link'
import vaneui from './../../../public/vaneui.svg'
import { ArrowRight, GitHub } from "react-feather";

export function Header() {
  return (
    <>
      <Section fixed xs tag={'header'} className="bg-white/70 backdrop-blur-md border-b z-40">
        <Row lg justifyBetween className="w-full">
          <Row sm tag={Link} href="/">
            <Image src={vaneui} alt={PRODUCT.title} className="h-[36px] w-[48px]"/>
            <Title sm>
              {PRODUCT.title}
            </Title>
          </Row>
          <Row lg>
            <Text sm tag={Link} href="/docs">
              Documentation
            </Text>
            <Button sm normal tag={Link} href={PRODUCT.githubUrl}>
              <GitHub className="size-4"/>
              GitHub
              <ArrowRight className="size-4"/>
            </Button>
          </Row>
        </Row>
      </Section>
    </>
  );
}
