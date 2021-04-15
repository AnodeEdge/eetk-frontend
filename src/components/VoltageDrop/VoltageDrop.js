import React, { useEffect, useState } from "react";
import DropDown from "../DropDown";
import InputValueField from "../InputValueField";
import SelectButton from "../SelectButton";
import VD from "../../helpers/VD";
import { Form, Button, Jumbotron, Container } from "react-bootstrap";

const inputDefaults = {
  sizes: [],
  conduitMaterials: [],
  conductorMaterials: [],
};

const stateDefaults = {
  calctype: "voltagedrop",
  current: "",
  voltage: "",
  length: "",
  lengthUnit: "feet",
  powerfactor: "",
  phase: "three",
  size: "14",
  conductorMaterial: "CU",
  conduitMaterial: "STEEL",
  parallelSets: "",
};

const defaultErrors = {
  length: null,
  current: null,
  voltage: null,
  powerfactor: null,
  parallelSets: null,
};

export const headerStyle = {
  fontSize: "large",
};

function VoltageDrop(props) {
  const [state, setState] = useState(stateDefaults);
  const [inputs, setInputs] = useState(inputDefaults);
  const [output, setOutputs] = useState({});
  const [errors, setErrors] = useState(defaultErrors);

  const setStateValues = (data) => {
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
      "https://eetk.scott-curtis.com/voltage_drop/inputs",
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
    if (VD.dataValidation(setErrors, state, errors)) {
      const results = await fetchData(
        "https://eetk.scott-curtis.com/voltage_drop/calc",
        "POST"
      );
      setOutputs(results);
    }
  };

  const handleResult = () => {
    if (output.result && output.result !== 0) {
      return (
        <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
          <Form.Label className="h5 font-weight-bold">
            Voltage Drop: {output.result} V
          </Form.Label>
          <Form.Label className="h5 font-weight-bold">
            Percent: {output.percent}%
          </Form.Label>
        </div>
      );
    } else if (output.result === 0) {
      return (
        <Form.Label className="h5 font-weight-bold">
          Data is unavailable for the selected parameters
        </Form.Label>
      );
    } else {
      return <div style={{ height: "2rem" }}></div>;
    }
  };

  return (
    <div>
      <Jumbotron className style={{ padding: "1rem 1rem" }} fluid>
        <Container className="" style={{ textAlign: "center" }}>
          <h3 className="font-weight-bold">Voltage Drop</h3>
        </Container>
      </Jumbotron>
      <Form
        onSubmit={handleSubmit}
        style={{
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "49% 2% 49%",
          width: "1000px"
        }}
      >
        <div className="border" style={{ padding: "5%" }}>
          <Form.Label
            className="font-weight-bold h4"
            style={{ margin: "0 0 5%", gridRow: "1" }}
          >
            System Parameters
          </Form.Label>
          <Form.Group style={{ marginBottom: "2.25rem" }}>
            <Form.Label className="font-weight-bold">Phase </Form.Label>
            <Form.Row
              style={{ display: "grid", gridTemplateColumns: "50% 50%" }}
            >
              <SelectButton
                stateID={"phase"}
                inputDescription={"Three"}
                value={"three"}
                callback={setStateValues}
                style={{ margin: "0 0.25rem" }}
                selected={state.phase}
                type="selectThree"
              />
              <SelectButton
                stateID={"phase"}
                inputDescription={"Single"}
                value={"single"}
                callback={setStateValues}
                selected={state.phase}
                type="selectSingle"
              />
            </Form.Row>
          </Form.Group>
          <Form.Group style={{ marginBottom: "2.25rem" }}>
            <Form.Label className="font-weight-bold">Conductor </Form.Label>
            <Form.Row
              style={{ display: "grid", gridTemplateColumns: "50% 50%" }}
            >
              <SelectButton
                stateID={"conductorMaterial"}
                inputDescription={"Copper"}
                value={"CU"}
                callback={setStateValues}
                style={{ margin: "0 0.25rem 0 0" }}
                selected={state.conductorMaterial}
                type="selectCU"
              />
              <SelectButton
                stateID={"conductorMaterial"}
                inputDescription={"Aluminum"}
                value={"AL"}
                callback={setStateValues}
                selected={state.conductorMaterial}
                type="selectAL"
              />
            </Form.Row>
          </Form.Group>
          <Form.Group style={{ marginBottom: "2.25rem" }}>
            <Form.Label className="font-weight-bold">
              Units for Length of Cable Run
            </Form.Label>
            <Form.Row
              style={{ display: "grid", gridTemplateColumns: "50% 50%" }}
            >
              <SelectButton
                stateID={"lengthUnit"}
                inputDescription={"Feet"}
                value={"feet"}
                callback={setStateValues}
                style={{ margin: "0 0.25rem 0 0" }}
                selected={state.lengthUnit}
                type="selectFeet"
              />
              <SelectButton
                stateID={"lengthUnit"}
                inputDescription={"Meters"}
                value={"meters"}
                callback={setStateValues}
                selected={state.lengthUnit}
                type="selectMeters"
              />
            </Form.Row>
          </Form.Group>
          <Form.Label className="font-weight-bold">
            Units for Length of Cable Run
          </Form.Label>
          <Form.Row
            style={{ display: "grid", gridTemplateColumns: "33% 33% 33%" }}
          >
            <SelectButton
              stateID={"conduitMaterial"}
              inputDescription={"Steel"}
              value={"STEEL"}
              callback={setStateValues}
              style={{ margin: "0 0.25rem 0 0" }}
              selected={state.conduitMaterial}
              type="selectSTEEL"
            />
            <SelectButton
              stateID={"conduitMaterial"}
              inputDescription={"PVC"}
              value={"PVC"}
              callback={setStateValues}
              style={{ margin: "0 0.25rem 0 0" }}
              selected={state.conduitMaterial}
              type="selectPVC"
            />
            <SelectButton
              stateID={"conduitMaterial"}
              inputDescription={"Aluminum"}
              value={"AL"}
              callback={setStateValues}
              selected={state.conduitMaterial}
              type="selectAL"
            />
          </Form.Row>
        </div>
        <Container></Container>
        <div className="border" style={{ padding: "5%" }}>
          <Form.Label
            className="font-weight-bold h4"
            style={{ margin: "0 0 5%" }}
          >
            Input Parameters
          </Form.Label>
          <Form.Group>
            <Form.Row
              style={{ display: "grid", gridTemplateColumns: "50% 50%" }}
            >
              <InputValueField
                stateID="voltage"
                inputDescription="Voltage"
                unit=" V"
                setStateValues={setStateValues}
                value={state.voltage}
                errorMessage={errors.voltage}
                componentStyle={{ margin: "0 0.25rem 0 0" }}
                placeholder="Enter Voltage"
              />
              <InputValueField
                stateID="current"
                inputDescription="Load Current"
                unit=" A"
                setStateValues={setStateValues}
                value={state.current}
                errorMessage={errors.current}
                placeholder="Enter Load Current"
              />
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Row
              style={{ display: "grid", gridTemplateColumns: "50% 50%" }}
            >
              <InputValueField
                stateID="powerfactor"
                inputDescription="Power Factor "
                unit=""
                setStateValues={setStateValues}
                value={state.powerfactor}
                type={null}
                errorMessage={errors.powerfactor}
                placeholder="Enter Power Factor"
                componentStyle={{ margin: "0 0.25rem 0 0" }}
              />
              <InputValueField
                stateID="parallelSets"
                inputDescription="Parallel Sets"
                unit=" Sets"
                setStateValues={setStateValues}
                value={state.parallelSets}
                errorMessage={errors.parallelSets}
                placeholder="Enter Parallel Sets"
              />
            </Form.Row>
          </Form.Group>
          <Form.Group style={{ marginBottom: "3rem" }}>
            <Form.Row
              style={{ display: "grid", gridTemplateColumns: "50% 50%" }}
            >
              <InputValueField
                stateID="length"
                inputDescription="Length"
                setStateValues={setStateValues}
                value={state.length}
                errorMessage={errors.length}
                componentStyle={{ margin: "0 0.25rem 0 0" }}
                placeholder="Enter Cable Length"
              />
              <DropDown
                stateID="size"
                inputDescription="Conductor Size"
                options={inputs.sizes}
                callback={setStateValues}
                value={state.size}
              />
            </Form.Row>
          </Form.Group>
          <Button
            className="btn-dark w-50"
            type="submit"
            style={{ margin: "0 0.25rem 0 0" }}
          >
            Submit
          </Button>
        </div>
      </Form>
      <div className="w-50 border" style={{ margin: "1% auto", padding: "1%" }}>
        <Form.Row>
          <Form.Label
            className="font-weight-bold h4"
            style={{ margin: "0 0 5%" }}
          >
            Results
          </Form.Label>
        </Form.Row>
        {handleResult()}
      </div>
    </div>
  );
}

export default VoltageDrop;
