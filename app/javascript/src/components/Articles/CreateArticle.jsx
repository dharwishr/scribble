import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import Container from "components/Container";

import ArticleForm from "./Form/ArticleForm";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [articleStatus, setArticleStatus] = useState("draft");
  const [pageLoading, setPageLoading] = useState(true);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await articlesApi.create({
        article: {
          title,
          body,
          author,
          assigned_category_id: categoryId.value,
          status: articleStatus,
        },
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchCategoryDetails = async () => {
    try {
      const response = await categoriesApi.list();
      setCategories(response.data.categories);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
    setPageLoading(false);
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <ArticleForm
        title={title}
        body={body}
        setTitle={setTitle}
        setBody={setBody}
        setAuthor={setAuthor}
        categories={categories}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        loading={loading}
        handleSubmit={handleSubmit}
        articleStatus={articleStatus}
        setArticleStatus={setArticleStatus}
      />
    </Container>
  );
};

export default CreateArticle;
