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
      title: "Power / Current / Voltage Converter",
      description:
        "Calculator for converting between power, current, or voltage in AC systems including power factor, single phase, and three phase.",
      to: "/calculations/piv",
    },
    {
      title: "Voltage Drop",
      subtitle: "NEC Chapter 9 Table 9",
      description:
        "Determine voltage drop based on the conductor size, length, material, quantity, and conduit material.",
      to: "/calculations/voltagedrop",
    },
    {
      title: "Conduit Fill and Jam Ratio",
      subtitle: "NEC Chapter 9 Table 4 & 5",
      description:
        "Calculate conduit fill percentage and jam ratio.",
      to: "/calculations/conduitfill",
    },
  ];

  return (
    <div>
      {showTiles && (
        <>
          <h2 style={{ textAlign: "center", margin: "1%" }}>Calculations</h2>
          <TileGrid
            TileData={calculatorTileData}
            handleSelection={handleSelection}
          />
        </>
      )}
      {!showTiles && <CalcRoutes setShowTiles={setShowTiles} />}
    </div>
  );
}

export default Calculations;
