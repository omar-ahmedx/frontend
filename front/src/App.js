import React from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import Manage from "./manage";
import Create from "./create";
import "./css/style.css";
function App() {
  return (
    <div className="main-container">
      <BrowserRouter>
        <nav>
          <NavLink
            exact
            className="links"
            activeClassName="selected"
            to="/"
          >
            Manage
          </NavLink>
          <NavLink
            exact
            className="links"
            activeClassName="selected"
            to="/create"
          >
            Create
          </NavLink>
        </nav>
        <Switch>
          <Route exact path="/" component={Manage} />
          <Route exact path="/create" component={Create} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
