"use client";

import React from 'react';
import { Container, Row, Col } from 'vaneui';
import { ComponentsNav } from './ComponentsNav';
import { Header } from '../components/Header';
import { usePathname } from 'next/navigation';

interface ComponentLayoutProps {
  children: React.ReactNode;
}

export function ComponentLayout({ children }: ComponentLayoutProps) {
  const pathname = usePathname();

  return (
    <Col noGap className="min-h-screen">
      <Header />
      <Row relative className="h-full bg-gray-50">
        <ComponentsNav currentPath={pathname} />
        <Container lg className="pt-[calc(36px+(var(--spacing)*6))] border-x px-10 bg-white">
          <Container sm>
            <Col className="py-10">
              {children}
            </Col>
          </Container>
        </Container>
      </Row>
    </Col >
  );
} 