"use client";

import React from 'react';
import { Link, Text, Col } from 'vaneui';

// Component groups with their components
const componentGroups = [
  {
    name: 'Getting Started',
    components: [
      { name: 'Installation', path: '/components/installation' },
    ]
  },
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
    name: 'Typography',
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
    <Col lg className="py-6 px-8 lg:pr-10 sticky top-[calc(36px+(var(--spacing)*6))] w-fit overflow-y-auto max-h-[calc(100dvh-36px-(var(--spacing)*6))] bg-gray-50 border-r">
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