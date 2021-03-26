import React from "react";
import { Form } from "react-bootstrap";

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
      <Form.Label className="font-weight-bold">
        {props.inputDescription}
      </Form.Label>
      <div>
        <Form.Control as="select" id={props.stateID} value={props.value} onChange={handleChange}>
          {props.options.map((data) => {
            return <option value={data}>{data}</option>;
          })}
        </Form.Control>
      </div>
    </div>
  );
}

export default DropDown;
