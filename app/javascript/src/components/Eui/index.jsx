import React from "react";
import { useState, useEffect } from "react";

import { Search } from "@bigbinary/neeto-icons";
import {
  PageLoader,
  Typography,
  Accordion,
  Label,
  Tag,
  Input,
  Modal,
} from "@bigbinary/neetoui";
import { MenuBar, Container } from "@bigbinary/neetoui/layouts";
import { useParams, useHistory } from "react-router-dom";

import euiApi from "apis/eui";
import organizationsApi from "apis/organizations";
import { searchWithTitle } from "common/utils";

const Eui = () => {
  const [selectedArticle, setSelectedArticle] = useState([]);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [organizationName, setOrganizationName] = useState("");
  const { slug } = useParams();
  const history = useHistory();

  const fetchCategories = async () => {
    try {
      const response = await euiApi.listCategories();
      setCategories(response.data.categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await euiApi.listArticles();
      setArticles(response.data.articles);
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
      setSelectedArticle(response.data.article);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchResultOnClick = slug => {
    history.push(`/eui/${slug}`);
    setShowSearchModal(false);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchCategories(),
        fetchOrganization(),
        fetchArticles(),
      ]);
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
        <div
          className="border absolute mt-6 flex w-1/6 p-2"
          onClick={() => {
            setShowSearchModal(true);
          }}
        >
          <Search size={20} />
          Search for articles here
        </div>
        <Typography style="h3" className="m-auto">
          {organizationName}
        </Typography>
      </nav>
      <div className="flex flex-row">
        <MenuBar showMenu="true">
          <div>
            <Accordion defaultActiveKey={0}>
              {categories?.length ? (
                categories.map(category => (
                  <Accordion.Item
                    title={category.title}
                    key={category.position}
                    className="border-b-2"
                    isOpen={category.title === selectedArticle.category}
                  >
                    {category.articles.map(article => (
                      <Typography
                        style="body2"
                        key={article.id}
                        className="ml-2 mb-2 cursor-pointer"
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
                {selectedArticle.title}
              </Typography>
              <div className="mt-2 flex flex-row space-x-5">
                <Tag label={selectedArticle.category} color="blue" />

                <Label>{selectedArticle.date}</Label>
              </div>
              <Typography style="body2" className="mt-4">
                {selectedArticle.body}
              </Typography>
            </div>
          </Container>
        )}
      </div>
      <Modal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        closeButton={false}
      >
        <Input
          prefix={<Search />}
          placeholder="Search for articles here"
          className="m-auto w-full"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <ul className="border-gray-1 w-full ">
          {searchInput &&
            searchWithTitle(articles, searchInput).map(article => (
              <li
                key={article.slug}
                className="hover:bg-grey-50 relative cursor-pointer border-b-2 border-gray-100 py-1 pl-8 pr-2 hover:text-gray-900"
                onClick={() => handleSearchResultOnClick(article.slug)}
              >
                {article.title}
              </li>
            ))}
        </ul>
      </Modal>
    </>
  );
};
export default Eui;
