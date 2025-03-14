import { Link, Title, Section, Container, Row, Col } from 'vaneui';

export function Header() {
  return (
    <Col tag={'header'} className="bg-white border-b py-3 px-5">
      <Row justifyBetween itemsCenter>
        <Title>
          <Link href="/">
            VaneUI
          </Link>
        </Title>
        <Row>
          <Link href="/components">
            Components
          </Link>
          <Link href="/docs">
            Documentation
          </Link>
          <Link href="https://github.com/yourusername/vaneui">
            GitHub
          </Link>
        </Row>
      </Row>
    </Col>
  );
} 