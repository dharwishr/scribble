import React from "react";
import { useState, useEffect } from "react";

import { PageLoader, Typography } from "@bigbinary/neetoui";
import { Input, Button } from "@bigbinary/neetoui";

import { setAuthHeaders } from "apis/axios";

import authApi from "../../apis/auth";
import settingsApi from "../../apis/settings";
import LoginImage from "../../images/login.png";
import { setToLocalStorage } from "../../utils/storage";

const GuestLogin = () => {
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(true);
  const [siteName, setSiteName] = useState();

  const fetchSiteName = async () => {
    try {
      const response = await settingsApi.list();
      setSiteName(response.data.site_name);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await authApi.login({ login: { password } });
      setToLocalStorage({
        authToken: response.data.authentication_token,
      });
      setAuthHeaders();
      setLoading(false);
      // window.location.href = "/";
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSiteName();
  }, []);
  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <nav className="border max-w-7xl sticky top-0 mx-auto flex h-20 bg-white px-4">
        <Typography style="h3" className="m-auto">
          {siteName}
        </Typography>
      </nav>

      <div className="m-auto mt-10 max-w-md">
        <img src={LoginImage} alt="Login" className="m-auto mb-16 max-w-xs" />
        <Typography style="h2">{siteName} is password protected!</Typography>
        <Typography style="body2" className="mb-5">
          Enter the password to gain access to {siteName}
        </Typography>
        {/* <form onSubmit={}> */}
        <Input
          className="mb-6"
          required
          type="password"
          id="user_password"
          label="Password"
          value={password}
          placeholder="******"
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          label="Continue"
          type="submit"
          style="primary"
          onClick={() => handleSubmit()}
        />
        {/* </form> */}
      </div>
    </>
  );
};
export default GuestLogin;
