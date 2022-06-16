import React, { useState, useEffect } from "react";

import { Typography } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui";
import { Checkbox } from "@bigbinary/neetoui";
import { Button } from "@bigbinary/neetoui";
import { PageLoader } from "@bigbinary/neetoui";

import settingsApi from "../../apis/settings";

const General = () => {
  const [fetchedSettings, setFetchedSettings] = useState([]);
  const [isPasswordThere, setIsPasswordThere] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const id = 1;
  const fetchSettings = async () => {
    try {
      const response = await settingsApi.list();
      setFetchedSettings(response.data.settings);
      setName(response.data.settings[0].name);
      if (response.data.settings[0].password) setIsPasswordThere(true);
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
      await settingsApi.update({
        id,
        payload: {
          name,
          password_digest: password,
        },
      });
      setLoading(false);
      // history.push("/");
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
        <div className="border-b mb-5"></div>
        <Checkbox
          checked={isPasswordThere}
          id="checkbox_name"
          label="Password Protect Knowledge Base"
          onChange={
            () => setIsPasswordThere(!isPasswordThere)
            // function noRefCheck() {}
          }
        />
        {isPasswordThere ? (
          <Input
            value={password}
            label="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
        ) : null}

        <Button label="Save Changes" type="submit" style="primary" />
        <Button
          label="Cancel"
          onClick={() => setIsPasswordThere(!isPasswordThere)}
          style="text"
        />
        {fetchedSettings}
      </form>
    </div>
  );
};
export default General;
