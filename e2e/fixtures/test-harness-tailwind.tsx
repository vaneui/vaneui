import React from 'react';
import ReactDOM from 'react-dom/client';
import { TestHarness } from './test-fixtures';

// Import Tailwind-consumer CSS (pre-built by @tailwindcss/cli before tests run)
import './tailwind-output.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TestHarness />
  </React.StrictMode>
);
