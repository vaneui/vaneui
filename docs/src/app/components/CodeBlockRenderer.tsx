'use server';

import React from 'react';
import { highlight } from './syntax-highlighter';
import { Row, Col } from 'vaneui';

interface CodeBlockRendererProps {
  code: string;
  language: string;
}

export async function CodeBlockRenderer({ code, language }: CodeBlockRendererProps) {
  // First perform syntax highlighting on the original code
  const highlightedCode = highlight(code, language);

  // Split the code to count lines for rendering
  const codeLines = code.split('\n');

  // Generate line numbers
  const lineNumbers = codeLines.map((_, i) => i + 1).join('\n');
  const highlightedLineNumbers = highlight(lineNumbers, language);

  return (
    <Row noGap className="overflow-auto">
      {/* Line numbers column */}
      <Col>
        <pre className="m-0 py-4 pl-6 pr-2 overflow-visible">
          <code
            className={`language-${language} font-mono text-sm`}
            dangerouslySetInnerHTML={{
              __html: highlightedLineNumbers
            }}
          />
        </pre>
      </Col>
      {/* Code with syntax highlighting */}
      <Col className="flex-1">
        <pre className="m-0 py-4 pl-2 pr-6 overflow-visible">
          <code
            className={`language-${language} font-mono text-sm`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </Col>
    </Row>
  );
} 