import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { Container, MenuBar } from "@bigbinary/neetoui/layouts";

import NavBar from "components/NavBar";

import General from "./General";
import ManageCategories from "./ManageCategories";
import Redirections from "./Redirections";

const Settings = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [displayMenu, setDisplayMenu] = useState("General");

  const switchDisplay = () => {
    if (displayMenu === "General") {
      return <General />;
    } else if (displayMenu === "Redirections") {
      return <Redirections />;
    } else if (displayMenu === "Manage Category") {
      return <ManageCategories />;
    }

    return null;
  };

  useEffect(() => {
    setLoading(false);
    setShowMenu(true);
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
        <MenuBar showMenu={showMenu}>
          <MenuBar.Item
            label="General"
            active={displayMenu === "General"}
            description="Page Title, Brand Name & Meta Description "
            onClick={() => setDisplayMenu("General")}
          />
          <MenuBar.Item
            label="Redirections"
            active={displayMenu === "Redirections"}
            description="Create & configure redirection rules"
            onClick={() => setDisplayMenu("Redirections")}
          />
          <MenuBar.Item
            label="Manage Categories"
            active={displayMenu === "Manage Category"}
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
