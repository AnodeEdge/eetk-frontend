import React from "react";
import { Container, Navbar } from "react-bootstrap";

function Footer(props) {
  return (
      <Navbar variant="light" bg="light" fixed="bottom">
        <Container>
          <Navbar.Brand>Footer</Navbar.Brand>
        </Container>
      </Navbar>
  );
}

export default Footer;
