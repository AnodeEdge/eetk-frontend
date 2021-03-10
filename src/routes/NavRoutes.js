// primary routes for the main navigation

import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import References from "../pages/References";
import Calculations from "../pages/Calculations";
import Contact from "../pages/Contact";
import About from "../pages/About";

function NavRoute() {
  const [showTiles, setShowTiles] = useState(true);

  return (
    <Switch>
      <Route exact path="/">{<Redirect to="/calculations" />}</Route>
      <Route 
        path="/references" 
        render={() => (
          <References showTiles={showTiles} setShowTiles={setShowTiles} />
        )} 
      />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route
        path="/calculations"
        render={() => (
          <Calculations showTiles={showTiles} setShowTiles={setShowTiles} />
        )}
      />
    </Switch>
  );
}

export default NavRoute;
