import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
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
