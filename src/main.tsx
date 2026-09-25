import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
});
window.addEventListener('appinstalled', () => {
  document.documentElement.classList.remove('app-installable');
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
