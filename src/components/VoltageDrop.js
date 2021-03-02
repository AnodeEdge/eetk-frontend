import React, { useEffect, useState } from "react";
import DropDown from "./DropDown";
import InputValueField from "./InputValueField";
import SelectButton from "./SelectButton";

const inputDefaults = {
  sizes: [],
  conduitMaterials: [],
  conductorMaterials: [],
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
};

const defaultErrors = {
  length: null,
  current: null,
  voltage: null,
  powerfactor: null,
  parallelSets: null,
}

const componentStyle = {
  margin: "25px 0",
};

const formStyle = {
  margin: "0 30% auto",
  padding: "25px",
  backgroundColor: "#c3e2e6",
  display: "flex",
  flexDirection: "column",
};

export const headerStyle = {
  fontSize: "large",
};

function VoltageDrop(props) {
  const [state, setState] = useState(stateDefaults);
  const [inputs, setInputs] = useState(inputDefaults);
  const [output, setOutputs] = useState({});
  const [errors, setErrors] = useState(defaultErrors)

  const setStateValues = (data) => {
    console.log(data);

    setState({
      ...state,
      [data.stateID]: data.value,
    });
  };

  useEffect(() => {
    return () => {
      props.setShowTiles(true);
    };
  }, []);

  useEffect(() => {
    handleFetchInputData(
      "http://127.0.0.1:5000/voltage_drop/inputs",
      "POST",
      setInputs
    );
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

    setOutputs(results);
  };

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
          />
          <SelectButton
            stateID="phase"
            inputDescription="Single"
            value="single"
            callback={setStateValues}
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
            setStateValues={setStateValues}
            componentStyle={{ width: "50%" }}
            value={state.current}
          />
          <InputValueField
            stateID="powerfactor"
            inputDescription="Power Factor"
            setStateValues={setStateValues}
            componentStyle={{ width: "50%" }}
            value={state.powerfactor}
          />
          <InputValueField
            stateID="voltage"
            inputDescription="Voltage"
            unit=" V"
            setStateValues={setStateValues}
            componentStyle={{ width: "50%" }}
            value={state.voltage}
          />
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
            callback={setStateValues}
            componentStyle={{ width: "50%" }}
            value={state.length}
          />
          <DropDown
            stateID="lengthUnit"
            inputDescription="Length Units"
            options={["feet", "meters"]}
            callback={setStateValues}
            value={state.lengthUnit}
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
          <DropDown
            stateID="size"
            inputDescription="Conductor Size"
            options={inputs.sizes}
            callback={setStateValues}
            value={state.size}
          />
          <DropDown
            stateID="conductorMaterial"
            inputDescription="Conductor Material"
            options={inputs.conductorMaterials}
            callback={setStateValues}
            value={state.conductorMaterial}
          />
          <DropDown
            stateID="conduitMaterial"
            inputDescription="Conduit Material"
            options={inputs.conduitMaterials}
            callback={setStateValues}
            value={state.conduitMaterial}
          />
        </div>
        <div>
          <InputValueField
            stateID="parallelSets"
            inputDescription="Parallel Sets"
            unit=" Sets"
            callback={setStateValues}
            componentStyle={{ width: "50%" }}
            value={state.parallelSets}
          />
        </div>
        <button>Submit</button>
      </form>
      <div style={{ ...formStyle }}>
        {output && output.result !== 0 && (
          <>
            <label>Results: </label>
            <h6>{output.result} </h6>
            <h6>{output.percent}</h6>
          </>
        )}
      </div>
    </div>
  );                                                                                                                                                                                
}

export default VoltageDrop;
