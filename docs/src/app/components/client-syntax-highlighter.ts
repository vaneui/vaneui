"use client";

import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';

// Ensure Prism is loaded in the client environment
let prismLoaded = false;

/**
 * Client-side syntax highlighting function
 */
export function highlight(code: string, language: string): string {
  // Ensure Prism is initialized on the client side
  if (typeof window !== 'undefined' && !prismLoaded) {
    // This is a workaround for Prism in client components
    // as it might not be fully initialized when first imported
    Prism.manual = true;
    prismLoaded = true;
  }

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