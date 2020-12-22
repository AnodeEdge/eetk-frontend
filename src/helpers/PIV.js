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

export default {
  power3Phase: calculate3PhasePower,
  power1Phase: calculate1PhasePower,
  voltage3Phase: calculate3PhaseVoltage,
  voltage1Phase: calculate1PhaseVoltage,
  current3Phase: calculate3PhaseCurrent,
  current1Phase: calculate1PhaseCurrent
}
