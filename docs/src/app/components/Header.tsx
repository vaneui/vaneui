import { Title, Row, Col, Text, Button } from 'vaneui';
import { PRODUCT } from '../constants';
import Image from 'next/image'
import Link from 'next/link'
import githubMark from './../../../public/github-mark.svg'
import logo from './../../../public/logo.svg'

export function Header() {
  return (
    <>
      <Col tag={'header'} className="bg-white/70 backdrop-blur-md border-b py-3 px-5 fixed w-full z-40">
        <Row lg justifyBetween>
          <Row tag={Link} href="/">
            <Image src={logo} alt={PRODUCT.title} className="h-[36px] w-[36px]" />
            <Title sm>
              {PRODUCT.title}
            </Title>
          </Row>
          <Row lg>
            <Text sm tag={Link} href="/docs">
              Documentation
            </Text>
            <Button sm tag={Link} href={PRODUCT.githubUrl}>
              <Image src={githubMark} alt="GitHub" width={16} height={16} className="h-5 w-5" />
              GitHub
            </Button>
          </Row>
        </Row>
      </Col>
    </>
  );
}
