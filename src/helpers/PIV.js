const calculate3PhasePower = (data) => {
  return {
    stateID: "power",
    value: (Math.sqrt(3) * data.current * data.voltage * data.powerfactor).toFixed(2)
  }; 
}

const calculate1PhasePower = (data) => {
  return {
    stateID: "power",
    value: (data.current * data.voltage * data.powerfactor).toFixed(2)
  };
}

const calculate3PhaseCurrent = (data) => {
  return {
    stateID: "current",
    value: (data.power / (Math.sqrt(3) * data.voltage * data.powerfactor)).toFixed(2)
  }
}

const calculate1PhaseCurrent = (data) => {
  return {
    stateID: "current",
    value: (data.power / ( data.voltage * data.powerfactor)).toFixed(2)
  }
}

const calculate3PhaseVoltage = (data) => {
  return {
    stateID: "voltage",
    value: (data.power / ( data.current * data.powerfactor * Math.sqrt(3) )).toFixed(2)
  }
} 

const calculate1PhaseVoltage = (data) => {
  return {
    stateID: "voltage",
    value: (data.power / ( data.current * data.powerfactor )).toFixed(2)
  }
} 

const dataValidation = (setError, state, errors) => {
  var errorFlag = false
  // Power Factor Validation
  if (!(state.powerfactor >= 0) || !(state.powerfactor <= 1)) {
    errorFlag = true
    setError((data) => ({
      ...data,
      powerfactor: "Power Factor must be a number between 0 and 1",
    }));
  } else if (errors.powerfactor !== null) {
    setError((data) => ({ ...data, powerfactor: null }));
  }
  // Voltage Validation
  if (
    (state.voltage < 0 || state.voltage === undefined) &&
    state.calctype !== "voltage"
  ) {
    errorFlag = true
    setError((data) => ({
      ...data,
      voltage: "Voltage must be a number greater than 0",
    }));
  } else if (errors.voltage !== null) {
    setError((data) => ({ ...data, voltage: null }));
  }
  // Current Validation
  if (
    (state.current < 0 || state.current === undefined) &&
    state.calctype !== "current"
  ) {
    errorFlag = true
    setError((data) => ({
      ...data,
      current: "Current must be a number greater than 0",
    }));
  } else if (errors.current != null) {
    setError((data) => ({ ...data, current: null }));
  }
  // Power Validation
  if (
    (state.power < 0 || state.power === undefined) &&
    state.calctype !== "power"
  ) {
    errorFlag = true
    setError((data) => ({
      ...data,
      power: "Power must be a number greater than 0",
    }));
  } else if (errors.power != null) {
    setError((data) => ({ ...data, power: null }));
  }
  return !errorFlag;
}

const selectCalculation = (setStateValues, state) => {
  if (state.phase === "three") {
    if (state.calctype === "voltage") {
      setStateValues(calculate3PhaseVoltage(state));
    } else if (state.calctype === "current") {
      setStateValues(calculate3PhaseCurrent(state));
    } else {
      setStateValues(calculate3PhasePower(state));
    }
  } else {
    if (state.calctype === "voltage") {
      setStateValues(calculate1PhaseVoltage(state));
    } else if (state.calctype === "current") {
      setStateValues(calculate1PhaseCurrent(state));
    } else {
      setStateValues(calculate1PhasePower(state));
    }
  }
};

export default {
  dataValidation,
  selectCalculation,
}
