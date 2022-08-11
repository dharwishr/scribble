import React from "react";

import { Tag } from "@bigbinary/neetoui";

export const analyticsColumnData = [
  {
    dataIndex: "title",
    key: "title",
    title: "TITLE",
    width: 150,
    sorter: (a, b) => (a.title > b.title) - (a.title < b.title),
  },
  {
    dataIndex: "date",
    key: "date",
    title: "DATE",
    width: 100,
    sorter: (a, b) => new Date(b.date) - new Date(a.date),
  },
  {
    dataIndex: "assigned_category",
    key: "assigned_category",
    title: "CATEGORY",
    width: 75,
    sorter: (a, b) =>
      (a.assigned_category.title > b.assigned_category.title) -
      (a.assigned_category.title < b.assigned_category.title),
    render: (_, record) => (
      <Tag label={record.assigned_category.title} indicatorColor="gray" />
    ),
  },
  {
    dataIndex: "visits",
    key: "visits",
    title: "VISITS",
    width: 50,
    sorter: (a, b) => a.visits - b.visits,
  },
];
