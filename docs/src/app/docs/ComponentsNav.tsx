"use client";

import React from 'react';
import { Link, Text, Col, Row } from 'vaneui';
import { BeakerIcon } from '@heroicons/react/24/solid'

// Component groups with their components
const componentGroups = [
  {
    name: 'Getting Started',
    icon: <BeakerIcon className="w-5 h-5 text-secondary" />,
    components: [
      { name: 'Installation', path: '/docs/installation' },
    ]
  },
  {
    name: 'Basic Components',
    icon: <BeakerIcon className="w-5 h-5 text-secondary" />,
    components: [
      { name: 'Button', path: '/docs/button' },
      { name: 'Badge', path: '/docs/badge' },
      { name: 'Chip', path: '/docs/chip' },
      { name: 'Divider', path: '/docs/divider' },
    ]
  },
  {
    name: 'Layout Components',
    icon: <BeakerIcon className="w-5 h-5 text-secondary" />,
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
    icon: <BeakerIcon className="w-5 h-5 text-secondary" />,
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
    <Col xl sticky className="styled-scrollbar min-w-3xs bg-white py-6 px-8 lg:pr-10 top-[calc(36px+(var(--spacing)*6))] w-fit overflow-y-auto max-h-[calc(100dvh-36px-(var(--spacing)*6))] border-r">
      <Text lg secondary>
        Components
      </Text>
      {componentGroups.map((group, groupIndex) => (
        <Col key={groupIndex}>
          <Row sm itemsCenter>
            {group.icon}
            <Text uppercase sm mono secondary className="tracking-widest">
              {group.name}
            </Text>
          </Row>
          <Col noGap className="pl-[10px]">
            {group.components.map((item, i) => {
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={i}
                  href={item.path}
                  semibold={isActive}
                  secondary
                  className={`${isActive ? 'border-gray-600 text-gray-900' : 'hover:border-gray-400'} border-l pl-4 py-1 hover:no-underline hover:text-gray-900 hover:bg-gray-50`}
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