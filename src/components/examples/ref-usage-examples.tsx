/**
 * Ref Support Examples for VaneUI Components
 * 
 * All VaneUI components now support refs through React.forwardRef.
 * This file demonstrates various use cases for refs with different components.
 */

import React, { useRef, useEffect } from 'react';
import {
  Button,
  Badge,
  Chip,
  Code,
  Divider,
  Label,
  Img,
  Checkbox,
  Text,
  Title,
  PageTitle,
  SectionTitle,
  Link,
  List,
  ListItem,
  Container,
  Row,
  Col,
  Stack,
  Section,
  Grid3,
  Grid4,
  Card,
  ThemeProvider,
  defaultTheme
} from '../../index';

/**
 * Basic UI Components with Refs
 * Each component is properly typed with its corresponding HTML element
 */
export const BasicComponentRefs = () => {
  // Basic UI component refs with proper typing
  const buttonRef = useRef<HTMLButtonElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const chipRef = useRef<HTMLSpanElement>(null);
  const codeRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const checkboxRef = useRef<HTMLDivElement>(null); // Checkbox returns wrapper div

  return (
    <ThemeProvider theme={defaultTheme}>
      <Button ref={buttonRef}>Button</Button>
      <Badge ref={badgeRef}>Badge</Badge>
      <Chip ref={chipRef}>Chip</Chip>
      <Code ref={codeRef}>code</Code>
      <Divider ref={dividerRef} />
      <Label ref={labelRef}>Label</Label>
      <Img ref={imgRef} src="image.jpg" alt="Image" />
      <Checkbox ref={checkboxRef} />
    </ThemeProvider>
  );
};

/**
 * Typography Components with Refs
 */
export const TypographyComponentRefs = () => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pageTitleRef = useRef<HTMLHeadingElement>(null);
  const sectionTitleRef = useRef<HTMLHeadingElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listItemRef = useRef<HTMLLIElement>(null);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Text ref={textRef}>Text paragraph</Text>
      <Title ref={titleRef}>Title (h3)</Title>
      <PageTitle ref={pageTitleRef}>Page Title (h1)</PageTitle>
      <SectionTitle ref={sectionTitleRef}>Section Title (h2)</SectionTitle>
      <Link ref={linkRef} href="/link">Link</Link>
      <List ref={listRef}>
        <ListItem ref={listItemRef}>List Item</ListItem>
      </List>
    </ThemeProvider>
  );
};

/**
 * Layout Components with Refs
 */
export const LayoutComponentRefs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const colRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const grid3Ref = useRef<HTMLDivElement>(null);
  const grid4Ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container ref={containerRef}>
        <Section ref={sectionRef}>
          <Card ref={cardRef}>
            <Row ref={rowRef}>
              <Col ref={colRef}>Column</Col>
            </Row>
            <Stack ref={stackRef}>Stack</Stack>
            <Grid3 ref={grid3Ref}>Grid 3</Grid3>
            <Grid4 ref={grid4Ref}>Grid 4</Grid4>
          </Card>
        </Section>
      </Container>
    </ThemeProvider>
  );
};

/**
 * Practical Use Cases for Refs
 */
export const PracticalRefUseCases = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputLabelRef = useRef<HTMLLabelElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Focus management
    buttonRef.current?.focus();

    // Measuring dimensions
    const containerRect = containerRef.current?.getBoundingClientRect();
    console.log('Container dimensions:', containerRect);

    // Adding event listeners
    const handleCustomEvent = () => console.log('Custom event triggered');
    buttonRef.current?.addEventListener('customEvent', handleCustomEvent);

    // Cleanup
    return () => {
      buttonRef.current?.removeEventListener('customEvent', handleCustomEvent);
    };
  }, []);

  const handleButtonClick = () => {
    // Scroll to text element
    textRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // Programmatic focus
    inputLabelRef.current?.focus();
    
    // Access DOM properties
    console.log('Button disabled state:', buttonRef.current?.disabled);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container ref={containerRef}>
        <Button ref={buttonRef} onClick={handleButtonClick}>
          Click to trigger actions
        </Button>
        
        <Label ref={inputLabelRef} tabIndex={0}>
          <Checkbox />
          Focusable label with checkbox
        </Label>
        
        <Text ref={textRef}>
          This text will be scrolled into view when button is clicked
        </Text>
      </Container>
    </ThemeProvider>
  );
};

/**
 * Working with Custom Tags and Refs
 * Note: When using custom tags, the ref type becomes 'any'
 */
export const CustomTagsWithRefs = () => {
  const spanTextRef = useRef<any>(null);
  const sectionButtonRef = useRef<any>(null);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Text ref={spanTextRef} tag="span">
        Text rendered as span instead of p
      </Text>
      
      <Button ref={sectionButtonRef} tag="section">
        Button rendered as section
      </Button>
    </ThemeProvider>
  );
};

/**
 * Advanced: Ref Forwarding in Custom Components
 * This shows how you could wrap VaneUI components and still maintain ref support
 */
const CustomButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  (props, ref) => {
    return (
      <Button 
        ref={ref} 
        {...props} 
        className={`custom-button ${props.className || ''}`}
      />
    );
  }
);

export const CustomComponentWithRef = () => {
  const customButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CustomButton ref={customButtonRef} primary>
        Custom Button with Ref
      </CustomButton>
    </ThemeProvider>
  );
};