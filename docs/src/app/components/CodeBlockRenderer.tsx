"use client";

import React, { useEffect, useState } from 'react';
import { highlight } from './client-syntax-highlighter';
import { Row, Col } from '@vaneui/ui';

interface CodeBlockRendererProps {
  code: string;
  language: string;
}

export function CodeBlockRenderer({ code, language }: CodeBlockRendererProps) {
  const [highlightedCode, setHighlightedCode] = useState<string>('');
  const [highlightedLineNumbers, setHighlightedLineNumbers] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Perform syntax highlighting on the client side
    const highlighted = highlight(code, language);
    setHighlightedCode(highlighted);

    // Split the code to count lines for rendering
    const codeLines = code.split('\n');

    // Generate line numbers
    const lineNumbers = codeLines.map((_, i) => i + 1).join('\n');
    const highlightedLines = highlight(lineNumbers, language);
    setHighlightedLineNumbers(highlightedLines);
  }, [code, language]);

  return (
    <Row noGap className="overflow-auto">
      {isClient ? (
        <>
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
        </>
      ) : (
        <div>Loading code...</div>
      )}
    </Row>
  );
}
