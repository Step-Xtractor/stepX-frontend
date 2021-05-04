import React from "react";
import { Switch } from "react-router-dom";

import Route from "./Route";

import Landing from "../pages/Landing";
import SignIn from "../pages/SignIn";
import ForgotPassword from "../pages/ForgotPassword";
import NoMatch from "../pages/NoMatch";


import Activities from "../pages/Activities";
import Roadmaps from "../pages/Roadmaps";
import Showtable from "../pages/Showtable";
import ShowtableProd from "../pages/Showtable/prod";

import Contracts from "../pages/Contracts";
import Amendments from "../pages/Amendments";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/recoverPassword" component={ForgotPassword} />
    <Route path="/landing" component={Landing} isPrivate />

    <Route path="/:id/showTable/prod" component={ShowtableProd} isPrivate />
    <Route path="/:id/showTable" component={Showtable} isPrivate />

    <Route path="/activities" component={Activities} isPrivate />
    <Route path="/roadmaps" component={Roadmaps} isPrivate />

    <Route path="/contracts" component={Contracts} isPrivate />
    
    <Route path="/amendments" component={Amendments} isPrivate />

    <Route component={NoMatch} />
  </Switch>
);

export default Routes;
