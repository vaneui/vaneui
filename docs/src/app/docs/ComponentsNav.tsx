"use client";

import React from 'react';
import { Link, Text, Col } from 'vaneui';

// Component groups with their components
const componentGroups = [
  {
    name: 'Getting Started',
    components: [
      { name: 'Installation', path: '/docs/installation' },
    ]
  },
  {
    name: 'Basic Components',
    components: [
      { name: 'Button', path: '/docs/button' },
      { name: 'Badge', path: '/docs/badge' },
      { name: 'Chip', path: '/docs/chip' },
      { name: 'Divider', path: '/docs/divider' },
    ]
  },
  {
    name: 'Layout Components',
    components: [
      { name: 'Section', path: '/docs/section' },
      { name: 'Container', path: '/docs/container' },
      { name: 'Row', path: '/docs/row' },
      { name: 'Col', path: '/docs/col' },
      { name: 'Grid3', path: '/docs/grid3' },
      { name: 'Grid4', path: '/docs/grid4' },
    ]
  },
  {
    name: 'Typography',
    components: [
      { name: 'Text', path: '/docs/text' },
      { name: 'Title', path: '/docs/title' },
      { name: 'PageTitle', path: '/docs/page-title' },
      { name: 'SectionTitle', path: '/docs/section-title' },
      { name: 'Link', path: '/docs/link' },
      { name: 'List', path: '/docs/list' },
      { name: 'ListItem', path: '/docs/list-item' },
    ]
  }
];

export function ComponentsNav({ currentPath }: { currentPath?: string }) {
  return (
    <Col xl className="py-6 px-8 lg:pr-10 sticky top-[calc(36px+(var(--spacing)*6))] w-fit overflow-y-auto max-h-[calc(100dvh-36px-(var(--spacing)*6))] bg-gray-50 border-r">
      <Text lg secondary>
        Components
      </Text>
      {componentGroups.map((group, groupIndex) => (
        <Col key={groupIndex}>
          <Text secondary uppercase sm mono>
            {group.name}
          </Text>
          <Col noGap>
            {group.components.map((item, i) => {
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={i}
                  href={item.path}
                  semibold={isActive}
                  secondary
                  className={`${isActive ? 'border-gray-600 text-gray-900' : 'hover:border-gray-400'} border-l pl-4 py-1 hover:no-underline hover:text-gray-900`}
                >
                  {item.name}
                </Link>
              );
            })}
          </Col>
        </Col>
      ))}
    </Col>
  );
} 