import React from "react";
import "../css/PIVCalc.css";
import InputValueField from "./InputValueField";
import PhaseDropDown from "./PhaseDropDown";
import PIV from "../helpers/PIV";
import SelectButton from "./SelectButton";


function PIVCalculator(props) {
  const [state, setState] = React.useState({
    calctype: "power",
    current: 100,
    voltage: 480,
    power: 0,
    powerfactor: 1,
    phase: "three",
  });

  const fieldInputDefaults = [
  {
    id: "voltage",
    inputDescription: "Voltage: ",
    unit:  " V (L-L)",
    defaultValue: state.voltage 
  },
  {
    id: "current",
    inputDescription: "Current: ",
    unit: " A",
    defaultValue: state.current
  },
  {
    id: "power",
    inputDescription: "Power: ",
    unit: " W",
    defaultValue: state.power
  },
  {
    id: "powerfactor",
    inputDescription: "PF: ",
    unit: "",
    defaultValue: state.powerfactor
  }] 

  const buttonInputDefaults = [
    {
      id: "calctype",
      inputDescription: "Power",
      value: "power",
    },
    {
      id: "calctype",
      inputDescription: "Current",
      value: "current",
    },
    {
      id: "calctype",
      inputDescription: "Voltage",
      value: "voltage",
    }]

  const setStateValues = (data) => {
    setState({
      ...state,
      [data.id]: data.value,
    });
  };

  const checkInputs = () => {
    if (state.powerfactor <= 0 || state.powerfactor > 1){
      alert("Power Factor must be between 0 and 1")
      return;
    }
  }

  const selectCalculation = () => {
    if (state.phase === "three") {
      if (state.calctype === "voltage"){
        setStateValues(PIV.voltage3Phase(state))
      }
      else if (state.calctype === "current"){
        setStateValues(PIV.current3Phase(state))
      }
      else {
        console.log(PIV.power3Phase(state))
        setStateValues(PIV.power3Phase(state))
      }
    }
    else{
      if (state.calctype === "voltage"){
        setStateValues(PIV.voltage1Phase(state))
      }
      else if (state.calctype === "current"){
        setStateValues(PIV.current1Phase(state))
      }
      else {
        setStateValues(PIV.power1Phase(state))
      }
    }
  }

  const performCalculation = () => {
    checkInputs();
    selectCalculation();
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    performCalculation();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{display: "flex"}}>
          {buttonInputDefaults.map((data) => (
            <SelectButton
            id={data.id}
            inputDescription={data.inputDescription}
            value={data.value}
            default={data.default}
            callback={setStateValues}
            ></SelectButton>
          ))}
        </div>
        {fieldInputDefaults.map((data) => {
        if (state.calctype !== data.id) {
          return(
            <>
              <InputValueField
                id={data.id}
                inputDescription={data.inputDescription}
                unit={data.unit}
                defaultValue={data.defaultValue}
                callback={setStateValues}
              ></InputValueField>
              <br></br>
            </>
        )}else {return null}})}
        <label>Phase: </label><PhaseDropDown callback={setStateValues}></PhaseDropDown>
        <br></br>
        <button>Submit</button>
      </form>
      {state.power}
      <br></br>
      {state.current}
      <br></br>
      {state.voltage}
      <br></br>
      {state.phase}
      <br></br>
      {state.calctype}
    </div>
  );
}

export default PIVCalculator;