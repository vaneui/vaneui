import React from 'react';
import { PageTitle, Text, Col, Row, Link } from 'vaneui';
import { ComponentLayout } from './../docs/ComponentLayout';

// Component groups with their components
const componentGroups = [
  {
    name: 'Basic Components',
    description: 'Essential components for building user interfaces',
    components: [
      { name: 'Button', path: '/docs/button', description: 'Interactive element for user actions' },
      { name: 'Badge', path: '/docs/badge', description: 'Small status indicators' },
      { name: 'Chip', path: '/docs/chip', description: 'Compact elements for attributes or actions' },
      { name: 'Divider', path: '/docs/divider', description: 'Horizontal or vertical separators' },
    ]
  },
  {
    name: 'Layout Components',
    description: 'Components for structuring page layouts',
    components: [
      { name: 'Section', path: '/docs/section', description: 'Section container with customizable tag' },
      { name: 'Container', path: '/docs/container', description: 'Centered content container with max-width' },
      { name: 'Row', path: '/docs/row', description: 'Horizontal flex container' },
      { name: 'Col', path: '/docs/col', description: 'Vertical flex container' },
      { name: 'Grid3', path: '/docs/grid3', description: '3-column responsive grid' },
      { name: 'Grid4', path: '/docs/grid4', description: '4-column responsive grid' },
    ]
  },
  {
    name: 'Typography Components',
    description: 'Components for text and typography',
    components: [
      { name: 'Text', path: '/docs/text', description: 'Basic text component with styling options' },
      { name: 'Title', path: '/docs/title', description: 'Title text component' },
      { name: 'PageTitle', path: '/docs/page-title', description: 'Page-level heading component' },
      { name: 'SectionTitle', path: '/docs/section-title', description: 'Section-level heading component' },
      { name: 'Link', path: '/docs/link', description: 'Interactive link component' },
      { name: 'List', path: '/docs/list', description: 'Ordered or unordered list component' },
      { name: 'ListItem', path: '/docs/list-item', description: 'List item component' },
    ]
  }
];

export default function ComponentsPage() {
  return (
    <ComponentLayout>
      <Col>
        <PageTitle>Components</PageTitle>
        <Text lg>
          VaneUI provides a collection of reusable components that can be used to build modern and responsive web applications.
        </Text>

        {componentGroups.map((group, groupIndex) => (
          <Col key={groupIndex} className="mt-12">
            <Text lg semibold>{group.name}</Text>
            <Text secondary className="mb-4">{group.description}</Text>
            
            <Row className="flex-wrap">
              {group.components.map((component, componentIndex) => (
                <Col key={componentIndex} className="w-full md:w-1/2 lg:w-1/3 p-2">
                  <div className="h-full p-4 border rounded-md bg-white hover:shadow-md transition-shadow">
                    <Link href={component.path} className="no-underline">
                      <Text semibold>{component.name}</Text>
                      <Text sm>{component.description}</Text>
                    </Link>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        ))}
      </Col>
    </ComponentLayout>
  );
} 