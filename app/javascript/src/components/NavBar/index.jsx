import React from "react";

import { ExternalLink } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";

import NavItem from "./NavItem";

const NavBar = () => (
  <nav className="shadow bg-white">
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div className="flex h-16 justify-between">
        <div className="flex px-2 lg:px-0">
          <div className="hidden lg:flex">
            <NavItem name="Scribble" textColor="text-black-500" />
            <NavItem
              name="Articles"
              textColor="neeto-ui-text-gray-500 hover:text-indigo-500 active:text-indigo-500"
              path="/"
            />
            <NavItem
              name="Settings"
              textColor="neeto-ui-text-gray-500 hover:text-indigo-500 active:text-indigo-500"
              path="/tasks/create"
            />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button
            label="Preview"
            onClick={function noRefCheck() {}}
            icon={ExternalLink}
            style="secondary"
          />
        </div>
      </div>
    </div>
  </nav>
);

export default NavBar;