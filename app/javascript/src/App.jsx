import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import Dashboard from "components/Dashboard";
import Settings from "components/Settings";

import CreateArticle from "./components/Articles/CreateArticle";
import EditArticle from "./components/Articles/EditArticle";
import Eui from "./components/Eui";

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    /*eslint no-undef: "off"*/
    initializeLogger();
    setAuthHeaders(setLoading);
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
        <Route exact path="/public" component={Eui} />
        <Route exact path="/public/:slug" component={Eui} />
      </Switch>
    </Router>
  );
};

export default App;
