/* eslint-disable react/jsx-no-target-blank */
/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
// import { NavLink } from 'react-router-dom';
// import Routes from './Routes.jsx';


import {
  Navbar, Nav, NavItem, NavDropdown,
  MenuItem, Glyphicon,
  Grid,

} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Routes from './Routes.jsx';
import ProductAddNavItem from './ProductAddNavItem.jsx';

function NavBar() {
  return (
    <Navbar fluid>
      <Navbar.Header>
        <Navbar.Brand>Product Tracker</Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer exact to="/">
          <NavItem>Home</NavItem>
        </LinkContainer>
        <LinkContainer to="/products">
          <NavItem>Product List</NavItem>
        </LinkContainer>

      </Nav>
      <Nav pullRight>
        <ProductAddNavItem />
        <NavDropdown
          id="user-dropdown"
          title={<Glyphicon glyph="option-vertical" />}
          noCaret
        >
          <LinkContainer to="/about">
            <MenuItem>About</MenuItem>
          </LinkContainer>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

function Footer() {
  return (
    <small>
      <hr />
      <p className="text-center">
        Full source code available at this
        {' '}
        <a href="https://github.com/sahithiartala/Assignment-6" target="_blank">
          GitHub repository
        </a>
      </p>
    </small>
  );
}


export default function Page() {
  return (
    <div>
      <Grid fluid>
        <NavBar />
        <Routes />
        <Footer />
      </Grid>
    </div>
  );
}
