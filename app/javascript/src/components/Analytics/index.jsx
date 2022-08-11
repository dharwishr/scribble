import React, { useState, useEffect } from "react";

import { PageLoader, Table, Toastr } from "@bigbinary/neetoui";

import articlesApi from "apis/articles";
import NavBar from "components/NavBar";

import { analyticsColumnData } from "./utils";

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const fetchArticles = async () => {
    try {
      const response = await articlesApi.list();
      setArticles(response.data.articles.all);
    } catch (error) {
      Toastr.error("Error while getting articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="mx-auto mt-10 w-10/12">
        <Table
          className="w-10/12"
          columnData={analyticsColumnData}
          currentPageNumber={pageNo}
          defaultPageSize={10}
          handlePageChange={page => {
            setPageNo(page);
          }}
          onRowClick={() => {}}
          onRowSelect={() => {}}
          rowData={articles}
        />
      </div>
      ;
    </div>
  );
};
export default Analytics;
