import React, { useState, useEffect } from "react";

import { MenuOutlined } from "@ant-design/icons";
import { Edit, Delete, Close, Check, Plus } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui";
import { PageLoader } from "@bigbinary/neetoui";
import { Table } from "@bigbinary/neetoui";
import { Button } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui";
import { Form } from "antd";
import { arrayMoveImmutable } from "array-move";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";

import categoriesApi from "apis/categories";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  // const [updatedCategories, setUpdatedCategories] = useState([]);
  const [editData, setEditData] = useState({
    id: "",
    category: "",
  });
  const [editRow, setEditRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAddNew, setIsAddNew] = useState(false);
  const [newCategory, setNewCategory] = useState();
  // const [editCategory, setEditCategory] = useState(null)
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState();
  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.list();
      const data = response.data.categories.map(category => ({
        key: category.id,
        category: category.category,
        action: category.id,
        index: category.position,
      }));
      setCategories(data);
      // setUpdatedCategories(data);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    } finally {
      setDataSource(categories);
    }
  };
  const createCategory = async () => {
    try {
      await categoriesApi.create({
        category: { category: newCategory },
      });
    } catch (error) {
      logger.error(error);
    } finally {
      setIsAddNew(!isAddNew);
      fetchCategories();
    }
  };
  const editCategories = async () => {
    try {
      await categoriesApi.update({
        id: editData.id,
        payload: {
          category: { category: editData.category },
        },
      });
      // history.push("/");
    } catch (error) {
      logger.error(error);
    } finally {
      fetchCategories();
      setEditRow(null);
    }
  };
  const destroyCategory = async key => {
    try {
      await categoriesApi.destroy(key);
      await fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };
  const DragHandle = SortableHandle(() => (
    <MenuOutlined
      style={{
        cursor: "grab",
        color: "#999",
      }}
    />
  ));
  const columns = [
    {
      dataIndex: "sort",
      width: 30,
      className: "drag-visible",
      render: () => <DragHandle />,
    },
    {
      dataIndex: "category",
      className: "drag-visible",
      render: (text, record) => {
        if (editRow === record.key) {
          return (
            <Form.Item
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please enter category",
                },
              ]}
            >
              <Input
                onChange={e =>
                  setEditData({ ...editData, category: e.target.value })
                }
              />
            </Form.Item>
          );
        }

        return <p>{text}</p>;
      },
    },
    {
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        if (editRow === record.key) {
          return (
            <>
              <Button
                icon={Check}
                onClick={() => {
                  setEditData({
                    id: record.key,
                    category: record.category,
                  });
                  editCategories();
                }}
                style="secondary"
              />
              <Button
                icon={Close}
                onClick={() => {
                  setEditRow(null);
                }}
                style="secondary"
              />
            </>
          );
        }

        return (
          <>
            <Button
              icon={Edit}
              onClick={() => {
                setEditRow(record.key);
                setEditData({
                  id: record.key,
                  category: record.category,
                });
                form.setFieldsValue({
                  category: record.category,
                });
              }}
              style="secondary"
            />
            <Button
              icon={Delete}
              onClick={() => {
                destroyCategory(record.key);
              }}
              style="secondary"
            />
          </>
        );
      },
    },
  ];

  const SortableItem = SortableElement(props => <tr {...props} />);
  const SortableBody = SortableContainer(props => <tbody {...props} />);
  // function handleOnDragEnd(result) {
  //   if (!result.destination) return;
  //   const items = Array.from(categories);
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);
  //   setUpdatedCategories(items);
  // }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        dataSource.slice(),
        oldIndex,
        newIndex
      ).filter(el => !!el);
      setDataSource(newData);
    }
  };
  const DraggableContainer = props => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );
  const DraggableBodyRow = ({ ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(
      x => x.index === restProps["data-row-key"]
    );
    return <SortableItem index={index} {...restProps} />;
  };
  const addNewArticle = () => {
    if (isAddNew) {
      return (
        <div className="p-5">
          <Input
            placeholder="Input Placeholder"
            onChange={e => setNewCategory(e.target.value)}
            value={newCategory}
          />
          <Button icon={Check} onClick={() => createCategory()} />
          <Button icon={Close} onClick={() => setIsAddNew(!isAddNew)} />
        </div>
      );
    }

    return (
      <Button
        iconPosition="left"
        style="text"
        icon={Plus}
        label="Add New Category"
        onClick={() => setIsAddNew(!isAddNew)}
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
    <div className="mt-10 sm:container sm:mx-auto">
      <Typography style="h2">Manage Categories</Typography>
      <Typography style="body2">
        Create and configure the categories inside your scribble.
      </Typography>
      {addNewArticle()}

      <Form form={form}>
        <Table
          pagination={false}
          title={undefined}
          dataSource={categories}
          columns={columns}
          rowKey="index"
          components={{
            body: {
              wrapper: DraggableContainer,
              row: DraggableBodyRow,
            },
          }}
        />
      </Form>
    </div>
  );
};
export default ManageCategories;
