import React from 'react';
import './App.css';
import Admin from './components/Admin.js';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AppRouter from './AppRouter.js';
import { ContextProvider } from './components/AppContext.js';

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <div className="Component-display">
          <Switch>
            <Route path="/" exact component={AppRouter} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </div>
      </Router>
    </ContextProvider>
  );
}

export default App;
