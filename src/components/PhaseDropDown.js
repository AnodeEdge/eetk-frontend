import React from "react";

function PhaseDropDown(props) {
  const [phase, setPhase] = React.useState(0);

  const handleChange = (evt) => {
    setPhase(evt.target.value);
    props.callback(
    {
      id: "phase",
      value: evt.target.value,
    });
  };

  return (
    <select value={phase} onChange={handleChange}>
      <option value="three">Three</option>
      <option value="single">Single</option>
    </select>
  );
}

export default PhaseDropDown;
