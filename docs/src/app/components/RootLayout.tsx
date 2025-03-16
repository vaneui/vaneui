"use client";

import React from 'react';
import { Col, Container, Section } from 'vaneui';
import { Header } from './Header';
import { Footer } from './Footer';

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <Col noGap className="min-h-screen">
      <Header />
      
      <Section tag="main" className="flex-grow">
        <Container xl className="py-8">
          {children}
        </Container>
      </Section>
      
      <Footer />
    </Col>
  );
} 