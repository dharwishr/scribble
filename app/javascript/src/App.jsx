import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import PrivateRoute from "components/Common/PrivateRoute";
import Dashboard from "components/Dashboard";
import Settings from "components/Settings";

import CreateArticle from "./components/Articles/CreateArticle";
import EditArticle from "./components/Articles/EditArticle";
import Eui from "./components/Eui";
import GuestLogin from "./components/Eui/GuestLogin";
import { getFromLocalStorage } from "./utils/storage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);
  useEffect(() => {
    /*eslint no-undef: "off"*/
    initializeLogger();
    setAuthHeaders(setLoading);
    registerIntercepts();
    // logger.info("Never use console.log");
    // logger.error("Never use console.error");
  }, []);
  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/article/create" component={CreateArticle} />
        <Route exact path="/article/:slug/edit" component={EditArticle} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/login" component={GuestLogin} />
        <PrivateRoute
          path="/public/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Eui}
        />
      </Switch>
    </Router>
  );
};

export default App;
