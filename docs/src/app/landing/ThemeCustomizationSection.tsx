import { 
  Section, 
  Container
} from '@vaneui/ui';
import { ThemeCustomizer } from "../components/ThemeCustomizer";

export function ThemeCustomizationSection() {
  return (
    <Section className="py-20">
      <Container md>
        <ThemeCustomizer/>
      </Container>
    </Section>
  );
}