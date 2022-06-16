import React from "react";
import { useState, useEffect } from "react";

import { Edit, Delete, Close, Check, Plus } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui";
import { Button } from "@bigbinary/neetoui";
import { Table } from "@bigbinary/neetoui";
import { PageLoader } from "@bigbinary/neetoui";
import { Form } from "antd";

import redirectionsApi from "../../apis/redirections";

const Redirections = () => {
  const [redirections, setRedirections] = useState([]);
  const [editData, setEditData] = useState({
    id: "",
    from: "",
    to: "",
  });
  const [loading, setLoading] = useState(true);
  const [editRow, setEditRow] = useState(null);
  const [form] = Form.useForm();
  const fetchRedirections = async () => {
    try {
      const response = await redirectionsApi.list();
      setRedirections(response.data.redirections);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const editRedirection = async () => {
    try {
      await redirectionsApi.update({
        id: editData.id,
        payload: {
          from: editData.from,
          to: editData.to,
        },
      });

      // history.push("/");
    } catch (error) {
      logger.error(error);
    } finally {
      fetchRedirections();
      setEditRow(null);
    }
  };

  const destroyRedirection = async () => {
    try {
      await redirectionsApi.destroy(editData.id);
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
        if (editRow === record.key) {
          return (
            <Form.Item
              name="from"
              rules={[
                {
                  required: true,
                  message: "Please enter from path",
                },
              ]}
            >
              <Input
                onChange={e =>
                  setEditData({ ...editData, from: e.target.value })
                }
              />
            </Form.Item>
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
        if (editRow === record.key) {
          return (
            <Form.Item
              name="to"
              rules={[
                {
                  message: "Please enter to path",
                },
              ]}
            >
              <Input
                onChange={e => setEditData({ ...editData, to: e.target.value })}
              />
            </Form.Item>
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
        if (editRow === record.key) {
          return (
            <>
              <Button
                icon={Check}
                onClick={() => {
                  setEditData({
                    id: record.key,
                    from: record.from,
                    to: record.to,
                  });
                  editRedirection();
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
                  from: record.from,
                  to: record.to,
                });
                form.setFieldsValue({
                  from: record.from,
                  to: record.to,
                });
              }}
              style="secondary"
            />
            <Button
              icon={Delete}
              onClick={() => {
                setEditData({ ...editData, id: record.key });
                destroyRedirection();
              }}
              style="secondary"
            />
          </>
        );
      },
    },
  ];

  const handleAdd = () => {
    const newData = {
      key: 10,
      from: "",
      to: "",
    };
    setRedirections([...redirections, newData]);
  };

  useEffect(() => {
    fetchRedirections();
  }, []);
  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-5 sm:container sm:mx-auto">
      <Typography style="h2">Redirections</Typography>

      <Typography style="body2">
        Create and configure redirection rules to send users from old links to
        new links. All redirections are performed with 301 status codes to be
        SEO friendly.
      </Typography>
      <div className="sm:container sm:mx-auto">
        <Form form={form}>
          <Table
            columnData={columns}
            currentPageNumber={1}
            defaultPageSize={10}
            handlePageChange={function noRefCheck() {}}
            onRowClick={function noRefCheck() {}}
            onRowSelect={function noRefCheck() {}}
            rowData={dataSource}
          />
        </Form>
      </div>
      <Button
        label="Add Article"
        icon={Plus}
        onClick={() => {
          setEditRow(1);
          handleAdd();
        }}
        style="text"
      />
    </div>
  );
};
export default Redirections;
