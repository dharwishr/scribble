import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { useParams } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import Container from "components/Container";

import ArticleForm from "./Form/ArticleForm";

const EditArticle = () => {
  const [article, setArticle] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    loadData();
  }, []);

  const fetchCategoryDetails = async () => {
    try {
      const response = await categoriesApi.list();
      setCategories(response.data.categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchArticleDetails = async () => {
    try {
      const response = await articlesApi.show(slug);
      setArticle(response.data.article);
    } catch (error) {
      logger.error(error);
    }
  };

  const loadData = async () => {
    try {
      setPageLoading(true);
      await Promise.all([fetchCategoryDetails(), fetchArticleDetails()]);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <ArticleForm type="update" categories={categories} article={article} />
    </Container>
  );
};

export default EditArticle;
