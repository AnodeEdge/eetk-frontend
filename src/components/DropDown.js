import React from "react";

function DropDown(props) {
  const [inputValue, setValue] = React.useState();

  const handleChange = (evt) => {
    setValue(evt.target.value);
    if (props.callback !== undefined) {
      props.callback({
        stateID: props.stateID,
        value: evt.target.value,
      });
    }
  };

  return (
    <div>
      <label style={props.headerStyle}>{props.inputDescription}</label>
      <div>
        <select id={props.stateID} value={props.value} onChange={handleChange}>
          {props.options.map((data) => {
            return <option value={data}>{data}</option>;
          })}
        </select>
      </div>
    </div>
  );
}

export default DropDown;
