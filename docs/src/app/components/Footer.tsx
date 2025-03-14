import { Link, Text, Title, Section, Container, Col, Row, Grid3 } from 'vaneui';

export function Footer() {
  return (
    <Section tag={'footer'} className="bg-gray-100 border-t">
      <Container xl>
        <Col lg>
          <Grid3 md>
            <Col md>
              <Title sm uppercase>
                About
              </Title>
              <Text md>
                VaneUI is a modern React component library built with Tailwind CSS.
              </Text>
            </Col>
            <Col md>
              <Title sm uppercase>
                Resources
              </Title>
              <Col sm>
                <Link href="/docs" md>
                  Documentation
                </Link>
                <Link href="/components" md>
                  Components
                </Link>
                <Link href="https://github.com/yourusername/vaneui" md>
                  GitHub
                </Link>
              </Col>
            </Col>
            <Col md>
              <Title sm uppercase>
                Legal
              </Title>
              <Col sm>
                <Link href="/privacy" md>
                  Privacy Policy
                </Link>
                <Link href="/terms" md>
                  Terms of Service
                </Link>
              </Col>
            </Col>
          </Grid3>
          <Text md muted style={{ textAlign: 'center' }}>
            © {new Date().getFullYear()} VaneUI. All rights reserved.
          </Text>
        </Col>
      </Container>
    </Section>
  );
} 