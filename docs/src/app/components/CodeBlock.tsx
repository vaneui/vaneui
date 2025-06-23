'use server'

import React from 'react';
import { Card, Stack } from '@vaneui/ui';
import { CodeBlockRenderer } from './CodeBlockRenderer';
import { CodeBlockActions } from './CodeBlockActions';

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
  fileName: string;
}

export async function CodeBlock({ code, language, className = '', fileName = '' }: CodeBlockProps) {
  return (
    <Card noGap noPadding className={`w-full ${className}`}>
      <Stack xs row justifyBetween>
        <CodeBlockActions code={code} fileName={fileName} />
      </Stack>
      <Stack xs noPadding className="overflow-x-auto">
        <Card noPadding noBorder sharp>
          <CodeBlockRenderer code={code} language={language} />
        </Card>
      </Stack>
    </Card>
  );
} 
