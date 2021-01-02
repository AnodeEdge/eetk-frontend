import React, { useEffect } from "react";
import DropDown from "./DropDown";
import InputValueField from "./InputValueField";
import SelectButton from "./SelectButton";

function VoltageDrop(props) {
  const [state, setState] = React.useState({
    calctype: "voltagedrop",
    current: 100,
    voltage: 480,
    length: 0,
    lengthUnit: "feet",
    powerfactor: 1,
    phase: "three",
    size: "12",
    conductorMaterial: "CU",
    conduitMaterial: "STEEL",
    result: "",
  });

  useEffect(() => {
    return () => {
      props.setShowTiles(true);
    };
  }, []);

  const setStateValues = (data) => {
    setState({
      ...state,
      [data.stateID]: data.value,
    });
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

  const getResult = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    };
    const response = await fetch(
      "http://127.0.0.1:5000/api/calculate_voltage_drop",
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    return data;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    getResult();
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
            stateID={"phase"}
            inputDescription={"Three"}
            value={"three"}
            callback={setStateValues}
            style={buttonStyle}
          />
          <SelectButton
            stateID={"phase"}
            inputDescription={"Single"}
            value={"single"}
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
            stateID={"current"}
            inputDescription={"Load Current"}
            unit={" A"}
            defaultValue={0}
            callback={setStateValues}
            headerStyle={headerStyle}
            componentStyle={{ width: "50%" }}
          ></InputValueField>
          <InputValueField
            stateID={"powerfactor"}
            inputDescription={"Power Factor"}
            unit={""}
            defaultValue={0}
            callback={setStateValues}
            headerStyle={headerStyle}
            componentStyle={{ width: "50%" }}
          ></InputValueField>
          <InputValueField
            stateID={"voltage"}
            inputDescription={"Voltage"}
            unit={" V"}
            defaultValue={480}
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
            stateID={"length"}
            inputDescription={"Length"}
            unit={""}
            defaultValue={0}
            callback={setStateValues}
            headerStyle={headerStyle}
            componentStyle={{ width: "50%" }}
          ></InputValueField>
          <DropDown
            stateID={"lengthUnit"}
            headerStyle={headerStyle}
            inputDescription={"Length Units"}
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
            stateID={"size"}
            headerStyle={headerStyle}
            inputDescription={"Conductor Size"}
            options={[1, 2, 3]}
            callback={setStateValues}
          ></DropDown>
          <DropDown
            stateID={"conductorMaterial"}
            headerStyle={headerStyle}
            inputDescription={"Conductor Material"}
            options={["CU", "AL"]}
            callback={setStateValues}
          ></DropDown>
          <DropDown
            stateID={"conduitMaterial"}
            headerStyle={headerStyle}
            inputDescription={"Conduit Material"}
            options={["STEEL", "PVC", "AL"]}
            callback={setStateValues}
          ></DropDown>
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
    </div>
  );
}

export default VoltageDrop;
