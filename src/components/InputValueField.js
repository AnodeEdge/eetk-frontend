import React from "react";

function InputValueField(props) {
  const [inputValue, setValue] = React.useState(props.defaultValue);

  const handleChange = (evt) => {
    setValue(evt.target.value);
    props.callback(
    {
      id: props.id,
      value: evt.target.value,
    });
  };

  return (
    <div style={props.componentStyle}>
      <label style={props.headerStyle}>{props.inputDescription}</label>
      <div>
        <input
          type="text"
          id={props.id}
          value={inputValue}
          onChange={handleChange}
        />
      {props.unit}
      </div>
    </div>
  );
}

export default InputValueField;
