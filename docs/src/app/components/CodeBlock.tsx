"use client";

import React, { useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import { Button, Row, Col, Text } from 'vaneui';
import { Square2StackIcon, CheckIcon } from "@heroicons/react/24/outline";

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
  fileName?: string;
}

export function CodeBlock({ code, language, className = '', fileName = '' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // First perform syntax highlighting on the original code
  const highlightedCode = Prism.highlight(
    code,
    Prism.languages[language] || Prism.languages.typescript,
    language
  );

  // Split the code to count lines for rendering
  const codeLines = code.split('\n');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Col noGap className="rounded-md overflow-hidden border border-gray-200">
      {/* Header with filename and copy button */}
      <Row justifyBetween itemsCenter className="px-4 py-2 bg-gray-50 border-b border-gray-200">
        {fileName && <Text sm semibold className="text-gray-600">{fileName}</Text>}
        <div className={fileName ? '' : 'ml-auto'}>
          <Button sm onClick={copyToClipboard} default={!copied} success={copied}>
            {copied ? <CheckIcon className="w-5 h-5" /> : <Square2StackIcon className="w-5 h-5" />}
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </Row>

      {/* Code block with line numbers */}
      <Row noGap className="overflow-auto">
        {/* Line numbers column */}
        <Col>
          <pre className="m-0 p-4 overflow-visible">
            <code
              className={`language-${language} font-mono text-sm ${className}`}
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(
                  codeLines.map((_, i) => i + 1).join('\n'),
                  Prism.languages[language] || Prism.languages.typescript,
                  language
                )
              }}
            />
          </pre>
        </Col>
        {/* Code with syntax highlighting */}
        <Col className="flex-1">
          <pre className="m-0 p-4 overflow-visible">
            <code
              className={`language-${language} font-mono text-sm ${className}`}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </pre>
        </Col>
      </Row>
    </Col>
  );
} 