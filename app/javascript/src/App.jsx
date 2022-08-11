import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import organizationsApi from "apis/organizations";
import { initializeLogger } from "common/logger";
import Analytics from "components/Analytics";
import CreateArticle from "components/Articles/CreateArticle";
import EditArticle from "components/Articles/EditArticle";
import PrivateRoute from "components/Common/PrivateRoute";
import Dashboard from "components/Dashboard";
import Eui from "components/Eui";
import GuestLogin from "components/Eui/GuestLogin";
import Settings from "components/Settings";
import { getFromLocalStorage } from "utils/storage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(true);
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  const fetchRedirections = async () => {
    try {
      setLoading(true);
      const organizations = await organizationsApi.get();
      setIsPasswordEnabled(organizations.data.is_password_enabled);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
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
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/article/create" component={CreateArticle} />
        <Route exact path="/article/:slug/edit" component={EditArticle} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/analytics" component={Analytics} />
        <Route exact path="/login" component={GuestLogin} />
        <Route exact path="/eui/:slug" component={Eui} />
        {isPasswordEnabled ? (
          <PrivateRoute
            path="/eui/"
            redirectRoute="/login"
            condition={isLoggedIn}
            component={Eui}
          />
        ) : (
          <Route exact path="/eui" component={Eui} />
        )}
      </Switch>
    </Router>
  );
};

export default App;
