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

import NavBar from "../NavBar";

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  // const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // const fetchTasks = async () => {
  //   try {
  //     const response = await articlesApi.list();
  //     setTasks(response.data.tasks);
  //     setLoading(false);
  //   } catch (error) {
  //     logger.error(error);
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    // fetchTasks();
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
                onClick: () => setIsSearchCollapsed(!isSearchCollapsed),
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
            collapse={isSearchCollapsed}
            onCollapse={() => setIsSearchCollapsed(true)}
          />
          <MenuBar.Block label="Europe" count={80} />
          <MenuBar.Block label="Middle-East" count={60} />
          <MenuBar.Block label="Asia" count={60} />
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
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
