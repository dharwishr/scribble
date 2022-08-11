import React, { useState } from "react";

import { Search, Plus, Check, Close } from "@bigbinary/neeto-icons";
import { Typography, Input, Button } from "@bigbinary/neetoui";
import { MenuBar } from "@bigbinary/neetoui/layouts";

import { searchWithTitle } from "common/utils";

const Menu = ({
  counts,
  displayedArticles,
  categories,
  setDisplayedArticles,
  categoryTitle,
  setCategoryTitle,
  createCategory,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isInputCollapsed, setIsInputCollapsed] = useState(true);
  const [searchCategory, setSearchCategory] = useState("");

  const searchInputOnCollapse = () => {
    setSearchCategory("");
    setIsSearchCollapsed(true);
  };

  return (
    <MenuBar showMenu={true} title="Articles">
      <MenuBar.Block
        label="All"
        count={counts.total}
        active={displayedArticles.status === "All"}
        onClick={() => {
          setDisplayedArticles({ ...displayedArticles, status: "All" });
        }}
      />
      <MenuBar.Block
        label="Draft"
        count={counts.draft}
        active={displayedArticles.status === "draft"}
        onClick={() => {
          setDisplayedArticles({ ...displayedArticles, status: "draft" });
        }}
      />
      <MenuBar.Block
        label="Published"
        count={counts.published}
        active={displayedArticles.status === "published"}
        onClick={() => {
          setDisplayedArticles({ ...displayedArticles, status: "published" });
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
        onChange={e => setSearchCategory(e.target.value)}
        value={searchCategory}
        collapse={isSearchCollapsed}
        onCollapse={searchInputOnCollapse}
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
      {categories && (
        <MenuBar.Block
          key={"All"}
          label={"All"}
          active={displayedArticles.category === "All"}
          count={"10"}
          onClick={() => {
            setDisplayedArticles({
              ...displayedArticles,
              category: "All",
            });
          }}
        />
      )}
      {searchWithTitle(categories, searchCategory)?.length ? (
        searchWithTitle(categories, searchCategory).map(category => (
          <MenuBar.Block
            key={category.position}
            label={category.title}
            active={displayedArticles.category === category.title}
            count={category.count}
            onClick={() => {
              setDisplayedArticles({
                ...displayedArticles,
                category: category.title,
              });
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
