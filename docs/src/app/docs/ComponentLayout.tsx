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
      <Row relative className="h-full">
        <ComponentsNav currentPath={pathname} />
        <Container className="pt-[calc(36px+(var(--spacing)*6))]">
          <Col className="py-10">
            {children}
          </Col>
        </Container>
      </Row>
    </Col >
  );
} 