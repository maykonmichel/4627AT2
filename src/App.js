import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import CyclicalCoordinates from './pages/CyclicalCoordinates';
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
      <Route path="/coordenadas-ciclicas" exact>
        <CyclicalCoordinates />
      </Route>
    </Switch>
  </BrowserRouter>
);
