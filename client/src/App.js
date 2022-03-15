import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Task from "./components/Tasks/Task";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import { actionCreators } from './state';

function App() {

  const state = useSelector(state => state)

  const dispatch = useDispatch()

  const { updateTask, setUser } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    console.log(state)
  }, [state])

  const AddTask = (userId, task) => {


    const reqBody = {
      userId,
      task
    };

    axios.post(" https://to69do.herokuapp.com/task/add", reqBody)
      .then((res) => {
        // console.log(res.data[0].task)
        const data = res.data[0].task;
        updateTask(data)
      })

  }



  const [isloggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (state.user != null) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [state])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {isloggedIn ? (
            <>
              <Route exact path="/" element={<Task />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/signup" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route exact path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
