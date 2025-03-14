import { Link, Text, Title, Section, Container, Col, Row, Grid3 } from 'vaneui';

export function Footer() {
  return (
    <Section tag={'footer'} className="bg-gray-100 border-t">
      <Container xl>
        <Row xl justifyBetween mdCol>
          <Col>
            <Text secondary uppercase>
              About
            </Text>
            <Text>
              VaneUI is a modern React component library built with Tailwind CSS.
            </Text>
          </Col>
          <Col>
            <Text secondary uppercase>
              Resources
            </Text>
            <Col sm>
              <Link href="/docs">
                Documentation
              </Link>
              <Link href="/components">
                Components
              </Link>
              <Link href="https://github.com/yourusername/vaneui">
                GitHub
              </Link>
            </Col>
          </Col>
          <Col>
            <Text secondary uppercase>
              Legal
            </Text>
            <Col sm>
              <Link href="/privacy">
                Privacy Policy
              </Link>
              <Link href="/terms">
                Terms of Service
              </Link>
            </Col>
          </Col>
        </Row>
        <Text muted sm>
          © {new Date().getFullYear()} VaneUI. All rights reserved.
        </Text>
      </Container>
    </Section>
  );
} 