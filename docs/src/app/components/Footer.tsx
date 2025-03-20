import { Link, Text, Title, Section, Container, Col, Row, Grid3 } from 'vaneui';
import { PRODUCT } from '../constants';

export function Footer() {
  return (
    <Section tag={'footer'} secondary className="border-t">
      <Container xl transparent>
        <Row xl justifyBetween mdCol>
          <Col className="max-w-1/2 max-md:max-w-full">
            <Text secondary uppercase>
              About
            </Text>
            <Text>
              {PRODUCT.description}
            </Text>
          </Col>
          {
            [
              {
                text: 'Resources',
                links: [{ text: 'Documentation', href: '/docs' }, { text: 'Components', href: '/components' }, { text: 'GitHub', href: PRODUCT.githubUrl }]
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
          {PRODUCT.copyright}
        </Text>
      </Container>
    </Section>
  );
} 