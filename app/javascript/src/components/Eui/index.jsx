import React from "react";
import { useState, useEffect } from "react";

import {
  PageLoader,
  Typography,
  Accordion,
  Label,
  Tag,
} from "@bigbinary/neetoui";
import { MenuBar, Container } from "@bigbinary/neetoui/layouts";
import { useParams, useHistory } from "react-router-dom";

import euiApi from "apis/eui";
import organizationsApi from "apis/organizations";

const Eui = () => {
  const [article, setArticle] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [organizationName, setOrganizationName] = useState("");
  const { slug } = useParams();
  const history = useHistory();

  const fetchCategories = async () => {
    try {
      const response = await euiApi.list();
      setCategories(response.data.categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchOrganization = async () => {
    try {
      const response = await organizationsApi.get();
      setOrganizationName(response.data.organization_name);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchArticleDetails = async () => {
    try {
      const response = await euiApi.show(slug);
      setArticle(response.data.article);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchCategories(), fetchOrganization()]);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (slug) {
      fetchArticleDetails();
    }
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
          {organizationName}
        </Typography>
      </nav>
      <div className="flex flex-row">
        <MenuBar showMenu="true">
          <div>
            <Accordion>
              {categories?.length ? (
                categories.map(category => (
                  <Accordion.Item
                    title={category.title}
                    key={category.position}
                    className="border-b-2"
                  >
                    {category.articles.map(article => (
                      <Typography
                        style="body2"
                        key={article.id}
                        active={slug === article.slug}
                        className="cursor-pointer"
                        onClick={() => {
                          history.push(`/eui/${article.slug}`);
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
        {slug && (
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
        )}
      </div>
    </>
  );
};
export default Eui;
