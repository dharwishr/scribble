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
  const [searchArticle, setSearchArticle] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState([]);
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

  useEffect(() => {
    loadData();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await articlesApi.list();
      setArticles(response.data.articles.all);
    } catch (error) {
      Toastr.error("Error while getting articles");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.list();
      setCategories(response.data.categories);
    } catch (error) {
      Toastr.error("Error while getting categories");
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchCategories(), fetchArticles()]);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async () => {
    try {
      await categoriesApi.create({ title: categoryTitle });
      await fetchCategories();
    } catch (error) {
      logger.error(error);
    } finally {
      setCategoryTitle(null);
    }
  };

  const destroyArticle = async slug => {
    try {
      await articlesApi.destroy(slug);
      loadData();
    } catch (error) {
      logger.error(error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="flex">
        <Menu
          counts={{
            draft: articles["draft_count"],
            published: articles["published_count"],
            total: articles["draft_count"] + articles["published_count"],
          }}
          displayedArticles={displayedArticles}
          setDisplayedArticles={setDisplayedArticles}
          categoryTitle={categoryTitle}
          setCategoryTitle={setCategoryTitle}
          categories={categories}
          createCategory={createCategory}
        />
        <Container>
          <SubHead
            searchArticle={searchArticle}
            columnVisibility={columnVisibility}
            setColumnVisibility={setColumnVisibility}
            setSearchArticle={setSearchArticle}
          />
          <DashboradTable
            columnVisibility={columnVisibility}
            destroyArticle={destroyArticle}
            searchArticle={searchArticle}
            articles={articles}
            displayedArticles={displayedArticles}
          />
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
