import React, { useState, useEffect } from "react";
import DropDown from "../DropDown";
import InputValueField from "../InputValueField";
import RemoveInputButton from "../RemoveInputButton";
import { Form } from "react-bootstrap";

function ConduitFillConductorInputs(props) {
  const [state, setState] = useState(props.dataDefaults);

  const setStateValues = (data) => {
    setState({
      ...state,
      [data.stateID]: data.value,
    });
  };

  useEffect(() => {
    props.handleChange({
      index: props.index,
      newConductorData: state,
    });
  }, [state]);

  return (
    <div>
      <Form.Label>
        <h5 className="font-weight-bold">Cable #{props.index + 1} </h5>
      </Form.Label>
      {!props.hideRemove && (
        <RemoveInputButton
          inputDescription="Remove"
          removeData={props.handleRemoveInput}
          index={props.index}
          style={{ display: "inline", float: "right" }}
        />
      )}
      <Form.Group>
        <DropDown
          inputDescription="Wire Type"
          options={props.inputs.wireTypes}
          callback={setStateValues}
          stateID="wireType"
          value={props.data.wireType}
        />
      </Form.Group>
      <Form.Group>
        <DropDown
          inputDescription="Wire Size"
          options={props.inputs.wireSizes}
          callback={setStateValues}
          stateID="wireSize"
          value={props.data.wireSize}
        />
      </Form.Group>
      <Form.Group>
        <InputValueField
          inputDescription="Quantity"
          setStateValues={setStateValues}
          stateID="quantity"
          value={props.data.quantity}
          type="number"
          min={1}
        />
      </Form.Group>
    </div>
  );
}

export default ConduitFillConductorInputs;
