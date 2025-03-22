import React from 'react';
import { Card, Col, Stack } from 'vaneui';
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
      <Stack xs row justifyBetween className="border-b">
        <CodeBlockActions code={code} fileName={fileName} />
      </Stack>
      <Stack xs secondary>
        <Card xs className="overflow-hidden">
          <CodeBlockRenderer code={code} language={language} />
        </Card>
      </Stack>
    </Col>
  );
} 