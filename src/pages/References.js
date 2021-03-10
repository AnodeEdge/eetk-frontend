import React from "react";
import RefRoutes from "../routes/RefRoutes";
import TileGrid from "../components/TileGrid";

function References(props) {
  const { setShowTiles, showTiles } = props;
  const handleSelection = (isSelected) => {
    setShowTiles(!isSelected);
  };

  const refTileData = [
    {
      title: "Reference",
      description: "Description",
      to: "/references/ref",
    },
    { title: "Reference", description: "Description", to: "/references/ref" },
    {
      title: "Equipment Grounding Conductors",
      subtitle: "NEC Table 250.122",
      description:
        "Minimum size equipment grounding conductors for grounding raceway and equipment",
      to: "/references/egc",
    },
  ];

  return (
    <div>
      {showTiles && (
        <>
          <h2 style={{ textAlign: "center", margin: "1%" }}>References</h2>
          <TileGrid TileData={refTileData} handleSelection={handleSelection} />
        </>
      )}
      {!showTiles && <RefRoutes setShowTiles={setShowTiles} />}
    </div>
  );
}

export default References;
