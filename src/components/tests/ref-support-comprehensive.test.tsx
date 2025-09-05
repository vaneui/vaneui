import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { useRef, useEffect } from 'react';
import {
  // Basic UI Components
  Button,
  Badge,
  Chip,
  Code,
  Divider,
  Label,
  Img,
  Checkbox,
  
  // Typography Components
  List,
  ListItem,
  
  // Layout Components
  Container,
  Row,
  Col,
  Stack,
  Section,
  Grid2,
  Grid3,
  Grid4,
  Card,
  
  // Theme
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Comprehensive Ref Support Tests', () => {
  
  describe('Basic UI Components', () => {
    it('Badge should forward ref', () => {
      let badgeRef: HTMLSpanElement | null = null;
      
      const TestComponent = () => {
        const ref = useRef<HTMLSpanElement>(null);
        
        useEffect(() => {
          badgeRef = ref.current;
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Badge ref={ref}>Badge Content</Badge>
          </ThemeProvider>
        );
      };
      
      const { container } = render(<TestComponent />);
      const badge = container.querySelector('span');
      
      expect(badge).toBeInTheDocument();
      expect(badgeRef).toBe(badge);
    });

    it('Chip should forward ref', () => {
      let chipRef: HTMLSpanElement | null = null;
      
      const TestComponent = () => {
        const ref = useRef<HTMLSpanElement>(null);
        
        useEffect(() => {
          chipRef = ref.current;
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Chip ref={ref}>Chip Content</Chip>
          </ThemeProvider>
        );
      };
      
      const { container } = render(<TestComponent />);
      const chip = container.querySelector('span');
      
      expect(chip).toBeInTheDocument();
      expect(chipRef).toBe(chip);
    });

    it('Code should forward ref', () => {
      let codeRef: HTMLElement | null = null;
      
      const TestComponent = () => {
        const ref = useRef<HTMLElement>(null);
        
        useEffect(() => {
          codeRef = ref.current;
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Code ref={ref}>const code = true;</Code>
          </ThemeProvider>
        );
      };
      
      const { container } = render(<TestComponent />);
      const code = container.querySelector('code');
      
      expect(code).toBeInTheDocument();
      expect(codeRef).toBe(code);
    });

    it('Divider should forward ref', () => {
      let dividerRef: HTMLDivElement | null = null;
      
      const TestComponent = () => {
        const ref = useRef<HTMLDivElement>(null);
        
        useEffect(() => {
          dividerRef = ref.current;
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Divider ref={ref} />
          </ThemeProvider>
        );
      };
      
      const { container } = render(<TestComponent />);
      const divider = container.querySelector('div');
      
      expect(divider).toBeInTheDocument();
      expect(dividerRef).toBe(divider);
    });

    it('Label should forward ref', () => {
      let labelRef: HTMLLabelElement | null = null;
      
      const TestComponent = () => {
        const ref = useRef<HTMLLabelElement>(null);
        
        useEffect(() => {
          labelRef = ref.current;
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Label ref={ref}>Label Text</Label>
          </ThemeProvider>
        );
      };
      
      const { container } = render(<TestComponent />);
      const label = container.querySelector('label');
      
      expect(label).toBeInTheDocument();
      expect(labelRef).toBe(label);
    });

    it('Img should forward ref', () => {
      let imgRef: HTMLImageElement | null = null;
      
      const TestComponent = () => {
        const ref = useRef<HTMLImageElement>(null);
        
        useEffect(() => {
          imgRef = ref.current;
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Img ref={ref} src="test.jpg" alt="Test" />
          </ThemeProvider>
        );
      };
      
      const { container } = render(<TestComponent />);
      const img = container.querySelector('img');
      
      expect(img).toBeInTheDocument();
      expect(imgRef).toBe(img);
    });

    it('Checkbox should forward ref to wrapper', () => {
      let checkboxRef: HTMLDivElement | null = null;
      
      const TestComponent = () => {
        const ref = useRef<HTMLDivElement>(null);
        
        useEffect(() => {
          checkboxRef = ref.current;
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Checkbox ref={ref} />
          </ThemeProvider>
        );
      };
      
      const { container } = render(<TestComponent />);
      // Checkbox renders a wrapper span with inline-grid class
      const wrapper = container.querySelector('span.inline-grid');
      
      expect(wrapper).toBeInTheDocument();
      expect(checkboxRef).toBe(wrapper);
    });
  });

  describe('Layout Components', () => {
    it('Container should forward ref', () => {
      let containerRef: HTMLDivElement | null = null;
      
      const TestComponent = () => {
        const ref = useRef<HTMLDivElement>(null);
        
        useEffect(() => {
          containerRef = ref.current;
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Container ref={ref}>Container Content</Container>
          </ThemeProvider>
        );
      };
      
      const { container } = render(<TestComponent />);
      const div = container.querySelector('div');
      
      expect(div).toBeInTheDocument();
      expect(containerRef).toBe(div);
    });

    it('Row should forward ref', () => {
      let rowRef: HTMLDivElement | null = null;
      
      const TestComponent = () => {
        const ref = useRef<HTMLDivElement>(null);
        
        useEffect(() => {
          rowRef = ref.current;
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Row ref={ref}>Row Content</Row>
          </ThemeProvider>
        );
      };
      
      const { container } = render(<TestComponent />);
      const row = container.querySelector('div');
      
      expect(row).toBeInTheDocument();
      expect(rowRef).toBe(row);
    });

    it('Col should forward ref', () => {
      let colRef: HTMLDivElement | null = null;
      
      const TestComponent = () => {
        const ref = useRef<HTMLDivElement>(null);
        
        useEffect(() => {
          colRef = ref.current;
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Col ref={ref}>Col Content</Col>
          </ThemeProvider>
        );
      };
      
      const { container } = render(<TestComponent />);
      const col = container.querySelector('div');
      
      expect(col).toBeInTheDocument();
      expect(colRef).toBe(col);
    });

    it('Stack should forward ref', () => {
      let stackRef: HTMLDivElement | null = null;
      
      const TestComponent = () => {
        const ref = useRef<HTMLDivElement>(null);
        
        useEffect(() => {
          stackRef = ref.current;
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Stack ref={ref}>Stack Content</Stack>
          </ThemeProvider>
        );
      };
      
      const { container } = render(<TestComponent />);
      const stack = container.querySelector('div');
      
      expect(stack).toBeInTheDocument();
      expect(stackRef).toBe(stack);
    });

    it('Section should forward ref', () => {
      let sectionRef: HTMLDivElement | null = null;
      
      const TestComponent = () => {
        const ref = useRef<HTMLDivElement>(null);
        
        useEffect(() => {
          sectionRef = ref.current;
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Section ref={ref}>Section Content</Section>
          </ThemeProvider>
        );
      };
      
      const { container } = render(<TestComponent />);
      const section = container.querySelector('div');
      
      expect(section).toBeInTheDocument();
      expect(sectionRef).toBe(section);
    });

    it('Grid2 should forward ref', () => {
      let gridRef: HTMLDivElement | null = null;
      
      const TestComponent = () => {
        const ref = useRef<HTMLDivElement>(null);
        
        useEffect(() => {
          gridRef = ref.current;
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Grid2 ref={ref}>Grid2 Content</Grid2>
          </ThemeProvider>
        );
      };
      
      const { container } = render(<TestComponent />);
      const grid = container.querySelector('div');
      
      expect(grid).toBeInTheDocument();
      expect(gridRef).toBe(grid);
    });

    it('Grid3 should forward ref', () => {
      let gridRef: HTMLDivElement | null = null;
      
      const TestComponent = () => {
        const ref = useRef<HTMLDivElement>(null);
        
        useEffect(() => {
          gridRef = ref.current;
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Grid3 ref={ref}>Grid3 Content</Grid3>
          </ThemeProvider>
        );
      };
      
      const { container } = render(<TestComponent />);
      const grid = container.querySelector('div');
      
      expect(grid).toBeInTheDocument();
      expect(gridRef).toBe(grid);
    });

    it('Grid4 should forward ref', () => {
      let gridRef: HTMLDivElement | null = null;
      
      const TestComponent = () => {
        const ref = useRef<HTMLDivElement>(null);
        
        useEffect(() => {
          gridRef = ref.current;
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Grid4 ref={ref}>Grid4 Content</Grid4>
          </ThemeProvider>
        );
      };
      
      const { container } = render(<TestComponent />);
      const grid = container.querySelector('div');
      
      expect(grid).toBeInTheDocument();
      expect(gridRef).toBe(grid);
    });
  });

  describe('Typography Components', () => {
    it('List should forward ref', () => {
      let listRef: HTMLUListElement | null = null;
      
      const TestComponent = () => {
        const ref = useRef<HTMLUListElement>(null);
        
        useEffect(() => {
          listRef = ref.current;
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <List ref={ref}>
              <ListItem>Item 1</ListItem>
            </List>
          </ThemeProvider>
        );
      };
      
      const { container } = render(<TestComponent />);
      const list = container.querySelector('ul');
      
      expect(list).toBeInTheDocument();
      expect(listRef).toBe(list);
    });

    it('ListItem should forward ref', () => {
      let itemRef: HTMLLIElement | null = null;
      
      const TestComponent = () => {
        const ref = useRef<HTMLLIElement>(null);
        
        useEffect(() => {
          itemRef = ref.current;
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <ListItem ref={ref}>List Item</ListItem>
          </ThemeProvider>
        );
      };
      
      const { container } = render(<TestComponent />);
      const item = container.querySelector('li');
      
      expect(item).toBeInTheDocument();
      expect(itemRef).toBe(item);
    });
  });

  describe('Ref Functionality', () => {
    it('should allow focus on Label through ref', () => {
      const TestComponent = () => {
        const ref = useRef<HTMLLabelElement>(null);
        
        useEffect(() => {
          // Focus the label through ref
          if (ref.current) {
            ref.current.focus();
          }
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Label ref={ref} tabIndex={0}>Focusable Label</Label>
          </ThemeProvider>
        );
      };
      
      const { container } = render(<TestComponent />);
      const label = container.querySelector('label');
      
      expect(label).toBeInTheDocument();
      expect(document.activeElement).toBe(label);
    });

    it('should allow DOM manipulation through Badge ref', () => {
      let badgeRef: HTMLSpanElement | null = null;
      const testId = 'test-badge-id';
      
      const TestComponent = () => {
        const ref = useRef<HTMLSpanElement>(null);
        
        useEffect(() => {
          badgeRef = ref.current;
          // Add data attribute through ref
          if (ref.current) {
            ref.current.setAttribute('data-testid', testId);
          }
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Badge ref={ref}>Test Badge</Badge>
          </ThemeProvider>
        );
      };
      
      render(<TestComponent />);
      
      expect(badgeRef).not.toBeNull();
      expect(badgeRef!.getAttribute('data-testid')).toBe(testId);
    });

    it('should allow measuring dimensions through Container ref', () => {
      let width = 0;
      let height = 0;
      
      const TestComponent = () => {
        const ref = useRef<HTMLDivElement>(null);
        
        useEffect(() => {
          if (ref.current) {
            // Mock getBoundingClientRect for testing
            Object.defineProperty(ref.current, 'getBoundingClientRect', {
              value: () => ({
                width: 100,
                height: 50,
                top: 0,
                left: 0,
                bottom: 50,
                right: 100,
              }),
              configurable: true
            });
            
            const rect = ref.current.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
          }
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Container ref={ref}>Measurable Container</Container>
          </ThemeProvider>
        );
      };
      
      render(<TestComponent />);
      
      expect(width).toBe(100);
      expect(height).toBe(50);
    });

    it('should handle click events through Chip ref', () => {
      const handleClick = jest.fn();
      
      const TestComponent = () => {
        const ref = useRef<HTMLSpanElement>(null);
        
        useEffect(() => {
          // Programmatically click through ref
          if (ref.current) {
            ref.current.click();
          }
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Chip ref={ref} onClick={handleClick}>
              Clickable Chip
            </Chip>
          </ThemeProvider>
        );
      };
      
      render(<TestComponent />);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Complex Scenarios', () => {
    it('should work with multiple refs in nested components', () => {
      let cardRef: HTMLDivElement | null = null;
      let rowRef: HTMLDivElement | null = null;
      let colRef: HTMLDivElement | null = null;
      let buttonRef: HTMLButtonElement | null = null;
      
      const TestComponent = () => {
        const card = useRef<HTMLDivElement>(null);
        const row = useRef<HTMLDivElement>(null);
        const col = useRef<HTMLDivElement>(null);
        const button = useRef<HTMLButtonElement>(null);
        
        useEffect(() => {
          cardRef = card.current;
          rowRef = row.current;
          colRef = col.current;
          buttonRef = button.current;
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Card ref={card}>
              <Row ref={row}>
                <Col ref={col}>
                  <Button ref={button}>Nested Button</Button>
                </Col>
              </Row>
            </Card>
          </ThemeProvider>
        );
      };
      
      render(<TestComponent />);
      
      expect(cardRef).not.toBeNull();
      expect(rowRef).not.toBeNull();
      expect(colRef).not.toBeNull();
      expect(buttonRef).not.toBeNull();
      
      // Verify nesting
      expect(cardRef!.contains(rowRef!)).toBe(true);
      expect(rowRef!.contains(colRef!)).toBe(true);
      expect(colRef!.contains(buttonRef!)).toBe(true);
    });

    it('should maintain refs across re-renders', () => {
      let initialRef: HTMLDivElement | null = null;
      let afterRerenderRef: HTMLDivElement | null = null;
      
      const TestComponent = ({ text }: { text: string }) => {
        const ref = useRef<HTMLDivElement>(null);
        
        useEffect(() => {
          if (text === 'initial') {
            initialRef = ref.current;
          } else {
            afterRerenderRef = ref.current;
          }
        }, [text]);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Section ref={ref}>{text}</Section>
          </ThemeProvider>
        );
      };
      
      const { rerender } = render(<TestComponent text="initial" />);
      rerender(<TestComponent text="updated" />);
      
      expect(initialRef).not.toBeNull();
      expect(afterRerenderRef).not.toBeNull();
      expect(initialRef).toBe(afterRerenderRef); // Same DOM element
    });
  });
});