import React from "react";
import { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui";
// import { Typography } from "@bigbinary/neetoui";
// import { useHistory } from "react-router-dom";
import { Accordion } from "@bigbinary/neetoui";
import { Header, MenuBar } from "@bigbinary/neetoui/layouts";
import { Container } from "@bigbinary/neetoui/layouts";

// import { Button } from "@bigbinary/neetoui";
import euiApi from "../../apis/eui";
// import ShowArticle from "./ShowArticle";
// const [showMenu, setShowMenu] = useState(false);
const Eui = () => {
  // const history = useHistory();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  // const [slug, setSlug] = useState()
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
  // const previewArticle = (urlSlug) => {
  //   setSlug(urlSlug)
  //   history.push(`/public/${slug}`)
  // }

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
        className="border ext-center sticky top-0 z-50"
        title={<span className="text-center">Spinkart</span>}
      ></Header>
      <MenuBar showMenu="true">
        <Accordion padded style="secondary" className="w-full p-0">
          {data && data.length > 0 ? (
            data
              .sort((a, b) => (a.position > b.position ? 1 : -1))
              .map(each => (
                <Accordion.Item title={each.category} key={each.position}>
                  {each.articles.map(article => (
                    <a key={article.id} className="w-full" href="">
                      {article.title}
                    </a>
                  ))}
                </Accordion.Item>
              ))
          ) : (
            <Accordion.Item title="No Data found"></Accordion.Item>
          )}
        </Accordion>
      </MenuBar>
    </Container>
  );
};
export default Eui;
