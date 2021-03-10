// primary navigation bar
import React from "react";
import "../css/NavigationBar.css";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <Navbar fixed="top" bg="dark" variant="dark" style={{padding: "0 20%", height: "70px"}}>
      <Navbar.Brand as={Link} to="/">
        <img
          src="https://avatars3.githubusercontent.com/u/42901002?s=460&v=4"
          width="45"
          style={{ margin: "0 10px" }}
          alt="logo"
        ></img>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/calculations">
            Calculations
          </Nav.Link>
          <Nav.Link as={Link} to="/references">
            References
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/contact">
            Contact
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Text>Electrical Engineering Tool Box</Navbar.Text>
      <i class="fa fa-github"></i>
    </Navbar>
  );
}

export default NavigationBar;
