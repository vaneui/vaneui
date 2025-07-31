import React from 'react';
import {
  Button,
  Badge,
  Chip,
  Card,
  Section,
  Container,
  Col,
  Row,
  Stack,
  Grid3,
  Grid4,
  Divider,
  Text,
  Title,
  Link,
  List,
  ListItem,
  SectionTitle,
  PageTitle
} from '../../src';

function Demo() {
  return (
    <Container>
      <PageTitle>VaneUI Component Playground</PageTitle>
      
      <Stack xl>
        {/* Buttons Section */}
        <Section>
          <SectionTitle>Buttons</SectionTitle>
          <Row flexWrap>
            <Button>Default Button</Button>
            <Button primary>Primary Button</Button>
            <Button secondary>Secondary Button</Button>
            <Button success>Success Button</Button>
            <Button danger>Danger Button</Button>
            <Button warning>Warning Button</Button>
            <Button info>Info Button</Button>
          </Row>
          
          <Title>Button Sizes</Title>
          <Row flexWrap>
            <Button xs>Extra Small</Button>
            <Button sm>Small</Button>
            <Button md>Medium</Button>
            <Button lg>Large</Button>
            <Button xl>Extra Large</Button>
          </Row>

          <Title>Button Variants</Title>
          <Row flexWrap>
            <Button primary outline>Outline Primary</Button>
            <Button secondary outline>Outline Secondary</Button>
            <Button primary pill>Pill Button</Button>
            <Button primary rounded>Rounded Button</Button>
            <Button primary sharp>Sharp Button</Button>
          </Row>
        </Section>

        <Divider />

        {/* Badges Section */}
        <Section>
          <SectionTitle>Badges</SectionTitle>
          <Row flexWrap>
            <Badge>Default</Badge>
            <Badge primary>Primary</Badge>
            <Badge secondary>Secondary</Badge>
            <Badge success>Success</Badge>
            <Badge danger>Danger</Badge>
            <Badge warning>Warning</Badge>
            <Badge info>Info</Badge>
          </Row>

          <Title>Badge Sizes</Title>
          <Row flexWrap>
            <Badge xs>XS</Badge>
            <Badge sm>Small</Badge>
            <Badge md>Medium</Badge>
            <Badge lg>Large</Badge>
            <Badge xl>XL</Badge>
          </Row>
        </Section>

        <Divider />

        {/* Chips Section */}
        <Section>
          <SectionTitle>Chips</SectionTitle>
          <Row flexWrap>
            <Chip>Default Chip</Chip>
            <Chip primary>Primary</Chip>
            <Chip secondary>Secondary</Chip>
            <Chip success>Success</Chip>
            <Chip danger>Danger</Chip>
            <Chip warning>Warning</Chip>
            <Chip info>Info</Chip>
          </Row>

          <Title>Chip Variants</Title>
          <Row flexWrap>
            <Chip primary outline>Outline</Chip>
            <Chip secondary pill>Pill Shape</Chip>
            <Chip info sharp>Sharp Corners</Chip>
          </Row>
        </Section>

        <Divider />

        {/* Typography Section */}
        <Section>
          <SectionTitle>Typography</SectionTitle>
          <Stack>
            <PageTitle>Page Title Component</PageTitle>
            <SectionTitle>Section Title Component</SectionTitle>
            <Title>Title Component</Title>
            <Text>This is a Text component with default styling.</Text>
            <Text primary>Primary colored text</Text>
            <Text secondary>Secondary colored text</Text>
            <Link href="#" primary>This is a Link component</Link>
          </Stack>

          <Title>Typography Sizes</Title>
          <Stack>
            <Text xs>Extra small text</Text>
            <Text sm>Small text</Text>
            <Text md>Medium text (default)</Text>
            <Text lg>Large text</Text>
            <Text xl>Extra large text</Text>
          </Stack>

          <Title>Lists</Title>
          <List>
            <ListItem>First list item</ListItem>
            <ListItem>Second list item</ListItem>
            <ListItem>Third list item with longer text to show wrapping behavior</ListItem>
          </List>
        </Section>

        <Divider />

        {/* Cards Section */}
        <Section>
          <SectionTitle>Cards</SectionTitle>
          <Grid3>
            <Card>
              <Title>Basic Card</Title>
              <Text>This is a basic card with padding.</Text>
            </Card>
            
            <Card border>
              <Title>Card with Border</Title>
              <Text>This card has a border.</Text>
            </Card>
            
            <Card shadow rounded>
              <Title>Card with Shadow</Title>
              <Text>This card has shadow and rounded corners.</Text>
            </Card>
          </Grid3>

          <Title>Card Variants</Title>
          <Grid3>
            <Card primary>
              <Title>Primary Card</Title>
              <Text>Primary themed card.</Text>
            </Card>
            
            <Card secondary rounded>
              <Title>Secondary Card</Title>
              <Text>Secondary themed card.</Text>
            </Card>
            
            <Card info shadow>
              <Title>Info Card</Title>
              <Text>Info themed card with shadow.</Text>
            </Card>
          </Grid3>
        </Section>

        <Divider />

        {/* Layout Section */}
        <Section>
          <SectionTitle>Layout Components</SectionTitle>
          
          <Title>Grid Layout</Title>
          <Grid4>
            <Card border>
              <Text>Grid Item 1</Text>
            </Card>
            <Card border>
              <Text>Grid Item 2</Text>
            </Card>
            <Card border>
              <Text>Grid Item 3</Text>
            </Card>
            <Card border>
              <Text>Grid Item 4</Text>
            </Card>
          </Grid4>

          <Title>Row/Col Layout</Title>
          <Row>
            <Col>
              <Card border>
                <Text>Column 1 - Flexible width</Text>
              </Card>
            </Col>
            <Col>
              <Card border>
                <Text>Column 2 - Flexible width</Text>
              </Card>
            </Col>
            <Col>
              <Card border>
                <Text>Column 3 - Fixed width</Text>
              </Card>
            </Col>
          </Row>

          <Title>Stack Layout</Title>
          <Stack>
            <Card border>
              <Text>Stack Item 1</Text>
            </Card>
            <Card border>
              <Text>Stack Item 2</Text>
            </Card>
            <Card border>
              <Text>Stack Item 3</Text>
            </Card>
          </Stack>
        </Section>

        <Divider />

        {/* Interactive Examples */}
        <Section>
          <SectionTitle>Interactive Examples</SectionTitle>
          
          <Card>
            <Title>Login Form Example</Title>
            <Stack>
              <input 
                type="email" 
                placeholder="Email" 
              />
              <input 
                type="password" 
                placeholder="Password" 
              />
              <Row>
                <Button primary>Login</Button>
                <Button outline>Cancel</Button>
              </Row>
            </Stack>
          </Card>

          <Card>
            <Title>Notification Example</Title>
            <Stack>
              <Row itemsCenter>
                <Badge success>Active</Badge>
                <Text>Your account is active and verified</Text>
              </Row>
              <Row itemsCenter>
                <Badge warning>Pending</Badge>
                <Text>Email verification pending</Text>
              </Row>
              <Row itemsCenter>
                <Badge danger>Error</Badge>
                <Text>Payment method expired</Text>
              </Row>
            </Stack>
          </Card>
        </Section>

        {/* Debug Section for Testing Props */}
        <Section>
          <SectionTitle>Props Testing</SectionTitle>
          <Text>This section tests that boolean props are properly omitted from DOM</Text>
          
          <Row>
            <Button primary md rounded shadow data-testid="test-button" aria-label="Test button">
              Button with many props
            </Button>
            
            <Badge success lg pill uppercase data-badge="test">
              Badge with props
            </Badge>
            
            <Chip info outline sm sharp id="test-chip">
              Chip with props
            </Chip>
          </Row>
          
          <Text>
            Inspect these elements in DevTools - component boolean props should not appear as DOM attributes
          </Text>
        </Section>
      </Stack>
    </Container>
  );
}

export default Demo;