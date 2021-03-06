import React, { useEffect, useState } from "react";
import DropDown from "./DropDown";
import AddInputButton from "./AddInputButton";
import ConduitFillConductorInputs from "./ConduitFillConductorInputs";

const conductorDataDefaults = {
  wireType: "RHH, RHW, RHW-2",
  wireSize: "18 AWG",
  quantity: "1",
};

const conduitDataDefaults = {
  conduitType: "EMT",
  conduitSize: "3/8",
};

const errorDefaults = {}

const inputOptionsDefaults = {
  conduitTypes: [],
  tradeSizes: [],
  wireTypes: [],
  wireSizes: [],
};

const formStyle = {
  margin: "0 30% auto",
  padding: "25px",
  backgroundColor: "#c3e2e6",
  display: "flex",
  flexDirection: "column",
};

function ConduitFill(props) {
  const [conductorData, setConductorData] = useState([conductorDataDefaults]);
  const [conduitData, setConduitData] = useState(conduitDataDefaults);
  const [inputOptions, setInputOptions] = useState(inputOptionsDefaults);
  const [outputs, setOutputs] = useState({});
  const [errors, setErrors] = useState(errorDefaults)

  useEffect(() => {
    return () => {
      props.setShowTiles(true);
    };
  }, []);

  useEffect(() => {
    handleFetchInputData(
      "http://127.0.0.1:5000/conduit_fill/inputs",
      "POST",
      setInputOptions
    );
  }, []);

  const fetchData = async (url, method, body) => {
    const requestOptions = {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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
      "http://127.0.0.1:5000/conduit_fill/calc",
      "POST",
      { conduitData: conduitData, conductorData: conductorData }
    );

    setOutputs(results);
  };

  const handleAddInput = (addVal) => {
    setConductorData((currVal) => [...currVal, addVal]);
  };

  const handleRemoveInput = (index) => {
    let newConductorData = [...conductorData];
    newConductorData.splice(index, 1);
    setConductorData(newConductorData);
  };

  const handleConductorInput = (data) => {
    let newConductorData = [...conductorData];
    newConductorData.splice(data.index, 1, data.newConductorData);
    setConductorData(newConductorData);
  };

  const handleConduitInput = (data) => {
    setConduitData((currVal) => ({ ...currVal, [data.stateID]: data.value }));
  };

  return (
    <div style={{ margin: "25px" }}>
      <div style={{ textAlign: "center", margin: "0 0 1% 0" }}>
        <label style={{ fontSize: "x-large" }}>Conduit Fill</label>
      </div>
      <form style={formStyle}>
        <div>
          <label>
            <h4>Conduit</h4>
          </label>
          <DropDown
            inputDescription="Type"
            options={inputOptions.conduitTypes}
            callback={handleConduitInput}
            stateID="conduitType"
            value={conduitData.conduitType}
          />
          <DropDown
            inputDescription="Size"
            options={inputOptions.tradeSizes}
            callback={handleConduitInput}
            stateID="conduitSize"
            value={conduitData.conduitSize}
          />
        </div>
        <div>
          <label>
            <h4>Conductors</h4>
          </label>
          <AddInputButton
            inputDescription="Add"
            addData={handleAddInput}
            addedRow={conductorDataDefaults}
          />
          {conductorData.map((data, index) => (
            <ConduitFillConductorInputs
              hideRemove={conductorData.length <= 1}
              data={data}
              dataDefaults={conductorDataDefaults}
              index={index}
              handleRemoveInput={handleRemoveInput}
              handleChange={handleConductorInput}
              inputs={inputOptions}
            />
          ))}
        </div>{" "}
        <button onClick={handleSubmit}>Submit</button>
      </form>
      <div style={formStyle}>
        {Object.keys(outputs) != 0 && (<><h4>Results:</h4>
        <h4>{outputs.fill}</h4>
        {outputs.jam != "" && <h4>{outputs.jam}</h4>}</>)}
      </div>
    </div>
  );
}

export default ConduitFill;
