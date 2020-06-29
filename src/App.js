import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import CyclicalCoordinates from './pages/CyclicalCoordinates';
import Home from './pages/Home';
import Newton from './pages/Newton';
import Gradient from './pages/Gradient';
import ConjugateGradient from './pages/ConjugateGradient';

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
      <Route path="/gradiente" exact>
        <Gradient />
      </Route>
      <Route path="/gradiente-conjugado-generalizado" exact>
        <ConjugateGradient />
      </Route>
    </Switch>
  </BrowserRouter>
);
