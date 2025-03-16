"use client";

import React from 'react';
import { Link, Text, Col } from 'vaneui';

// Component groups with their components
const componentGroups = [
  {
    name: 'Basic Components',
    components: [
      { name: 'Button', path: '/components/button' },
      { name: 'Badge', path: '/components/badge' },
      { name: 'Chip', path: '/components/chip' },
      { name: 'Divider', path: '/components/divider' },
    ]
  },
  {
    name: 'Layout Components',
    components: [
      { name: 'Section', path: '/components/section' },
      { name: 'Container', path: '/components/container' },
      { name: 'Row', path: '/components/row' },
      { name: 'Col', path: '/components/col' },
      { name: 'Grid3', path: '/components/grid3' },
      { name: 'Grid4', path: '/components/grid4' },
    ]
  },
  {
    name: 'Typography Components',
    components: [
      { name: 'Text', path: '/components/text' },
      { name: 'Title', path: '/components/title' },
      { name: 'PageTitle', path: '/components/page-title' },
      { name: 'SectionTitle', path: '/components/section-title' },
      { name: 'Link', path: '/components/link' },
      { name: 'List', path: '/components/list' },
      { name: 'ListItem', path: '/components/list-item' },
    ]
  }
];

export function ComponentsNav({ currentPath }: { currentPath?: string }) {
  return (
    <Col className="sticky top-4 p-4 lg:pr-8 bg-gray-50 rounded-md">
      <Text secondary uppercase semibold className="mb-4">
        Components
      </Text>
      
      {componentGroups.map((group, groupIndex) => (
        <Col key={groupIndex} className="mb-6">
          <Text secondary className="mb-2">
            {group.name}
          </Text>
          
          <Col sm>
            {group.components.map((component, componentIndex) => {
              const isActive = currentPath === component.path;
              
              return (
                <Link 
                  key={componentIndex} 
                  href={component.path}
                  className={isActive ? 'font-medium text-blue-600' : ''}
                >
                  {component.name}
                </Link>
              );
            })}
          </Col>
        </Col>
      ))}
    </Col>
  );
} 