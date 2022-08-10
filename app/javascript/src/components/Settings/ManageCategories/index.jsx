import React, { useState, useEffect } from "react";

import { Close, Check, Plus } from "@bigbinary/neeto-icons";
import { Typography, PageLoader, Button, Input } from "@bigbinary/neetoui";

import categoriesApi from "apis/categories";
import List from "components/Settings/ManageCategories/List";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddNew, setIsAddNew] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.list();
      setCategories(response.data.categories);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async () => {
    try {
      await categoriesApi.create({ title: newCategory });
      setIsAddNew(false);
      await fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  const addNewArticle = () => {
    if (isAddNew) {
      return (
        <div className="flex max-w-xs">
          <Input
            label="Category"
            required
            placeholder="Enter Category Name"
            onChange={e => setNewCategory(e.target.value)}
            value={newCategory}
          />
          <div className="mt-4 ml-4 flex space-x-2">
            <Button icon={Check} onClick={() => createCategory()} />
            <Button icon={Close} onClick={() => setIsAddNew(false)} />
          </div>
        </div>
      );
    }

    return (
      <Button
        className="mt-6 mb-6"
        iconPosition="left"
        style="text"
        icon={Plus}
        label="Add New Category"
        onClick={() => setIsAddNew(true)}
      />
    );
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 space-y-5">
      <Typography style="h2">Manage Categories</Typography>
      <Typography style="body2">
        Create and configure the categories inside your scribble.
      </Typography>
      {addNewArticle()}
      <List categories={categories} fetchCategories={fetchCategories} />
    </div>
  );
};
export default ManageCategories;
