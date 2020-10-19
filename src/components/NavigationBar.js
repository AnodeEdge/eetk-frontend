import React from 'react';
import {  Link } from 'react-router-dom'

function NavigationBar() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/calculations">Calculations</Link>
      <Link to="/references"></Link>
    </div>
  )
}

export default NavigationBar;