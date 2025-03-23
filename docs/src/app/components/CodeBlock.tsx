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
    <Card noGap lg className={`w-full ${className}`}>
      <Stack xs row justifyBetween className="border-b">
        <CodeBlockActions code={code} fileName={fileName} />
      </Stack>
      <Stack xs secondary>
        <Card noBorder xs className="overflow-hidden">
          <CodeBlockRenderer code={code} language={language} />
        </Card>
      </Stack>
    </Card>
  );
} 