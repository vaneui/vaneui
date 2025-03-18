import React from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';

// Import server-side only
import './../../styles/code-theme.css';

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
}

export function CodeBlock({ code, language, className = '' }: CodeBlockProps) {
  // Perform server-side highlighting
  const highlightedCode = Prism.highlight(
    code,
    Prism.languages[language] || Prism.languages.typescript,
    language
  );

  return (
    <pre className="border p-5 rounded-md overflow-x-auto">
      <code
        className={`language-${language} font-mono text-sm ${className}`}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </pre>
  );
} 