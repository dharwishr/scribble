import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import Container from "components/Container";

import ArticleForm from "./Form/ArticleForm";

const EditArticle = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [articleStatus, setArticleStatus] = useState("draft");
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();

  const handleSubmit = async () => {
    try {
      await articlesApi.update({
        slug,
        payload: {
          article: {
            title,
            body,
            author,
            assigned_category_id: categoryId,
            status: articleStatus,
          },
        },
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
      logger.error(error);
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
  const fetchArticleDetails = async () => {
    try {
      const response = await articlesApi.show(slug);
      const { article } = response.data;
      setTitle(article.title);
      setBody(article.body);
      setAuthor(article.author);
      setCategoryId({
        label: article.assigned_category.category,
        value: article.assigned_category.id,
      });
    } catch (error) {
      logger.error(error);
    }
  };
  // const loadData = async () => {
  //   await fetchCategoryDetails();
  //   await fetchArticleDetails();
  // };
  useEffect(() => {
    fetchCategoryDetails();
    fetchArticleDetails();
    setPageLoading(false);
  }, []);
  if (pageLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <ArticleForm
        type="update"
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

export default EditArticle;
