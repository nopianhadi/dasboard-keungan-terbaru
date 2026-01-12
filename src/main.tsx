// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { Suspense } from 'react';
import { CustomizerContextProvider } from './context/CustomizerContext';
import ReactDOM from 'react-dom/client';
import App from './App';
import Spinner from './views/spinner/Spinner';
import { APP_CONFIG } from './config/app';
import './utils/i18n';

// Only initialize MSW in development and when enabled
async function initializeMSW() {
  if (import.meta.env.DEV && APP_CONFIG.ENABLE_MSW) {
    try {
      const { worker } = await import("./api/mocks/browser");
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js'
        }
      });
      console.log('[MSW] Mock Service Worker initialized');
    } catch (error) {
      console.warn('[MSW] Failed to initialize Mock Service Worker:', error);
    }
  }
}

// Start the app immediately for better performance
ReactDOM.createRoot(document.getElementById('root')!).render(
  <CustomizerContextProvider>
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  </CustomizerContextProvider>,
);

// Initialize MSW in background if needed
if (APP_CONFIG.ENABLE_MSW) {
  initializeMSW();
}
