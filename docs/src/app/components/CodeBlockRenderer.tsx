'use server';

import React from 'react';
import { Row, Col } from '@vaneui/ui';
import Prism from "prismjs";
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';

interface CodeBlockRendererProps {
  code: string;
  language: string;
}

export async function CodeBlockRenderer({ code, language }: CodeBlockRendererProps) {
  // First perform syntax highlighting on the original code
  const highlightedCode = Prism.highlight(
    code,
    Prism.languages[language] || Prism.languages.typescript,
    language
  );

  // Split the code to count lines for rendering
  const codeLines = code.split('\n');

  // Generate line numbers
  const lineNumbers = codeLines.map((_, i) => i + 1).join('\n');
  const highlightedLineNumbers = Prism.highlight(
    lineNumbers,
    Prism.languages[language] || Prism.languages.typescript,
    language
  );

  return (
    <Row noGap flexNoWrap className="overflow-auto">
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
