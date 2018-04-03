import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import SaveFriend from "./SaveFriend";
import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <center>
        <div>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/add">Add</NavLink></li>
          </ul>
          <div className="content">
              <Route exact path="/" component={Home} />
              <Route path="/add" component={SaveFriend} />
              <Route path="/edit/:key" component={SaveFriend} />
          </div>
        </div>
        </center>
      </HashRouter>
    );
  }
}

export default App;
