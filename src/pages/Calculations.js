import React from "react";
import { Link } from "react-router-dom";
import CalcRoutes from "../routes/CalcRoutes";
import "../css/Calculations.css";
import TileGrid from "../components/TileGrid";

function Calculations() {
  const [showTiles, setShowTiles] = React.useState(true);

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
      title: "Test Calc",
      description: "Lorem Ipsum...",
    },
    {
      title: "Test Calc",
      description: "Lorem Ipsum...",
    },
    {
      title: "Test Calc",
      description: "Lorem Ipsum...",
    },
  ];

  return (
    <>
      {showTiles && (
        <TileGrid
          calculatorTileData={calculatorTileData}
          handleSelection={handleSelection}
        />
      )}
      <CalcRoutes />
    </>
  );
}

export default Calculations;
{
  /* <Link to="/calculations/piv"></Link> */
}
