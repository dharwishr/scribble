import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { Container } from "@bigbinary/neetoui/layouts";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import DashboradTable from "./DashboradTable";
import Menu from "./Menu";
import SubHead from "./SubHead";

import NavBar from "../NavBar";

const Dashboard = () => {
  const [displayedArticles, setDisplayedArticles] = useState({
    status: "All",
    category: "All",
  });
  const [columnVisibility, setColumnVisibility] = useState({
    title: true,
    date: true,
    author: true,
    category: true,
    status: true,
    action: true,
  });
  const [isInputCollapsed, setIsInputCollapsed] = useState(true);
  const [showAlertSmall, setShowAlertSmall] = useState(false);
  const [articles, setArticles] = useState([]);
  const [searchArticle, setSearchArticle] = useState();
  const [foundArticles, setFoundArticles] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchCategory, setSearchCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [foundCategories, setFoundCategories] = useState();
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    draft: "",
    published: "",
    total: "",
  });
  const mapArticles = input => {
    const data = input.map(article => ({
      key: article.id,
      title: article.title,
      author: article.author,
      status: article.status,
      date: article.date,
      slug: article.slug,
      category: article.assigned_category.category,
    }));
    return data;
  };
  const fetchArticles = async () => {
    try {
      const response = await articlesApi.list();
      setArticles(mapArticles(response.data.articles.all));
      setFoundArticles(mapArticles(response.data.articles.all));
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
  const loadData = async () => {
    try {
      await fetchArticles();
      await fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };
  const sortArticles = (
    status = displayedArticles.status,
    category = displayedArticles.category
  ) => {
    if (status !== "All" && category !== "All") {
      setDisplayedArticles({ status: status, category: category });
      setFoundArticles(
        articles
          .filter(article => article.status === status)
          .filter(article => article.category === category)
      );
    } else if (status === "All" && category !== "All") {
      setDisplayedArticles({ status: status, category: category });
      setFoundArticles(
        articles.filter(article => article.category === category)
      );
    } else if (status !== "All" && category === "All") {
      setDisplayedArticles({ status: status, category: category });
      setFoundArticles(articles.filter(article => article.status === status));
    } else {
      setDisplayedArticles({ status: status, category: category });
      setFoundArticles(articles);
    }
  };
  const destroyArticle = async slug => {
    try {
      await articlesApi.destroy(slug);
      fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };
  const createCategory = async event => {
    event.preventDefault();
    try {
      await categoriesApi.create({
        category: { category },
      });
    } catch (error) {
      logger.error(error);
    }
    fetchCategories();
    setIsInputCollapsed(!isInputCollapsed);
    setCategory(null);
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
      const results = foundArticles.filter(article =>
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
        <Menu
          counts={counts}
          displayedArticles={displayedArticles}
          sortArticles={sortArticles}
          searchWhichCategory={searchWhichCategory}
          searchCategory={searchCategory}
          isInputCollapsed={isInputCollapsed}
          setIsInputCollapsed={setIsInputCollapsed}
          category={category}
          setCategory={setCategory}
          createCategory={createCategory}
          loading={loading}
          foundCategories={foundCategories}
          setFoundCategories={setFoundCategories}
        />

        <Container>
          <SubHead
            searchWhichArticle={searchWhichArticle}
            searchArticle={searchArticle}
            columnVisibility={columnVisibility}
            setColumnVisibility={setColumnVisibility}
          />
          <DashboradTable
            columnVisibility={columnVisibility}
            destroyArticle={destroyArticle}
            setShowAlertSmall={setShowAlertSmall}
            fetchArticles={fetchArticles}
            foundArticles={foundArticles}
            showAlertSmall={showAlertSmall}
          />
        </Container>
        {logger.error(foundArticles)}
      </div>
    </div>
  );
};

export default Dashboard;
