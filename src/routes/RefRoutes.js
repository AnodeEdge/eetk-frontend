// secondary routes for reference components

import React from 'react';
import { Route, Switch } from 'react-router-dom'


function CalcRoute(props) {
  return(
    <Switch>
      {/* <Route path='/calculations/piv' component={() => <PIVCalculator setShowTiles={props.setShowTiles} />} /> */}
    </Switch>   
  )
}

export default CalcRoute;