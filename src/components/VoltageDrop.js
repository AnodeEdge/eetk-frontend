import React, { useEffect, useState } from "react";
import DropDown from "./DropDown";
import InputValueField from "./InputValueField";
import SelectButton from "./SelectButton";

const inputDefaults = {
  sizes: ["Loading..."],
  conduitMaterials: ["Loading..."],
  conductorMaterials: ["Loading..."],
};

const stateDefaults = {
  calctype: "voltagedrop",
  current: 100,
  voltage: 480,
  length: 100,
  lengthUnit: "feet",
  powerfactor: 1,
  phase: "three",
  size: "14",
  conductorMaterial: "CU",
  conduitMaterial: "PVC",
  parallelSets: 1,
  result: "",
};

// const outputDefaults = {};

function VoltageDrop(props) {
  const [state, setState] = useState(stateDefaults);

  // const [outputs, setOutputs] = useState(outputDefaults);

  const [inputs, setInputs] = useState(inputDefaults);

  const setStateValues = (data) => {
    setState({
      ...state,
      [data.stateID]: data.value,
    });
  };

  useEffect(() => {
    handleFetchInputData(
      "http://127.0.0.1:5000/voltage_drop/inputs",
      "POST",
      setInputs
    );

    return () => {
      props.setShowTiles(true);
    };
  }, []);

  const fetchData = async (url, method) => {
    const requestOptions = {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  };

  const handleFetchInputData = async (url, method, Func) => {
    const recieved = await fetchData(url, method);
    Func(recieved);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const results = await fetchData(
      "http://127.0.0.1:5000/voltage_drop/calc",
      "POST"
    );
    console.log(results);
  };

  const componentStyle = {
    margin: "25px 0",
  };

  const formStyle = {
    margin: "0 30% auto",
    padding: "25px",
    backgroundColor: "#c3e2e6",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
  };

  const headerStyle = {
    fontSize: "large",
  };

  const buttonStyle = {};

  return (
    <div style={componentStyle}>
      <div style={{ textAlign: "center", margin: "0 0 1% 0" }}>
        <label style={{ fontSize: "x-large" }}>Voltage Drop Calculator</label>
      </div>
      <form style={formStyle} onSubmit={handleSubmit}>
        <label style={headerStyle}>Phase: </label>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "0 0 1% 0",
          }}
        >
          <SelectButton
            stateID="phase"
            inputDescription="Three"
            value="three"
            callback={setStateValues}
            style={buttonStyle}
          />
          <SelectButton
            stateID="phase"
            inputDescription="Single"
            value="single"
            callback={setStateValues}
            style={buttonStyle}
          />
        </div>
        <div
          style={{
            display: "flex",
            margin: "0 0 2% 0",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <InputValueField
            stateID="current"
            inputDescription="Load Current"
            unit=" A"
            defaultValue={state.current}
            callback={setStateValues}
            headerStyle={headerStyle}
            componentStyle={{ width: "50%" }}
          ></InputValueField>
          <InputValueField
            stateID="powerfactor"
            inputDescription="Power Factor"
            unit=""
            defaultValue={state.powerfactor}
            callback={setStateValues}
            headerStyle={headerStyle}
            componentStyle={{ width: "50%" }}
          ></InputValueField>
          <InputValueField
            stateID="voltage"
            inputDescription="Voltage"
            unit=" V"
            defaultValue={state.voltage}
            callback={setStateValues}
            headerStyle={headerStyle}
            componentStyle={{ width: "50%" }}
          ></InputValueField>
        </div>
        <div
          style={{
            display: "flex",
            margin: "0 0 2% 0",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <InputValueField
            stateID="length"
            inputDescription="Length"
            unit=""
            defaultValue={0}
            callback={setStateValues}
            headerStyle={headerStyle}
            componentStyle={{ width: "50%" }}
          ></InputValueField>
          <DropDown
            stateID="lengthUnit"
            headerStyle={headerStyle}
            inputDescription="Length Units"
            options={["feet", "meters"]}
            callback={setStateValues}
          ></DropDown>
        </div>
        <div
          style={{
            display: "flex",
            margin: "0 0 2% 0",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <DropDown
            stateID="size"
            headerStyle={headerStyle}
            inputDescription="Conductor Size"
            options={inputs.sizes}
            callback={setStateValues}
          ></DropDown>
          <DropDown
            stateID="conductorMaterial"
            headerStyle={headerStyle}
            inputDescription="Conductor Material"
            options={inputs.conductorMaterials}
            callback={setStateValues}
          ></DropDown>
          <DropDown
            stateID="conduitMaterial"
            headerStyle={headerStyle}
            inputDescription="Conduit Material"
            options={inputs.conduitMaterials}
            callback={setStateValues}
          ></DropDown>
        </div>
        <div>
          <InputValueField
            stateID="parallelSets"
            inputDescription="Parallel Sets"
            unit=" Sets"
            defaultValue={1}
            callback={setStateValues}
            headerStyle={headerStyle}
            componentStyle={{ width: "50%" }}
          ></InputValueField>
        </div>
        <button>Submit</button>
      </form>
      {state.phase}
      <br></br>
      {state.current}
      <br></br>
      {state.powerfactor}
      <br></br>
      {state.voltage}
      <br></br>
      {state.length}
      <br></br>
      {state.lengthUnit}
      <br></br>
      {state.conductorMaterial}
      <br></br>
      {state.conduitMaterial}
      <br></br>
      {state.parallelSets}
      
    </div>
  );
}

export default VoltageDrop;
