// Server-side syntax highlighter
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';

/**
 * Server-side syntax highlighting function
 */
export function highlight(code: string, language: string): string {
  try {
    return Prism.highlight(
      code,
      Prism.languages[language] || Prism.languages.typescript,
      language
    );
  } catch (error) {
    console.error('Syntax highlighting error:', error);
    return code; // Fall back to plain text
  }
} 