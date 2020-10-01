import React from 'react';
import './App.css';
import AppRouter from './AppRouter.js';
import { ContextProvider } from './components/AppContext.js';

const App = () => {
  return (
    <ContextProvider>
      <AppRouter/>
    </ContextProvider>
  );
}

export default App;
