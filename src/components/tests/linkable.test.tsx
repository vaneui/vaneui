import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Badge,
  Button,
  Card,
  Chip,
  Col,
  Container,
  Grid3,
  Grid4,
  Row,
  Section,
  Stack,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Linkable Components Tests', () => {

  describe('Badge Component', () => {
    it('should render as span when no href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Badge primary>Status Badge</Badge>
        </ThemeProvider>
      );

      const span = container.querySelector('span');
      expect(span).toBeInTheDocument();
      expect(span).toHaveClass('w-fit', 'h-fit', 'transition-all');
      expect(span).toHaveTextContent('Status Badge');
      
      const anchor = container.querySelector('a');
      expect(anchor).not.toBeInTheDocument();
    });

    it('should render as anchor when href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Badge href="/filter?status=active" primary>Active Status</Badge>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveClass('w-fit', 'h-fit', 'transition-all');
      expect(anchor).toHaveAttribute('href', '/filter?status=active');
      expect(anchor).toHaveTextContent('Active Status');
      
      const span = container.querySelector('span');
      expect(span).not.toBeInTheDocument();
    });
  });

  describe('Button Component', () => {
    it('should render as button when no href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button primary>Click Me</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('w-fit', 'h-fit', 'cursor-pointer');
      
      const anchor = container.querySelector('a');
      expect(anchor).not.toBeInTheDocument();
    });

    it('should render as anchor when href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button href="/action" primary>Link Button</Button>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveClass('w-fit', 'h-fit', 'cursor-pointer');
      expect(anchor).toHaveAttribute('href', '/action');
      
      const button = container.querySelector('button');
      expect(button).not.toBeInTheDocument();
    });
  });

  describe('Card Component', () => {
    it('should render as div when no href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>Card Content</Card>
        </ThemeProvider>
      );

      const div = container.querySelector('div');
      expect(div).toBeInTheDocument();
      expect(div).toHaveTextContent('Card Content');
      
      const anchor = container.querySelector('a');
      expect(anchor).not.toBeInTheDocument();
    });

    it('should render as anchor when href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card href="/card-detail">Clickable Card</Card>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', '/card-detail');
      expect(anchor).toHaveTextContent('Clickable Card');
      
      const div = container.querySelector('div');
      expect(div).not.toBeInTheDocument();
    });
  });

  describe('Chip Component', () => {
    it('should render as span when no href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip>Tag Chip</Chip>
        </ThemeProvider>
      );

      const span = container.querySelector('span');
      expect(span).toBeInTheDocument();
      expect(span).toHaveTextContent('Tag Chip');
      
      const anchor = container.querySelector('a');
      expect(anchor).not.toBeInTheDocument();
    });

    it('should render as anchor when href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip href="/tag/react">React Chip</Chip>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', '/tag/react');
      expect(anchor).toHaveTextContent('React Chip');
      
      const span = container.querySelector('span');
      expect(span).not.toBeInTheDocument();
    });
  });

  describe('Layout Components', () => {
    it('should render Row as div when no href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row>Row Content</Row>
        </ThemeProvider>
      );

      const div = container.querySelector('div');
      expect(div).toBeInTheDocument();
      expect(div).toHaveTextContent('Row Content');
      
      const anchor = container.querySelector('a');
      expect(anchor).not.toBeInTheDocument();
    });

    it('should render Row as anchor when href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row href="/row-link">Clickable Row</Row>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', '/row-link');
      expect(anchor).toHaveTextContent('Clickable Row');
      
      const div = container.querySelector('div');
      expect(div).not.toBeInTheDocument();
    });

    it('should render Col as div when no href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Col>Column Content</Col>
        </ThemeProvider>
      );

      const div = container.querySelector('div');
      expect(div).toBeInTheDocument();
      expect(div).toHaveTextContent('Column Content');
      
      const anchor = container.querySelector('a');
      expect(anchor).not.toBeInTheDocument();
    });

    it('should render Col as anchor when href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Col href="/column-link">Clickable Column</Col>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', '/column-link');
      expect(anchor).toHaveTextContent('Clickable Column');
      
      const div = container.querySelector('div');
      expect(div).not.toBeInTheDocument();
    });

    it('should render Container as div when no href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container>Container Content</Container>
        </ThemeProvider>
      );

      const div = container.querySelector('div');
      expect(div).toBeInTheDocument();
      expect(div).toHaveTextContent('Container Content');
      
      const anchor = container.querySelector('a');
      expect(anchor).not.toBeInTheDocument();
    });

    it('should render Container as anchor when href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container href="/container-link">Clickable Container</Container>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', '/container-link');
      expect(anchor).toHaveTextContent('Clickable Container');
      
      const div = container.querySelector('div');
      expect(div).not.toBeInTheDocument();
    });
  });

  describe('Grid Components', () => {
    it('should render Grid3 as div when no href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid3>Grid Content</Grid3>
        </ThemeProvider>
      );

      const div = container.querySelector('div');
      expect(div).toBeInTheDocument();
      expect(div).toHaveTextContent('Grid Content');
      
      const anchor = container.querySelector('a');
      expect(anchor).not.toBeInTheDocument();
    });

    it('should render Grid3 as anchor when href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid3 href="/grid-link">Clickable Grid</Grid3>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', '/grid-link');
      expect(anchor).toHaveTextContent('Clickable Grid');
      
      const div = container.querySelector('div');
      expect(div).not.toBeInTheDocument();
    });

    it('should render Grid4 as div when no href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid4>Grid4 Content</Grid4>
        </ThemeProvider>
      );

      const div = container.querySelector('div');
      expect(div).toBeInTheDocument();
      expect(div).toHaveTextContent('Grid4 Content');
      
      const anchor = container.querySelector('a');
      expect(anchor).not.toBeInTheDocument();
    });

    it('should render Grid4 as anchor when href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid4 href="/grid4-link">Clickable Grid4</Grid4>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', '/grid4-link');
      expect(anchor).toHaveTextContent('Clickable Grid4');
      
      const div = container.querySelector('div');
      expect(div).not.toBeInTheDocument();
    });
  });

  describe('Other Layout Components', () => {
    it('should render Stack as div when no href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack>Stack Content</Stack>
        </ThemeProvider>
      );

      const div = container.querySelector('div');
      expect(div).toBeInTheDocument();
      expect(div).toHaveTextContent('Stack Content');
      
      const anchor = container.querySelector('a');
      expect(anchor).not.toBeInTheDocument();
    });

    it('should render Stack as anchor when href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack href="/stack-link">Clickable Stack</Stack>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', '/stack-link');
      expect(anchor).toHaveTextContent('Clickable Stack');
      
      const div = container.querySelector('div');
      expect(div).not.toBeInTheDocument();
    });

    it('should render Section as div when no href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Section>Section Content</Section>
        </ThemeProvider>
      );

      const div = container.querySelector('div');
      expect(div).toBeInTheDocument();
      expect(div).toHaveTextContent('Section Content');
      
      const anchor = container.querySelector('a');
      expect(anchor).not.toBeInTheDocument();
    });

    it('should render Section as anchor when href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Section href="/section-link">Clickable Section</Section>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', '/section-link');
      expect(anchor).toHaveTextContent('Clickable Section');
      
      const div = container.querySelector('div');
      expect(div).not.toBeInTheDocument();
    });

  });

  describe('Anchor-specific attributes', () => {
    it('should support target and rel attributes on linkable components', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card href="/external" target="_blank" rel="noopener noreferrer">
            External Card
          </Card>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', '/external');
      expect(anchor).toHaveAttribute('target', '_blank');
      expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should support onClick handlers on linkable components', () => {
      const handleClick = jest.fn();
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Badge href="/badge-link" onClick={handleClick}>
            Clickable Badge
          </Badge>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a') as HTMLAnchorElement;
      anchor.click();
      expect(handleClick).toHaveBeenCalled();
    });

    it('should maintain theme classes when rendered as anchors', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip href="/chip-link" primary pill>
            Themed Chip Link
          </Chip>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', '/chip-link');
      // Should maintain theme classes
      expect(anchor).toHaveClass('text-(--text-color-primary)');
      expect(anchor).toHaveClass('rounded-full');
    });
  });
});