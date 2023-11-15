import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from './redux/store';
import { injectStore } from './api/api';

if (process.env.NODE_ENV !== "development")
    console.log = () => {};
const root = ReactDOM.createRoot(document.getElementById('root'));
injectStore(store);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
        <App />
    </PersistGate>
  </Provider>
);

