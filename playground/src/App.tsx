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
              <Label htmlFor="search">
                Search with Icon
              </Label>
              <Row relative>
                <Input id="search" className="pl-10" placeholder="Search..."/>
                <span className="absolute left-3 text-gray-500">🔍</span>
              </Row>
            </Row>
            <Row>
              <Input placeholder="Default input"/>
              <Button>Default</Button>
            </Row>
            <Row>
              <Input primary placeholder="Default input"/>
              <Button primary>Default</Button>
            </Row>
            <Label htmlFor="terms">
              <Checkbox id="terms"/>
              <span>I agree to the <Link  href="#">Terms of Service</Link> and <Link
                href="#">Privacy Policy</Link>.</span>
            </Label>
          </Col>
        </Card>
        <Card filled>
          <Title>Input Examples</Title>
          <Text secondary filled>VaneUI Input component with different appearances and modes</Text>
          <Col>
            <Row>
              <Input filled placeholder="Default input"/>
              <Button filled>Default</Button>
            </Row>
            <Row>
              <Input primary filled placeholder="Default input"/>
              <Button primary filled>Default</Button>
            </Row>
          </Col>
        </Card>
      </Section>
    </ThemeProvider>
  );
}

export default App;