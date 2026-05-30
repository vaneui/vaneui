import ReactDOM from 'react-dom/client';
import { TestHarness } from './test-fixtures';

// Import VaneUI pre-built CSS
import '../../dist/ui.css';

// No StrictMode: e2e reads computed CSS only — double-rendering halves throughput
// for no test-value gain. Re-add if a future test exercises effect cleanup.
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<TestHarness />);
