import React, { useState } from "react";

import { Search, Plus, Check, Close } from "@bigbinary/neeto-icons";
import { Typography, Input, Button } from "@bigbinary/neetoui";
import { MenuBar } from "@bigbinary/neetoui/layouts";

const Menu = ({
  counts,
  displayedArticles,
  sortArticles,
  searchWhichCategory,
  searchCategory,
  categoryTitle,
  setCategoryTitle,
  createCategory,
  foundCategories,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isInputCollapsed, setIsInputCollapsed] = useState(true);

  return (
    <MenuBar showMenu={true} title="Articles">
      <MenuBar.Block
        label="All"
        count={counts.total}
        active={displayedArticles.status === "All"}
        onClick={() => {
          sortArticles("All");
        }}
      />
      <MenuBar.Block
        label="Draft"
        count={counts.draft}
        active={displayedArticles.status === "draft"}
        onClick={() => {
          sortArticles("draft");
        }}
      />
      <MenuBar.Block
        label="Published"
        count={counts.published}
        active={displayedArticles.status === "published"}
        onClick={() => {
          sortArticles("published");
        }}
      />
      <MenuBar.SubTitle
        iconProps={[
          {
            icon: Search,
            onClick: () => setIsSearchCollapsed(false),
          },
          {
            icon: Plus,
            onClick: () => setIsInputCollapsed(false),
          },
        ]}
      >
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          CATEGORIES
        </Typography>
      </MenuBar.SubTitle>
      <MenuBar.Search
        type="search"
        onChange={searchWhichCategory}
        value={searchCategory}
        collapse={isSearchCollapsed}
        onCollapse={() => setIsSearchCollapsed(true)}
        placeholder="Search"
      />
      {!isInputCollapsed && (
        <div className="mb-4 flex">
          <Input
            type="search"
            placeholder="Add New Category"
            value={categoryTitle}
            onChange={e => setCategoryTitle(e.target.value)}
          />
          <Button
            size="large"
            style="text"
            icon={Check}
            onClick={() => {
              createCategory();
              setIsInputCollapsed(true);
            }}
          />
          <Button
            size="large"
            style="text"
            icon={Close}
            onClick={() => {
              setIsInputCollapsed(true);
            }}
          />
        </div>
      )}
      {!foundCategories && (
        <MenuBar.Block
          key={"All"}
          label={"All"}
          active={displayedArticles.category === "All"}
          count={"10"}
          onClick={() => {
            sortArticles(displayedArticles.status, "All");
          }}
        />
      )}
      {foundCategories?.length ? (
        foundCategories.map(category => (
          <MenuBar.Block
            key={category.position}
            label={category.title}
            active={displayedArticles.category === category.title}
            count={category.count}
            onClick={() => {
              sortArticles(displayedArticles.status, category.title);
            }}
          />
        ))
      ) : (
        <Typography style="body2" className="text-center">
          No Category Found
        </Typography>
      )}
    </MenuBar>
  );
};
export default Menu;
