import React from "react";
import { Link } from "react-router-dom";
// import "../css/TileGrid.css";


function Tile(props) {
  const handleClick = (evt) => {
    props.handleSelection(true)
  };

  return (
    <div className="card" style={{}} onClick={handleClick}>
      <Link className="card-body" style={{color: "black"}}to={props.to}>
        <header className="card-title">
          <h4>{props.title}</h4>
          <h5>{props.subtitle}</h5>
        </header>
        <div className="card-text">
          <p>{props.description}</p>
        </div>
      </Link>
    </div>
  );
}

function TileGrid(props) {
  return (
    <div className="card-group w-50" style={{margin: "auto"}}>
      {props.TileData.map((data) => (
        <Tile 
        title={data.title} 
        description={data.description}
        to={data.to}
        handleSelection={props.handleSelection}
        subtitle={data.subtitle}
        ></Tile>
      ))}
    </div>
  );
}

export default TileGrid;
