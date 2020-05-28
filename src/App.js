import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Newton from './pages/Newton';

export default () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/newton" exact>
        <Newton />
      </Route>
    </Switch>
  </BrowserRouter>
);
