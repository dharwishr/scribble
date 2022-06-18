import React from "react";
import { useEffect } from "react";

import { Textarea } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui";
import { ActionDropdown } from "@bigbinary/neetoui";
import Select from "react-select";

const ArticleForm = ({
  title,
  body,
  setTitle,
  setBody,
  setAuthor,
  categories,
  articleStatus,
  setArticleStatus,
  categoryId,
  setCategoryId,
  handleSubmit,
}) => {
  // const categoryOptions = categories.map(category => ({
  //   value: category.id,
  //   label: category.category,
  // }));

  useEffect(() => {
    setAuthor("Oliver Smith");
  }, []);

  return (
    <form className="mx-auto max-w-lg" onSubmit={handleSubmit}>
      <Input
        label="Article Title"
        required={true}
        value={title}
        onChange={e => setTitle(e.target.value.slice(0, 50))}
      />
      <Textarea
        label="Article Body"
        required={true}
        value={body}
        onChange={e => setBody(e.target.value)}
      />
      <div className="flex"></div>

      <ActionDropdown
        label={articleStatus === "draft" ? "Save Draft" : "Publish Article"}
        onClick={() => handleSubmit()}
        style="primary"
      >
        <li onClick={() => setArticleStatus("draft")}>Draft</li>
        <li onClick={() => setArticleStatus("published")}>Publish</li>
      </ActionDropdown>

      <Select
        isSearchable
        label="Select"
        name="ValueList"
        value={categoryId}
        defaultValue={categoryId}
        onChange={newValue => setCategoryId(newValue)}
        options={categories.map(each => ({
          value: each.id,
          label: each.category,
        }))}
        placeholder="Select a Category"
      />
    </form>
  );
};

export default ArticleForm;
