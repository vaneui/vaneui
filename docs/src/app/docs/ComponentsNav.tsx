"use client";

import React from 'react';
import { Link, Text, Col, Row } from '@vaneui/ui';
import { BookOpen, Box, FileText, Layers } from "react-feather";

// Component groups with their components
const componentGroups = [
  {
    name: 'Getting Started',
    icon: BookOpen,
    components: [
      { name: 'Installation', path: '/docs/installation' },
    ]
  },
  {
    name: 'Basic Components',
    icon: Box,
    components: [
      { name: 'Button', path: '/docs/button' },
      { name: 'Badge', path: '/docs/badge' },
      { name: 'Chip', path: '/docs/chip' },
      { name: 'Divider', path: '/docs/divider' },
    ]
  },
  {
    name: 'Layout Components',
    icon: Layers,
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
    icon: FileText,
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
    <Col xl sticky className="styled-scrollbar min-w-xs bg-white py-6 px-8 lg:pr-10 top-[calc(36px+(var(--spacing)*6))] w-fit overflow-y-auto max-h-[calc(100dvh-36px-(var(--spacing)*6))] border-r">
      {componentGroups.map((item, i) => (
        <Col key={i}>
          <Row sm>
            <item.icon className="w-5 h-5 text-secondary" />
            <Text uppercase sm mono secondary semibold className="tracking-wider">
              {item.name}
            </Text>
          </Row>
          <Col noGap className="pl-[calc(var(--spacing)*2.5-1px)]">
            {item.components.map((item, i) => {
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={i}
                  href={item.path}
                  semibold={isActive}
                  secondary
                  className={`w-full ${isActive ? 'border-gray-600 text-gray-900 bg-gray-50' : 'hover:border-gray-400'} border-l-2 pl-4 py-1 hover:no-underline hover:text-gray-900 hover:bg-gray-100`}
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
