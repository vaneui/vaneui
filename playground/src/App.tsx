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
  Chip, Card, Checkbox, Label
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
        <Card xs>
          <Row xs>
            <Label xs htmlFor="demo5">
              <Checkbox filled success xs id="demo5"/>
              Demo
            </Label>
          </Row>
        </Card>
        <Card sm>
          <Row sm>
            <Label sm htmlFor="demo4">
              <Checkbox sharp sm id="demo4"/>
              Demo
            </Label>
          </Row>
        </Card>
        <Row xs>
          <Card className="max-w-xs">
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
                Demo asdf asdf asdf asdf asdf
              </Label>
            </Row>
          </Card>
        </Row>
        <Card lg>
          <Row lg>
            <Label lg htmlFor="demo2">
              <Checkbox lg outline id="demo2"/>
              Demo
            </Label>
          </Row>
        </Card>
        <Card xl>
          <Row xl>
            <Label xl htmlFor="demo3">
              <Checkbox outline primary xl id="demo3"/>
              Demo
            </Label>
          </Row>
        </Card>
      </Section>
    </ThemeProvider>
  );
}

export default App;