import React, { useRef, useEffect } from 'react';
import {
  ThemeProvider,
  defaultTheme,
  Row,
  Text,
  Divider,
  Col,
  Title,
  Section,
  Code,
  Chip, Card, Checkbox, Label, Img, Button, Link, Grid2
} from '../../src';
import Demo from './Demo';

function App() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Example: focus the button on mount
    if (buttonRef.current) {
      console.log('Button ref is available:', buttonRef.current);
    }
    if (textRef.current) {
      console.log('Text ref is available:', textRef.current);
    }
    if (cardRef.current) {
      console.log('Card ref is available:', cardRef.current);
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme} extraClasses={{
      code: {
        //primary: 'border-2 border-blue-300 shadow-lg',
        //success: 'bg-green-50 border border-green-200',
        //danger: 'bg-red-50 border border-red-200',
        //lg: 'font-bold tracking-wide'
      }
    }}>
      <Section>
        <Text lg link bold>Large link text</Text>
        <Card success>
          <Title>Card title</Title>
          <Text>This is a card text. It is used right under the card title.</Text>
        </Card>
        <Card>
          <Col>
            <Label htmlFor="terms">
              <Checkbox id="terms" />
              <span>I agree to the <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>.</span>
            </Label>

            <Label htmlFor="terms2">
              <Checkbox outline id="terms2" />
              <span>I agree to the <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>.</span>
            </Label>

            <Label htmlFor="emails">
              <Checkbox defaultChecked id="emails" />
              <Col noGap tag="span">
                <Text>Receive product updates</Text>
                <Text xs secondary>Occasional emails about new features</Text>
              </Col>
            </Label>
          </Col>
        </Card>
      </Section>
    </ThemeProvider>
  );
}

export default App;