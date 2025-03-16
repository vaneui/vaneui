"use client";

import React from 'react';
import { Container, Row, Col } from 'vaneui';
import { ComponentsNav } from './ComponentsNav';
import { Header } from './Header';
import { usePathname } from 'next/navigation';

interface ComponentLayoutProps {
  children: React.ReactNode;
}

export function ComponentLayout({ children }: ComponentLayoutProps) {
  const pathname = usePathname();

  return (
    <Col noGap className="min-h-screen">
      <Header />
      <Row>
        <Col className="w-full lg:w-fit">
          <ComponentsNav currentPath={pathname} />
        </Col>
        <Container className="py-8">
          <Col className="w-full">
            {children}
          </Col>
        </Container>
      </Row>
    </Col >
  );
} 