import React from 'react';
import {Button} from 'react-bootstrap'

function SelectButton(props) {
  const handleClick = (evt) => {
    evt.preventDefault();
    props.callback(
      {
      stateID: props.stateID,
      value: evt.target.value
      })
    }

  return (
    <Button className="" size = 'lg' style={props.style} value={props.value} onClick={handleClick}>{props.inputDescription}</Button>
  )
}

export default SelectButton