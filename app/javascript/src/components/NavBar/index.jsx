import React from "react";

import { ExternalLink } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";
import { useHistory, Link } from "react-router-dom";

import NavItem from "./NavItem";

const NavBar = () => {
  const history = useHistory();

  return (
    <nav className="border sticky top-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex px-2 lg:px-0">
            <div className="hidden lg:flex">
              <Link
                className="mr-3 inline-flex items-center px-1 text-sm font-semibold leading-5 hover:text-indigo-500"
                to="/"
              >
                Scribble
              </Link>
              <NavItem name="Articles" path="/" />
              <NavItem name="Settings" path="/settings" />
              <NavItem name="Analytics" path="/analytics" />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Button
              label="Preview"
              onClick={() => history.push("/eui/")}
              icon={ExternalLink}
              style="secondary"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
