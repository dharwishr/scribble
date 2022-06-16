import React, { useState, useEffect } from "react";

import { Plus, Search } from "@bigbinary/neeto-icons";
import {
  PageLoader,
  Table,
  Typography,
  Button,
  Dropdown,
  Input,
} from "@bigbinary/neetoui";
import { MenuBar, Container, SubHeader } from "@bigbinary/neetoui/layouts";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import InputBar from "../Common/InputBar";
import NavBar from "../NavBar";

const Dashboard = () => {
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isInputCollapsed, setIsInputCollapsed] = useState(true);
  const [articles, setArticles] = useState([]);
  const [searchArticle, setSearchArticle] = useState();
  const [foundArticles, setFoundArticles] = useState([]);
  const [category, setCategory] = useState();
  const [searchCategory, setSearchCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [foundCategories, setFoundCategories] = useState();
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    draft: "",
    published: "",
    total: "",
  });
  const fetchArticles = async () => {
    try {
      const response = await articlesApi.list();
      setArticles(response.data.articles);
      setFoundArticles(response.data.articles);
      setCounts({
        draft: response.data.articles["draft_count"],
        published: response.data.articles["published_count"],
        total:
          response.data.articles["draft_count"] +
          response.data.articles["published_count"],
      });
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.list();
      setCategories(response.data.categories);
      setFoundCategories(response.data.categories);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await categoriesApi.create({
        category: { category },
      });
    } catch (error) {
      logger.error(error);
    }
    setIsInputCollapsed(true);
    loadData();
  };

  const loadData = async () => {
    try {
      await fetchArticles();
      await fetchCategories();
    } catch (error) {
      logger.error(error);
    } finally {
      setFoundArticles(articles);
    }
  };

  const searchWhichCategory = e => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = categories.filter(each =>
        each.category.toLowerCase().startsWith(keyword.toLowerCase())
      );
      setFoundCategories(results);
    } else {
      setFoundCategories(categories);
    }
    setSearchCategory(keyword);
  };

  const searchWhichArticle = e => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = articles.filter(article =>
        article.title.toLowerCase().startsWith(keyword.toLowerCase())
      );
      setFoundArticles(results);
    } else {
      setFoundArticles(articles);
    }
    setSearchArticle(keyword);
  };

  useEffect(() => {
    loadData();
    setLoading(false);
    setShowMenu(!showMenu);
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
      <NavBar></NavBar>
      <div className="flex">
        <MenuBar showMenu={showMenu} title="Articles">
          <MenuBar.Block label="All" count={counts.total} active />
          <MenuBar.Block label="Draft" count={counts.draft} />
          <MenuBar.Block label="Published" count={counts.published} />

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
          {foundCategories && foundCategories.length > 0 ? (
            foundCategories
              .sort((a, b) => (a.position > b.position ? 1 : -1))
              .map(each => (
                <MenuBar.Block
                  key={each.position}
                  label={each.category}
                  count={each.count}
                />
              ))
          ) : (
            <MenuBar.Block label="No Category Found" />
          )}
        </MenuBar>
        <Container>
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
                  label="Columns"
                  position="bottom-end"
                >
                  <li>Option 1</li>
                  <li>Option 2</li>
                  <li>Option 3</li>
                  <li>Option 4</li>
                  <li>Option 5</li>
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
          <Table
            columnData={[
              {
                dataIndex: "title",
                key: "title",
                title: "TITLE",
                width: 75,
              },

              {
                dataIndex: "date",
                key: "date",
                title: "DATE",
                width: 75,
              },
              {
                dataIndex: "author",
                key: "author",
                title: "AUTHOR",
                width: 75,
              },
            ]}
            currentPageNumber={1}
            defaultPageSize={10}
            handlePageChange={function noRefCheck() {}}
            onRowClick={function noRefCheck() {}}
            onRowSelect={function noRefCheck() {}}
            rowData={[]}
          />
        </Container>
        {logger.error(foundArticles)}
      </div>
    </div>
  );
};

export default Dashboard;
