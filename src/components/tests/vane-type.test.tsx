import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Button,
  Badge,
  Chip,
  Code,
  Input,
  Label,
  Checkbox,
  Text,
  Title,
  PageTitle,
  SectionTitle,
  Link,
  List,
  ListItem,
  Card,
  Container,
  Section,
  Stack,
  Row,
  Col,
  Grid2,
  Grid3,
  Grid4,
  Grid5,
  Grid6,
  Divider,
  Img,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('data-vane-type Attribute Tests', () => {

  describe('UI Components should have data-vane-type="ui"', () => {
    it('Button should have data-vane-type="ui"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Button>Click me</Button>
        </ThemeProvider>
      );
      const element = container.querySelector('button');
      expect(element).toHaveAttribute('data-vane-type', 'ui');
    });

    it('Badge should have data-vane-type="ui"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Badge>Badge</Badge>
        </ThemeProvider>
      );
      const element = container.querySelector('span');
      expect(element).toHaveAttribute('data-vane-type', 'ui');
    });

    it('Chip should have data-vane-type="ui"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip>Chip</Chip>
        </ThemeProvider>
      );
      const element = container.querySelector('span');
      expect(element).toHaveAttribute('data-vane-type', 'ui');
    });

    it('Code should have data-vane-type="ui"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Code>code</Code>
        </ThemeProvider>
      );
      const element = container.querySelector('code');
      expect(element).toHaveAttribute('data-vane-type', 'ui');
    });

    it('Input should have data-vane-type="ui"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Input />
        </ThemeProvider>
      );
      const element = container.querySelector('input');
      expect(element).toHaveAttribute('data-vane-type', 'ui');
    });

    it('Label should have data-vane-type="ui"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Label>Label</Label>
        </ThemeProvider>
      );
      const element = container.querySelector('label');
      expect(element).toHaveAttribute('data-vane-type', 'ui');
    });

    it('Checkbox input should have data-vane-type="ui"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Checkbox />
        </ThemeProvider>
      );
      const element = container.querySelector('input[type="checkbox"]');
      expect(element).toHaveAttribute('data-vane-type', 'ui');
    });

    it('Text should have data-vane-type="ui"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Text>Text content</Text>
        </ThemeProvider>
      );
      const element = container.querySelector('p');
      expect(element).toHaveAttribute('data-vane-type', 'ui');
    });

    it('Title should have data-vane-type="ui"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Title>Title</Title>
        </ThemeProvider>
      );
      const element = container.querySelector('h3');
      expect(element).toHaveAttribute('data-vane-type', 'ui');
    });

    it('PageTitle should have data-vane-type="ui"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <PageTitle>Page Title</PageTitle>
        </ThemeProvider>
      );
      const element = container.querySelector('h1');
      expect(element).toHaveAttribute('data-vane-type', 'ui');
    });

    it('SectionTitle should have data-vane-type="ui"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <SectionTitle>Section Title</SectionTitle>
        </ThemeProvider>
      );
      const element = container.querySelector('h2');
      expect(element).toHaveAttribute('data-vane-type', 'ui');
    });

    it('Link should have data-vane-type="ui"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#">Link</Link>
        </ThemeProvider>
      );
      const element = container.querySelector('a');
      expect(element).toHaveAttribute('data-vane-type', 'ui');
    });

    it('List should have data-vane-type="ui"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <List>
            <ListItem>Item</ListItem>
          </List>
        </ThemeProvider>
      );
      const element = container.querySelector('ul');
      expect(element).toHaveAttribute('data-vane-type', 'ui');
    });

    it('ListItem should have data-vane-type="ui"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <List>
            <ListItem>Item</ListItem>
          </List>
        </ThemeProvider>
      );
      const element = container.querySelector('li');
      expect(element).toHaveAttribute('data-vane-type', 'ui');
    });
  });

  describe('Layout Components should have data-vane-type="layout"', () => {
    it('Card should have data-vane-type="layout"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>Card content</Card>
        </ThemeProvider>
      );
      const element = container.querySelector('div');
      expect(element).toHaveAttribute('data-vane-type', 'layout');
    });

    it('Container should have data-vane-type="layout"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Container>Container content</Container>
        </ThemeProvider>
      );
      const element = container.querySelector('div');
      expect(element).toHaveAttribute('data-vane-type', 'layout');
    });

    it('Section should have data-vane-type="layout"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Section>Section content</Section>
        </ThemeProvider>
      );
      const element = container.querySelector('div');
      expect(element).toHaveAttribute('data-vane-type', 'layout');
    });

    it('Stack should have data-vane-type="layout"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack>Stack content</Stack>
        </ThemeProvider>
      );
      const element = container.querySelector('div');
      expect(element).toHaveAttribute('data-vane-type', 'layout');
    });

    it('Row should have data-vane-type="layout"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Row>Row content</Row>
        </ThemeProvider>
      );
      const element = container.querySelector('div');
      expect(element).toHaveAttribute('data-vane-type', 'layout');
    });

    it('Col should have data-vane-type="layout"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Col>Col content</Col>
        </ThemeProvider>
      );
      const element = container.querySelector('div');
      expect(element).toHaveAttribute('data-vane-type', 'layout');
    });

    it('Grid2 should have data-vane-type="layout"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid2>Grid2 content</Grid2>
        </ThemeProvider>
      );
      const element = container.querySelector('div');
      expect(element).toHaveAttribute('data-vane-type', 'layout');
    });

    it('Grid3 should have data-vane-type="layout"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid3>Grid3 content</Grid3>
        </ThemeProvider>
      );
      const element = container.querySelector('div');
      expect(element).toHaveAttribute('data-vane-type', 'layout');
    });

    it('Grid4 should have data-vane-type="layout"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid4>Grid4 content</Grid4>
        </ThemeProvider>
      );
      const element = container.querySelector('div');
      expect(element).toHaveAttribute('data-vane-type', 'layout');
    });

    it('Grid5 should have data-vane-type="layout"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid5>Grid5 content</Grid5>
        </ThemeProvider>
      );
      const element = container.querySelector('div');
      expect(element).toHaveAttribute('data-vane-type', 'layout');
    });

    it('Grid6 should have data-vane-type="layout"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid6>Grid6 content</Grid6>
        </ThemeProvider>
      );
      const element = container.querySelector('div');
      expect(element).toHaveAttribute('data-vane-type', 'layout');
    });

    it('Divider should have data-vane-type="layout"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider />
        </ThemeProvider>
      );
      const element = container.querySelector('div');
      expect(element).toHaveAttribute('data-vane-type', 'layout');
    });

    it('Img should have data-vane-type="layout"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Img src="test.jpg" alt="test" />
        </ThemeProvider>
      );
      const element = container.querySelector('img');
      expect(element).toHaveAttribute('data-vane-type', 'layout');
    });
  });
});
