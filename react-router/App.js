import React from 'react';
import Home from './pages/Home';
import ReactRouter from './pages/ReactRouter';
import {Router, Route, Switch} from './router';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/router" component={ReactRouter} />
        <Route component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
