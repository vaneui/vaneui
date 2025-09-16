import {
  ThemeProvider,
  defaultTheme,
  Row,
  Text,
  Col,
  Title,
  Section,
  Card, Checkbox, Label, Link, Input, Button, Grid4
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
      <Section secondary>
        <Row xs mdCol className="w-full">
          <Card primary filled className="w-1/3">
            <Title>Card title 1</Title>
            <Text>This is the text of the card.</Text>
            <Row xs>
              <Input borderB noRing placeholder="Default input"/>
              <Button filled pill>Default</Button>
            </Row>
          </Card>
          <Card filled danger className="w-1/3">
            <Title bold>Card title 1</Title>
            <Text>This is the text of the card.</Text>
            <Button danger filled>Learn more</Button>
          </Card>
          <Card success filled pill className="w-1/3">
            <Title>Card title 1</Title>
            <Text>This is the text of the card.</Text>
          </Card>
        </Row>
        <Grid4 xs className="w-full">
          <Card className="w-full">
            <Title>Card title 1</Title>
            <Text>This is the text of the card.</Text>
            <Row xs>
              <Input borderB noRing placeholder="Default input"/>
              <Button filled pill>Default</Button>
            </Row>
          </Card>
          <Card filled warning className="w-full">
            <Title bold>Card title 1</Title>
            <Text>This is the text of the card.</Text>
            <Button warning filled>Learn more</Button>
          </Card>
          <Card success filled pill className="w-full">
            <Title>Card title 1</Title>
            <Text>This is the text of the card.</Text>
          </Card>
          <Card className="w-full">
            <Title>Card title 1</Title>
            <Text>This is the text of the card.</Text>
          </Card>
          <Card info sharp className="w-full">
            <Title>Card title 1</Title>
            <Text>This is the text of the card.</Text>
          </Card>
          <Card xl className="w-full">
            <Title xl>Card title 1</Title>
            <Text xl>This is the text of the card.</Text>
          </Card>
        </Grid4>
        <Card className="max-w-md">
          <Title>Input Examples</Title>
          <Text secondary>VaneUI Input component with different appearances and modes</Text>
          <Row>
            <Label htmlFor="search">
              Search with Icon
            </Label>
            <Row relative>
              <Input id="search" className="pl-10" placeholder="Search..."/>
              <span className="absolute left-3 text-gray-500">🔍</span>
            </Row>
          </Row>
          <Row xs>
            <Input placeholder="Default input"/>
            <Button>Default</Button>
          </Row>
          <Row xs>
            <Input primary placeholder="Default input"/>
            <Button primary>Default</Button>
          </Row>
          <Label htmlFor="terms">
            <Checkbox id="terms"/>
            <span>By clicking on the button, I agree to the <Link href="#">Terms of Service</Link> and <Link
              href="#">Privacy Policy</Link>.</span>
          </Label>
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