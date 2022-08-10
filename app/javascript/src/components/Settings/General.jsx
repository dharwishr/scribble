import React, { useState, useEffect } from "react";

import {
  Typography,
  Input,
  Checkbox,
  Button,
  PageLoader,
} from "@bigbinary/neetoui";

import organizationsApi from "apis/organizations";

const General = () => {
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [organizationName, setOrganizationName] = useState();
  const [password, setPassword] = useState();

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await organizationsApi.get();
      setOrganizationName(response.data.organization_name);
      setIsPasswordEnabled(response.data.is_password_enabled);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await organizationsApi.update({
        payload: {
          name: organizationName,
          password,
          is_password_enabled: isPasswordEnabled,
        },
      });
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 space-y-5">
      <Typography style="h2">General Settings</Typography>
      <Typography style="body2">
        Configure general attributes of Scribble.
      </Typography>
      <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
        <Input
          label="Organization Name"
          value={organizationName}
          onChange={e => setOrganizationName(e.target.value)}
          helpText="Customize the Organization Name which is used to show as the site name in Open Graph Tags."
        />
        <div className="border-b mt-5 mb-5"></div>
        <Checkbox
          checked={isPasswordEnabled}
          id="checkbox_name"
          label="Password Protect Knowledge Base"
          onChange={() => {
            setIsPasswordEnabled(
              prevIsPasswordEnabled => !prevIsPasswordEnabled
            );
          }}
        />
        {isPasswordEnabled ? (
          <Input
            value={password}
            label="Password"
            type="password"
            className="mt-3"
            onChange={e => setPassword(e.target.value)}
          />
        ) : null}
        <div className="mt-3">
          <Button label="Save Changes" type="submit" style="primary" />
          <Button
            label="Cancel"
            onClick={() => setIsPasswordEnabled(false)}
            style="text"
          />
        </div>
      </form>
    </div>
  );
};
export default General;
