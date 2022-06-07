import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui";

// import tasksApi from "apis/tasks";
// import usersApi from "apis/users";
import Container from "components/Container";

import ArticleForm from "./Form/ArticleForm";

const CreateArticle = () => {
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    setPageLoading(false);
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <ArticleForm></ArticleForm>
    </Container>
  );
};

export default CreateArticle;