import React from "react";
import { useState } from "react";

import { Edit, Delete } from "@bigbinary/neeto-icons";
import { Table, Button, Alert, Tag } from "@bigbinary/neetoui";
import { useHistory } from "react-router-dom";

import { searchWithTitle } from "common/utils";

import { sortArticles } from "./utils";

const DashboradTable = ({
  columnVisibility,
  destroyArticle,
  articles,
  searchArticle,
  displayedArticles,
}) => {
  const DEFAULT_PAGE_SIZE = "15";
  const LOCALE = {
    emptyText: "No articles added yet",
  };

  const history = useHistory();
  const [showAlertSmall, setShowAlertSmall] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  const articleColumns = [
    {
      title: "TITLE",
      dataIndex: "title",
      key: "title",
      visibility: columnVisibility.title,
      width: 300,
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      visibility: columnVisibility.date,
      width: 200,
    },
    {
      title: "AUTHOR",
      dataIndex: "author",
      key: "author",
      visibility: columnVisibility.author,
    },
    {
      title: "CATEGORY",
      dataIndex: "assigned_category",
      key: "assigned_category",
      visibility: columnVisibility.category,
      render: (_, record) => (
        <Tag label={record.assigned_category.title} indicatorColor="gray" />
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      className: "capitalize",
      visibility: columnVisibility.status,
      render: (_, record) =>
        record.status === "draft" ? (
          <Tag label={record.status} color="blue" />
        ) : (
          <Tag label={record.status} color="green" />
        ),
    },
    {
      title: "Action",
      visibility: columnVisibility.action,
      dataIndex: "action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <>
          <Button
            icon={Edit}
            className="mr-2"
            onClick={() => {
              history.push(`/article/${record.slug}/edit`);
            }}
            style="secondary"
          />
          <Button
            icon={Delete}
            onClick={() => {
              setShowAlertSmall(true);
            }}
            style="secondary"
          />
          <Alert
            size="sm"
            isOpen={showAlertSmall}
            title="You are gonna delete article!"
            message="Are you sure you want to continue?."
            onClose={() => setShowAlertSmall(false)}
            onSubmit={() => {
              destroyArticle(record.slug);
              setShowAlertSmall(false);
            }}
          />
        </>
      ),
    },
  ];

  return (
    <Table
      columnData={articleColumns.filter(item => item.visibility)}
      locale={LOCALE}
      currentPageNumber={pageNo}
      defaultPageSize={DEFAULT_PAGE_SIZE}
      handlePageChange={setPageNo}
      onRowClick={() => {}}
      onRowSelect={() => {}}
      rowData={searchWithTitle(
        sortArticles(articles, displayedArticles),
        searchArticle
      )}
    />
  );
};
export default DashboradTable;
