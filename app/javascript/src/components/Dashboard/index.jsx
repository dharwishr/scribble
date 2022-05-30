import React, { useState, useEffect } from "react";

import { Table } from "@bigbinary/neetoui";
import { PageLoader } from "@bigbinary/neetoui";
import { isNil, isEmpty, either } from "ramda";

import articlesApi from "apis/articles";
import Container from "components/Container";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await articlesApi.list();
      setTasks(response.data.tasks);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(tasks)) {
    return (
      <Container>
        <h1 className="text-center text-xl leading-5">
          You have no tasks assigned 😔
        </h1>
      </Container>
    );
  }

  return (
    <Container>
      <Table data={tasks} />
    </Container>
  );
};

export default Dashboard;
