import React, { useState, useEffect } from "react";

import { PageLoader, Toastr } from "@bigbinary/neetoui";
import { Container } from "@bigbinary/neetoui/layouts";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import NavBar from "components/NavBar";

import DashboradTable from "./DashboradTable";
import Menu from "./Menu";
import SubHead from "./SubHead";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [searchArticle, setSearchArticle] = useState();
  const [foundArticles, setFoundArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchCategory, setSearchCategory] = useState();
  const [foundCategories, setFoundCategories] = useState();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    } catch (error) {
      Toastr.error("Error while getting articles");
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
      Toastr.error("Error while getting categories");
      setLoading(false);
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

  const createCategory = async () => {
    try {
      await categoriesApi.create({ category });
    } catch (error) {
      Toastr.error(error);
    }
    fetchCategories();
    setCategory(null);
  };

  const destroyArticle = async slug => {
    try {
      await articlesApi.destroy(slug);
      fetchCategories();
    } catch (error) {
      Toastr.error(error);
    } finally {
      fetchArticles();
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
    fetchArticles();
    fetchCategories();
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
          counts={{
            draft: articles["draft_count"],
            published: articles["published_count"],
            total: articles["draft_count"] + articles["published_count"],
          }}
          displayedArticles={displayedArticles}
          sortArticles={sortArticles}
          searchWhichCategory={searchWhichCategory}
          searchCategory={searchCategory}
          category={category}
          setCategory={setCategory}
          createCategory={createCategory}
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
            fetchArticles={fetchArticles}
            foundArticles={foundArticles}
          />
        </Container>
        {logger.error(foundArticles)}
      </div>
    </div>
  );
};

export default Dashboard;
