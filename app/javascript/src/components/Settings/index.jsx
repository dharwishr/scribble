import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { MenuBar } from "@bigbinary/neetoui/layouts";
import { Container } from "@bigbinary/neetoui/layouts";

import NavBar from "../NavBar";

const Settings = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    setShowMenu(!showMenu);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="flex">
        <MenuBar showMenu={showMenu} title="Articles">
          <MenuBar.Item
            label="General"
            active
            description="Page Title, Brand Name & Meta Description "
          />
          <MenuBar.Item
            label="Redirections"
            description="Create & configure redirection rules"
          />
          <MenuBar.Item
            label="Manage Categories"
            description="Edit and Reorder KB Structure"
          />
        </MenuBar>
        <Container></Container>
      </div>
    </div>
  );
};

export default Settings;
