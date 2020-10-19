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
    <>
    <label className="label">
      {props.inputDescription}
      <input
        type="text"
        id={props.id}
        value={inputValue}
        onChange={handleChange}
      />
      {props.unit}
    </label>
    </>
  );
}

export default InputValueField;
