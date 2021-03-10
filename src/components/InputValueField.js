import React from "react";
import { headerStyle } from "./VoltageDrop";
function InputValueField(props) {
  // const [inputValue, setValue] = React.useState(props.defaultValue);

  const handleChange = (evt) => {
    // setValue(evt.target.value);
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
      <label style={{ ...headerStyle, ...props.style }}>
        {props.inputDescription}
      </label>
      <div>
        {props.errorMessage != null && (
          <text style={{ color: "red" }}>{props.errorMessage}</text>
        )}
        <input
          type={props.type}
          stateID={props.stateID}
          // value={inputValue}
          value={props.value}
          onChange={handleChange}
          min={props.min}
        />
        {props.unit}
      </div>
    </div>
  );
}

export default InputValueField;
