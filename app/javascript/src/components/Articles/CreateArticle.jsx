import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui";

import categoriesApi from "apis/categories";
import NavBar from "components/NavBar";

import ArticleForm from "./Form/ArticleForm";

const CreateArticle = () => {
  const [categories, setCategories] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchCategoryDetails = async () => {
    try {
      setPageLoading(true);
      const response = await categoriesApi.list();
      setCategories(response.data.categories);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <div className="h-full w-screen">
      <NavBar />
      <ArticleForm categories={categories} />
    </div>
  );
};

export default CreateArticle;
