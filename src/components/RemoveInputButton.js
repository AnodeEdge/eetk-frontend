import React from 'react';
import { Button } from "react-bootstrap";

function RemoveButton(props) {
    const handleButton = (evt) => {
      evt.preventDefault();
      props.removeData(props.index);
    };
    return <Button size="sm" variant="outline-danger" style={props.style} onClick={handleButton}>{props.inputDescription}</Button>;
  }

export default RemoveButton