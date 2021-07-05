import React from 'react';
import { Navbar, Nav, Form, Button, FormControl, NavDropdown} from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCookies } from 'react-cookie';

const Header = () => {
  const [token, setToken, removeToken] = useCookies(['mytoken']);

  const logout = () =>{
    removeToken('mytoken');
  }
  return (
   <>
  <Navbar bg="dark" variant="dark" expand="lg">
  <Navbar.Brand href="#">ASSIGNMENT.COM</Navbar.Brand>
  <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse id="navbarScroll">
    <Nav
      className="mr-auto my-2 my-md-0"
    >
      <NavLink  className="navitem" to="/">Home</NavLink>
      <NavLink className="navitem" to="/add" >
          Add Assignment
      </NavLink>
      <Form className="d-flex">
      <FormControl
        type="search"
        placeholder="Search"
        className="mr-2"
        aria-label="Search"
      />
      <Button variant="outline-success">Search</Button>
    </Form>
    </Nav>
    {token['mytoken']?
    (<Button className="btn btn-dark" onClick={logout}>Logout</Button>)
    :
    (<Nav bg="dark" variant="dark" expand="lg">
      <NavDropdown title="Login/SignUp " id="navbarScrollingDropdown" className="mr-3">
      <div class="dropdown-content">
      <NavLink  to="/login">Login</NavLink>
      <NavLink  to="/register">SignUp</NavLink>
      </div>
    </NavDropdown>
    </Nav>)}
  </Navbar.Collapse>
</Navbar>
</>
  );
};

export default Header;