import React, { useEffect, useState } from "react";
import classes from "./Task.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";

function TaskComponent() {
  const state = useSelector((state) => state);
  const [user, setUser] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const dispatch = useDispatch();
  const { LogoutUser, updateTask } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    setUser(state.user);
    setTasks(state.task);
  }, [state]);

  useEffect(() => {
    if (user !== "") {
      console.log(user);
      axios.get(` https://to69do.herokuapp.com/task/${user.userId}`).then((res) => {
        console.log(res);
        const data = res.data[0].task;
        updateTask(data);
      });
    }
  }, [user]);

  const logOut = () => {
    LogoutUser();
  };

  const AddTask = () => {
    if (newTask.trim() != "") {
      const reqBody = {
        userId: user.userId,
        task: newTask,
      };

      axios.post(" https://to69do.herokuapp.com/task/add", reqBody).then((res) => {
        const data = res.data[0].task;
        updateTask(data);
      });
    }
  };

  const MarkTask = (taskId) => {
    const reqBody = {
      userId: user.userId,
      taskId,
      method: "update",
    };

    axios.post(" https://to69do.herokuapp.com/task/edit", reqBody).then((res) => {
      //   console.log(res.data[0].task)
      const data = res.data[0].task;
      updateTask(data);
    });
  };

  const DeleteTask = (taskId) => {
    const reqBody = {
      userId: user.userId,
      taskId,
      method: "delete",
    };


    axios.post(" https://to69do.herokuapp.com/task/edit", reqBody).then((res) => {
      const data = res.data[0].task;
      updateTask(data);
    });
  };

  return (
    <div className={classes.majorContainer}>
      <div className={classes.contentHeader}>
        <h2> Todo List</h2>
        <h4>{user.email}</h4>
        <button className={classes.logoutButton} onClick={() => logOut()}>
          Logout
        </button>
      </div>
      <div className={classes.content}>
        <input
          className={classes.input}
          placeholder="Type your task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className={classes.button} onClick={() => AddTask()}>
          Add Task
        </button>
      </div>
      <div className={classes.content}>
        {tasks &&
          tasks.map((t, index) => (
            <div className={classes.tasks} key={index}>
              <span
                style={
                  t.status === "not done"
                    ? { textDecoration: "none" }
                    : { textDecoration: "line-through" }
                }
              >
                {t.task}
              </span>
              <span>
                <button
                  className={classes.markButton}
                  onClick={() => MarkTask(t._id)}
                >
                  Mark Task
                </button>
                <button
                  className={classes.deleteButton}
                  onClick={() => DeleteTask(t._id)}
                >
                  Delete
                </button>
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TaskComponent;
