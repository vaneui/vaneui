import Prism from 'prismjs';

// Import light theme CSS
import 'prismjs/themes/prism.css';

// Import additional languages
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';

export function highlightCode() {
  if (typeof window !== 'undefined') {
    Prism.highlightAll();
  }
} 