import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui";
import { Checkbox } from "@bigbinary/neetoui";
import { Button } from "@bigbinary/neetoui";

const General = () => (
  <div className="mx-auto mt-10 space-y-5">
    <Typography style="h2">General Settings</Typography>

    <Typography style="body2">
      Configure general attributes of Scribble.
    </Typography>

    <Input
      label="Site Name"
      helpText="Customize the site name which is used to show the site name in Open Graph Tags."
    />
    <div className="border-b mb-5"></div>
    <Checkbox
      checked
      id="checkbox_name"
      label="Password Protect Knowledge Base"
      onChange={function noRefCheck() {}}
    />
    <Input label="Password" type="password" />
    <Button
      label="Save Changes"
      onClick={function noRefCheck() {}}
      style="primary"
    />
    <Button label="Cancel" onClick={function noRefCheck() {}} style="text" />
  </div>
);
export default General;
