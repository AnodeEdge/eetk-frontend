
const calculate3PhasePower = (data) => {
  return {
    id: "power",
    value: Math.sqrt(3) * data.current * data.voltage * data.powerfactor
  }; 
}

const calculate1PhasePower = (data) => {
  return {
    id: "power",
    value: data.current * data.voltage * data.powerfactor
  };
}

const calculate3PhaseCurrent = (data) => {
  return {
    id: "current",
    value: data.power / (Math.sqrt(3) * data.voltage * data.powerfactor)
  }
}

const calculate1PhaseCurrent = (data) => {
  return {
    id: "current",
    value: data.power / ( data.voltage * data.powerfactor)
  }
}

const calculate3PhaseVoltage = (data) => {
  return {
    id: "voltage",
    value: data.power / ( data.current * data.powerfactor * Math.sqrt(3) )
  }
} 

const calculate1PhaseVoltage = (data) => {
  return {
    id: "voltage",
    value: data.power / ( data.current * data.powerfactor )
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
