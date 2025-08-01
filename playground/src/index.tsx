import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import VaneUI CSS
import '../../dist/vars.css';
import '../../dist/ui.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);