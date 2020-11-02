import React from "react";
import "../css/TileGrid.css";

function Tile(props) {
  const onClick = (evt) => {};

  return (
    <div className="card w3-card w3-hover-shadow">
      <header className="w3-container">
        <h6>{props.title}</h6>
      </header>
      <div className="w3-container">
        <p>{props.description}</p>
      </div>
    </div>
  );
}

function TileGrid(props) {
  return (
    <div className="tile-grid">
      {props.calculatorTileData.map((data) => (
        <Tile title={data.title} description={data.description}></Tile>
      ))}
    </div>
  );
}

export default TileGrid;
