// secondary routes for reference components

import React from 'react';
import { Route, Switch } from 'react-router-dom'
import EGCTable from '../components/EGCTable';


function RefRoutes(props) {
  return(
    <Switch>
      <Route path='/references/egc' component={() => <EGCTable setShowTiles={props.setShowTiles} />} />
    </Switch>   
  )
}

export default RefRoutes;