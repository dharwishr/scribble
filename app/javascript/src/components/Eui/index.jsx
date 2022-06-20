import React from "react";
import { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { Typography } from "@bigbinary/neetoui";
import { Accordion } from "@bigbinary/neetoui";
import { Label } from "@bigbinary/neetoui";
import { Tag } from "@bigbinary/neetoui";
import { MenuBar } from "@bigbinary/neetoui/layouts";
import { Container } from "@bigbinary/neetoui/layouts";
import { useParams } from "react-router-dom";

import euiApi from "../../apis/eui";
import settingsApi from "../../apis/settings";

const Eui = () => {
  const [article, setArticle] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [siteName, setSiteName] = useState();
  const { slug } = useParams();
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
  const fetchSiteData = async () => {
    try {
      const response = await settingsApi.list();
      setSiteName(response.data.site_name);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
  const fetchArticleDetails = async () => {
    try {
      const response = await euiApi.show(slug);
      setArticle(response.data);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // loadData();
    setLoading(false);
    fetchSiteData();
    fetchData();
    if (slug) {
      fetchArticleDetails();
    }

    // setShowMenu(!showMenu);
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <nav className="border max-w-7xl sticky top-0 mx-auto flex h-20 bg-white px-4">
        <Typography style="h3" className="m-auto">
          {siteName}
        </Typography>
      </nav>
      <div className="flex flex-row">
        <MenuBar showMenu="true">
          <div>
            <Accordion>
              {data && data.length > 0 ? (
                data
                  .sort((a, b) => (a.position > b.position ? 1 : -1))
                  .map(each => (
                    <Accordion.Item
                      title={each.category}
                      key={each.position}
                      className="border-b-2"
                    >
                      {each.articles.map(article => (
                        <Typography
                          style="body2"
                          key={article.id}
                          className="cursor-pointer"
                          onClick={() => {
                            history.push(`/public/${article.slug}`);
                          }}
                        >
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

        <Container>
          <div className="mt-5">
            <Typography style="h2" className="mb-4">
              {article.title}
            </Typography>
            <div className="mt-2 flex flex-row space-x-5">
              <Tag label={article.category} color="blue" />

              <Label>{article.date}</Label>
            </div>
            <Typography style="body2" className="mt-4">
              {article.body}
            </Typography>
          </div>
        </Container>
      </div>
    </>
  );
};
export default Eui;
