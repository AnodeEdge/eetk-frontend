import React from "react";
import CalcRoutes from "../routes/CalcRoutes";
import "../css/Calculations.css";
import TileGrid from "../components/TileGrid";

function Calculations(props) {
  const { setShowTiles, showTiles } = props;
  const handleSelection = (isSelected) => {
    setShowTiles(!isSelected);
  };

  const calculatorTileData = [
    {
      title: "Power / Current / Voltage Calc",
      description:
        "Calculator for converting between power, current, or voltage in AC systems including power factor, single phase, and three phase.",
      to: "/calculations/piv",
    },
    {
      title: "Voltage Drop",
      description:
        "Determine voltage drop due to conductor size, length, material, and conduit material using NEC Chapter 9 Table 9",
      to: "/calculations/voltagedrop",
    },
    {
      title: "Conduit Fill",
      description: "Calculate conduit fill percentage and jam ratio using NEC Chapter 9 Table 5 and Table 5",
      to: "/calculations/conduitfill"
    }
  ];

  return (
    <div>
      {showTiles && (
        <TileGrid
          TileData={calculatorTileData}
          handleSelection={handleSelection}
        />
      )}
      {!showTiles && <CalcRoutes setShowTiles={setShowTiles} />}
    </div>
  );
}

export default Calculations;
