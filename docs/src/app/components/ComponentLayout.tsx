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
      
      <Container xl className="py-8">
        <Row>
          {/* Left Navigation Sidebar - 1/4 width on larger screens */}
          <Col className="w-full lg:w-1/4 mb-8 lg:mb-0">
            <ComponentsNav currentPath={pathname} />
          </Col>
          
          {/* Main Content - 3/4 width on larger screens */}
          <Col className="w-full lg:w-3/4">
            {children}
          </Col>
        </Row>
      </Container>
    </Col>
  );
} 