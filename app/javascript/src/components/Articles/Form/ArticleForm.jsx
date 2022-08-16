import React from "react";
import { useState } from "react";

import { Dropdown, Button } from "@bigbinary/neetoui";
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
            category_id: values.category.value,
            status: articleStatus,
            user_id: 1,
          },
        });
      } else {
        await articlesApi.create({
          title: values.title,
          body: values.body,
          category_id: values.category.value,
          status: articleStatus,
          user_id: 1,
        });
      }
      history.push("/");
    } catch (err) {
      logger.error(err);
    }
  };

  return (
    <div className="mx-auto mt-10 h-full w-1/2">
      <Formik
        initialValues={
          article
            ? {
                title: article.title,
                body: article.body,
                category: {
                  label: article.assigned_category.title,
                  value: article.assigned_category.id,
                },
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
                  label: category.title,
                }))}
                placeholder="Select a Category"
                required
              />
            </div>
            <Textarea label="Article Body" name="body" rows="20" />
            <div className="mt-3 flex flex-row space-x-2">
              <div className="flex space-x-5">
                <div className="flex">
                  <Button
                    type="submit"
                    label={
                      articleStatus === "draft"
                        ? "Save Draft"
                        : "Publish Article"
                    }
                    size="medium"
                    style="primary"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    onClick={() => setSubmitted(true)}
                  />
                  <Dropdown position="bottom-end">
                    <li onClick={() => setArticleStatus("draft")}>Draft</li>
                    <li onClick={() => setArticleStatus("published")}>
                      Publish
                    </li>
                  </Dropdown>
                </div>
                <Button style="text" label="Cancel" to="/" />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ArticleForm;
