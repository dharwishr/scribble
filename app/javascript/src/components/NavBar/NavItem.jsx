import React from "react";

import { Link } from "react-router-dom";

const NavItem = ({ iconClass, name, path, textColor }) => (
  <Link
    to={path}
    className="mr-3 inline-flex items-center px-1 pt-1
      text-sm font-semibold leading-5"
  >
    {iconClass && <i className={`${iconClass}`}></i>}
    <span className={`${textColor}`}>{name}</span>
  </Link>
);

export default NavItem;
