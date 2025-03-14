import { Link, Title, Section, Container, Row } from 'vaneui';

export function Header() {
  return (
    <Section tag={'header'} className="bg-white border-b">
      <Container xl>
        <Row justifyBetween itemsCenter>
          <Title md>
            <Link href="/" md>
              VaneUI
            </Link>
          </Title>
          <Row md>
            <Link href="/components" md>
              Components
            </Link>
            <Link href="/docs" md>
              Documentation
            </Link>
            <Link href="https://github.com/yourusername/vaneui" md>
              GitHub
            </Link>
          </Row>
        </Row>
      </Container>
    </Section>
  );
} 