import React, { useState } from "react";

import { Search, Plus } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui";
import { MenuBar } from "@bigbinary/neetoui/layouts";

import InputBar from "../Common/InputBar";

const Menu = ({
  showMenu,
  counts,
  displayedArticles,
  sortArticles,
  searchWhichCategory,
  searchCategory,
  category,
  setCategory,
  isInputCollapsed,
  setIsInputCollapsed,
  handleSubmit,
  loading,
  foundCategories,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);

  return (
    <MenuBar showMenu={showMenu} title="Articles">
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
            onClick: () => setIsSearchCollapsed(!isSearchCollapsed),
          },
          {
            icon: Plus,
            onClick: () => setIsInputCollapsed(!isInputCollapsed),
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
      <InputBar
        collapse={isInputCollapsed}
        category={category}
        handleSubmit={handleSubmit}
        loading={loading}
        setCategory={setCategory}
        onCollapse={() => setIsInputCollapsed(true)}
      />
      <MenuBar.Block
        key={"All"}
        label={"All"}
        active={displayedArticles.category === "All"}
        count={"10"}
        onClick={() => {
          sortArticles(displayedArticles.status, "All");
        }}
      />
      {foundCategories && foundCategories.length > 0 ? (
        foundCategories
          .sort((a, b) => (a.position > b.position ? 1 : -1))
          .map(each => (
            <MenuBar.Block
              key={each.position}
              label={each.category}
              active={displayedArticles.category === each.category}
              count={each.count}
              onClick={() => {
                sortArticles(displayedArticles.status, each.category);
              }}
            />
          ))
      ) : (
        <MenuBar.Block label="No Category Found" />
      )}
    </MenuBar>
  );
};
export default Menu;
