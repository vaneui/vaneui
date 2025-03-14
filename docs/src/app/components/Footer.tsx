import { Link, Text, Title, Section, Container, Col, Row, Grid3 } from 'vaneui';

export function Footer() {
  return (
    <Section tag={'footer'} className="bg-gray-50 border-t">
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
          {
            [
              {
                text: 'Resources',
                links: [{ text: 'Documentation', href: '/docs' }, { text: 'Components', href: '/components' }, { text: 'GitHub', href: 'https://github.com/vaneui' }]
              },
              {
                text: 'Legal',
                links: [{ text: 'Privacy Policy', href: '/privacy' }, { text: 'Terms of Service', href: '/terms' }]
              }
            ].map((item, index) => (
              <Col key={index}>
                <Text secondary uppercase>
                  {item.text}
                </Text>
                <Col sm>
                  {item.links.map((link, index) => (
                    <Link key={index} href={link.href}>
                      {link.text}
                    </Link>
                  ))}
                </Col>
              </Col>
            ))
          }
        </Row>
        <Text muted sm>
          © {new Date().getFullYear()} VaneUI. All rights reserved.
        </Text>
      </Container>
    </Section>
  );
} 