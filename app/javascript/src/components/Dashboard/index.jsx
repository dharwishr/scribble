import React, { useState, useEffect } from "react";

import { Plus, Search } from "@bigbinary/neeto-icons";
import { PageLoader } from "@bigbinary/neetoui";
import { Typography } from "@bigbinary/neetoui";
import { Button } from "@bigbinary/neetoui";
import { Dropdown } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui";
import { MenuBar } from "@bigbinary/neetoui/layouts";
import { Container } from "@bigbinary/neetoui/layouts";
import { SubHeader } from "@bigbinary/neetoui/layouts";
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
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState();
  const [foundCategories, setFoundCategories] = useState();

  const fetchTasks = async () => {
    try {
      const response = await articlesApi.list();
      setTasks(response.data.tasks);
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
    await fetchTasks();
    await fetchCategories();
  };
  const searchFilter = e => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = categories.filter(each =>
        each.category.toLowerCase().startsWith(keyword.toLowerCase())
      );
      setFoundCategories(results);
    } else {
      setFoundCategories(categories);
    }
    setSearch(keyword);
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

  // if (either(isNil, isEmpty)(tasks)) {
  //   return (
  //     <Container>
  //       <h1 className="text-center text-xl leading-5">
  //         You have no tasks assigned 😔
  //       </h1>
  //     </Container>
  //   );
  // }

  return (
    <div>
      <NavBar />
      <div className="flex">
        <MenuBar showMenu={showMenu} title="Articles">
          <MenuBar.Block label="All" count={13} active />
          <MenuBar.Block label="Draft" count={2} />
          <MenuBar.Block label="Published" count={7} />

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
            onChange={searchFilter}
            value={search}
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
            foundCategories.map(each => (
              <MenuBar.Block key={each.id} label={each.category} count={80} />
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
                  // onChange={(e) => setInput(e.target.value)}
                  prefix={<Search />}
                  // value={input}
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
          <p>{tasks}</p>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
