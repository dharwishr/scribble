import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { either, isEmpty, isNil } from "ramda";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import PrivateRoute from "components/Common/PrivateRoute";
import Dashboard from "components/Dashboard";
import Settings from "components/Settings";

import redirectionsApi from "./apis/redirections";
import CreateArticle from "./components/Articles/CreateArticle";
import EditArticle from "./components/Articles/EditArticle";
import Eui from "./components/Eui";
import GuestLogin from "./components/Eui/GuestLogin";
import { getFromLocalStorage } from "./utils/storage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const [redirections, setRedirections] = useState([]);
  const isLoggedIn = !either(isNil, isEmpty)(authToken);
  const fetchRedirections = async () => {
    try {
      const response = await redirectionsApi.list();

      setRedirections(response.data.redirections);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    /*eslint no-undef: "off"*/

    initializeLogger();

    setAuthHeaders(setLoading);
    registerIntercepts();
    fetchRedirections();
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
      <ToastContainer />
      <Switch>
        {redirections.map(each => (
          <Redirect key={each.id} from={`/${each.from}`} to={`/${each.to}`} />
        ))}
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/article/create" component={CreateArticle} />
        <Route exact path="/article/:slug/edit" component={EditArticle} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/login" component={GuestLogin} />
        <Route exact path="/public/:slug" component={Eui} />
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
