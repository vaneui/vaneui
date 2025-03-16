import { Title, Row, Col, Text, Button } from 'vaneui';
import { PRODUCT } from '../constants';
import Image from 'next/image'
import Link from 'next/link'
import githubMark from './../../../public/github-mark.svg'

export function Header() {
  return (
    <Col tag={'header'} className="bg-white border-b py-3 px-5">
      <Row lg justifyBetween itemsCenter>
        <Row itemsCenter tag={Link} href="/">
          <Image src="/logo.svg" alt={PRODUCT.title} width={52} height={36} className="h-[32px]" />
          <Title sm>
            {PRODUCT.title}
          </Title>
        </Row>
        <Row lg itemsCenter>
          <Text sm tag={Link} href="/components">
            Components
          </Text>
          <Text sm tag={Link} href="/docs">
            Docs
          </Text>
          <Button sm tag={Link} href={PRODUCT.githubUrl}>
            <Image src={githubMark} alt="GitHub" width={20} height={20} className="h-5 w-5" />
            GitHub
          </Button>
        </Row>
      </Row >
    </Col >
  );
}
