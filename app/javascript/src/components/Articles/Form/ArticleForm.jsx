import React from "react";
import { useEffect } from "react";

import { Textarea } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui";
import { Button } from "@bigbinary/neetoui";
import Select from "react-select";

const ArticleForm = ({
  type = "create",
  title,
  body,
  setTitle,
  setBody,
  setAuthor,
  categories,
  setCategoryId,
  loading,
  handleSubmit,
}) => {
  // const categoryOptions = categories.map(category => ({
  //   value: category.id,
  //   label: category.category,
  // }));
  useEffect(() => {
    setAuthor("Oliver Smith");
    setCategoryId("2");
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
      <div className="flex">
        {/* <Dropdown position="bottom" label="Dropdown" isMultiLevel >
          {categories.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </Dropdown> */}
        <Select
          options={categories}
          // defaultValue={defaultOption}
          // onChange={e => setCategoryId(e.value)}
          isSearchable
        />
      </div>

      <Button
        type="submit"
        buttonText={type === "create" ? "Create Task" : "Update Task"}
        loading={loading}
      />
    </form>
  );
};

export default ArticleForm;
