import React from 'react';
import { Button } from "react-bootstrap";

function AddInputButton(props) {
    const handleButton = (evt) => {
      evt.preventDefault();
      props.addData(props.addedRow);
    };
    return <Button size="sm" className="btn-dark" style={props.style} type ="add" onClick={handleButton}>{props.inputDescription}</Button>;
  }

  export default AddInputButton;