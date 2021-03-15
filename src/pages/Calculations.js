import React from "react";
import CalcRoutes from "../routes/CalcRoutes";
import "../css/Calculations.css";
import { TileGrid } from "../components/TileGrid";
import { Fade } from "react-bootstrap";

const calculatorTileData = [
  {
    title: "Power, Current, and Voltage Conversion",
    description:
      "Calculator to convert between power, voltage, and current in AC systems including power factor, single phase, and three phase formulation using Ohm's Law",
    to: "/calculations/piv",
  },
  {
    title: "Voltage Drop",
    description:
      "Determine voltage drop based on the conductor size, length, material, quantity, and conduit material",
    to: "/calculations/voltagedrop",
  },
  {
    title: "Conduit Fill and Jam Ratio",
    description: "Calculate conduit fill percentage and jam ratio.",
    to: "/calculations/conduitfill",
  },
];


function Calculations(props) {
  const { setShowTiles, showTiles } = props;
  const handleSelection = (isSelected) => {
    setShowTiles(!isSelected);
  };

  return (
    <div>
      {showTiles && (
        <>
          <div style={{ textAlign: "center", margin: "1%" }}>
            <h2>Calculations</h2>
            <text>
              Simple calculation tools to help aid in electrical design and engineering.
            </text>
          </div>
          <TileGrid
            TileData={calculatorTileData}
            handleSelection={handleSelection}
          />
        </>
      )}
      {/* <Fade in={!showTiles}>
        <CalcRoutes setShowTiles={setShowTiles}/>
      </Fade> */}
      {/* <Fade in={!showTiles}>This is a test</Fade> */}

      {!showTiles && <CalcRoutes  setShowTiles={setShowTiles}/>}
    </div>
  );
}

export default Calculations;
