import React from 'react';
import {  Link } from 'react-router-dom'

function ListLink(props) {
  return(
    <li className={props.class} style={props.style}>
      <Link to={props.reference}>{props.value}</Link>
    </li>
  )
}

export default ListLink