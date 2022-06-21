import React from "react";
import { useEffect } from "react";

import { Textarea } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui";
import { ActionDropdown } from "@bigbinary/neetoui";
import { Select } from "@bigbinary/neetoui";

const ArticleForm = ({
  title,
  body,
  setTitle,
  setBody,
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

  useEffect(() => {}, []);

  return (
    <form
      className="mt-20 flex w-full flex-col space-y-10"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-2 space-x-20">
        <Input
          label="Article Title"
          required={true}
          value={title}
          onChange={e => setTitle(e.target.value.slice(0, 50))}
        />
        <Select
          label="Select"
          isSearchable
          required={true}
          value={categoryId}
          defaultValue={categoryId}
          onChange={newValue => setCategoryId(newValue)}
          options={categories.map(each => ({
            value: each.id,
            label: each.category,
          }))}
          placeholder="Select a Category"
        />
      </div>

      <Textarea
        label="Article Body"
        required={true}
        id="article-form"
        value={body}
        onChange={e => setBody(e.target.value)}
        rows="20"
      />
      <div className="flex flex-row space-x-5">
        <ActionDropdown
          label={articleStatus === "draft" ? "Save Draft" : "Publish Article"}
          onClick={handleSubmit}
          style="primary"
        >
          <li onClick={() => setArticleStatus("draft")}>Draft</li>
          <li onClick={() => setArticleStatus("published")}>Publish</li>
        </ActionDropdown>
      </div>
    </form>
  );
};

export default ArticleForm;
