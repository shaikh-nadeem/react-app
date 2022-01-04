import React from 'react';
import { BrowserRouter as Router, Link, Routes , Route } from 'react-router-dom';
import { Button, Navbar, Container, Nav, NavDropdown, Item, Form, FormControl, Divider} from 'react-bootstrap';
import Home from './pages/Home';
import Faq from './pages/Faq';
import Help from './pages/Help';
import Contact from './pages/Contact';
import Login from './pages/forms/login';
import Register from './pages/forms/register'

let App = () => {

  var paddingLeft = { paddingLeft: '10px' };
  return (
    <Router>    
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">CarTreck</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll>
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/faq">Faq</Nav.Link>
              <Nav.Link href="/help">Help</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="login">Login</NavDropdown.Item>
                <NavDropdown.Item href="logout">LogOut</NavDropdown.Item>
                <NavDropdown.Item href="forgot-password">Forgot password</NavDropdown.Item>
                <NavDropdown.Item href="register">Register</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> 
      <Routes >      
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes >
    </Router>
  );
};

export default App;