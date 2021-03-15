import React from "react";
import { Form } from "react-bootstrap";
import { headerStyle } from "./VoltageDrop";
function InputValueField(props) {
  // const [inputValue, setValue] = React.useState(props.defaultValue);

  const handleChange = (evt) => {
    if (props.setStateValues !== undefined) {
      props.setStateValues({
        stateID: props.stateID,
        value: evt.target.value,
      });
    } else if (props.setState !== undefined) {
      props.setState(evt.target.value);
    }
  };

  return (
    <div style={props.componentStyle}>
      <Form.Label className="font-weight-bold">
        {props.inputDescription}
      </Form.Label>
      <div>
        <Form.Control
          type={props.type}
          stateID={props.stateID}
          placeholder={props.placeholder}
          onChange={handleChange}
          min={props.min}
          value={props.value}
        ></Form.Control>
        <div style={{ height: "2rem" }}>
          {props.errorMessage != null && (
            <text style={{ color: "red" }}>{props.errorMessage}</text>
          )}
        </div>
      </div>
    </div>
  );
}

export default InputValueField;
