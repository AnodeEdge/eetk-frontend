// primary routes for the main navigation

import React from 'react';
import { Route, Switch } from 'react-router-dom'
import References from '../pages/References'
import Calculations from '../pages/Calculations'
import Contact from '../pages/Contact'
import About from '../pages/About'

function NavRoute() {
  return(
    <Switch>
      <Route path='/references' component={References} />
      <Route path='/about' component={About} />
      <Route path='/contact' component={Contact} />
      <Route path="/" component={Calculations} />
    </Switch>   
  )
}

export default NavRoute;