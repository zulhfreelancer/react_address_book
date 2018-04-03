import React, { Component } from 'react';
import {
  Route,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import SaveFriend from "./SaveFriend";
import Navbar from "./Navbar";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="container">
          <Navbar/>
          <div className="row">
            <div className="col-md-12">
              <Route exact path="/" component={Home} />
              <Route path="/add" component={SaveFriend} />
              <Route path="/edit/:key" component={SaveFriend} />
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
