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
    <Card noGap noPadding lg className={`w-full ${className}`}>
      <Stack xs row justifyBetween className="border-b">
        <CodeBlockActions code={code} fileName={fileName} />
      </Stack>
      <Stack xs noPadding className="overflow-x-auto">
        <Card noPadding noBorder xs>
          <CodeBlockRenderer code={code} language={language} />
        </Card>
      </Stack>
    </Card>
  );
} 
