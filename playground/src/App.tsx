import {
  ThemeProvider,
  defaultTheme,
  Row,
  Text,
  Col,
  Title,
  Section,
  Card, Checkbox, Label, Link, Input, Button,
  Container, Badge, Divider, Chip, Code, PageTitle
} from '../../src';
import { ColorTable } from './ColorTable';

function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <Section className="w-full">
        <Container itemsCenter className="w-full">
          <PageTitle>VaneUI Component Library Examples</PageTitle>
          <ColorTable />
          <Text xs className="max-w-sm">
            Every component adapts to screen size automatically.
            Use responsive props like <Code xs primary>xs</Code>, <Code xs primary>sm</Code>,
            <Code xs primary>md</Code>, <Code xs primary>lg</Code>, <Code xs primary>xl</Code> to fine-tune layouts for any
            device.
          </Text>
          <Text sm className="max-w-sm">
            Every component adapts to screen size automatically.
            Use responsive props like <Code sm primary>xs</Code>, <Code sm primary>sm</Code>,
            <Code sm primary>md</Code>, <Code sm primary>lg</Code>, <Code sm primary>xl</Code> to fine-tune layouts for any
            device.
          </Text>
          <Text className="max-w-[216px]">
            Every component adapts to screen size automatically.
            Use responsive props like <Code secondary>xs</Code>, <Code primary>sm</Code>,
            <Code primary>xs</Code>, <Code primary>sm</Code>, <Code primary>xs</Code>, <Code>sm</Code>, <Code>xs</Code>, <Code secondary>sm</Code>,
            <Code secondary>xs</Code>, <Code>sm</Code>,
            <Code primary>md</Code>, <Code primary>lg</Code>, <Code primary>xl</Code> to fine-tune layouts for any
            device.
          </Text>
          <Text lg className="max-w-lg">
            Every component adapts to screen size automatically.
            Use responsive props like <Code lg primary>xs</Code>, <Code lg primary>sm</Code>, <Code lg primary>md</Code>, <Code lg primary>lg</Code>, <Code lg primary>xl</Code> to fine-tune layouts for any device.
          </Text>
          <Text xl className="max-w-xl">
            Every component adapts to screen size automatically.
            Use responsive props like <Code xl primary>xs</Code>, <Code xl primary>sm</Code>, <Code xl primary>xs</Code>, <Code xl primary>sm</Code>,
            <Code xl primary>xs</Code>, <Code xl primary>sm</Code>, <Code xl primary>xs</Code>, <Code xl primary>sm</Code>,
            <Code xl primary>xs</Code>, <Code xl primary>sm</Code>, <Code xl primary>xs</Code>, <Code xl primary>sm</Code>,
            <Code xl primary>md</Code>, <Code xl primary>lg</Code>, <Code xl primary>xl</Code> to fine-tune layouts for any
            device.
          </Text>

          {/* Button Examples */}
          <Card>
            <Title>Button</Title>
            <Row flexWrap>
              <Button primary xs>Button XS</Button>
              <Button success sm>Button SM</Button>
              <Button>Button MD</Button>
              <Button danger lg>Button LG</Button>
              <Button warning xl>Button XL</Button>
            </Row>
            <Row flexWrap>
              <Button filled  primary xs>Button XS</Button>
              <Button filled  success sm>Button SM</Button>
              <Button filled>Button MD</Button>
              <Button filled  danger lg>Button LG</Button>
              <Button filled  warning xl>Button XL</Button>
            </Row>
          </Card>

          {/* Badge Examples */}
          <Card>
            <Title>Badge</Title>
            <Row flexWrap>
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
            <Row flexWrap>
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
            <Row flexWrap>
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
            <Row flexWrap>
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
              <Text xs>Text XS - Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua</Text>
              <Text sm>Text SM - Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua</Text>
              <Text>Text MD - Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua</Text>
              <Text lg>Text LG - Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua</Text>
              <Text xl>Text XL - Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua</Text>
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
            <Row flexWrap>
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