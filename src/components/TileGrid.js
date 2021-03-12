import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/TileGrid.css";

function Tile(props) {
  const handleClick = (evt) => {
    props.handleSelection(true);
  };

  return (
    <Card className="tile" onClick={handleClick}>
      <Link style={{ color: "black" }} to={props.to}>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle>{props.subtitle}</Card.Subtitle>
        <Card.Text>{props.description}</Card.Text>
      </Link>
    </Card>
  );
}

function TileGrid(props) {
  return (
    <div className="w-50" style={{margin: "0 auto", display: "grid", gridAutoRows: "1fr", gridTemplateColumns: "50% 50%"}}>
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

export { TileGrid, Tile };
