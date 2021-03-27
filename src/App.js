import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ProfileDetail from "./pages/ProfileDetail";

function App() {
  return (
    <BrowserRouter>
      {/* <Container> */}
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" component={Auth} />
          <Route path="/profileDetail/:id" component={ProfileDetail} />
        </Switch>
      {/* </Container> */}
    </BrowserRouter>
  );
}

export default App;
