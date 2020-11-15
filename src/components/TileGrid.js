import React from "react";
import { Link } from "react-router-dom";
import "../css/TileGrid.css";

function Tile(props) {
  const handleClick = (evt) => {
    props.handleSelection(true)
  };

  return (
    <div className="card w3-card w3-hover-shadow" onClick={handleClick}>
      <Link to={props.to}>
        <header className="w3-container">
          <h6>{props.title}</h6>
        </header>
        <div className="w3-container">
          <p>{props.description}</p>
        </div>
      </Link>
    </div>
  );
}

function TileGrid(props) {
  return (
    <div className="tile-grid">
      {props.TileData.map((data) => (
        <Tile 
        title={data.title} 
        description={data.description}
        to={data.to}
        handleSelection={props.handleSelection}
        ></Tile>
      ))}
    </div>
  );
}

export default TileGrid;
