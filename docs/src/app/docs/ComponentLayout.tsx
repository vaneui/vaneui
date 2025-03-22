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
      <Row secondary itemsStretch relative>
        <ComponentsNav currentPath={pathname} />
        <Container primary lg className="pt-[calc(36px+(var(--spacing)*6))] border-x px-10">
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