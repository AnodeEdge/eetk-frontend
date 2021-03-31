const dataValidation = (setError, state, errors) => {
  var errorFlag = false;
  // Power Factor Validation
  if (!(state.powerfactor >= 0) || !(state.powerfactor <= 1) || state.powerfactor === "") {
    errorFlag = true;
    setError((data) => ({
      ...data,
      powerfactor: "Number between 0 and 1",
    }));
  } else if (errors.powerfactor !== null) {
    setError((data) => ({ ...data, powerfactor: null }));
  }
  // Voltage Validation
  if (state.voltage < 0 || state.voltage === "") {
    errorFlag = true;
    setError((data) => ({
      ...data,
      voltage: "Number greater than 0",
    }));
  } else if (errors.voltage !== null) {
    setError((data) => ({ ...data, voltage: null }));
  }
  // Current Validation
  if (state.current < 0 || state.current === "") {
    errorFlag = true;
    setError((data) => ({
      ...data,
      current: "Number greater than 0",
    }));
  } else if (errors.current != null) {
    setError((data) => ({ ...data, current: null }));
  }
  // Length Validation
  if (state.length < 0 || state.length === "") {
    errorFlag = true;
    setError((data) => ({
      ...data,
      length: "Number greater than 0",
    }));
  } else if (errors.length != null) {
    setError((data) => ({ ...data, length: null }));
  }
//   Parallel Sets 
  if (state.parallelSets < 0 || state.parallelSets === "") {
    errorFlag = true;
    setError((data) => ({
      ...data,
      parallelSets: "Number greater than 0",
    }));
  } else if (errors.parallelSets != null) {
    setError((data) => ({ ...data, parallelSets: null }));
  }
  return !errorFlag;
};

export default {dataValidation};
