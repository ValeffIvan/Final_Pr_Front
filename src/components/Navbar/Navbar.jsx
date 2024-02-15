import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineTeam,
  AiOutlineLogin,
  AiOutlineLogout 
} from "react-icons/ai";
import { useAuth } from "../../AuthVerify/AuthContext";

function NavBar() {

  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const {user, signout, isAuth} = useAuth();

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex">          
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>

            
            {user.role==="admin" && (
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/usuarios"
                  onClick={() => updateExpanded(false)}
                >
                  <AiOutlineTeam style={{ marginBottom: "2px" }} /> Usuarios
                </Nav.Link>
              </Nav.Item>
            )}

            {isAuth && (
              <Nav.Item className="d-flex align-items-center">
                <Dropdown show={showDropdown} onToggle={(isOpen) => setShowDropdown(isOpen)}>
                  <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                    <AiOutlineUser style={{ marginBottom: "2px" }} /> Perfil
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/perfil">
                      <AiOutlineUser style={{ marginRight: "5px" }} /> Mi Perfil
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                      signout();
                      setShowDropdown(false);
                    }}>
                      <AiOutlineLogout style={{ marginRight: "5px" }} /> Cerrar Sesión
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
            )}

            {!isAuth && (
              <Nav.Item>
                <Nav.Link as={Link} to="/login">
                  <AiOutlineLogin style={{ marginBottom: "2px" }} /> Iniciar Sesión
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
