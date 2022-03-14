import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import Navigations from './navigation';

import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import { actionCreators } from './state';

function App() {

  const state = useSelector(state => state)

  const dispatch = useDispatch()

  const { updateTask, setUser } = bindActionCreators(actionCreators, dispatch);


  // useEffect(() => {
  //   setUser("622c2fc18668dccdbf42ade1", "same", "email")
  // }, [])

  useEffect(() => {
    console.log(state)
  }, [state])

  const AddTask = (userId, task) => {


    const reqBody = {
      userId,
      task
    };

    axios.post("http://localhost:5000/task/add", reqBody)
      .then((res) => {
        // console.log(res.data[0].task)
        const data = res.data[0].task;
        updateTask(data)
      })

  }

  return (
    <div className="App">
      <Navigations />
    </div>
  );
}

export default App;
