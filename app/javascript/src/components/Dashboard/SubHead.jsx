import React from "react";

import { Search, Plus } from "@bigbinary/neeto-icons";
import { Checkbox, Button, Dropdown, Input } from "@bigbinary/neetoui";
import { SubHeader } from "@bigbinary/neetoui/layouts";

const SubHead = ({
  searchWhichArticle,
  searchArticle,
  columnVisibility,
  setColumnVisibility,
}) => (
  <SubHeader
    rightActionBlock={
      <>
        <Input
          placeholder="Search"
          onChange={searchWhichArticle}
          value={searchArticle}
          prefix={<Search />}
        />
        <Dropdown
          buttonStyle="secondary"
          closeOnSelect={false}
          label="Columns"
          position="bottom-end"
        >
          <li>
            <Checkbox
              id="title"
              label="Title"
              checked={columnVisibility.title}
              onChange={() =>
                setColumnVisibility({
                  ...columnVisibility,
                  title: !columnVisibility.title,
                })
              }
            />
          </li>
          <li>
            <Checkbox
              id="date"
              label="Date"
              checked={columnVisibility.date}
              onChange={() =>
                setColumnVisibility({
                  ...columnVisibility,
                  date: !columnVisibility.date,
                })
              }
            />
          </li>
          <li>
            <Checkbox
              id="author"
              label="Author"
              checked={columnVisibility.author}
              onChange={() =>
                setColumnVisibility({
                  ...columnVisibility,
                  author: !columnVisibility.author,
                })
              }
            />
          </li>
          <li>
            <Checkbox
              id="category"
              label="Category"
              checked={columnVisibility.category}
              onChange={() =>
                setColumnVisibility({
                  ...columnVisibility,
                  category: !columnVisibility.category,
                })
              }
            />
          </li>
          <li>
            <Checkbox
              id="status"
              label="Status"
              checked={columnVisibility.status}
              onChange={() =>
                setColumnVisibility({
                  ...columnVisibility,
                  status: !columnVisibility.status,
                })
              }
            />
          </li>
          <li>
            <Checkbox
              id="action"
              label="Action"
              checked={columnVisibility.action}
              onChange={() =>
                setColumnVisibility({
                  ...columnVisibility,
                  action: !columnVisibility.action,
                })
              }
            />
          </li>
        </Dropdown>
        <Button
          onClick={() => history.push("/article/create")}
          label="Add New Article"
          icon={Plus}
          tooltipProps={{
            content: "Top",
            position: "top",
          }}
        />
      </>
    }
    className={"pt-6"}
  />
);
export default SubHead;
