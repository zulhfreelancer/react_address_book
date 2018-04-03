import React, { Component } from 'react';
import {
  NavLink
} from "react-router-dom";

class Navbar extends Component {

  render() {
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="navbar-brand" exact to="/">AddressBook</NavLink>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <NavLink className="btn btn-success" to="/add">Add</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )}
}

export default Navbar;
