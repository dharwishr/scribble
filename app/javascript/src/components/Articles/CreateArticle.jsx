import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui";

import categoriesApi from "apis/categories";
import Container from "components/Container";

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
    <Container>
      <ArticleForm categories={categories} />
    </Container>
  );
};

export default CreateArticle;
