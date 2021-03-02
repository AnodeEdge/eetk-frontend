import React, { useState, useEffect } from "react";
import DropDown from "./DropDown";
import InputValueField from "./InputValueField";
import RemoveInputButton from "./RemoveInputButton";

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
      <label>
        <h6>Cable #{props.index + 1} </h6>
      </label>
      <DropDown
        inputDescription="Wire Type"
        options={props.inputs.wireTypes}
        callback={setStateValues}
        stateID="wireType"
        value={props.data.wireType}
      />
      <DropDown
        inputDescription="Wire Size"
        options={props.inputs.wireSizes}
        callback={setStateValues}
        stateID="wireSize"
        value={props.data.wireSize}
      />
      <InputValueField
        inputDescription="Quantity"
        setStateValues={setStateValues}
        stateID="quantity"
        value={props.data.quantity}
      />
      {!props.hideRemove && (
        <RemoveInputButton
          inputDescription="Remove"
          removeData={props.handleRemoveInput}
          index={props.index}
        />
      )}
    </div>
  );
}

export default ConduitFillConductorInputs;
