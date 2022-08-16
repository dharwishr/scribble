import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { useParams } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import versionsApi from "apis/versions";
import NavBar from "components/NavBar";

import ArticleForm from "./Form/ArticleForm";
import RestoreArticleModal from "./Modal/RestoreArticleModal";
import VersionHistory from "./VersionHistory";

const EditArticle = () => {
  const [article, setArticle] = useState([]);
  const [restoringArticle, setRestoringArticle] = useState([]);
  const [articleVersions, setArticleVersions] = useState([]);
  const [showModal, setShowModal] = useState(false);
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

  const fetchArticleVersions = async () => {
    try {
      const response = await versionsApi.list(slug);
      setArticleVersions(response.data.versions);
    } catch (error) {
      logger.error(error);
    }
  };

  const loadData = async () => {
    try {
      setPageLoading(true);
      await Promise.all([
        fetchCategoryDetails(),
        fetchArticleDetails(),
        fetchArticleVersions(),
      ]);
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
    <>
      <NavBar articleStatus={article.status}></NavBar>
      <div className="flex h-full w-screen justify-between">
        <ArticleForm type="update" categories={categories} article={article} />
        <VersionHistory
          setRestoringArticle={setRestoringArticle}
          setShowModal={setShowModal}
          slug={slug}
          articleVersions={articleVersions}
        />
      </div>
      <RestoreArticleModal
        showModal={showModal}
        setShowModal={setShowModal}
        restoringArticle={restoringArticle}
        slug={slug}
      />
    </>
  );
};

export default EditArticle;
