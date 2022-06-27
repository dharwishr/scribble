import React from "react";
import { useState } from "react";

import { ActionDropdown, Button } from "@bigbinary/neetoui";
import { Input, Textarea, Select } from "@bigbinary/neetoui/formik";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

import articlesApi from "apis/articles";

const ArticleForm = ({ article, type, categories }) => {
  const [submitted, setSubmitted] = useState(false);
  const [articleStatus, setArticleStatus] = useState("draft");
  const history = useHistory();

  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    category: yup.object().required("Please select a category."),
    body: yup.string(),
  });

  const handleSubmit = async values => {
    try {
      if (type === "update") {
        await articlesApi.update({
          slug: article.slug,
          payload: {
            title: values.title,
            body: values.body,
            assigned_category_id: values.category.value,
            status: articleStatus,
            article_owner_id: 1,
          },
        });
      } else {
        await articlesApi.create({
          title: values.title,
          body: values.body,
          assigned_category_id: values.category.value,
          status: articleStatus,
          article_owner_id: 1,
        });
      }
      history.push("/");
    } catch (err) {
      logger.error(err);
    }
  };

  return (
    <div>
      <Formik
        initialValues={
          article
            ? {
                title: article.title,
                body: article.body,
                category: article.assigned_category.id,
              }
            : {
                title: ``,
                body: ``,
                category: { label: null, value: null },
              }
        }
        onSubmit={handleSubmit}
        validateOnBlur={submitted}
        validateOnChange={submitted}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className="w-full">
            <div className="grid grid-cols-2 space-x-20">
              <Input label="Article Title" name="title" required />
              <Select
                label="Category"
                name="category"
                isSearchable
                options={categories.map(category => ({
                  value: category.id,
                  label: category.category,
                }))}
                placeholder="Select a Category"
                required
              />
            </div>
            <Textarea label="Article Body" name="body" rows="20" />
            <div className="flex flex-row space-x-5">
              <Button
                type="submit"
                label={"Save Changes"}
                size="large"
                style="primary"
                className="mr-3"
                disabled={isSubmitting}
                loading={isSubmitting}
                onClick={() => setSubmitted(true)}
              />
              <ActionDropdown
                label={
                  articleStatus === "draft" ? "Save Draft" : "Publish Article"
                }
                type="submit"
                // onClick={handleSubmit(onSubmit)}
                style="primary"
              >
                <li onClick={() => setArticleStatus("draft")}>Draft</li>
                <li onClick={() => setArticleStatus("published")}>Publish</li>
              </ActionDropdown>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ArticleForm;
