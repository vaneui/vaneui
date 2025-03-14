import { Link, Title, Row, Col } from 'vaneui';
import { PRODUCT } from '../constants';

export function Header() {
  return (
    <Col tag={'header'} className="bg-white border-b py-3 px-5">
      <Row justifyBetween itemsCenter>
        <Title>
          <Link href="/">
            {PRODUCT.title}
          </Link>
        </Title>
        <Row>
          <Link href="/components">
            Components
          </Link>
          <Link href="/docs">
            Documentation
          </Link>
          <Link href={PRODUCT.githubUrl}>
            GitHub
          </Link>
        </Row>
      </Row>
    </Col>
  );
} 