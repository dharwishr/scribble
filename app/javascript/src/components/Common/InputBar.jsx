import React from "react";

import { Close, Check } from "@bigbinary/neeto-icons";
import { Input } from "@bigbinary/neetoui";
import { Button } from "@bigbinary/neetoui";
import PropTypes from "prop-types";

const InputBar = ({
  collapse = true,
  onCollapse,
  category,
  setCategory,
  handleSubmit,
  ...props
}) =>
  !collapse && (
    <div className="neeto-ui-menubar__search">
      <Input
        type="search"
        placeholder="Add New Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        {...props}
      />
      <Button size="large" style="text" icon={Check} onClick={handleSubmit} />
      <Button size="large" style="text" icon={Close} onClick={onCollapse} />
    </div>
  );

InputBar.propTypes = {
  ...Input.propTypes,
  /**
   * To specify whether the search field is collapsed
   */
  collapse: PropTypes.bool,
  /**
   * To provide a callback function on collapse of the search field
   */
  onCollapse: PropTypes.func,
};

export default InputBar;
