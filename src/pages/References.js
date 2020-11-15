import React from "react";
import CalcRoutes from "../routes/CalcRoutes";
import TileGrid from "../components/TileGrid";

function References(props){
  const { setShowTiles, showTiles } = props;
  const handleSelection = (isSelected) => {
    setShowTiles(!isSelected);
  };

  const refTileData = [
    {
      title: "Reference",
      description:
        "Description",
      to: "/references/ref",
    },
  ];

  return (
    <div>
      {showTiles && (
        <TileGrid
          TileData={refTileData}
          handleSelection={handleSelection}
        />
      )}
      {!showTiles && <CalcRoutes setShowTiles={setShowTiles} />}
    </div>
  );
}

export default References;
