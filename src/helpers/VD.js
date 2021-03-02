const dataValidation = (setError, state, errors) => {
  var errorFlag = false;
  // Power Factor Validation
  if (!(state.powerfactor >= 0) || !(state.powerfactor <= 1)) {
    errorFlag = true;
    setError((data) => ({
      ...data,
      powerfactor: "Power Factor must be a number between 0 and 1",
    }));
  } else if (errors.powerfactor !== null) {
    setError((data) => ({ ...data, powerfactor: null }));
  }
  // Voltage Validation
  if (state.voltage < 0 || state.voltage === undefined) {
    errorFlag = true;
    setError((data) => ({
      ...data,
      voltage: "Voltage must be a number greater than 0",
    }));
  } else if (errors.voltage !== null) {
    setError((data) => ({ ...data, voltage: null }));
  }
  // Current Validation
  if (state.current < 0 || state.current === undefined) {
    errorFlag = true;
    setError((data) => ({
      ...data,
      current: "Current must be a number greater than 0",
    }));
  } else if (errors.current != null) {
    setError((data) => ({ ...data, current: null }));
  }
  // Length Validation
  if (state.length < 0 || state.length === undefined) {
    errorFlag = true;
    setError((data) => ({
      ...data,
      length: "Length must be a number greater than 0",
    }));
  } else if (errors.length != null) {
    setError((data) => ({ ...data, power: null }));
  }
//   Parallel Sets 
  if (state.parallelSets < 0 || state.parallelSets === undefined) {
    errorFlag = true;
    setError((data) => ({
      ...data,
      parallelSets: "Parallel Sets must be a number greater than 0",
    }));
  } else if (errors.parallelSets != null) {
    setError((data) => ({ ...data, power: null }));
  }
  return !errorFlag;
};

export default {dataValidation};
