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

  // Add border radius props
  propCategories.push({
    title: 'Border Radius',
    props: [
      { name: 'xs, sm, md, lg, xl', description: 'Size-based rounded corners (md is default)', type: 'boolean' },
      { name: 'pill', description: 'Pill-shaped button with fully rounded corners', type: 'boolean' },
      { name: 'sharp', description: 'Button with no rounded corners', type: 'boolean' },
    ],
  });

  // Add button style props
  propCategories.push({
    title: 'Button Style',
    props: [
      { name: 'outline', description: 'Outline style with transparent background (default)', type: 'boolean' },
      { name: 'filled', description: 'Filled style with colored background', type: 'boolean' },
    ],
  });

  const examples = [
    {
      title: 'Basic Usage',
      description: 'Default button styles and variants.',
      code: `<Row flexWrap>
  <Button>Default Button</Button>
  <Button primary>Primary Button</Button>
  <Button danger>Danger Button</Button>
  <Button warning>Warning Button</Button>
  <Button success>Success Button</Button>
  <Button info>Info Button</Button>
  <Button link>Link Button</Button>          
</Row>`,
      component: (
        <Row flexWrap>
          <Button>Default Button</Button>
          <Button primary>Primary Button</Button>
          <Button danger>Danger Button</Button>
          <Button warning>Warning Button</Button>
          <Button success>Success Button</Button>
          <Button info>Info Button</Button>
          <Button link>Link Button</Button>          
        </Row>
      ),
    },
    {
      title: 'Sizes',
      description: 'Buttons come in different sizes.',
      code: `<Row>
  <Button xs>Extra Small</Button>
  <Button sm>Small</Button>
  <Button md>Medium</Button>
  <Button lg>Large</Button>
  <Button xl>Extra Large</Button>
</Row>`,
      component: (
        <Row>
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
    {
      title: 'Border Radius Options',
      description: 'Button supports three border radius styles: rounded (default), pill, and sharp.',
      code: `<Row>
  <Button>Default Rounded</Button>
  <Button pill>Pill Shaped</Button>
  <Button sharp>Sharp Corners</Button>
</Row>`,
      component: (
        <Row>
          <Button>Default Rounded</Button>
          <Button pill>Pill Shaped</Button>
          <Button sharp>Sharp Corners</Button>
        </Row>
      ),
    },
    {
      title: 'Button Styles',
      description: 'Buttons can be styled as outline (default) or filled.',
      code: `<Row flexWrap>
  <Button outline>Outline Default</Button>
  <Button outline primary>Outline Primary</Button>
  <Button outline danger>Outline Danger</Button>
  <Button outline success>Outline Success</Button>
</Row>
<Row flexWrap className="mt-4">
  <Button filled>Filled Default</Button>
  <Button filled primary>Filled Primary</Button>
  <Button filled danger>Filled Danger</Button>
  <Button filled success>Filled Success</Button>
</Row>`,
      component: (
        <>
          <Row flexWrap>
            <Button outline>Outline Default</Button>
            <Button outline primary>Outline Primary</Button>
            <Button outline danger>Outline Danger</Button>
            <Button outline success>Outline Success</Button>
          </Row>
          <Row flexWrap className="mt-4">
            <Button filled>Filled Default</Button>
            <Button filled primary>Filled Primary</Button>
            <Button filled danger>Filled Danger</Button>
            <Button filled success>Filled Success</Button>
          </Row>
        </>
      ),
    },
  ];

  return (
    <ComponentLayout>
      <ComponentDocs
        componentName="Button"
        description="Interactive elements for user actions with various sizes and styles."
        propCategories={propCategories}
        examples={examples}
        importStatement="import { Button } from 'vaneui';"
      />
    </ComponentLayout>
  );
} 
