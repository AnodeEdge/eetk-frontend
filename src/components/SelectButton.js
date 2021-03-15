import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

function SelectButton(props) {
  const [dynamicClass, setDynamicClass] = useState("disabled");

  useEffect(() => {
    if (props.selected == props.value) {
      setDynamicClass("active");
    } else {
      setDynamicClass("disabled");
    }
    return () => {};
  }, [props.selected]);

  const handleClick = (evt) => {
    evt.preventDefault();
    props.callback({
      stateID: props.stateID,
      value: evt.target.value,
    });
  };

  return (
    <Button
      className={`btn btn-dark + ${dynamicClass}`}
      size=""
      style={props.style}
      value={props.value}
      onClick={handleClick}
    >
      {props.inputDescription}
    </Button>
  );
}

export default SelectButton;
