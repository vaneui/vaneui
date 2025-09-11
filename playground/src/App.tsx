import {
  ThemeProvider,
  defaultTheme,
  Row,
  Text,
  Col,
  Title,
  Section,
  Card, Checkbox, Label, Link, Input, Button
} from '../../src';

function App() {

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
        <Card>
          <Title>Input Examples</Title>
          <Text secondary>VaneUI Input component with different appearances and modes</Text>
          <Col>
            <Row>
              <Input border placeholder="Default input"/>
              <Button noShadow noRing border>Default</Button>
            </Row>
            <input
              className="rounded
    ring-2 ring-blue-600
    focus-visible:outline-2 focus-visible:outline-blue-950 focus-visible:outline-offset-4
  " placeholder="Some text"/>
          </Col>
        </Card>
        <Text lg link bold>Large link text</Text>
        <Text lg primary filled bold>Large link text</Text>
        <Col>
          <Row>
            <Card>
              <Title>Input Examples</Title>
              <Text secondary>VaneUI Input component with different appearances and modes</Text>
              <Col gap>
                <Input placeholder="Default input" />
                <Input primary placeholder="Primary input" />
                <Input secondary placeholder="Secondary input" />
                <Input success placeholder="Success input" />
                <Input danger placeholder="Danger input" />
                <Input warning placeholder="Warning input" />
              </Col>
            </Card>
            <Card filled>
              <Title>Input Sizes & Variants</Title>
              <Text>Different sizes and filled variants</Text>
              <Col gap>
                <Input xs placeholder="Extra small input" />
                <Input sm placeholder="Small input" />
                <Input md placeholder="Medium input (default)" />
                <Input lg placeholder="Large input" />
                <Input xl placeholder="Extra large input" />
                <Input filled primary placeholder="Filled primary input" />
                <Input filled success placeholder="Filled success input" />
              </Col>
            </Card>
          </Row>
          <Row filled secondary rounded>
            <Card success>
              <Title>Form Example</Title>
              <Text secondary>Inputs with labels and different types</Text>
              <Col gap>
                <Label htmlFor="name">
                  <Text semibold>Full Name</Text>
                  <Input id="name" type="text" placeholder="Enter your full name" />
                </Label>
                <Label htmlFor="email">
                  <Text semibold>Email Address</Text>
                  <Input id="email" type="email" primary placeholder="Enter your email" />
                </Label>
                <Label htmlFor="password">
                  <Text semibold>Password</Text>
                  <Input id="password" type="password" secondary placeholder="Enter your password" />
                </Label>
              </Col>
            </Card>
            <Card success filled>
              <Title black>Input States</Title>
              <Text>Focus and disabled states</Text>
              <Col gap>
                <Input placeholder="Normal input" />
                <Input disabled placeholder="Disabled input" />
                <Input readOnly value="Read-only input" />
                <Input required placeholder="Required input" />
              </Col>
            </Card>
          </Row>
          <Row>
            <Card primary>
              <Title>Card title</Title>
              <Text secondary>This is a card text. It is used right under the card title.</Text>
            </Card>
            <Card primary filled>
              <Title black>Card title</Title>
              <Text>This is a card text. It is used right under the card title.</Text>
            </Card>
          </Row>
        </Col>
        <Card warning filled>
          <Col>
            <Label htmlFor="terms">
              <Checkbox id="terms"/>
              <span>I agree to the <Link filled href="#">Terms of Service</Link> and <Link
                href="#">Privacy Policy</Link>.</span>
            </Label>

            <Label htmlFor="terms2">
              <Checkbox outline id="terms2"/>
              <span>I agree to the <Link href="#">Terms of Service</Link> and <Link
                href="#">Privacy Policy</Link>.</span>
            </Label>

            <Label htmlFor="emails">
              <Checkbox defaultChecked id="emails"/>
              <Col noGap tag="span">
                <Text>Receive product updates</Text>
                <Text xs secondary filled>Occasional emails about new features</Text>
              </Col>
            </Label>
          </Col>
        </Card>
      </Section>
    </ThemeProvider>
  );
}

export default App;