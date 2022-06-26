import React, { useState, useEffect } from "react";

import {
  Typography,
  Input,
  Checkbox,
  Button,
  PageLoader,
} from "@bigbinary/neetoui";

import organizationsApi from "../../apis/organizations";

const General = () => {
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState();
  const [password, setPassword] = useState();

  const fetchSettings = async () => {
    try {
      const response = await organizationsApi.get();
      setName(response.data.site_name);
      setIsPasswordEnabled(response.data.is_password_enabled);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await organizationsApi.update({
        payload: {
          name,
          password,
          password_enabled: isPasswordEnabled,
        },
      });
      setLoading(false);
    } catch (error) {
      logger.error(error);
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
          label="Site Name"
          value={name}
          onChange={e => setName(e.target.value)}
          helpText="Customize the site name which is used to show the site name in Open Graph Tags."
        />
        <div className="border-b mt-5 mb-5"></div>
        <Checkbox
          checked={isPasswordEnabled}
          id="checkbox_name"
          label="Password Protect Knowledge Base"
          onChange={() => setIsPasswordEnabled(true)}
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
