import React from "react";
import { useState, useEffect } from "react";

import { PageLoader, Typography } from "@bigbinary/neetoui";
import { Input, Button } from "@bigbinary/neetoui";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import organizationsApi from "apis/organizations";
import LoginImage from "images/login.png";
import { setToLocalStorage } from "utils/storage";

const GuestLogin = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [organizationName, setOrganizationName] = useState();

  const fetchOrganizationName = async () => {
    try {
      setLoading(true);
      const response = await organizationsApi.get();
      setOrganizationName(response.data.organization_name);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await authApi.login({ password });
      setToLocalStorage({
        authToken: response.data.authentication_token,
      });
      setAuthHeaders();
      window.location.href = "/eui";
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizationName();
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
          {organizationName}
        </Typography>
      </nav>
      <div className="m-auto mt-10 max-w-md">
        <img src={LoginImage} alt="Login" className="m-auto mb-16 max-w-xs" />
        <Typography style="h2">
          {organizationName} is password protected!
        </Typography>
        <Typography style="body2" className="mb-5">
          Enter the password to gain access to {organizationName}
        </Typography>
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
          onClick={() => {
            handleSubmit();
          }}
        />
      </div>
    </>
  );
};
export default GuestLogin;
