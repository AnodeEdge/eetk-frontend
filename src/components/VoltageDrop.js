import React, { useEffect, useState } from "react";
import DropDown from "./DropDown";
import InputValueField from "./InputValueField";
import SelectButton from "./SelectButton";
import VD from "../helpers/VD";
import { Form, Button, Jumbotron, Container } from "react-bootstrap";

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
  conduitMaterial: "STEEL",
  parallelSets: 1,
};

const defaultErrors = {
  length: null,
  current: null,
  voltage: null,
  powerfactor: null,
  parallelSets: null,
};

// const formStyle = {
//   margin: "0 30% auto",
//   padding: "25px",
//   backgroundColor: "#c3e2e6",
//   display: "flex",
//   flexDirection: "column",
// };

export const headerStyle = {
  fontSize: "large",
};

function VoltageDrop(props) {
  const [state, setState] = useState(stateDefaults);
  const [inputs, setInputs] = useState(inputDefaults);
  const [output, setOutputs] = useState({});
  const [errors, setErrors] = useState(defaultErrors);

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
    if (VD.dataValidation(setErrors, state, errors)) {
      const results = await fetchData(
        "http://127.0.0.1:5000/voltage_drop/calc",
        "POST"
      );
      setOutputs(results);
    }
  };

  const handleResult = () => {
    console.log(output.result);
    if (output && output.result !== 0) {
      return (
        <>
          <label>Results: </label>
          <h6>{output.result} </h6>
          <h6>{output.percent}</h6>
        </>
      );
    } else if (output.result === 0) {
      return <label>Data is unavailable for the selected parameters</label>;
    }
  };

  return (
    <div>
      <Jumbotron className style={{ padding: "2rem 2rem" }} fluid>
        <Container className="w-75" style={{ textAlign: "center" }}>
          <h2>Voltage Drop</h2>
        </Container>
      </Jumbotron>
      <Form
        onSubmit={handleSubmit}
        className="w-75"
        style={{
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "49% 1% 49%",
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
              />
              <SelectButton
                stateID={"phase"}
                inputDescription={"Single"}
                value={"single"}
                callback={setStateValues}
                selected={state.phase}
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
              />
              <SelectButton
                stateID={"conductorMaterial"}
                inputDescription={"Aluminum"}
                value={"AL"}
                callback={setStateValues}
                selected={state.conductorMaterial}
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
              />
              <SelectButton
                stateID={"lengthUnit"}
                inputDescription={"Meters"}
                value={"meters"}
                callback={setStateValues}
                selected={state.lengthUnit}
              />
            </Form.Row>
          </Form.Group>
          <Form.Group style={{ marginBottom: "2.25rem" }}>
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
              />
              <SelectButton
                stateID={"conduitMaterial"}
                inputDescription={"PVC"}
                value={"PVC"}
                callback={setStateValues}
                style={{ margin: "0 0.25rem 0 0" }}
                selected={state.conduitMaterial}
              />
              <SelectButton
                stateID={"conduitMaterial"}
                inputDescription={"Aluminum"}
                value={"AL"}
                callback={setStateValues}
                selected={state.conduitMaterial}
              />
            </Form.Row>
          </Form.Group>
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
              />
              <InputValueField
                stateID="current"
                inputDescription="Load Current"
                unit=" A"
                setStateValues={setStateValues}
                value={state.current}
                errorMessage={errors.current}
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
          <Form.Group>
            <Button
              className="btn-dark w-50"
              type="submit"
              style={{ margin: "0 0.25rem 0 0" }}
            >
              Submit
            </Button>{" "}
          </Form.Group>
        </div>
      </Form>

      {/* <form style={formStyle} onSubmit={handleSubmit}>
        <label style={headerStyle}>Phase: </label>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "0 auto",
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
            errorMessage={errors.current}
          />
          <InputValueField
            stateID="powerfactor"
            inputDescription="Power Factor"
            setStateValues={setStateValues}
            componentStyle={{ width: "50%" }}
            value={state.powerfactor}
            errorMessage={errors.powerfactor}
          />
          <InputValueField
            stateID="voltage"
            inputDescription="Voltage"
            unit=" V"
            setStateValues={setStateValues}
            componentStyle={{ width: "50%" }}
            value={state.voltage}
            errorMessage={errors.voltage}
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
            setStateValues={setStateValues}
            componentStyle={{ width: "50%" }}
            value={state.length}
            errorMessage={errors.length}
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
            setStateValues={setStateValues}
            componentStyle={{ width: "50%" }}
            value={state.parallelSets}
            errorMessage={errors.parallelSets}
          />
        </div>
        <button>Submit</button>
      </form> */}
      <div>{handleResult()}</div>
    </div>
  );
}

export default VoltageDrop;
