import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { MenuBar } from "@bigbinary/neetoui/layouts";
import { Container } from "@bigbinary/neetoui/layouts";

import General from "./General";
import ManageCategories from "./ManageCategories";
import Redirections from "./Redirections";

import NavBar from "../NavBar";

const Settings = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [displayMenu, setDisplayMenu] = useState("General");

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
  const switchDisplay = () => {
    if (displayMenu === "General") {
      return <General />;
    } else if (displayMenu === "Redirections") {
      return <Redirections />;
    } else if (displayMenu === "Manage Category") {
      return <ManageCategories />;
    }

    return 1;
  };

  return (
    <div>
      <NavBar />
      <div className="flex">
        <MenuBar showMenu={showMenu}>
          <MenuBar.Item
            label="General"
            active
            description="Page Title, Brand Name & Meta Description "
            onClick={() => setDisplayMenu("General")}
          />
          <MenuBar.Item
            label="Redirections"
            description="Create & configure redirection rules"
            onClick={() => setDisplayMenu("Redirections")}
          />
          <MenuBar.Item
            label="Manage Categories"
            description="Edit and Reorder KB Structure"
            onClick={() => setDisplayMenu("Manage Category")}
          />
        </MenuBar>
        <Container>{switchDisplay()}</Container>
      </div>
    </div>
  );
};

export default Settings;
