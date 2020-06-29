import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import CyclicalCoordinates from "./pages/CyclicalCoordinates";
import Home from "./pages/Home";
import HookeAndJeeves from "./pages/HookeAndJeeves";
import Newton from "./pages/Newton";

export default () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/coordenadas-ciclicas" exact>
        <CyclicalCoordinates />
      </Route>
      <Route path="/hooke-and-jeeves" exact>
        <HookeAndJeeves />
      </Route>
      <Route path="/newton" exact>
        <Newton />
      </Route>
    </Switch>
  </BrowserRouter>
);
