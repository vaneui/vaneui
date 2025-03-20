import React from 'react';
import { Col } from 'vaneui';
import { CodeBlockRenderer } from './CodeBlockRenderer';
import { CodeBlockActions } from './CodeBlockActions';

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
  fileName?: string;
}

export function CodeBlock({ code, language, className = '', fileName = '' }: CodeBlockProps) {
  return (
    <Col primary noGap className={`border rounded-lg overflow-hidden w-full ${className}`}>
      {/* Header with filename and copy button - Client Component */}
      <CodeBlockActions code={code} fileName={fileName} />

      {/* Syntax highlighted code - Server Component */}
      <Col secondary className="rounded-md overflow-hidden m-1">
        <CodeBlockRenderer code={code} language={language} />
      </Col>
    </Col>
  );
} 