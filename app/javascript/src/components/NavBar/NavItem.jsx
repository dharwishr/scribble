import React from "react";

import { NavLink } from "react-router-dom";

const NavItem = ({ name, path }) => (
  <NavLink
    exact={path === "/"}
    to={path}
    className="mr-3 inline-flex items-center px-1 text-sm font-semibold leading-5 hover:text-indigo-500"
    activeStyle={{
      fontWeight: "bold",
      color: "#667eea",
    }}
  >
    {name}
  </NavLink>
);

export default NavItem;
