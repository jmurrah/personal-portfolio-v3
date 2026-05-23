import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './palette.css';
import App from './App';

const bootstrap = () => {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.add('app-loading');
  document.body.classList.add('scrollbar');

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Root element #root not found.');
    return;
  }

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );

  document.documentElement.classList.remove('app-loading');
};

bootstrap();
