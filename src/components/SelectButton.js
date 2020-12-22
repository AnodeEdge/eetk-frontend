import React from 'react';

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
    <button
    style={props.style}
    value={props.value}
    onClick={handleClick}
    >{props.inputDescription}</button>
  )
}

export default SelectButton