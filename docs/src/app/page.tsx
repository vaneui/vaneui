import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageTitle, Text, Section, Container, Col } from 'vaneui';

export default function Home() {
  return (
    <Col noGap className="min-h-screen">
      <Header />
      <Section tag={'main'} className="flex-grow">
        <Container xl>
          <Col lg>
            <PageTitle mono>VaneUI Documentation</PageTitle>
            <Text lg>
              Welcome to the VaneUI documentation. This site showcases all the components
              and their usage examples.
            </Text>
          </Col>
        </Container>
      </Section>
      <Footer />
    </Col>
  );
} 