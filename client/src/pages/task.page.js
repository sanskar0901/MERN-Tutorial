import React from "react";
import { Helmet } from "react-helmet";

import TaskComponent from "../components/Tasks/Task.component";

function task() {
  return (
    <div>
      <Helmet>
        <title>Todo | Task</title>
      </Helmet>
      
      <TaskComponent />
    </div>
  );
}

export default task;
