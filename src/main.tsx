import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'lenis/dist/lenis.css';
import './styles/tokens.css';
import './styles/global.css';
import './styles/components.css';
import './styles/sections.css';
import './styles/animations.css';
import App from './App';
import { startSmoothScroll } from './lib/lenis';

// O navegador não deve restaurar a rolagem antes da intro/Lenis.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

// Iniciado antes da renderização para que a intro possa pausar a rolagem.
startSmoothScroll();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
