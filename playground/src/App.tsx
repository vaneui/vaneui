import {
  ThemeProvider,
  defaultTheme,
  Row,
  Text,
  Col,
  Title,
  Section,
  Card, Checkbox, Label, Link, Input, Button,
  Container, Badge, Divider, Chip, Code
} from '../../src';

function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <Section>
        <Container>
          <Title xl>VaneUI Component Library Examples</Title>
          <Text>All UI components shown in 5 sizes (xs, sm, md, lg, xl)</Text>
          
          {/* Button Examples */}
          <Card>
            <Title>Button</Title>
            <Row>
              <Button xs>Button XS</Button>
              <Button sm>Button SM</Button>
              <Button>Button MD</Button>
              <Button lg>Button LG</Button>
              <Button xl>Button XL</Button>
            </Row>
          </Card>

          {/* Badge Examples */}
          <Card>
            <Title>Badge</Title>
            <Row>
              <Badge xs>Badge XS</Badge>
              <Badge sm>Badge SM</Badge>
              <Badge>Badge MD</Badge>
              <Badge lg>Badge LG</Badge>
              <Badge xl>Badge XL</Badge>
            </Row>
          </Card>

          {/* Chip Examples */}
          <Card>
            <Title>Chip</Title>
            <Row>
              <Chip xs>Chip XS</Chip>
              <Chip sm>Chip SM</Chip>
              <Chip>Chip MD</Chip>
              <Chip lg>Chip LG</Chip>
              <Chip xl>Chip XL</Chip>
            </Row>
          </Card>

          {/* Code Examples */}
          <Card>
            <Title>Code</Title>
            <Row>
              <Code xs>const x = 1;</Code>
              <Code sm>const x = 1;</Code>
              <Code>const x = 1;</Code>
              <Code lg>const x = 1;</Code>
              <Code xl>const x = 1;</Code>
            </Row>
          </Card>

          {/* Input Examples */}
          <Card>
            <Title>Input</Title>
            <Row>
              <Input xs placeholder="Input XS"/>
              <Input sm placeholder="Input SM"/>
              <Input placeholder="Input MD"/>
              <Input lg placeholder="Input LG"/>
              <Input xl placeholder="Input XL"/>
            </Row>
          </Card>

          {/* Label Examples */}
          <Card>
            <Title>Label</Title>
            <Col>
              <Label xs>Label XS</Label>
              <Label sm>Label SM</Label>
              <Label>Label MD</Label>
              <Label lg>Label LG</Label>
              <Label xl>Label XL</Label>
            </Col>
          </Card>

          {/* Checkbox Examples */}
          <Card>
            <Title>Checkbox</Title>
            <Col>
              <Label xs><Checkbox xs/> Checkbox XS</Label>
              <Label sm><Checkbox sm/> Checkbox SM</Label>
              <Label><Checkbox/> Checkbox MD</Label>
              <Label lg><Checkbox lg/> Checkbox LG</Label>
              <Label xl><Checkbox xl/> Checkbox XL</Label>
            </Col>
          </Card>

          {/* Text Examples */}
          <Card>
            <Title>Text</Title>
            <Col>
              <Text xs>Text XS - Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Text>
              <Text sm>Text SM - Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Text>
              <Text>Text MD - Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Text>
              <Text lg>Text LG - Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Text>
              <Text xl>Text XL - Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Text>
            </Col>
          </Card>

          {/* Title Examples */}
          <Card>
            <Title>Title</Title>
            <Col>
              <Title xs>Title XS</Title>
              <Title sm>Title SM</Title>
              <Title>Title MD</Title>
              <Title lg>Title LG</Title>
              <Title xl>Title XL</Title>
            </Col>
          </Card>

          {/* Link Examples */}
          <Card>
            <Title>Link</Title>
            <Col>
              <Link xs href="#">Link XS</Link>
              <Link sm href="#">Link SM</Link>
              <Link href="#">Link MD</Link>
              <Link lg href="#">Link LG</Link>
              <Link xl href="#">Link XL</Link>
            </Col>
          </Card>

          {/* Divider Examples */}
          <Card>
            <Title>Divider</Title>
            <Col>
              <Text>Divider XS:</Text>
              <Divider xs/>
              <Text>Divider SM:</Text>
              <Divider sm/>
              <Text>Divider MD:</Text>
              <Divider/>
              <Text>Divider LG:</Text>
              <Divider lg/>
              <Text>Divider XL:</Text>
              <Divider xl/>
            </Col>
          </Card>

          {/* Card Examples */}
          <Card>
            <Title>Card</Title>
            <Row>
              <Card xs>
                <Text xs>Card XS</Text>
              </Card>
              <Card sm>
                <Text sm>Card SM</Text>
              </Card>
              <Card>
                <Text>Card MD</Text>
              </Card>
              <Card lg>
                <Text lg>Card LG</Text>
              </Card>
              <Card xl>
                <Text xl>Card XL</Text>
              </Card>
            </Row>
          </Card>

        </Container>
      </Section>
    </ThemeProvider>
  );
}

export default App;