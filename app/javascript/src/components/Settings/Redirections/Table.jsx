import React from "react";
import { useState } from "react";

import { Edit, Delete, Close, Check } from "@bigbinary/neeto-icons";
import { Input, Button, Table as NeetoTable } from "@bigbinary/neetoui";

import redirectionsApi from "apis/redirections";

const Table = ({ redirections, fetchRedirections }) => {
  const CURRENT_PAGE_NUMBER = 1;
  const DEFAULT_PAGE_SIZE = 10;
  const LOCALE = {
    emptyText: "No redirections added yet",
  };
  const [rowId, setRowId] = useState(0);
  const [rowData, setRowData] = useState({
    id: "",
    from: "",
    to: "",
  });

  const updateRedirection = async () => {
    try {
      await redirectionsApi.update({
        id: rowData.id,
        payload: rowData,
      });
      fetchRedirections();
      setRowId(0);
    } catch (error) {
      logger.error(error);
    }
  };

  const destroyRedirection = async redirectionId => {
    try {
      await redirectionsApi.destroy(redirectionId);
      await fetchRedirections();
    } catch (error) {
      logger.error(error);
    }
  };

  const dataSource = redirections.map(redirection => ({
    key: redirection.id,
    from: redirection.from,
    to: redirection.to,
    action: redirection.id,
  }));

  const columns = [
    {
      title: "From Path",
      dataIndex: "from",
      key: "from",
      render: (text, record) => {
        if (rowId === record.key) {
          return (
            <Input
              prefix={"/"}
              value={rowData.from}
              onChange={e => setRowData({ ...rowData, from: e.target.value })}
            />
          );
        }

        return <p>{text}</p>;
      },
    },
    {
      title: "To Path",
      dataIndex: "to",
      key: "to",
      render: (text, record) => {
        if (rowId === record.key) {
          return (
            <Input
              prefix={"/"}
              value={rowData.to}
              onChange={e => setRowData({ ...rowData, to: e.target.value })}
            />
          );
        }

        return <p>{text}</p>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        if (rowId === record.key) {
          return (
            <>
              <Button
                icon={Check}
                onClick={() => {
                  setRowData({
                    id: record.key,
                    from: record.from,
                    to: record.to,
                  });
                  updateRedirection();
                }}
                style="secondary"
              />
              <Button
                icon={Close}
                onClick={() => {
                  setRowId(0);
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
                setRowId(record.key);
                setRowData({
                  id: record.key,
                  from: record.from.substring(1),
                  to: record.to.substring(1),
                });
              }}
              style="secondary"
            />
            <Button
              icon={Delete}
              onClick={() => {
                destroyRedirection(record.key);
              }}
              style="secondary"
            />
          </>
        );
      },
    },
  ];

  return (
    <NeetoTable
      locale={LOCALE}
      columnData={columns}
      currentPageNumber={CURRENT_PAGE_NUMBER}
      defaultPageSize={DEFAULT_PAGE_SIZE}
      rowData={dataSource}
    />
  );
};
export default Table;
