import React from 'react';
import { Button, Row } from 'vaneui';
import { ComponentDocs } from '../ComponentDocs';
import { ComponentLayout } from '../ComponentLayout';
import { createDefaultPropCategories } from '../../utils/propUtils';

export default function ButtonPage() {
  // Generate prop categories using our utility function
  const propCategories = createDefaultPropCategories({
    includeCommon: true,
    includeSize: true,
    includeAppearance: true,
    includeTypography: true,
  });

  const examples = [
    {
      title: 'Basic Usage',
      description: 'Default button styles and variants.',
      code: `<Row>
  <Button>Default Button</Button>
  <Button primary>Primary Button</Button>
  <Button danger>Danger Button</Button>
</Row>`,
      component: (
        <Row>
          <Button>Default Button</Button>
          <Button primary>Primary Button</Button>
          <Button danger>Danger Button</Button>
        </Row>
      ),
    },
    {
      title: 'Sizes',
      description: 'Buttons come in different sizes.',
      code: `<Row itemsCenter>
  <Button xs>Extra Small</Button>
  <Button sm>Small</Button>
  <Button md>Medium</Button>
  <Button lg>Large</Button>
  <Button xl>Extra Large</Button>
</Row>`,
      component: (
        <Row itemsCenter>
          <Button xs>Extra Small</Button>
          <Button sm>Small</Button>
          <Button md>Medium</Button>
          <Button lg>Large</Button>
          <Button xl>Extra Large</Button>
        </Row>
      ),
    },
    {
      title: 'Font Weights',
      description: 'Buttons support different font weights.',
      code: `<Row className="flex-wrap">
  <Button md thin>Thin</Button>
  <Button md light>Light</Button>
  <Button md normal>Normal</Button>
  <Button md medium>Medium</Button>
  <Button md semibold>Semibold</Button>
  <Button md bold>Bold</Button>
  <Button md extrabold>Extra Bold</Button>
  <Button md black>Black</Button>
</Row>`,
      component: (
        <Row className="flex-wrap">
          <Button md thin>Thin</Button>
          <Button md light>Light</Button>
          <Button md normal>Normal</Button>
          <Button md medium>Medium</Button>
          <Button md semibold>Semibold</Button>
          <Button md bold>Bold</Button>
          <Button md extrabold>Extra Bold</Button>
          <Button md black>Black</Button>
        </Row>
      ),
    },
  ];

  return (
    <ComponentLayout>
      <ComponentDocs
        componentName="Button"
        description="Interactive elements for user actions with various sizes and styles."
        component={Button}
        propCategories={propCategories}
        examples={examples}
        importStatement="import { Button } from 'vaneui';"
      />
    </ComponentLayout>
  );
} 