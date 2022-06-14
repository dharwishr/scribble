import React from "react";
import { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { Typography } from "@bigbinary/neetoui";
// import { useHistory } from "react-router-dom";
import { Accordion } from "@bigbinary/neetoui";
import { Header, MenuBar } from "@bigbinary/neetoui/layouts";
import { Container } from "@bigbinary/neetoui/layouts";

import euiApi from "../../apis/eui";
// const [showMenu, setShowMenu] = useState(false);
const Eui = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await euiApi.list();
      setData(response.data.categories);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // loadData();
    setLoading(false);
    fetchData();
    // setShowMenu(!showMenu);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container isHeaderFixed>
      <Header
        className="border text-center"
        title={<span className="text-center">Spinkart</span>}
      ></Header>
      <MenuBar showMenu="true">
        <div className="w-full">
          <Accordion padded style="secondary">
            {data && data.length > 0 ? (
              data
                .sort((a, b) => (a.position > b.position ? 1 : -1))
                .map(each => (
                  <Accordion.Item title={each.category} key={each.position}>
                    {each.articles.map(article => (
                      <Typography style="body2" key={article.id}>
                        {article.title}
                      </Typography>
                    ))}
                  </Accordion.Item>
                ))
            ) : (
              <Accordion.Item title="No Data found"></Accordion.Item>
            )}
          </Accordion>
        </div>
      </MenuBar>
    </Container>
  );
};
export default Eui;
