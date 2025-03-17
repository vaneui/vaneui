import React from 'react';
import { Badge, Row } from 'vaneui';
import { ComponentDocs } from '../ComponentDocs';
import { ComponentLayout } from '../ComponentLayout';
import { createDefaultPropCategories } from '../../utils/propUtils';

export default function BadgePage() {
  // Generate prop categories using our utility function
  const propCategories = createDefaultPropCategories({
    includeCommon: true,
    includeSize: true,
    includeAppearance: true,
    includeTypography: false,
    extraCategories: [
      {
        title: 'Typography Props',
        props: [
          {
            name: 'fontWeight',
            type: 'boolean',
            defaultValue: 'semibold',
            description: 'The font weight of the text. Default is semibold.',
          },
          {
            name: 'fontFamily',
            type: 'boolean',
            defaultValue: 'mono',
            description: 'The font family of the text. Default is monospace.',
          },
          {
            name: 'textTransform',
            type: 'boolean',
            defaultValue: 'uppercase',
            description: 'The text transform. Default is uppercase.',
          },
        ],
      },
    ],
  });

  const examples = [
    {
      title: 'Basic Badge',
      description: 'Default badge with default styling.',
      code: `<Badge>Default</Badge>`,
      component: <Badge>Default</Badge>,
    },
    {
      title: 'Badge Sizes',
      description: 'Badges come in different sizes.',
      code: `
<Row>
  <Badge xs>XS</Badge>
  <Badge sm>SM</Badge>
  <Badge>MD</Badge>
  <Badge lg>LG</Badge>
  <Badge xl>XL</Badge>
</Row>`,
      component: (
        <Row>
          <Badge xs>XS</Badge>
          <Badge sm>SM</Badge>
          <Badge>MD</Badge>
          <Badge lg>LG</Badge>
          <Badge xl>XL</Badge>
        </Row>
      ),
    },
    {
      title: 'Badge Appearances',
      description: 'Badges come in different appearances to convey purpose.',
      code: `
<Row>
  <Badge>Default</Badge>
  <Badge primary>Primary</Badge>
  <Badge secondary>Secondary</Badge>
  <Badge accent>Accent</Badge>
  <Badge success>Success</Badge>
  <Badge danger>Danger</Badge>
  <Badge warning>Warning</Badge>
  <Badge info>Info</Badge>
</Row>`,
      component: (
        <Row>
          <Badge>Default</Badge>
          <Badge primary>Primary</Badge>
          <Badge secondary>Secondary</Badge>
          <Badge accent>Accent</Badge>
          <Badge success>Success</Badge>
          <Badge danger>Danger</Badge>
          <Badge warning>Warning</Badge>
          <Badge info>Info</Badge>
        </Row>
      ),
    },
  ];

  return (
    <ComponentLayout>
      <ComponentDocs
        componentName="Badge"
        description="Badges are small elements that can be used to represent a status, category, or tag."
        component={Badge}
        propCategories={propCategories}
        examples={examples}
        importStatement="import { Badge } from 'vaneui';"
      />
    </ComponentLayout>
  );
} 