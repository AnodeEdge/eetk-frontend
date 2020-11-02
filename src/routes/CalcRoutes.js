// secondary routes for calculation components

import React from 'react';
import { Route, Switch } from 'react-router-dom'
import PIVCalculator from '../components/PIVCalculator';


function CalcRoute() {
  return(
    <Switch>
      <Route path='/calculations/piv' component={PIVCalculator} />
    </Switch>   
  )
}

export default CalcRoute;