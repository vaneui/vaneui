import React, { useState } from 'react';
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
  Divider,
  Text,
  Title,
  SectionTitle,
  PageTitle,
  Checkbox,
  Label
} from '../../src';

function Demo() {
  const [formData, setFormData] = useState({
    newsletter: false,
    notifications: true,
    marketing: false,
    privacy: false,
    terms: false,
    darkMode: false,
    autoSave: true,
    rememberMe: false
  });

  const handleCheckboxChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [name]: event.target.checked
    }));
  };

  return (
    <Container>
      <PageTitle>VaneUI Form Components Showcase</PageTitle>
      <Text>Explore the new Checkbox and Label components with interactive examples</Text>

      <Stack xl>
        {/* Basic Checkbox & Label Examples */}
        <Section>
          <SectionTitle>Basic Checkbox Components</SectionTitle>

        </Section>
      </Stack>
    </Container>
  );
}

export default Demo;