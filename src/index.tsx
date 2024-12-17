import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import RouterPage from './RouterPage';
import { Provider } from 'react-redux';
import store from './store'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterPage/>
    </Provider>
  </React.StrictMode>
);


