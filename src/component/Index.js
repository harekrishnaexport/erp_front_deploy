import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from './api/Index'
import Login from "./authenticate/Login";
import Signup from "./authenticate/Signup";

const Index = () => {
  return <>
    <Router>
      <Switch>
        <Route exact path="/">
        <Login />
        </Route>
        <Route path="/signup">
        <Signup />
        </Route>
        <App path="/app"/>
      </Switch>
    </Router>
  </>;
};

export default Index;
