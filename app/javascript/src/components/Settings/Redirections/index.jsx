import React from "react";
import { useState, useEffect } from "react";

import { Close, Check, Plus } from "@bigbinary/neeto-icons";
import { Typography, Input, Button, PageLoader } from "@bigbinary/neetoui";

import redirectionsApi from "apis/redirections";
import Table from "components/Settings/Redirections/Table";

const Redirections = () => {
  const [redirections, setRedirections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addNew, setAddNew] = useState(false);
  const [editRedirection, setEditRedirection] = useState({
    id: "",
    from: "",
    to: "",
  });

  const fetchRedirections = async () => {
    try {
      setLoading(true);
      const response = await redirectionsApi.list();
      setRedirections(response.data.redirections);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createRedirection = async () => {
    try {
      await redirectionsApi.create(editRedirection);
      fetchRedirections();
    } catch (error) {
      logger.error(error);
    } finally {
      setAddNew(false);
    }
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
        <Table
          redirections={redirections}
          fetchRedirections={fetchRedirections}
        />
        {addNew ? (
          <div className="mt-4 flex">
            <div className="flex grid grid-cols-3 space-x-20">
              <Input
                value={editRedirection.from}
                prefix={"/"}
                required
                label="From"
                onChange={e => {
                  setEditRedirection({
                    ...editRedirection,
                    from: e.target.value,
                  });
                }}
              />
              <Input
                value={editRedirection.to}
                prefix={"/"}
                required
                label="To"
                onChange={e => {
                  setEditRedirection({
                    ...editRedirection,
                    to: e.target.value,
                  });
                }}
              />
              <div className="flex pl-2">
                <Button
                  icon={Check}
                  onClick={() => {
                    createRedirection();
                  }}
                  style="secondary"
                />
                <Button
                  icon={Close}
                  onClick={() => {
                    setAddNew(false);
                  }}
                  style="secondary"
                />
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {addNew ? (
        <div></div>
      ) : (
        <Button
          label="Add Article"
          icon={Plus}
          onClick={() => {
            setAddNew(true);
          }}
          style="text"
        />
      )}
    </div>
  );
};
export default Redirections;
