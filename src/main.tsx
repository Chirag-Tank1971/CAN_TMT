import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/barlow-condensed/latin-600.css';
import '@fontsource/barlow-condensed/latin-700.css';
import '@fontsource/barlow-condensed/latin-800.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import './index.css';
import App from './App';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

// Dev-only 3D lab at /?test — tree-shaken out of production builds
const TestScene = import.meta.env.DEV && location.search.includes('test') ? lazy(() => import('./three/TestScene')) : null;

createRoot(root).render(
  <StrictMode>
    {TestScene ? <Suspense><TestScene /></Suspense> : <App />}
  </StrictMode>
);
