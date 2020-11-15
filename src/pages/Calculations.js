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

