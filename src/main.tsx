import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { initApiClient } from './lib/http';
import './index.css';
import App from './App.tsx';

// Initialize API client with store reference for interceptors
initApiClient(store);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
