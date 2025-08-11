import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React, { useRef, useEffect } from 'react';
import {
  Button,
  Card,
  Text,
  Title,
  PageTitle,
  SectionTitle,
  Link,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Ref Support Tests', () => {
  it('should forward ref to Button component', () => {
    let buttonRef: HTMLButtonElement | null = null;
    
    const TestComponent = () => {
      const ref = useRef<HTMLButtonElement>(null);
      
      useEffect(() => {
        buttonRef = ref.current;
      }, []);
      
      return (
        <ThemeProvider theme={defaultTheme}>
          <Button ref={ref}>Test Button</Button>
        </ThemeProvider>
      );
    };
    
    const { container } = render(<TestComponent />);
    const button = container.querySelector('button');
    
    expect(button).toBeInTheDocument();
    expect(buttonRef).toBe(button);
  });

  it('should forward ref to Card component', () => {
    let cardRef: HTMLDivElement | null = null;
    
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null);
      
      useEffect(() => {
        cardRef = ref.current;
      }, []);
      
      return (
        <ThemeProvider theme={defaultTheme}>
          <Card ref={ref}>Test Card</Card>
        </ThemeProvider>
      );
    };
    
    const { container } = render(<TestComponent />);
    const card = container.querySelector('div');
    
    expect(card).toBeInTheDocument();
    expect(cardRef).toBe(card);
  });

  it('should forward ref to Text component', () => {
    let textRef: HTMLParagraphElement | null = null;
    
    const TestComponent = () => {
      const ref = useRef<HTMLParagraphElement>(null);
      
      useEffect(() => {
        textRef = ref.current;
      }, []);
      
      return (
        <ThemeProvider theme={defaultTheme}>
          <Text ref={ref}>Test Text</Text>
        </ThemeProvider>
      );
    };
    
    const { container } = render(<TestComponent />);
    const text = container.querySelector('p');
    
    expect(text).toBeInTheDocument();
    expect(textRef).toBe(text);
  });

  it('should forward ref to Title component', () => {
    let titleRef: HTMLHeadingElement | null = null;
    
    const TestComponent = () => {
      const ref = useRef<HTMLHeadingElement>(null);
      
      useEffect(() => {
        titleRef = ref.current;
      }, []);
      
      return (
        <ThemeProvider theme={defaultTheme}>
          <Title ref={ref}>Test Title</Title>
        </ThemeProvider>
      );
    };
    
    const { container } = render(<TestComponent />);
    const title = container.querySelector('h3');
    
    expect(title).toBeInTheDocument();
    expect(titleRef).toBe(title);
  });

  it('should forward ref to PageTitle component', () => {
    let pageTitleRef: HTMLHeadingElement | null = null;
    
    const TestComponent = () => {
      const ref = useRef<HTMLHeadingElement>(null);
      
      useEffect(() => {
        pageTitleRef = ref.current;
      }, []);
      
      return (
        <ThemeProvider theme={defaultTheme}>
          <PageTitle ref={ref}>Test Page Title</PageTitle>
        </ThemeProvider>
      );
    };
    
    const { container } = render(<TestComponent />);
    const pageTitle = container.querySelector('h1');
    
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitleRef).toBe(pageTitle);
  });

  it('should forward ref to Link component when href is provided', () => {
    let linkRef: HTMLAnchorElement | null = null;
    
    const TestComponent = () => {
      const ref = useRef<HTMLAnchorElement>(null);
      
      useEffect(() => {
        linkRef = ref.current;
      }, []);
      
      return (
        <ThemeProvider theme={defaultTheme}>
          <Link ref={ref} href="/test">Test Link</Link>
        </ThemeProvider>
      );
    };
    
    const { container } = render(<TestComponent />);
    const link = container.querySelector('a');
    
    expect(link).toBeInTheDocument();
    expect(linkRef).toBe(link);
  });

  it('should allow interaction through ref', () => {
    let buttonRef: HTMLButtonElement | null = null;
    const handleClick = jest.fn();
    
    const TestComponent = () => {
      const ref = useRef<HTMLButtonElement>(null);
      
      useEffect(() => {
        buttonRef = ref.current;
        // Programmatically click the button through ref
        if (ref.current) {
          ref.current.click();
        }
      }, []);
      
      return (
        <ThemeProvider theme={defaultTheme}>
          <Button ref={ref} onClick={handleClick}>
            Test Button
          </Button>
        </ThemeProvider>
      );
    };
    
    render(<TestComponent />);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(buttonRef).not.toBeNull();
  });

  it('should allow focus through ref', () => {
    let buttonRef: HTMLButtonElement | null = null;
    
    const TestComponent = () => {
      const ref = useRef<HTMLButtonElement>(null);
      
      useEffect(() => {
        buttonRef = ref.current;
        // Focus the button through ref
        if (ref.current) {
          ref.current.focus();
        }
      }, []);
      
      return (
        <ThemeProvider theme={defaultTheme}>
          <Button ref={ref}>Test Button</Button>
        </ThemeProvider>
      );
    };
    
    const { container } = render(<TestComponent />);
    const button = container.querySelector('button');
    
    expect(button).toBeInTheDocument();
    expect(document.activeElement).toBe(button);
  });

  it('should work with Text component using custom tag', () => {
    let spanRef: any = null;
    
    const TestComponent = () => {
      const ref = useRef<any>(null);
      
      useEffect(() => {
        spanRef = ref.current;
      }, []);
      
      return (
        <ThemeProvider theme={defaultTheme}>
          <Text ref={ref} tag="span">Test Text as Span</Text>
        </ThemeProvider>
      );
    };
    
    const { container } = render(<TestComponent />);
    const span = container.querySelector('span');
    
    expect(span).toBeInTheDocument();
    expect(spanRef).toBe(span);
  });
});