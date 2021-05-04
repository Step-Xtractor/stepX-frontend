import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './styles/global.scss';

import Routes from './routes';

import AppProvider from './hooks';

function App() {
  return (
  <AppProvider>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </AppProvider>
  );
}

export default App;