import React from 'react';
import { PageTitle, Text, Col, Row, Link } from 'vaneui';
import { ComponentLayout } from './ComponentLayout';

// Component groups with their components
const componentGroups = [
  {
    name: 'Basic Components',
    description: 'Essential components for building user interfaces',
    components: [
      { name: 'Button', path: '/components/button', description: 'Interactive element for user actions' },
      { name: 'Badge', path: '/components/badge', description: 'Small status indicators' },
      { name: 'Chip', path: '/components/chip', description: 'Compact elements for attributes or actions' },
      { name: 'Divider', path: '/components/divider', description: 'Horizontal or vertical separators' },
    ]
  },
  {
    name: 'Layout Components',
    description: 'Components for structuring page layouts',
    components: [
      { name: 'Section', path: '/components/section', description: 'Section container with customizable tag' },
      { name: 'Container', path: '/components/container', description: 'Centered content container with max-width' },
      { name: 'Row', path: '/components/row', description: 'Horizontal flex container' },
      { name: 'Col', path: '/components/col', description: 'Vertical flex container' },
      { name: 'Grid3', path: '/components/grid3', description: '3-column responsive grid' },
      { name: 'Grid4', path: '/components/grid4', description: '4-column responsive grid' },
    ]
  },
  {
    name: 'Typography Components',
    description: 'Components for text and typography',
    components: [
      { name: 'Text', path: '/components/text', description: 'Basic text component with styling options' },
      { name: 'Title', path: '/components/title', description: 'Title text component' },
      { name: 'PageTitle', path: '/components/page-title', description: 'Page-level heading component' },
      { name: 'SectionTitle', path: '/components/section-title', description: 'Section-level heading component' },
      { name: 'Link', path: '/components/link', description: 'Interactive link component' },
      { name: 'List', path: '/components/list', description: 'Ordered or unordered list component' },
      { name: 'ListItem', path: '/components/list-item', description: 'List item component' },
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