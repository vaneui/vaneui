import React from 'react';
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
  Chip, Card, Checkbox, Label, Img, Button, Link
} from '../../src';
import Demo from './Demo';

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
          <Col gap>
            <Title>Label Cursor Behavior Demo</Title>
            <Divider />
            
            <Row gap>
              <Col>
                <Text sm bold>Label without input (cursor-default):</Text>
                <Label className="border border-gray-300 p-2">
                  This label has no input - hover to see cursor-default
                </Label>
              </Col>
              
              <Col>
                <Text sm bold>Label with checkbox (cursor-pointer):</Text>
                <Label htmlFor="demo-cursor" className="border border-gray-300 p-2">
                  <Checkbox id="demo-cursor" />
                  This label has an input - hover to see cursor-pointer
                </Label>
              </Col>
              
              <Col>
                <Text sm bold>Label with text input (cursor-pointer):</Text>
                <Label className="border border-gray-300 p-2">
                  <input type="text" className="border rounded px-2" placeholder="Type here" />
                  <span>Label with text input</span>
                </Label>
              </Col>
            </Row>
            
            <Divider />
          </Col>
        </Card>
        
        <Card>
          <Col>
            <Label htmlFor="terms">
              <Checkbox id="terms" />
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
        <Card xs className="max-w-xs">
          <Row xs>
            <Label success xs htmlFor="demo5">
              <Checkbox filled success pill xs id="demo5"/>
              Demo asdf asdf asdf asdf asdf asdf asfg asdg asdf a f faddg adfs gadsr
            </Label>
            <Button href="aaa">Test button</Button>
          </Row>
        </Card>
        <Card sm className="max-w-xs">
          <Row sm>
            <Label sm htmlFor="demo4">
              <Checkbox sharp sm id="demo4"/>
              Demo asdf asdf asdf asdf asdf asdf asfg asdg
            </Label>
          </Row>
        </Card>
        <Row xs>
          <Card className="max-w-xs">
            <Img src="https://placehold.co/600x400"/>
            <Row>
              <Label primary htmlFor="demo1">
                <Checkbox primary id="demo1"/>
                <Col noGap tag="span">
                  <Text primary>Demo asdf asdf asdf asdf asdf </Text>
                  <Text xs secondary>Fdsa dfasdf asdd </Text>
                </Col>
              </Label>
            </Row>
          </Card>
          <Card className="max-w-xs">
            <Row>
              <Label primary htmlFor="demo6">
                <Checkbox primary id="demo6"/>
                Demo asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf
              </Label>
            </Row>
          </Card>
        </Row>
        <Card lg className="max-w-xs">
          <Row lg>
            <Label lg htmlFor="demo2">
              <Checkbox lg outline id="demo2"/>
              Demo asdf asdf asdf asdf asdf asdf asfg asdg
            </Label>
          </Row>
        </Card>
        <Card xl className="max-w-xs">
          <Row xl>
            <Label xl htmlFor="demo3">
              <Checkbox outline primary xl id="demo3"/>
              Demo asdf asdf asdf asdf asdf asdf asfg asdg
            </Label>
          </Row>
        </Card>
      </Section>
    </ThemeProvider>
  );
}

export default App;